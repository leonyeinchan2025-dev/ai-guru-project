from fastapi import FastAPI, Depends, HTTPException, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from pydantic import BaseModel  # 🌟 ဤစာကြောင်း အသစ်ပါလာရပါမည်
import os
import shutil
import models, schemas
from database import engine, get_db

# Database Table များဖန်တီးခြင်း
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Render နှင့် Vercel ချိတ်ဆက်နိုင်ရန် CORS သတ်မှတ်ခြင်း
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ဖိုင်တင်ရန် Folder ဆောက်ခြင်း
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

@app.get("/")
def root():
    return {"message": "AI GURU Backend is running!"}

# 🌟 JSON လက်ခံရန် Class များ တည်ဆောက်ခြင်း 🌟
class UserRegister(BaseModel):
    fullname: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class RoleUpdate(BaseModel):
    is_admin: bool
# --- 🔐 Authentication (Register & Login) ---

@app.post("/register")
def register_user(user: UserRegister, db: Session = Depends(get_db)):
    # 🌟 ၁။ Email အစစ်အမှန် ဟုတ်/မဟုတ် စစ်ဆေးခြင်း
    valid_domains = ["@gmail.com", "@yahoo.com", "@outlook.com"]
    if not any(user.email.endswith(domain) for domain in valid_domains):
        raise HTTPException(status_code=400, detail="ကျေးဇူးပြု၍ @gmail.com ကဲ့သို့သော အီးမေးလ် အစစ်အမှန်ကိုသာ အသုံးပြုပါ။")

    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="ဤ Email မှာ စာရင်းသွင်းပြီးသား ဖြစ်နေပါသည်။")
    
    # 🌟 ၂။ User အသစ်ကို အလိုအလျောက် ဝင်ခွင့်မပေးတော့ပါ (False သတ်မှတ်ထားသည်)
    new_user = models.User(
        fullname=user.fullname, 
        email=user.email, 
        password=user.password, 
        is_approved=False,  # <--- ဒီနေရာကို False ပြောင်းလိုက်ပါပြီ
        is_admin=False      # <--- ဒီနေရာကို False ပြောင်းလိုက်ပါပြီ
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "Register အောင်မြင်ပါသည်။ Admin ၏ အတည်ပြုချက်ကို ခေတ္တစောင့်ဆိုင်းပေးပါ။\n\nဆက်သွယ်ရန် Hot Line (Admin) Call and Viber: +959444445546"}

