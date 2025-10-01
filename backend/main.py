
from fastapi import FastAPI, Depends, HTTPException
from database import session, engine
from database_models import Base
from sqlalchemy.orm import Session
from routers import auth
import database_models
from fastapi.middleware.cors import CORSMiddleware

origins = ["http://localhost:3000"]

app = FastAPI()

database_models.Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth")