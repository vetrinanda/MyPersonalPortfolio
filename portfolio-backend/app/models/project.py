from sqlalchemy import Column, Integer, String, Text, Boolean, JSON
from app.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text)
    technologies = Column(JSON)  # Stored as JSON array
    image_url = Column(String(255))
    github_url = Column(String(255))
    live_demo_url = Column(String(255))
    featured = Column(Boolean, default=False)
