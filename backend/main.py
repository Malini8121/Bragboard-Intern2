
from fastapi import FastAPI, Depends, HTTPException
from backend.database import session, engine
from backend import database_models
from sqlalchemy.orm import Session
from backend.routers import auth
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