@app.post("/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or db_user.password != user.password:
        raise HTTPException(status_code=401, detail="Email သို့မဟုတ် Password မှားယွင်းနေပါသည်။")
    
    if not db_user.is_approved:
        raise HTTPException(status_code=403, detail="သင်၏အကောင့်မှာ Admin အတည်ပြုချက် မရရှိသေးပါ။\n\nဆက်သွယ်ရန် Hot Line (Admin) Call and Viber: +959444445546")
    
    return {
        "message": "Login အောင်မြင်ပါသည်", 
        "user_id": db_user.id, 
        "fullname": db_user.fullname,
        "is_admin": db_user.is_admin
    }

# --- 🛠️ Admin Controls (Users) ---

@app.get("/admin/users")
def get_all_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

@app.put("/admin/approve/{user_id}")
def approve_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User ရှာမတွေ့ပါ။")
    user.is_approved = True
    db.commit()
    return {"message": f"User {user.fullname} ကို အတည်ပြုပြီးပါပြီ။"}

@app.delete("/admin/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User ရှာမတွေ့ပါ။")
    db.delete(user)
    db.commit()
    return {"message": "User ကို ဖျက်ပစ်လိုက်ပါပြီ။"}

@app.put("/admin/users/{user_id}/role")
def update_user_role(user_id: int, role_data: RoleUpdate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User ရှာမတွေ့ပါ။")
    
    user.is_admin = role_data.is_admin
    db.commit()
    return {"message": "ရာထူး အောင်မြင်စွာ ပြောင်းလဲပြီးပါပြီ။"}

# --- 📚 Lessons Management ---

@app.post("/admin/upload-lesson")
def create_lesson(
    title: str = Form(...),
    content: str = Form(...),
    category: str = Form("General"),
    file: UploadFile = File(None), 
    db: Session = Depends(get_db)
):
    file_url = None
    if file and file.filename:
        safe_filename = f"{os.urandom(8).hex()}_{file.filename.replace(' ', '_')}"
        file_path = os.path.join(UPLOAD_DIR, safe_filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        file_url = f"/uploads/{safe_filename}"

    new_lesson = models.Lesson(title=title, content=content, category=category, file_url=file_url)
    db.add(new_lesson)
    db.commit()
    db.refresh(new_lesson)
    return {"message": "သင်ခန်းစာ တင်ပြီးပါပြီ။", "data": new_lesson}

@app.get("/lessons")
def get_lessons(db: Session = Depends(get_db)):
    return db.query(models.Lesson).all()

@app.get("/lessons/{lesson_id}")
def get_lesson(lesson_id: int, db: Session = Depends(get_db)):
    lesson = db.query(models.Lesson).filter(models.Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="သင်ခန်းစာ ရှာမတွေ့ပါ။")
    return lesson

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

    lesson.title = title
    lesson.content = content
    lesson.category = category

    if file and file.filename:
        safe_filename = f"{os.urandom(8).hex()}_{file.filename.replace(' ', '_')}"
        file_path = os.path.join(UPLOAD_DIR, safe_filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        lesson.file_url = f"/uploads/{safe_filename}"

    db.commit()
    return {"message": "ပြင်ဆင်မှု အောင်မြင်ပါသည်။"}

@app.delete("/admin/lessons/{lesson_id}")
def delete_lesson(lesson_id: int, db: Session = Depends(get_db)):
    lesson = db.query(models.Lesson).filter(models.Lesson.id == lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="သင်ခန်းစာ ရှာမတွေ့ပါ။")
    db.delete(lesson)
    db.commit()
    return {"message": "ဖျက်ပစ်လိုက်ပါပြီ။"}

# --- 📊 Progress Tracking ---

@app.post("/progress/complete")
def complete_lesson(user_id: int, lesson_id: int, db: Session = Depends(get_db)):
    existing = db.query(models.Progress).filter(
        models.Progress.user_id == user_id, 
        models.Progress.lesson_id == lesson_id
    ).first()
    if not existing:
        new_progress = models.Progress(user_id=user_id, lesson_id=lesson_id)
        db.add(new_progress)
        db.commit()
    return {"message": "သင်ခန်းစာ ပြီးမြောက်ကြောင်း မှတ်သားပြီးပါပြီ။"}

@app.get("/progress/{user_id}")
def get_user_progress(user_id: int, db: Session = Depends(get_db)):
    completed = db.query(models.Progress).filter(models.Progress.user_id == user_id).all()
    return [p.lesson_id for p in completed]

# --- ⚡ Emergency Tools ---

@app.get("/force-admin")
def force_admin(email: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == email).first()
    if user:
        user.is_admin = True
        user.is_approved = True
        db.commit()
        return {"message": f"{email} ကို Admin အဖြစ် သတ်မှတ်ပြီးပါပြီ။"}
    return {"error": "User ရှာမတွေ့ပါ။"}

# # backend/main.py

# from fastapi import FastAPI, Depends, HTTPException, File, UploadFile, Form
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.staticfiles import StaticFiles
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker
# from sqlalchemy.ext.declarative import declarative_base
# import os
# import shutil
# import models, schemas
# from database import engine, get_db

# # --- 🌟 1. Database URL ဖြေရှင်းခြင်း 🌟 ---
# SQLALCHEMY_DATABASE_URL = os.getenv(
#     "DATABASE_URL", 
#     "postgresql://leonyein:0qhFVHMIqh8Fh7wxUiPlCZixe5R5JQEM@dpg-d6im26cr85hc7381cd10-a/aigurudb" # သင့်မူလ localhost လင့်ခ်
# )

# if SQLALCHEMY_DATABASE_URL and SQLALCHEMY_DATABASE_URL.startswith("postgres://"):
#     SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace("postgres://", "postgresql://", 1)

# engine = create_engine(SQLALCHEMY_DATABASE_URL)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# Base = declarative_base()

# models.Base.metadata.create_all(bind=engine)

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"], 
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# os.makedirs("uploads", exist_ok=True)
# app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# @app.get("/")
# def root():
#     return {"message": "AI GURU Backend is running!"}

# # --- Register & Login ---
# # @app.post("/register")
# # def register_user(fullname: str, email: str, password: str, db: Session = Depends(get_db)):
# #     db_user = db.query(models.User).filter(models.User.email == email).first()
# #     if db_user:
# #         raise HTTPException(status_code=400, detail="Email already registered")
    
# #     new_user = models.User(fullname=fullname, email=email, password=password)
# #     db.add(new_user)
# #     db.commit()
# #     return {"message": "Register အောင်မြင်ပါသည်။ Admin ၏ အတည်ပြုချက်ကို စောင့်ဆိုင်းပေးပါ။"}

# @app.post("/register")
# def register_user(fullname: str, email: str, password: str, db: Session = Depends(get_db)):
#     new_user = models.User(fullname=fullname, email=email, password=password, is_approved=True, is_admin=True) # အားလုံးကို True ပေးထားသည်
#     db.add(new_user)
#     db.commit()
#     return {"message": "Admin အကောင့် ဆောက်ပြီးပါပြီ"}

# @app.post("/login")
# def login_user(email: str, password: str, db: Session = Depends(get_db)):
#     user = db.query(models.User).filter(models.User.email == email).first()
#     if not user or user.password != password:
#         raise HTTPException(status_code=401, detail="Email သို့မဟုတ် Password မှားယွင်းနေပါသည်။")
#     # if user.is_approved is not True:
#         # raise HTTPException(status_code=403, detail="သင်၏အကောင့်မှာ Admin အတည်ပြုချက် မရရှိသေးပါ။")
    
#     return {
#         "message": "Login အောင်မြင်ပါသည်", 
#         "user_id": user.id, 
#         "fullname": user.fullname,
#         "is_admin": user.is_admin
#     }

# # --- Admin Controls ---
# @app.put("/admin/approve/{user_id}")
# def approve_user(user_id: int, db: Session = Depends(get_db)):
#     user = db.query(models.User).filter(models.User.id == user_id).first()
#     if not user:
#         raise HTTPException(status_code=404, detail="User ရှာမတွေ့ပါ။")
#     user.is_approved = True
#     db.commit()
#     return {"message": f"User {user.fullname} ကို အတည်ပြုပြီးပါပြီ။"}

# @app.get("/admin/users")
# def get_all_users(db: Session = Depends(get_db)):
#     return db.query(models.User).all()

# @app.delete("/admin/users/{user_id}")
# def delete_user(user_id: int, db: Session = Depends(get_db)):
#     user = db.query(models.User).filter(models.User.id == user_id).first()
#     if not user:
#         raise HTTPException(status_code=404, detail="User ရှာမတွေ့ပါ။")
#     db.delete(user)
#     db.commit()
#     return {"message": "User အား အောင်မြင်စွာ ဖျက်ပစ်လိုက်ပါပြီ။"}

# # --- 🌟 2. Upload API: Localhost အစား Relative Path ဖြင့် သိမ်းခြင်း 🌟 ---
# @app.post("/admin/upload-lesson")
# def create_lesson_with_file(
#     title: str = Form(...),
#     content: str = Form(...),
#     category: str = Form("General"),
#     file: UploadFile = File(None), 
#     db: Session = Depends(get_db)
# ):
#     file_url = None
#     if file and file.filename:
#         safe_filename = file.filename.replace(" ", "_")
#         file_path = f"uploads/{safe_filename}"
#         try:
#             with open(file_path, "wb") as buffer:
#                 shutil.copyfileobj(file.file, buffer)
#             # ⚠️ ဒီနေရာကို ပြင်ထားပါသည်: http://127.0.0.1... မဟုတ်တော့ပါ
#             file_url = f"/uploads/{safe_filename}"
#         except Exception as e:
#             raise HTTPException(status_code=500, detail=f"ဖိုင်သိမ်းဆည်းရာတွင် အမှားအယွင်းရှိပါသည်။: {str(e)}")

#     new_lesson = models.Lesson(title=title, content=content, category=category, file_url=file_url)
#     db.add(new_lesson)
#     db.commit()
#     db.refresh(new_lesson)
#     return {"message": "သင်ခန်းစာကို ဖိုင်နှင့်တကွ အောင်မြင်စွာ တင်ပြီးပါပြီ။", "data": new_lesson}

# # --- 🌟 3. Edit API: Localhost အစား Relative Path ဖြင့် ပြင်ခြင်း 🌟 ---
# @app.put("/admin/lessons/{lesson_id}")
# def update_lesson(
#     lesson_id: int,
#     title: str = Form(...),
#     content: str = Form(...),
#     category: str = Form("General"),
#     file: UploadFile = File(None),
#     db: Session = Depends(get_db)
# ):
#     lesson = db.query(models.Lesson).filter(models.Lesson.id == lesson_id).first()
#     if not lesson:
#         raise HTTPException(status_code=404, detail="သင်ခန်းစာ ရှာမတွေ့ပါ။")

#     lesson.title = title
#     lesson.content = content
#     lesson.category = category

#     if file and file.filename:
#         safe_filename = file.filename.replace(" ", "_")
#         file_path = f"uploads/{safe_filename}"
#         with open(file_path, "wb") as buffer:
#             shutil.copyfileobj(file.file, buffer)
#         # ⚠️ ဒီနေရာကို ပြင်ထားပါသည်
#         lesson.file_url = f"/uploads/{safe_filename}"

#     db.commit()
#     db.refresh(lesson)
#     return {"message": "သင်ခန်းစာ အောင်မြင်စွာ ပြင်ဆင်ပြီးပါပြီ။", "data": lesson}

# # --- Lessons Read/Delete ---
# @app.get("/lessons")
# def get_lessons(db: Session = Depends(get_db)):
#     return db.query(models.Lesson).all()

# # 🌟 ဤအောက်ပိုင်းမှစ၍ အောက်ဆုံးအထိ သေချာစွာ အစားထိုးပါ 🌟
# @app.get("/lessons/{lesson_id}")
# def get_lesson(lesson_id: int, db: Session = Depends(get_db)):
#     lesson = db.query(models.Lesson).filter(models.Lesson.id == lesson_id).first()
#     if not lesson:
#         raise HTTPException(status_code=404, detail="သင်ခန်းစာ ရှာမတွေ့ပါ။")
#     return lesson

# @app.delete("/admin/lessons/{lesson_id}")
# def delete_lesson(lesson_id: int, db: Session = Depends(get_db)):
#     lesson = db.query(models.Lesson).filter(models.Lesson.id == lesson_id).first()
#     if not lesson:
#         raise HTTPException(status_code=404, detail="သင်ခန်းစာ ရှာမတွေ့ပါ။")
#     db.delete(lesson)
#     db.commit()
#     return {"message": "သင်ခန်းစာအား ဖျက်ပစ်လိုက်ပါပြီ။"}

# # --- Progress Tracking ---
# @app.post("/progress/complete")
# def complete_lesson(user_id: int, lesson_id: int, db: Session = Depends(get_db)):
#     existing = db.query(models.Progress).filter(
#         models.Progress.user_id == user_id, 
#         models.Progress.lesson_id == lesson_id
#     ).first()
    
#     if not existing:
#         new_progress = models.Progress(user_id=user_id, lesson_id=lesson_id)
#         db.add(new_progress)
#         db.commit()
#     return {"message": "သင်ခန်းစာ ပြီးဆုံးကြောင်း မှတ်သားပြီးပါပြီ။"}

# @app.get("/progress/{user_id}")
# def get_user_progress(user_id: int, db: Session = Depends(get_db)):
#     completed_lessons = db.query(models.Progress).filter(models.Progress.user_id == user_id).all()
#     return [p.lesson_id for p in completed_lessons]

# @app.get("/force-admin")
# def force_admin(email: str, db: Session = Depends(get_db)):
#     user = db.query(models.User).filter(models.User.email == email).first()
#     if user:
#         user.is_admin = True
#         user.is_approved = True
#         db.commit()
#         return {"message": f"{email} is now Admin!"}
#     return {"error": "User not found"}