from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional

from app.database import get_db
from app.services import chat_service

router = APIRouter(tags=["chat"])

def get_current_user_mock():
    return {"id": 1}

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []

@router.post("/message")
def send_chat_message(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user_mock)
):
    """Process a chat message and return AI response."""
    try:
        history_dict = [{"role": msg.role, "content": msg.content} for msg in request.history]
        response_text = chat_service.process_chat_message(
            db=db, 
            user_id=current_user["id"], 
            message=request.message, 
            history=history_dict
        )
        return {"response": response_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
