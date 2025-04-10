from app import app, db
from flask import request, jsonify
from models import User,Tweet


# register
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


# login
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

# create tweet
@app.route("/api/tweet", methods =["POST"])
def create_tweet():
    data = request.json
    user_id = data.get("user_id") # required
    text_content = data.get("text_content") # required
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


# edit tweet
@app.route("/api/tweet/<id>", methods = ["PATCH"])
def edit_tweet(id):
    data = request.json
    text_content = data.get("text_content")
    media_content = data.get("media_content") # media link

    if not text_content and not media_content:
        return jsonify({'status':'error', 'message':'text_content or media_content are required'})

    tweet = Tweet.query.filter_by(id=id).first()

    tweet.text_content = text_content
    tweet.media_content = media_content
    db.session.commit()

    return jsonify({'status':'success', 'message':'tweet updated successfully'})


# delete tweet
@app.route("/api/tweet/<id>", methods = ["DELETE"])
def delete_tweet(id):
    tweet = Tweet.query.filter_by(id=id).first()
    if tweet:
        db.session.delete(tweet)
        db.session.commit()
        return jsonify({'status':'success', 'message':'tweet deleted successfully'})

    else:
        return jsonify({'status':'error', 'message':'tweet is not available'})


# get tweets
@app.route("/api/tweets/<user_id>", methods=["GET"])
def get_user_tweets(user_id):
    tweets = Tweet.query.filter_by(user_id=user_id).all()
    if not tweets:
        return jsonify({'status': 'error', 'message': 'no tweets found'})
    
    return jsonify([{
        'id': tweet.id,
        'user_id': tweet.user_id,
        'text_content': tweet.text_content,
        'media_content': tweet.media_content
    } for tweet in tweets])
