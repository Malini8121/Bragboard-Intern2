from fastapi import APIRouter, HTTPException, status
import logging
import traceback
from schemas import UserCreate  # or the appropriate schema name


router = APIRouter()

@router.post("/auth/register")
async def register_user(user: UserCreate):
    try:
        # Your registration logic here
        # For example:
        # create_user_in_db(user)
        return {"message": "User registered successfully"}
    except Exception as e:
        # Log the exception stack trace but don't raise an HTTP error to expose details
        logging.error(f"Registration error: {traceback.format_exc()}")

        # Raise HTTPException with 500 but generic message for client
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal Server Error"
        )
