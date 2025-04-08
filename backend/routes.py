from app import app, db
from flask import request, jsonify
from models import Tweet

@app.route("/api/tweet", methods =["POST"])
def create_tweet():
    data = request.json
    user_id = data.get("user_id")
    text_content = data.get("text_content")
    media_content = data.get("media_content")

    if not user_id or not text_content:
        return jsonify({'status':'error', 'message':'user_id and text_content are required'})

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
