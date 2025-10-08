# INSIDE backend/schemas.py (Correct Order)

from pydantic import BaseModel, EmailStr
# ... other imports ...

# 1. Base Class
class UserBase(BaseModel):
    # ... fields like email, name, department ...
    pass

# 2. Input/Creation Class
class UserCreate(UserBase):
    password: str

# 3. Output/API Class (MUST BE DEFINED HERE)
class User(UserBase):
    id: int
    # ... any other fields not in Base (like role)
    
    class Config:
        from_attributes = True 

# 4. Database Class (CAN NOW INHERIT FROM User)
class UserInDB(User):
    # This inherits all fields from User, and adds or redefines the password field
    password: str # This is the HASHED password
class Token(BaseModel):
    """Schema for the access token returned on successful login."""
    access_token: str
    token_type: str = "bearer"    