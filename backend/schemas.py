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

from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class FeedbackCreate(BaseModel):
    name: str
    rating: int
    comment: str

class FeedbackResponse(BaseModel):
    id: int
    name: str
    rating: int
    comment: str
    is_highlighted: bool
    created_at: datetime

    class Config:
        from_attributes = True