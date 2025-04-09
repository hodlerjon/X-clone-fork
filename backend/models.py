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


class Follower(db.Model):
    __tablename__ = 'followers'
    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    following_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    followed_at = db.Column(db.DateTime(timezone=True), default=datetime.now)


class Reply(db.Model):
    __tablename__ = 'replies'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    tweet_id = db.Column(db.Integer, db.ForeignKey('tweets.id', ondelete='CASCADE'), nullable=False)
    text_content = db.Column(db.Text, nullable=False)
    media_content = db.Column(db.Text)
    replied_at = db.Column(db.DateTime(timezone=True), default=datetime.now)


class Retweet(db.Model):
    __tablename__ = 'retweets'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    tweet_id = db.Column(db.Integer, db.ForeignKey('tweets.id', ondelete='CASCADE'), nullable=False)
    retweeted_at = db.Column(db.DateTime(timezone=True), default=datetime.now)


class Like(db.Model):
    __tablename__ = 'likes'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    tweet_id = db.Column(db.Integer, db.ForeignKey('tweets.id', ondelete='CASCADE'), nullable=False)
    liked_at = db.Column(db.DateTime(timezone=True), default=datetime.now)


class View(db.Model):
    __tablename__ = 'views'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    tweet_id = db.Column(db.Integer, db.ForeignKey('tweets.id', ondelete='CASCADE'), nullable=False)
    viewed_at = db.Column(db.DateTime(timezone=True), default=datetime.now)


class Group(db.Model):
    __tablename__ = 'groups'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    members = db.relationship('User', secondary='group_members')


class GroupMembers(db.Model):
    __tablename__ = 'group_members'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'),
                         primary_key=True)


class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'),
                         nullable=True)
    content = db.Column(db.Text, nullable=True)
    media_url = db.Column(db.String(200), nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    is_read = db.Column(db.Boolean, default=False)
    deleted_for = db.Column(db.String(200), default='')


class Reaction(db.Model):
    __tablename__ = 'reactions'
    id = db.Column(db.Integer, primary_key=True)
    message_id = db.Column(db.Integer, db.ForeignKey('messages.id'),
                           nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    emoji = db.Column(db.String(10), nullable=False)


class Block(db.Model):
    __tablename__ = 'blocks'
    id = db.Column(db.Integer, primary_key=True)
    blocker_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    blocked_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)