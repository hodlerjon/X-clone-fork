from app import db
from datetime import datetime


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

    # tweets = db.relationship('Tweet', backref='user', cascade='all, delete')
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
    # __table_args__ = (
    #     db.CheckConstraint('char_length(text_content) <= 280'),
    # )

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


