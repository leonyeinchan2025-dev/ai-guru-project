from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from pydantic import BaseModel
from typing import List
from fastapi import FastAPI, Depends, HTTPException


# ခုနက Google မှ ရလာသော Client ID ကို ဤနေရာတွင် ထည့်ပါ
GOOGLE_CLIENT_ID = "768463165065-2uc4qbiv82rricq9s1vdms3ek5mcn11j.apps.googleusercontent.com"

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

class GoogleToken(BaseModel):
    token: str

@app.post("/google-login")
def google_login(token_data: GoogleToken, db: Session = Depends(get_db)):
    try:
        # Google မှ လာသော Token မှန်/မမှန် စစ်ဆေးခြင်း
        idinfo = id_token.verify_oauth2_token(
            token_data.token, 
            google_requests.Request(), 
            GOOGLE_CLIENT_ID
        )

        email = idinfo['email']
        name = idinfo.get('name', 'Google User')

        # Database ထဲတွင် ထို Email ဖြင့် User ရှိမရှိ စစ်ဆေးခြင်း
        user = db.query(models.User).filter(models.User.email == email).first()

        if not user:
            # 🌟 အကောင့် မရှိသေးလျှင် အသစ် ဖွင့်ပေးမည် (Google မှမို့ Email Verify ဖြစ်ပြီးသားဟု သတ်မှတ်မည်)
            new_user = models.User(
                fullname=name,
                email=email,
                password="GOOGLE_LOGIN_NO_PASSWORD", # Google မှ ဝင်သူများ Password မလိုပါ
                is_approved=False,       # Admin က Approve လုပ်မှသာ ဝင်ခွင့်ရမည်
                is_admin=False,
                is_email_verified=True   # Google မှ အာမခံထားသဖြင့် True တန်းပေးပါမည်
            )
            db.add(new_user)
            db.commit()
            db.refresh(new_user)
            raise HTTPException(status_code=403, detail="အကောင့်အသစ် ဖန်တီးပြီးပါပြီ။ Admin ၏ အတည်ပြုချက် (Approve) ကို ခေတ္တစောင့်ဆိုင်းပေးပါ။")

        else:
            # 🌟 အကောင့် ရှိပြီးသား ဖြစ်လျှင်
            if not user.is_approved:
                raise HTTPException(status_code=403, detail="သင့်အကောင့်မှာ Admin အတည်ပြုချက် မရရှိသေးပါ။")
            
            # Approve ဖြစ်ပြီးသားဆိုလျှင် Login ဝင်ခွင့်ပြုမည်
            return {
                "message": "Login အောင်မြင်ပါသည်။",
                "user": {
                    "user_id": user.id,
                    "fullname": user.fullname,
                    "email": user.email,
                    "is_admin": user.is_admin
                }
            }

    except ValueError:
        raise HTTPException(status_code=400, detail="Google အကောင့် ချိတ်ဆက်မှု မှားယွင်းနေပါသည်။")
    
# သင့် main.py ၏ အောက်ဆုံးနား သို့မဟုတ် သင့်တော်ရာနေရာတွင် ထည့်ပါ

# (၁) Feedback အသစ် ပေးပို့ရန် (Frontend မှ လှမ်းပို့မည်)
@app.post("/feedbacks", response_model=schemas.FeedbackResponse)
def create_feedback(feedback: schemas.FeedbackCreate, db: Session = Depends(get_db)):
    new_feedback = models.Feedback(
        name=feedback.name,
        rating=feedback.rating,
        comment=feedback.comment
    )
    db.add(new_feedback)
    db.commit()
    db.refresh(new_feedback)
    return new_feedback

# (၂) Admin အတွက် Feedback အားလုံးဆွဲယူရန်
@app.get("/feedbacks", response_model=List[schemas.FeedbackResponse])
def get_all_feedbacks(db: Session = Depends(get_db)):
    return db.query(models.Feedback).order_by(models.Feedback.created_at.desc()).all()

@app.get("/feedbacks/highlighted", response_model=List[schemas.FeedbackResponse])
def get_highlighted_feedbacks(db: Session = Depends(get_db)):
    return db.query(models.Feedback).filter(models.Feedback.is_highlighted == True).order_by(models.Feedback.created_at.desc()).all()

@app.post("/visit")
def record_visit(db: Session = Depends(get_db)):
    stat = db.query(models.SiteStat).first()
    if not stat:
        stat = models.SiteStat(total_visits=1)
        db.add(stat)
    else:
        stat.total_visits += 1
    db.commit()
    return {"status": "success"}


# (၂) Stats များဆွဲယူရန် (ယခု ၃ မျိုးလုံး ပြန်ပို့ပေးပါမည်)
@app.get("/stats")
def get_website_stats(db: Session = Depends(get_db)):
    # ၁။ ဝင်ရောက်ကြည့်ရှုသူ (Visitors)
    stat = db.query(models.SiteStat).first()
    visits = stat.total_visits if stat else 0
    
    # ၂။ သင်ခန်းစာ လေ့လာနေသူများ (Registered Users / Login ဝင်ထားသူများ)
    user_count = db.query(models.User).count()
    
    # ၃။ သုံးသပ်ချက် (Feedbacks)
    feedback_count = db.query(models.Feedback).count()
    
    return {
        "total_visits": visits,
        "total_users": user_count,
        "total_feedbacks": feedback_count
    }
# (၃) နောက်ဆုံးရ Feedback ၃ ခုကို ဆွဲယူရန် (Marquee အတွက် အသစ်)
@app.get("/feedbacks/latest", response_model=List[schemas.FeedbackResponse])
def get_latest_feedbacks(db: Session = Depends(get_db)):
    return db.query(models.Feedback).order_by(models.Feedback.created_at.desc()).limit(3).all()

# (၅) Admin မှ Feedback ကို Highlight လုပ်ရန် (အဖွင့်/အပိတ်)
@app.put("/feedbacks/{feedback_id}/highlight", response_model=schemas.FeedbackResponse)
def toggle_feedback_highlight(feedback_id: int, db: Session = Depends(get_db)):
    feedback = db.query(models.Feedback).filter(models.Feedback.id == feedback_id).first()
    if not feedback:
        raise HTTPException(status_code=404, detail="Feedback not found")
    
    # ရှိပြီးသားအခြေအနေကို ပြောင်းပြန်လှန်မည် (True ဆိုလျှင် False, False ဆိုလျှင် True)
    feedback.is_highlighted = not feedback.is_highlighted
    db.commit()
    db.refresh(feedback)
    return feedback