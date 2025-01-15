from flask import request, session, jsonify
from flask_restful import Resource
from config import app, db, api
from flask_migrate import Migrate
from models import User
from werkzeug.exceptions import BadRequest
from sqlalchemy.exc import IntegrityError
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_mail import Mail, Message
from os import environ
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

# Email configuration
app.config['MAIL_SERVER'] = environ.get('MAIL_SERVER')
app.config['MAIL_PORT'] = int(environ.get('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = environ.get('MAIL_USE_TLS', 'True') == 'True'
app.config['MAIL_USERNAME'] = environ.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = environ.get('MAIL_PASSWORD')
app.config['ADMIN_EMAIL'] = environ.get('ADMIN_EMAIL')

mail = Mail(app)
CORS(app)
migrate = Migrate(app, db)

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

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
        
        confirm_msg.body = '''Welcome! We're thrilled to have you on board as a subscriber to the NYGODDESSES newsletter. You’ll soon receive updates on our exciting events, special promotions, and exclusive offers – all designed to help you make the most of our services.

Here's a quick preview of what’s coming your way:
* Event Announcements: Be the first to know about upcoming events and activities.
* Exclusive Promotions: Access special deals and offers available only to our subscribers.
* Engaging Content: Get the latest industry insights and tips delivered right to your inbox.

Thank you once again for joining our community – we’re thrilled to have you with us!

Warm regards,
Joyce Sheng
Vice President | NYGODDESSES
nygcpr@gmail.com
[Social Media Links]'''
        
        mail.send(confirm_msg)

        return jsonify({'message': 'Successfully subscribed to newsletter'}), 200

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': 'Failed to process subscription'}), 500

# Authentication and user login
@app.post('/api/users')
def create_user():
    data = request.json
    required_fields = ['email', 'phone', 'firstName', 'lastName', 'password']
    for field in required_fields:
        if field not in data:
            return {"error": f"missing required field: {field}"}, 400
    
    # Validate password criteria
    try:
        # Password validation happens here
        password = data.get('password')
        if len(password) < 8:
            return {"error": "Password must be at least 8 characters long."}, 400
        if not any(char.isupper() for char in password):
            return {"error": "Password must contain at least one uppercase letter."}, 400
        if not any(char.isdigit() for char in password):
            return {"error": "Password must contain at least one number."}, 400
        if not any(char in "!@#$%^&*(),.?\":{}|<>" for char in password):
            return {"error": "Password must contain at least one special character."}, 400

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

    except BadRequest as e:
        return {'error': 'Bad request. Please check your input.'}, 400
    
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
    port = int(environ.get('PORT', 5555))  # Using your original port 5555
    app.run(port=port, debug=True) 