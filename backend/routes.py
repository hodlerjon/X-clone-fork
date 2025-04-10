from app import app, db
from flask import request, jsonify
import os
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


@app.route('/api/upload_media', methods=['POST'])
def upload_media():
    print("Request files:", request.files)
    print("Request form:", request.form)
    if 'file' not in request.files:
        print("No file part in request.files")
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        print("No selected file")
        return jsonify({'error': 'No selected file'}), 400

    filename = f"{datetime.utcnow().timestamp()}_{file.filename}"
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    print(f"File saved as: {filename}")
    return jsonify({'media_url': f"/{app.config['UPLOAD_FOLDER']}/{filename}"}), 200

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
