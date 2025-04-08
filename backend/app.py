from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
# PostgreSQL URL config: (username, password, host, port, dbname)
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost:5432/twitter_clone'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from routes import *
with app.app_context():
    db.create_all()


if __name__ == '__main__':
    app.run(debug=True)

