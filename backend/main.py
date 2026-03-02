# backend/main.py

from fastapi import FastAPI, Depends, HTTPException, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
import os
import shutil
import models, schemas
from database import engine, get_db

# 🌟 အသစ်ပြင်ဆင်ထားသော Database ချိတ်ဆက်ခြင်း စနစ် 🌟
# Render ကပေးသော DATABASE_URL ကို အရင်ရှာမည်၊ မရှိမှသာ Localhost ကို သုံးမည်
SQLALCHEMY_DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql://postgres:YOUR_PASSWORD@localhost/aiguru_db" # သင့်မူလ localhost လင့်ခ်
)

# Render ၏ လင့်ခ်သည် postgres:// ဖြင့်စနေလျှင် SQLAlchemy အတွက် postgresql:// သို့ ပြောင်းပေးရမည်
if SQLALCHEMY_DATABASE_URL.startswith("postgresql://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Table များအားလုံးကို Database ထဲတွင် ဆောက်ခိုင်းခြင်း
models.Base.metadata.create_all(bind=engine)

app = FastAPI()
# CORS Middleware ထည့်သွင်းခြင်း
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # လက်တွေ့တွင် ["http://localhost:5173"] ဟု သတ်မှတ်သင့်သည်
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🌟 ဤ (၂) ကြောင်းသည် လွန်စွာအရေးကြီးပါသည်။ လုံခြုံရေးတံခါး ဖွင့်ပေးခြင်းဖြစ်သည် 🌟
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.get("/")
def root():
    return {"message": "AI GURU Backend is running!"}

# --- Register Logic ---
@app.post("/register")
def register_user(fullname: str, email: str, password: str, db: Session = Depends(get_db)):
    # Email ရှိပြီးသားလား စစ်ဆေးခြင်း
    db_user = db.query(models.User).filter(models.User.email == email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = models.User(fullname=fullname, email=email, password=password) # အစစ်အမှန်တွင် password ကို hash လုပ်ရပါမည်
    db.add(new_user)
    db.commit()
    return {"message": "Register အောင်မြင်ပါသည်။ Admin ၏ အတည်ပြုချက်ကို စောင့်ဆိုင်းပေးပါ။"}

# --- Login Logic ---
# backend/main.py မှ Login API အပိုင်း
@app.post("/login")
def login_user(email: str, password: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == email).first()
    
    if not user or user.password != password:
        raise HTTPException(status_code=401, detail="Email သို့မဟုတ် Password မှားယွင်းနေပါသည်။")
    
    if user.is_approved is not True:
        raise HTTPException(status_code=403, detail="သင်၏အကောင့်မှာ Admin အတည်ပြုချက် မရရှိသေးပါ။")
    
    # 🌟 Frontend ကို ပြန်ပို့မည့် Data တွင် is_admin ကိုပါ ထည့်ပို့ပါမည် 🌟
    return {
        "message": "Login အောင်မြင်ပါသည်", 
        "user_id": user.id, 
        "fullname": user.fullname,
        "is_admin": user.is_admin # <--- ဤစာကြောင်း အသစ်ထပ်ထည့်ပါ
    }

# --- 1. Admin က User ကို အတည်ပြုပေးသည့် API ---
@app.put("/admin/approve/{user_id}")
def approve_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User ရှာမတွေ့ပါ။")
    
    user.is_approved = True
    db.commit()
    return {"message": f"User {user.fullname} ကို အတည်ပြုပြီးပါပြီ။"}

# --- 2. သင်ခန်းစာများ (Lessons) ထည့်သည့် API (Admin သုံးရန်) ---
@app.post("/lessons")
def create_lesson(title: str, content: str, db: Session = Depends(get_db)):
    new_lesson = models.Lesson(title=title, content=content)
    db.add(new_lesson)
    db.commit()
    db.refresh(new_lesson)
    return {"message": "သင်ခန်းစာအသစ် ထည့်သွင်းပြီးပါပြီ။", "lesson": new_lesson}

# --- 3. သင်ခန်းစာများ အားလုံးကို ပြန်ထုတ်ပေးသည့် API (Login ဝင်ပြီးသူများသာ) ---
@app.get("/lessons")
def get_lessons(db: Session = Depends(get_db)):
    # ဤနေရာတွင် User သည် Approve ဖြစ်မဖြစ် စစ်ဆေးသည့် Logic ထပ်ထည့်ရပါမည်
    lessons = db.query(models.Lesson).all()
    return lessons

# 🌟 3. File နှင့်တကွ သင်ခန်းစာတင်မည့် API သစ် 🌟
# backend/main.py ထဲက အရင် upload-lesson API ကို ဖျက်ပြီး ဒါလေးနဲ့ အစားထိုးပါ

@app.post("/admin/upload-lesson")
def create_lesson_with_file(
    title: str = Form(...),
    content: str = Form(...),
    category: str = Form("General"),
    file: UploadFile = File(None), 
    db: Session = Depends(get_db)
):
    file_url = None
    
    # 🌟 ဖိုင်ပါလာပြီး ဖိုင်နာမည်လည်း ရှိမှသာ အလုပ်လုပ်မည် 🌟
    if file and file.filename:
        # ဖိုင်နာမည်တွင် Space (ကွက်လပ်) များပါပါက အောက်မျဉ်း (_) ဖြင့် အစားထိုးမည်
        safe_filename = file.filename.replace(" ", "_")
        file_path = f"uploads/{safe_filename}"
        
        try:
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            file_url = f"http://127.0.0.1:8000/uploads/{safe_filename}"
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"ဖိုင်သိမ်းဆည်းရာတွင် အမှားအယွင်းရှိပါသည်။: {str(e)}")

    new_lesson = models.Lesson(
        title=title, 
        content=content, 
        category=category, 
        file_url=file_url
    )
    db.add(new_lesson)
    db.commit()
    db.refresh(new_lesson)
    
    return {"message": "သင်ခန်းစာကို ဖိုင်နှင့်တကွ အောင်မြင်စွာ တင်ပြီးပါပြီ။", "data": new_lesson}
# --- User စီမံခန့်ခွဲမှု (Admin အတွက်) ---

# 1. User အားလုံးကို ကြည့်ရန်
@app.get("/admin/users")
def get_all_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

# 2. User အား ဖျက်ရန် (Delete Account)
@app.delete("/admin/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User ရှာမတွေ့ပါ။")
    
    db.delete(user)
    db.commit()
    return {"message": "User အား အောင်မြင်စွာ ဖျက်ပစ်လိုက်ပါပြီ။"}

# 3. သင်ခန်းစာ ဖျက်ရန် (Delete Lesson)
@app.delete("/admin/lessons/{lesson_id}")
def delete_lesson(lesson_id: int, db: Session = Depends(get_db)):
    lesson = db.query(models.Lesson).filter(models.Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="သင်ခန်းစာ ရှာမတွေ့ပါ။")
    
    db.delete(lesson)
    db.commit()
    return {"message": "သင်ခန်းစာအား ဖျက်ပစ်လိုက်ပါပြီ။"}

# --- သင်ခန်းစာ တစ်ခုတည်းကို ရယူမည့် API ---
@app.get("/lessons/{lesson_id}")
def get_lesson(lesson_id: int, db: Session = Depends(get_db)):
    lesson = db.query(models.Lesson).filter(models.Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="သင်ခန်းစာ ရှာမတွေ့ပါ။")
    return lesson

# --- သင်ခန်းစာ ပြင်ဆင်ရန် (Edit Lesson) ---
@app.put("/admin/lessons/{lesson_id}")
def update_lesson(
    lesson_id: int,
    title: str = Form(...),
    content: str = Form(...),
    category: str = Form("General"),
    file: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    lesson = db.query(models.Lesson).filter(models.Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="သင်ခန်းစာ ရှာမတွေ့ပါ။")

    # အချက်အလက်သစ်များဖြင့် အစားထိုးခြင်း
    lesson.title = title
    lesson.content = content
    lesson.category = category

    # ဖိုင်အသစ် ထပ်တင်ခဲ့လျှင် URL အဟောင်းကို ဖျက်ပြီး အသစ်ဖြင့် အစားထိုးမည်
    if file and file.filename:
        safe_filename = file.filename.replace(" ", "_")
        file_path = f"uploads/{safe_filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        lesson.file_url = f"http://127.0.0.1:8000/uploads/{safe_filename}"

    db.commit()
    db.refresh(lesson)
    return {"message": "သင်ခန်းစာ အောင်မြင်စွာ ပြင်ဆင်ပြီးပါပြီ။", "data": lesson}

# backend/main.py ၏ အောက်ဆုံးတွင် ထပ်ထည့်ရန်

# 1. သင်ခန်းစာ ပြီးဆုံးကြောင်း မှတ်သားရန် API
@app.post("/progress/complete")
def complete_lesson(user_id: int, lesson_id: int, db: Session = Depends(get_db)):
    # ယခင်က မှတ်ပြီးသား ရှိ/မရှိ စစ်ဆေးမည်
    existing = db.query(models.Progress).filter(
        models.Progress.user_id == user_id, 
        models.Progress.lesson_id == lesson_id
    ).first()
    
    if not existing:
        new_progress = models.Progress(user_id=user_id, lesson_id=lesson_id)
        db.add(new_progress)
        db.commit()
    
    return {"message": "သင်ခန်းစာ ပြီးဆုံးကြောင်း မှတ်သားပြီးပါပြီ။"}

# 2. User တစ်ယောက်၏ ပြီးဆုံးသွားသော သင်ခန်းစာ ID များကို ဆွဲယူရန် API
@app.get("/progress/{user_id}")
def get_user_progress(user_id: int, db: Session = Depends(get_db)):
    completed_lessons = db.query(models.Progress).filter(models.Progress.user_id == user_id).all()
    # ပြီးသွားသော Lesson ID များကိုသာ Array အနေဖြင့် ပြန်ပို့မည် (ဥပမာ: [1, 2, 5])
    return [p.lesson_id for p in completed_lessons]