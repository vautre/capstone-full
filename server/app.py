from flask import request, session, jsonify
from flask_restful import Resource
from config import app, db, api
from flask_migrate import Migrate
from models import User
from werkzeug.exceptions import BadRequest
from sqlalchemy.exc import IntegrityError

migrate = Migrate(app, db)

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


# Authentication and user login

@app.post('/api/users', methods=['POST'])
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
        db.session.rollback()  # Rollback the session in case of error
        # Handle duplicate email or phone errors
        if 'email' in str(e.orig) or 'phone' in str(e.orig):
            return {'error': 'Email or phone number already in use.'}, 400
        return {'error': str(e.orig)}, 400

    except BadRequest as e:
        # Handle invalid JSON or malformed requests
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
    session.pop('user_id', None)  # Remove user from session
    return {}, 204


if __name__ == '__main__':
    app.run(port=5555, debug=True)
