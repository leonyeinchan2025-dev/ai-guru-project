# backend/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# မိမိ၏ PostgreSQL အချက်အလက်များဖြင့် လဲလှယ်ပါ
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:admin123@localhost:5432/postgres"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Database Session ရယူရန် Function
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()