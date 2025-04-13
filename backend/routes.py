
from flask import request, jsonify
from flask_socketio import emit, join_room, leave_room
from app import app, db, socketio
import os
from datetime import datetime, timezone
from models import *

@app.route("/api/register", methods = ["POST"])
def register():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    full_name = data.get("full_name")
    bio = data.get("user_id")
    profile_image_url = data.get("profile_image_url")
    if not username or not email or not password:
        return jsonify({'status':'error', 'message':'username, email, password are required'})
    
    user = User.query.filter_by(username = username).first()
    if user:
        return jsonify({'status':'error', 'message':'username already exists'})
    
    user = User.query.filter_by(email = email).first()
    if user:
        return jsonify({'status':'error', 'message':'email already exists'})
    
    user = User(
        username = username,
        email = email,
        full_name = full_name,
        bio = bio,
        profile_image_url = profile_image_url
    )
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'status':'success', 'message':'succesfully created account'})


@app.route("/api/login", methods = ["POST"])
def login():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if username:
        user = User.query.filter_by(username = username).first()
    elif email:
        user = User.query.filter_by(email = email).first()
    else:
        return jsonify({'status':'error', 'message':'username or email required'})
    
    if user.check_password(password):
        return jsonify({'status':'success', 'message':'succesfully logged in'})
    else:
        return jsonify({'status':'error', 'message':'credintials are not match'})


@app.route("/api/tweet", methods =["POST"])
def create_tweet():
    data = request.json
    user_id = data.get("user_id")
    text_content = data.get("text_content")
    media_content = data.get("media_content")

    if not user_id or not text_content:
        return jsonify({'status':'error', 'message':'user_id and text_content are required'})

    user = User.query.filter_by(id = user_id).first()
    if not user:
        return jsonify({'status':'error', 'message':'user_id not available'})
    print(user)

    if len(text_content) > 280:
        return jsonify({'status':'error', 'message':'text_content must be 280 characters or less'})
    
    tweet = Tweet(
        user_id = user_id,
        text_content = text_content,
        media_content = media_content
    )
    db.session.add(tweet)
    db.session.commit()

    return jsonify({'status':'success', 'message':'succesfully created post'})


