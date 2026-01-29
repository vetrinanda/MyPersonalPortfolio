from sqlalchemy import Column, Integer, String, Text, Boolean, JSON
from app.database import Base


class Experience(Base):
    __tablename__ = "experiences"

    id = Column(Integer, primary_key=True, index=True)
    company = Column(String(200), nullable=False)
    position = Column(String(100), nullable=False)
    start_date = Column(String(50))
    end_date = Column(String(50))
    current = Column(Boolean, default=False)
    description = Column(Text)
    technologies = Column(JSON)  # Stored as JSON array
    achievements = Column(JSON)  # Stored as JSON array
