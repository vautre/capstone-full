from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db, bcrypt
import re

class User(db.Model, SerializerMixin):
    __tablename__= 'users_table'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)  
    last_name = db.Column(db.String, nullable=False) 
    email = db.Column(db.String, unique=True, nullable=False)
    phone = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.String)
    
    # Serialization
    serialize_rules = ("-password_hash",)

    @property
    def password(self): 
        raise Exception("Passwords cannot be changed outside of the appropriate channels")
    
    @password.setter
    def password(self, value): 
        self.password_hash = bcrypt.generate_password_hash(value).decode('utf-8')

    def authenticate(self, user_password):
        return bcrypt.check_password_hash(self.password_hash, user_password)
    
    @validates('password')
    def validate_password(self, key, password):
        # Password validation criteria
        if len(password) < 8:
            raise ValueError("Password must be at least 8 characters long")
        if not re.search(r"[A-Z]", password):
            raise ValueError("Password must contain at least one uppercase letter")
        if not re.search(r"\d", password):
            raise ValueError("Password must contain at least one number")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
            raise ValueError("Password must contain at least one special character")
        return password

    @validates('email')
    def validate_email(self, key, email):
        if not re.match(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", email):
            raise ValueError("Invalid email format")
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            raise ValueError("Email address is already taken")
        return email
    
    @validates('phone')
    def validate_phone(self, key, phone):
        existing_user = User.query.filter_by(phone=phone).first()
        if existing_user:
            raise ValueError("Phone number is already taken")
        
        # Adjust phone validation to allow optional spaces, hyphens, or parentheses
        if not re.match(r"^(\+?\d{1,4}[-\s]?)?(\(?\d{1,3}\)?[-\s]?)?(\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,4})$", phone):
            raise ValueError("Invalid phone number format. It should contain 10 to 15 digits.")
    
        return phone
    
    def __repr__(self):
        return f"<User(id={self.id}, email={self.email}, phone={self.phone})>"
