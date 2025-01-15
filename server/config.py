# config.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_restful import Api
from flask_migrate import Migrate


app = Flask(__name__)

# Secret key and database URI (make sure these are set)
app.config['SECRET_KEY'] = 'your_secret_key_here'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///yourdatabase.db'  # Example for SQLite
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy and Bcrypt
db = SQLAlchemy(app)  # Only initialize once here
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)

# Initialize Flask-RESTful API
api = Api(app)

# Make sure to import these in app.py or models.py, but don't initialize them again!
