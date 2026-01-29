from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
import os

from app.database import get_db
from app.models import Profile, Education, Experience, Project, Skill, SkillItem, Certification

router = APIRouter(prefix="/api", tags=["portfolio"])


# Pydantic schemas for responses
class SocialLinks(BaseModel):
    github: Optional[str] = None
    linkedin: Optional[str] = None
    twitter: Optional[str] = None


class ProfileResponse(BaseModel):
    id: int
    name: str
    title: Optional[str]
    tagline: Optional[str]
    bio: Optional[str]
    profile_image_url: Optional[str]
    email: Optional[str]
    phone: Optional[str]
    location: Optional[str]
    social_links: SocialLinks

    class Config:
        from_attributes = True


class EducationResponse(BaseModel):
    id: int
    institution: str
    degree: str
    field: Optional[str]
    start_year: Optional[int]
    end_year: Optional[int]
    grade: Optional[str]
    description: Optional[str]

    class Config:
        from_attributes = True


class ExperienceResponse(BaseModel):
    id: int
    company: str
    position: str
    start_date: Optional[str]
    end_date: Optional[str]
    current: bool
    description: Optional[str]
    technologies: List[str]
    achievements: List[str]

    class Config:
        from_attributes = True


class ProjectResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    technologies: List[str]
    image_url: Optional[str]
    github_url: Optional[str]
    live_demo_url: Optional[str]
    featured: bool

    class Config:
        from_attributes = True


class SkillItemResponse(BaseModel):
    name: str
    percentage: int

    class Config:
        from_attributes = True


class SkillResponse(BaseModel):
    id: int
    category: str
    items: List[SkillItemResponse]

    class Config:
        from_attributes = True


class CertificationResponse(BaseModel):
    id: int
    name: str
    issuer: Optional[str]
    date_issued: Optional[str]
    credential_url: Optional[str]
    image_url: Optional[str]
    description: Optional[str]

    class Config:
        from_attributes = True


# API Endpoints
@router.get("/profile", response_model=Optional[ProfileResponse])
def get_profile(db: Session = Depends(get_db)):
    """Get profile information"""
    profile = db.query(Profile).first()
    if not profile:
        return None
    
    return ProfileResponse(
        id=profile.id,
        name=profile.name,
        title=profile.title,
        tagline=profile.tagline,
        bio=profile.bio,
        profile_image_url=profile.profile_image_url,
        email=profile.email,
        phone=profile.phone,
        location=profile.location,
        social_links=SocialLinks(
            github=profile.github_url,
            linkedin=profile.linkedin_url,
            twitter=profile.twitter_url
        )
    )


@router.get("/education", response_model=List[EducationResponse])
def get_education(db: Session = Depends(get_db)):
    """Get all education entries"""
    return db.query(Education).order_by(Education.end_year.desc()).all()


@router.get("/experience", response_model=List[ExperienceResponse])
def get_experience(db: Session = Depends(get_db)):
    """Get all experience entries"""
    experiences = db.query(Experience).all()
    return [
        ExperienceResponse(
            id=exp.id,
            company=exp.company,
            position=exp.position,
            start_date=exp.start_date,
            end_date=exp.end_date,
            current=exp.current or False,
            description=exp.description,
            technologies=exp.technologies or [],
            achievements=exp.achievements or []
        )
        for exp in experiences
    ]


@router.get("/projects", response_model=List[ProjectResponse])
def get_projects(featured: Optional[bool] = None, db: Session = Depends(get_db)):
    """Get all projects, optionally filter by featured"""
    query = db.query(Project)
    if featured is not None:
        query = query.filter(Project.featured == featured)
    
    projects = query.all()
    return [
        ProjectResponse(
            id=p.id,
            title=p.title,
            description=p.description,
            technologies=p.technologies or [],
            image_url=p.image_url,
            github_url=p.github_url,
            live_demo_url=p.live_demo_url,
            featured=p.featured or False
        )
        for p in projects
    ]


@router.get("/skills", response_model=List[SkillResponse])
def get_skills(db: Session = Depends(get_db)):
    """Get all skills grouped by category"""
    skills = db.query(Skill).all()
    return [
        SkillResponse(
            id=s.id,
            category=s.category,
            items=[SkillItemResponse(name=item.name, percentage=item.percentage) for item in s.items]
        )
        for s in skills
    ]


@router.get("/certifications", response_model=List[CertificationResponse])
def get_certifications(db: Session = Depends(get_db)):
    """Get all certifications"""
    return db.query(Certification).all()


@router.get("/resume/download")
def download_resume():
    """Download resume PDF"""
    resume_path = "data/resume.pdf"
    
    if not os.path.exists(resume_path):
        raise HTTPException(status_code=404, detail="Resume not found")
    
    return FileResponse(
        resume_path,
        media_type="application/pdf",
        filename="resume.pdf"
    )
