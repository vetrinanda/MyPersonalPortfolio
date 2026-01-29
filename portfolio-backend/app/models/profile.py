from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    title = Column(String(100))
    tagline = Column(String(255))
    bio = Column(Text)
    profile_image_url = Column(String(255))
    resume_pdf_path = Column(String(255))
    email = Column(String(100))
    phone = Column(String(20))
    location = Column(String(100))
    github_url = Column(String(255))
    linkedin_url = Column(String(255))
    twitter_url = Column(String(255))
