from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class Education(Base):
    __tablename__ = "education"

    id = Column(Integer, primary_key=True, index=True)
    institution = Column(String(200), nullable=False)
    degree = Column(String(100), nullable=False)
    field = Column(String(100))
    start_year = Column(Integer)
    end_year = Column(Integer)
    grade = Column(String(50))
    description = Column(Text)
