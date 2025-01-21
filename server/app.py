from flask import Flask, request, session, jsonify
from flask_restful import Resource
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_mail import Mail, Message
from models import User, db
from werkzeug.exceptions import BadRequest
from sqlalchemy.exc import IntegrityError
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Create Flask app with explicit instance path
app = Flask(__name__, instance_relative_config=True)
CORS(app)

# Create instance directory if it doesn't exist
instance_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'instance')
if not os.path.exists(instance_path):
    os.makedirs(instance_path)

# Configure SQLAlchemy with absolute path in instance folder
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(instance_path, 'yourdatabase.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Configure JWT
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
jwt = JWTManager(app)

# Email configuration
app.config['MAIL_SERVER'] = os.environ.get('MAIL_SERVER')
app.config['MAIL_PORT'] = int(os.environ.get('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.environ.get('MAIL_USE_TLS', 'True') == 'True'
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
app.config['ADMIN_EMAIL'] = os.environ.get('ADMIN_EMAIL')

# Initialize extensions
mail = Mail(app)
migrate = Migrate(app, db)
db.init_app(app)

app.config['SECRET_KEY'] = os.environ.get('FLASK_SECRET_KEY')

# Security Configuration
if not app.config['SECRET_KEY'] or not app.config['JWT_SECRET_KEY']:
    raise ValueError("Secret keys not set. Please check your .env file.")

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

# Admin Authentication Routes
@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    if not request.is_json:
        return jsonify({'error': 'Missing JSON in request'}), 400

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    # Hard-coded admin credentials
    ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL')
    ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD')
    
    # Enhanced debug logging
    print("Admin Login Attempt:")
    print(f"Received email: {email}")
    print(f"Expected admin email: {ADMIN_EMAIL}")
    print(f"Password provided: {'Yes' if password else 'No'}")
    print(f"Environment variables set - ADMIN_EMAIL: {'Yes' if ADMIN_EMAIL else 'No'}, ADMIN_PASSWORD: {'Yes' if ADMIN_PASSWORD else 'No'}")
    
    if not ADMIN_EMAIL or not ADMIN_PASSWORD:
        print("Error: Admin credentials not properly set in environment variables")
        return jsonify({'error': 'Server configuration error'}), 500
    
    if email == ADMIN_EMAIL and password == ADMIN_PASSWORD:
        access_token = create_access_token(identity=email)
        return jsonify({
            'token': access_token,
            'email': email,
            'isAdmin': True,
            'message': 'Login successful'
        }), 200
    
    # More specific error messages
    if email != ADMIN_EMAIL:
        print(f"Login failed: Invalid email provided")
        return jsonify({'error': 'Invalid email'}), 401
    
    print(f"Login failed: Invalid password provided")
    return jsonify({'error': 'Invalid password'}), 401

# Test route for email
@app.route('/api/test-email', methods=['GET'])
def test_email():
    try:
        msg = Message('Test Email',
                     sender=app.config['MAIL_USERNAME'],
                     recipients=[app.config['ADMIN_EMAIL']])
        
        msg.body = 'This is a test email from your Flask application.'
        mail.send(msg)
        return jsonify({'message': 'Test email sent successfully'}), 200
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': 'Failed to send test email'}), 500

# Newsletter subscription route
@app.route('/api/newsletter/subscribe', methods=['POST'])
def newsletter_subscribe():
    try:
        data = request.get_json()
        subscriber_email = data.get('email')
        
        if not subscriber_email:
            return jsonify({'error': 'Email is required'}), 400

        # Send email to admin
        msg = Message('New Newsletter Subscription',
                     sender=app.config['MAIL_USERNAME'],
                     recipients=[app.config['ADMIN_EMAIL']])
        
        msg.body = f'''New newsletter subscription from: {subscriber_email}
        
Subscription received on: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}'''
        
        mail.send(msg)
        
        # Send confirmation to subscriber
        confirm_msg = Message('NYGODDESSES Newsletter Subscription Confirmed',
                            sender=app.config['MAIL_USERNAME'],
                            recipients=[subscriber_email])
        
        confirm_msg.body = '''Welcome! We're thrilled to have you on board...'''  # Your existing message
        
        mail.send(confirm_msg)

        return jsonify({'message': 'Successfully subscribed to newsletter'}), 200

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': 'Failed to process subscription'}), 500

# User Authentication Routes
@app.post('/api/users')
def create_user():
    data = request.json
    required_fields = ['email', 'phone', 'firstName', 'lastName', 'password']
    for field in required_fields:
        if field not in data:
            return {"error": f"missing required field: {field}"}, 400
    
    try:
        new_user = User(
            first_name=data['firstName'],
            last_name=data['lastName'],
            email=data['email'],
            phone=data['phone'],
            password=data['password'] 
        )
        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id  
        return new_user.to_dict(rules=("-password_hash",)), 201
    
    except IntegrityError as e:
        db.session.rollback()
        if 'email' in str(e.orig) or 'phone' in str(e.orig):
            return {'error': 'Email or phone number already in use.'}, 400
        return {'error': str(e.orig)}, 400
    except Exception as e:
        return {'error': str(e)}, 400

@app.get('/api/check_session')
def check_session():
    user_id = session.get("user_id")
    user = User.query.filter_by(id=user_id).first()
    if user:
        return user.to_dict(), 200
    else:
        return {}, 204

@app.post('/api/login')
def login():
    data = request.json 
    user = User.query.filter_by(email=data.get('email')).first()
    
    if not user:
        return {"error": "Email not found"}, 404

    if user and user.authenticate(data.get('password')):
        session['user_id'] = user.id
        return user.to_dict(), 202
    else:
        return {"error": "Incorrect password"}, 401

@app.delete('/api/logout')
def logout():
    session.pop('user_id', None)
    return {}, 204

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5555))
    app.run(port=port, debug=True) 