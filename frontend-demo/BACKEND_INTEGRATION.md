# Backend Integration Guide

This guide shows how to add the `/api/chat` endpoint to your existing FastAPI backend to work with the frontend chat widget.

## Option 1: Simple Chat Integration (Recommended for Quick Setup)

Add this to your [backend/routes/chat.py](../backend/routes/chat.py):

```python
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from services.llm_service import LLMService

router = APIRouter(prefix="/api", tags=["chat"])
llm_service = LLMService()

class ChatRequest(BaseModel):
    message: str
    session_id: str = None

class ChatResponse(BaseModel):
    response: str
    session_id: str = None

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Handle chat messages from the frontend widget
    """
    try:
        if not request.message or not request.message.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        
        # Use your existing LLM service to generate response
        response = await llm_service.generate_response(request.message)
        
        return ChatResponse(
            response=response,
            session_id=request.session_id
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

## Option 2: With Session Management

Add this to track conversation history:

```python
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime
import uuid

router = APIRouter(prefix="/api", tags=["chat"])

# Simple in-memory session storage (use Redis for production)
chat_sessions = {}

class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str
    timestamp: str

class ChatRequest(BaseModel):
    message: str
    session_id: str = None

class ChatResponse(BaseModel):
    response: str
    session_id: str
    history: list[ChatMessage] = []

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Handle chat with session management
    """
    try:
        # Create or get session
        session_id = request.session_id or str(uuid.uuid4())
        
        if session_id not in chat_sessions:
            chat_sessions[session_id] = []
        
        # Add user message to history
        chat_sessions[session_id].append(ChatMessage(
            role="user",
            content=request.message,
            timestamp=datetime.now().isoformat()
        ))
        
        # Generate response using your LLM
        response = await llm_service.generate_response(
            request.message,
            context=chat_sessions[session_id]
        )
        
        # Add assistant response to history
        chat_sessions[session_id].append(ChatMessage(
            role="assistant",
            content=response,
            timestamp=datetime.now().isoformat()
        ))
        
        return ChatResponse(
            response=response,
            session_id=session_id,
            history=chat_sessions[session_id]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/chat/history/{session_id}")
async def get_chat_history(session_id: str):
    """
    Retrieve chat history for a session
    """
    if session_id not in chat_sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    
    return {"history": chat_sessions[session_id]}
```

## Option 3: With Database Storage (Production Ready)

```python
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from datetime import datetime
import uuid

router = APIRouter(prefix="/api", tags=["chat"])

class ChatRequest(BaseModel):
    message: str
    session_id: str = None

@router.post("/chat")
async def chat(request: ChatRequest, db: Session):
    """
    Handle chat with database storage
    """
    try:
        session_id = request.session_id or str(uuid.uuid4())
        
        # Store user message in database
        user_message = ChatMessage(
            session_id=session_id,
            role="user",
            content=request.message,
            created_at=datetime.now()
        )
        db.add(user_message)
        db.commit()
        
        # Generate response
        response = await llm_service.generate_response(request.message)
        
        # Store assistant message
        assistant_message = ChatMessage(
            session_id=session_id,
            role="assistant",
            content=response,
            created_at=datetime.now()
        )
        db.add(assistant_message)
        db.commit()
        
        return {
            "response": response,
            "session_id": session_id
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
```

## Integration Steps

1. **Add the route to your main.py:**

```python
from backend.routes.chat import router as chat_router

app.include_router(chat_router)
```

2. **Enable CORS for frontend:**

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

3. **Test the endpoint:**

```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!"}'
```

## Frontend Setup

The frontend is already configured to call `http://localhost:8000/api/chat`.

If your backend is on a different server/port:
1. Update `.env.local` in frontend-demo:
```env
NEXT_PUBLIC_BACKEND_URL=http://your-backend-url:port
```

2. Restart the frontend dev server

## Testing

1. Start backend: `cd backend && python -m uvicorn main:app --reload`
2. Start frontend: `cd frontend-demo && npm run dev`
3. Open http://localhost:3000
4. Click chat widget and send a message
5. Verify the message reaches your backend and returns a response

## Error Handling

The frontend handles these errors:
- Backend unreachable
- Empty responses
- HTTP errors
- Network timeouts

Check browser console (F12) for debugging.
