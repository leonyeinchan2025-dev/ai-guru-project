# # backend/database.py
# from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker

# # မိမိ၏ PostgreSQL အချက်အလက်များဖြင့် လဲလှယ်ပါ
# SQLALCHEMY_DATABASE_URL = "postgresql://postgres:admin123@localhost:5432/postgres"

# engine = create_engine(SQLALCHEMY_DATABASE_URL)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base = declarative_base()

# # Database Session ရယူရန် Function
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Render ၏ Database ကို အသုံးပြုမည်
SQLALCHEMY_DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://leonyein:0qhFVHMIqh8Fh7wxUiPlCZixe5R5JQEM@dpg-d6im26cr85hc7381cd10-a/aigurudb"
)

# Render ၏ လင့်ခ်သည် postgres:// ဖြင့်စနေလျှင် SQLAlchemy အတွက် postgresql:// သို့ ပြောင်းပေးရမည်
if SQLALCHEMY_DATABASE_URL and SQLALCHEMY_DATABASE_URL.startswith("postgres://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# DB Session ကို ခေါ်သုံးရန် Dependency Function
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()