import secrets

# Generate two different secret keys
jwt_secret = secrets.token_hex(32)
flask_secret = secrets.token_hex(32)

print("\nAdd these lines to your .env file:\n")
print(f"JWT_SECRET_KEY={jwt_secret}")
print(f"FLASK_SECRET_KEY={flask_secret}")