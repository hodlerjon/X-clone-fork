from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)
    full_name = db.Column(db.String(100))
    bio = db.Column(db.Text)
    profile_image_url = db.Column(db.Text)
    user_id = db.Column(db.String, primary_key=True, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.now)

    tweets = db.relationship('Tweet', backref='user', cascade='all, delete')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    # followers = db.relationship('Follower', foreign_keys='Follower.following_id', backref='followed', cascade='all, delete')
    # following = db.relationship('Follower', foreign_keys='Follower.follower_id', backref='follower', cascade='all, delete')
    # replies = db.relationship('Reply', backref='user', cascade='all, delete')
    # retweets = db.relationship('Retweet', backref='user', cascade='all, delete')
    # likes = db.relationship('Like', backref='user', cascade='all, delete')
    # views = db.relationship('View', backref='user', cascade='all, delete')


class Tweet(db.Model):
    __tablename__ = 'tweets'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String, db.ForeignKey('users.user_id'), nullable=False)
    text_content = db.Column(db.Text, nullable=False)
    media_content = db.Column(db.Text)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.now)
    def to_json(self):
        return {
            'id': self.id,
            'user': {
                'id': self.user_id,
                'username': self.user.username
            },
            'text_content': self.text_content,
            'media_content': self.media_content,
            'created_at': self.created_at.ctime(),
        }


class Follower(db.Model):
    __tablename__ = 'followers'
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False)
    following_id = db.Column(db.Integer, db.ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False)
    followed_at = db.Column(db.DateTime(timezone=True), default=datetime.now)



class Reply(db.Model): # komment
    __tablename__ = 'replies'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False)
    tweet_id = db.Column(db.Integer, db.ForeignKey('tweets.id', ondelete='CASCADE'), nullable=False)
    text_content = db.Column(db.Text, nullable=False)
    media_content = db.Column(db.Text)
    replied_at = db.Column(db.DateTime(timezone=True), default=datetime.now)



class Retweet(db.Model):
    __tablename__ = 'retweets'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False)
    tweet_id = db.Column(db.Integer, db.ForeignKey('tweets.id', ondelete='CASCADE'), nullable=False)
    retweeted_at = db.Column(db.DateTime(timezone=True), default=datetime.now)



class Like(db.Model):
    __tablename__ = 'likes'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False)
    tweet_id = db.Column(db.Integer, db.ForeignKey('tweets.id', ondelete='CASCADE'), nullable=False)
    liked_at = db.Column(db.DateTime(timezone=True), default=datetime.now)



class View(db.Model):
    __tablename__ = 'views'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False)
    tweet_id = db.Column(db.Integer, db.ForeignKey('tweets.id', ondelete='CASCADE'), nullable=False)
    viewed_at = db.Column(db.DateTime(timezone=True), default=datetime.now)


