from backend import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
db = SQLAlchemy()
# PostgreSQL URL config: (username, password, host, port, dbname)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:password@localhost:5432/twitter_clone'
db.init_app(app)

