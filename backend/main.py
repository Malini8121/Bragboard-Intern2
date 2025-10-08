from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from backend.database import initialize_db, get_engine
from backend.database_models import Base
from backend.routers import auth

load_dotenv()

initialize_db()  # Initialize the database and set engine and SessionLocal

engine = get_engine()  # Get the initialized engine instance

Base.metadata.create_all(bind=engine)  # Create tables now that engine is valid

app = FastAPI()




origins = ["http://192.168.1.100:3005","http://localhost:3005"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth")
