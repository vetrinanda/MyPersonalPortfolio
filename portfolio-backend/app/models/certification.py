from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class Certification(Base):
    __tablename__ = "certifications"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    issuer = Column(String(100))
    date_issued = Column(String(50))
    credential_url = Column(String(255))
    image_url = Column(String(255))
    description = Column(Text)
