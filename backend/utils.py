import os
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
# INSIDE backend/utils.py (Only if you need to hash passwords here)
from backend.security import get_password_hash
# ... and remove verify_password from utils.py if it was still there

# --- Configuration (MUST MATCH YOUR .env) ---
# Load these variables from your .env file
SECRET_KEY = os.getenv("SECRET_KEY", "your-fallback-secret-key-insecure")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30 

# Define the OAuth2 scheme (FastAPI's standard way to handle tokens)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# Import database dependencies and User model from sister files
from .database import get_db 
from .database_models import User 

# --- Functions for JWT Creation and Decoding ---

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Creates a JWT access token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str, credentials_exception):
    """Verifies a JWT token's validity and returns the payload (user_id)."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        return user_id
    except JWTError:
        raise credentials_exception

# --- FastAPI Dependency (CRITICAL FIX for ImportError) ---

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """
    Dependency that retrieves the current authenticated User ORM object from the token.
    This is the function that was missing, causing the 'cannot import name' error.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    user_id = verify_token(token, credentials_exception)
    
    # Query DB to get the full user object (required by read_users_me endpoint)
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise credentials_exception
        
    return user
