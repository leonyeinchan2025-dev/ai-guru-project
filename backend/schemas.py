# backend/schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional

class UserOut(BaseModel):
    id: int
    fullname: str
    email: EmailStr
    is_approved: bool

    class Config:
        from_attributes = True

class LessonCreate(BaseModel):
    title: str
    content: str
    category: Optional[str] = "General"

class LessonOut(BaseModel):
    id: int
    title: str
    content: str
    category: str

    class Config:
        from_attributes = True