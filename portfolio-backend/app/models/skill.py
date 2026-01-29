from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String(100), nullable=False)
    items = relationship("SkillItem", back_populates="skill", cascade="all, delete-orphan")


class SkillItem(Base):
    __tablename__ = "skill_items"

    id = Column(Integer, primary_key=True, index=True)
    skill_id = Column(Integer, ForeignKey("skills.id"), nullable=False)
    name = Column(String(100), nullable=False)
    percentage = Column(Integer, default=0)
    
    skill = relationship("Skill", back_populates="items")
