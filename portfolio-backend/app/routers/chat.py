from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import uuid

from app.database import get_db
from app.models import ChatHistory
from app.services.rag_service import rag_service

router = APIRouter(prefix="/api/chat", tags=["chat"])


# Request/Response schemas
class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    response: str
    sources: List[str]
    session_id: str
    model: Optional[str] = None


class ChatHistoryResponse(BaseModel):
    id: int
    user_message: str
    bot_response: str
    timestamp: datetime

    class Config:
        from_attributes = True


class FeedbackRequest(BaseModel):
    session_id: str
    message_id: int
    feedback: str  # "positive" or "negative"
    comment: Optional[str] = None


# API Endpoints
@router.post("", response_model=ChatResponse)
async def send_message(request: ChatRequest, db: Session = Depends(get_db)):
    """Send a message and get AI response"""
    
    # Generate session ID if not provided
    session_id = request.session_id or str(uuid.uuid4())
    
    # Get AI response using RAG
    result = await rag_service.generate_response(
        user_message=request.message,
        session_id=session_id
    )
    
    # Save to chat history
    chat_entry = ChatHistory(
        session_id=session_id,
        user_message=request.message,
        bot_response=result["response"]
    )
    db.add(chat_entry)
    db.commit()
    
    return ChatResponse(
        response=result["response"],
        sources=result.get("sources", []),
        session_id=session_id,
        model=result.get("model")
    )


@router.get("/history/{session_id}", response_model=List[ChatHistoryResponse])
def get_chat_history(session_id: str, db: Session = Depends(get_db)):
    """Get chat history for a session"""
    
    history = db.query(ChatHistory).filter(
        ChatHistory.session_id == session_id
    ).order_by(ChatHistory.timestamp.asc()).all()
    
    return history


@router.post("/feedback")
def submit_feedback(request: FeedbackRequest, db: Session = Depends(get_db)):
    """Submit feedback on a chat response"""
    
    # In a production app, you'd store this feedback for model improvement
    # For now, we'll just acknowledge it
    
    return {
        "status": "success",
        "message": "Thank you for your feedback!"
    }


@router.delete("/history/{session_id}")
def clear_chat_history(session_id: str, db: Session = Depends(get_db)):
    """Clear chat history for a session"""
    
    db.query(ChatHistory).filter(
        ChatHistory.session_id == session_id
    ).delete()
    db.commit()
    
    return {"status": "success", "message": "Chat history cleared"}