@app.route('/api/create_group', methods=['POST'])
def create_group():
    try:
        data = request.get_json()
        if data is None:
            return jsonify({'error': 'Invalid or missing JSON data'}), 400

        name = data.get('name')
        member_ids = data.get('member_ids')
        if not name or not isinstance(name, str):
            return jsonify({'error': 'Group name is required and must be a string'}), 400

        if not member_ids or not isinstance(member_ids, list):
            return jsonify({'error': 'Member IDs must be a non-empty list'}), 400

        group = Group(name=name)
        db.session.add(group)
        db.session.flush()
        for user_id in member_ids:
            member = GroupMembers(user_id=user_id, group_id=group.id)
            db.session.add(member)
        db.session.commit()
        return jsonify({'message': 'Group created', 'group_id': group.id}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/api/messages/<int:user_id>/<int:receiver_id>', methods=['GET'])
def get_messages(user_id, receiver_id):
    messages = Message.query.filter(
        ((Message.sender_id == user_id) & (Message.receiver_id == receiver_id)) |
        ((Message.sender_id == receiver_id) & (Message.receiver_id == user_id))
    ).filter(Message.group_id == None).order_by(Message.timestamp.asc()).all()

    return jsonify([{
        'id': msg.id,
        'sender_id': msg.sender_id,
        'receiver_id': msg.receiver_id,
        'content': msg.content,
        'media_url': msg.media_url,
        'timestamp': msg.timestamp.isoformat(),
        'is_read': msg.is_read,
        'reactions': [{'user_id': r.user_id, 'emoji': r.emoji} for r in Reaction.query.filter_by(message_id=msg.id).all()]
    } for msg in messages if str(user_id) not in msg.deleted_for.split(',')]), 200

@app.route('/api/group_messages/<int:group_id>', methods=['GET'])
def get_group_messages(group_id):
    messages = Message.query.filter_by(group_id=group_id).order_by(Message.timestamp.asc()).all()
    return jsonify([{
        'id': msg.id,
        'sender_id': msg.sender_id,
        'group_id': msg.group_id,
        'content': msg.content,
        'media_url': msg.media_url,
        'timestamp': msg.timestamp.isoformat(),
        'is_read': msg.is_read,
        'reactions': [{'user_id': r.user_id, 'emoji': r.emoji} for r in Reaction.query.filter_by(message_id=msg.id).all()]
    } for msg in messages]), 200


@app.route('/api/search_messages/<int:user_id>', methods=['GET'])
def search_messages(user_id):
    query = request.args.get('query')
    messages = Message.query.filter(
        ((Message.sender_id == user_id) | (Message.receiver_id == user_id)) &
        (Message.content.ilike(f'%{query}%'))
    ).all()

    return jsonify([{
        'id': msg.id,
        'sender_id': msg.sender_id,
        'receiver_id': msg.receiver_id,
        'group_id': msg.group_id,
        'content': msg.content,
        'timestamp': msg.timestamp.isoformat()
    } for msg in messages]), 200

@app.route('/api/block/<int:blocker_id>/<int:blocked_id>', methods=['POST'])
def block_user(blocker_id, blocked_id):
    if blocker_id == blocked_id:
        return jsonify({'error': 'Cannot block yourself'}), 400

    block = Block(blocker_id=blocker_id, blocked_id=blocked_id)
    db.session.add(block)
    db.session.commit()
    return jsonify({'message': 'User blocked'}), 200

@app.route('/api/unread_count/<int:user_id>', methods=['GET'])
def unread_count(user_id):
    unread = Message.query.filter(
        (Message.receiver_id == user_id) & (Message.is_read == False)
    ).count()
    return jsonify({'unread_count': unread}), 200

@socketio.on('send_message')
def handle_message(data):
    try:
        if 'sender_id' not in data:
            emit('error', {'message': 'sender_id is required'})
            return
        if 'receiver_id' not in data and 'group_id' not in data:
            emit('error', {'message': 'receiver_id or group_id is required'})
            return
        if 'content' not in data and 'media_url' not in data:
            emit('error', {'message': 'content or media_url is required'})
            return

        sender_id = data['sender_id']
        receiver_id = data.get('receiver_id')
        group_id = data.get('group_id')
        content = data.get('content')
        media_url = data.get('media_url')

        new_message = Message(
            sender_id=sender_id,
            receiver_id=receiver_id,
            group_id=group_id,
            content=content,
            media_url=media_url
        )
        db.session.add(new_message)
        db.session.commit()

        if receiver_id is None:  # == None o‘rniga is None ishlatildi
            room = f"group_{group_id}"
        else:
            room = f"chat_{min(sender_id, receiver_id)}_{max(sender_id, receiver_id)}"

        emit('receive_message', {
            'id': new_message.id,
            'sender_id': sender_id,
            'receiver_id': receiver_id,
            'group_id': group_id,
            'content': content,
            'media_url': media_url,
            'timestamp': new_message.timestamp.isoformat(),
            'is_read': new_message.is_read
        }, room=room)

        emit('notification', {'message': 'New message received', 'from_user_id': sender_id}, room=room)

    except Exception as e:
        emit('error', {'message': str(e)})

@socketio.on('typing')
def handle_typing(data):
    user_id = data['user_id']
    receiver_id = data.get('receiver_id')
    group_id = data.get('group_id')

    if receiver_id:
        room = f"chat_{min(user_id, receiver_id)}_{max(user_id, receiver_id)}"
    else:
        room = f"group_{group_id}"

    user = User.query.get(user_id)
    emit('typing', {'username': user.username, 'is_typing': True}, room=room, skip_sid=request.sid)
@socketio.on('read_message')
def handle_read_message(data):
    message_id = data['message_id']
    user_id = data['user_id']

    message = Message.query.get(message_id)
    if message and (message.receiver_id == user_id or message.group_id):
        message.is_read = True
        db.session.commit()

        room = f"chat_{min(message.sender_id, message.receiver_id)}_{max(message.sender_id, message.receiver_id)}" if message.receiver_id else f"group_{message.group_id}"
        emit('message_read', {'message_id': message_id, 'is_read': True}, room=room)

@app.route('/api/upload_media', methods=['POST'])
def upload_media():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        allowed_extensions = {'png', 'jpg', 'jpeg', 'gif', 'mp4', 'mov'}
        if '.' not in file.filename or file.filename.rsplit('.', 1)[1].lower() not in allowed_extensions:
            return jsonify({'error': 'File type not allowed. Only PNG, JPG, JPEG, GIF, MP4, MOV are allowed'}), 400
        from werkzeug.utils import secure_filename
        filename = secure_filename(file.filename)
        filename = f"{datetime.now(timezone.utc).timestamp()}_{filename}"

        if not os.path.exists(app.config['UPLOAD_FOLDER']):
            os.makedirs(app.config['UPLOAD_FOLDER'])
        upload_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(upload_path)

        return jsonify({'media_url': f"/{app.config['UPLOAD_FOLDER']}/{filename}"}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
