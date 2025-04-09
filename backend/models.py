from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.Text, nullable=False)
    full_name = db.Column(db.String(100))
    bio = db.Column(db.Text)
    profile_image_url = db.Column(db.Text)
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
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    text_content = db.Column(db.Text, nullable=False)
    media_content = db.Column(db.Text)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.now)
    __table_args__ = (
        db.CheckConstraint('char_length(text_content) <= 280'),
    )

    # replies = db.relationship('Reply', backref='tweet', cascade='all, delete')
    # retweets = db.relationship('Retweet', backref='tweet', cascade='all, delete')
    # likes = db.relationship('Like', backref='tweet', cascade='all, delete')
    # views = db.relationship('View', backref='tweet', cascade='all, delete')


class Follower(db.Model):
    __tablename__ = 'followers'
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    following_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    followed_at = db.Column(db.DateTime(timezone=True), default=datetime.now)

    # __table_args__ = (
    #     db.UniqueConstraint('follower_id', 'following_id'),
    #     db.CheckConstraint('follower_id <> following_id'),
    # )


class Reply(db.Model):
    __tablename__ = 'replies'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    tweet_id = db.Column(db.Integer, db.ForeignKey('tweets.id', ondelete='CASCADE'), nullable=False)
    text_content = db.Column(db.Text, nullable=False)
    media_content = db.Column(db.Text)
    replied_at = db.Column(db.DateTime(timezone=True), default=datetime.now)

    # __table_args__ = (
    #     db.CheckConstraint('char_length(text_content) <= 280'),
    # )


class Retweet(db.Model):
    __tablename__ = 'retweets'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    tweet_id = db.Column(db.Integer, db.ForeignKey('tweets.id', ondelete='CASCADE'), nullable=False)
    retweeted_at = db.Column(db.DateTime(timezone=True), default=datetime.now)

    # __table_args__ = (
    #     db.UniqueConstraint('user_id', 'tweet_id'),
    # )


class Like(db.Model):
    __tablename__ = 'likes'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    tweet_id = db.Column(db.Integer, db.ForeignKey('tweets.id', ondelete='CASCADE'), nullable=False)
    liked_at = db.Column(db.DateTime(timezone=True), default=datetime.now)

    # __table_args__ = (
    #     db.UniqueConstraint('user_id', 'tweet_id'),
    # )


class View(db.Model):
    __tablename__ = 'views'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    tweet_id = db.Column(db.Integer, db.ForeignKey('tweets.id', ondelete='CASCADE'), nullable=False)
    viewed_at = db.Column(db.DateTime(timezone=True), default=datetime.now)

    # Agar har bir user bir tweetni faqat bir marta ko'radi:
    # __table_args__ = (db.UniqueConstraint('user_id', 'tweet_id'),)


class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    members = db.relationship('User', secondary='group_members')

class GroupMembers(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'), primary_key=True)

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'), nullable=True)
    content = db.Column(db.Text, nullable=True)
    media_url = db.Column(db.String(200), nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    is_read = db.Column(db.Boolean, default=False)
    deleted_for = db.Column(db.String(200), default='')
