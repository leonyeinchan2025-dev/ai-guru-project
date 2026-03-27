# backend/models.py
# models.py ၏ အပေါ်ဆုံးတွင် ဤသို့ ရှိရပါမည်
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from datetime import datetime

from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    fullname = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    # ဤနေရာတွင် logic ပါဝင်ပါသည်
    is_approved = Column(Boolean, default=False) # Admin က True ပေးမှ Login ရမည်
    is_admin = Column(Boolean, default=False)

    # # 🌟 အသစ် ထပ်တိုးမည့် အကွက်များ 🌟
    # is_email_verified = Column(Boolean, default=False)  # Email အစစ်ဟုတ်မဟုတ်
    # verification_token = Column(String, nullable=True)  # Email ပို့မည့် လျှို့ဝှက်ကုဒ်

# Lesson Model တွင် file_url အသစ်ထည့်ပါမည် 👇
class Lesson(Base):
    __tablename__ = "lessons"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    content = Column(Text)
    category = Column(String)
    file_url = Column(String, nullable=True) # 🌟 ပုံ သို့မဟုတ် PDF လင့်ခ် သိမ်းရန်

# backend/models.py ၏ အောက်ဆုံးတွင် ထပ်ထည့်ရန်
from sqlalchemy import ForeignKey

class Progress(Base):
    __tablename__ = "progress"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    lesson_id = Column(Integer, ForeignKey("lessons.id"))

    from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from datetime import datetime
# (အပေါ်က import များ ရှိပြီးသားဆိုလျှင် ထပ်ထည့်ရန်မလိုပါ)

class Feedback(Base):
    __tablename__ = "feedbacks"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    rating = Column(Integer)
    comment = Column(Text)
    is_highlighted = Column(Boolean, default=False) # Admin မှ ပြန်ပြရန် ရွေးချယ်ထားခြင်း ရှိ/မရှိ
    created_at = Column(DateTime, default=datetime.utcnow)

class SiteStat(Base):
    __tablename__ = "site_stats"
    
    id = Column(Integer, primary_key=True, index=True)
    total_visits = Column(Integer, default=0)