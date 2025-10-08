import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

engine = None
SessionLocal = None

def initialize_db():
    global engine, SessionLocal
    DATABASE_URL = os.getenv('DATABASE_URL')
    if not DATABASE_URL:
        DATABASE_URL = "sqlite:///./temp_fallback.db"
    connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
    engine = create_engine(DATABASE_URL, connect_args=connect_args,echo=True)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_engine():
    if engine is None:
        raise Exception("Database engine not initialized. Call initialize_db() first.")
    return engine

def get_db():
    if SessionLocal is None:
        raise Exception("Database not initialized. Call initialize_db() first.")
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
