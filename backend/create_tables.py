from sqlalchemy import create_engine
from models import metadata

DATABASE_URL = "postgresql://postgres:<132006>@localhost:5432/bragboard_db"

engine = create_engine(DATABASE_URL)

metadata.create_all(engine)
print("Tables created successfully")
