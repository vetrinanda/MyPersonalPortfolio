
from fastapi import APIRouter, BackgroundTasks, HTTPException
from pydantic import BaseModel, EmailStr
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import logging

router = APIRouter(prefix="/api", tags=["contact"])
logger = logging.getLogger(__name__)

from typing import Optional

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str
    to_email: Optional[EmailStr] = None

def send_email_task(contact: ContactForm):
    """
    Background task to send email using SMTP.
    If credentials are provided, it attempts to send an email.
    Otherwise, it logs the message.
    """
    
    # Get configuration from environment variables
    smtp_host = os.getenv("EMAIL_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("EMAIL_PORT", "587"))
    smtp_user = os.getenv("EMAIL_USER")
    smtp_password = os.getenv("EMAIL_PASSWORD")
    email_from = os.getenv("EMAIL_FROM", smtp_user)
    
    # Determine destination email:
    # 1. Use to_email from form if provided
    # 2. Fallback to EMAIL_TO env var
    # 3. Fallback to 'Admin' (for logging purposes)
    email_to = contact.to_email or os.getenv("EMAIL_TO")

    if not all([smtp_user, smtp_password, email_to]):
        # data is missing, log it instead
        logger.warning("Email credentials not fully configured or destination missing. Logging message instead.")
        logger.info(f"New Message from {contact.name} ({contact.email}):")
        logger.info(f"Subject: {contact.subject}")
        logger.info(f"Message: {contact.message}")
        print("---------------------------------------------------")
        print(f"To: {email_to or 'Admin'}")
        print(f"From: {contact.name} <{contact.email}>")
        print(f"Subject: {contact.subject}")
        print(f"Body:\n{contact.message}")
        print("---------------------------------------------------")
        return

    try:
        msg = MIMEMultipart()
        msg['From'] = email_from
        msg['To'] = email_to
        msg['Subject'] = f"Portfolio Contact: {contact.subject}"
        msg.add_header('Reply-To', contact.email)

        body = f"""
        You have received a new message from your portfolio contact form.

        Name: {contact.name}
        Email: {contact.email}
        Subject: {contact.subject}

        Message:
        {contact.message}
        """
        msg.attach(MIMEText(body, 'plain'))

        # Connect to server
        server = smtplib.SMTP(smtp_host, smtp_port)
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.send_message(msg)
        server.quit()
        logger.info(f"Email sent successfully to {email_to}")

    except Exception as e:
        logger.error(f"Failed to send email: {e}")
        # In a real app, you might want to retry or store in DB
        pass

from fastapi import Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import ContactMessage

@router.post("/contact")
async def send_message(
    contact: ContactForm, 
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    Receive contact form submission, save to DB, and send email in background.
    """
    # 1. Save to Database
    db_message = ContactMessage(
        name=contact.name,
        email=contact.email,
        subject=contact.subject,
        message=contact.message
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    
    # 2. Add email task to background 
    background_tasks.add_task(send_email_task, contact)
    
    return {"status": "success", "message": "Message received. We will get back to you soon."}
