from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO  # SocketIO ni boshida import qilamiz

app = Flask(__name__)
CORS(app)  # HTTP so‘rovlar uchun CORS
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'uploads'

db = SQLAlchemy(app)
socketio = SocketIO(app, cors_allowed_origins="*")  # Faqat bitta socketio obyekti

# Route’lar va modellar import qilinadi
from routes import *
from models import *


with app.app_context():
    db.create_all()

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5051, debug=True)
