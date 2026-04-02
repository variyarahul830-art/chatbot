from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from database import engine, Base, ensure_pdf_schema
from models import PDFDocument
import logging

logger = logging.getLogger(__name__)

logger.info("Backend startup...")

# Ensure schema drift is corrected before creating tables (handles missing minio_path column)
ensure_pdf_schema()
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="AI PDF Chatbot API",
    description="REST API for PDF processing, Chat, Workflows, Nodes, Edges, and FAQs",
    version="3.0.0"
)  

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import routes after app initialization to avoid circular imports
from routes import chat, pdf, auth, sessions, websocket_chat, workflows, faqs

# Include routers (PDF, Chat, Auth, Workflows, and FAQs)
app.include_router(chat.router)
app.include_router(pdf.router)
app.include_router(auth.router)
app.include_router(sessions.router)
app.include_router(websocket_chat.router)
app.include_router(workflows.router)
app.include_router(faqs.router)

logger.info("Backend ready")


@app.on_event("startup")
async def startup_event():
    """Log startup completion"""
    logger.info("Application started")


@app.on_event("shutdown")
async def shutdown_event():
    """Log shutdown"""
    logger.info("Application shutdown")


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "message": "AI PDF Chatbot API is running",
        "hasura_url": settings.HASURA_URL
    }

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "AI PDF Chatbot API",
        "version": "3.0.0",
        "documentation": "/docs",
        "health": "/health",
        "endpoints": {
            "PDF": {
                "POST /api/pdf/upload": "Upload PDF",
                "GET /api/pdf/documents": "List PDFs",
                "GET /api/pdf/documents/{id}": "Get PDF",
            },
            "Chat": {
                "POST /api/chat": "Send chat message",
            },
            "Workflows": {
                "GET /api/workflows": "List workflows",
                "GET /api/workflows/{id}": "Get workflow with nodes and edges",
                "POST /api/workflows": "Create workflow (admin only)",
                "PUT /api/workflows/{id}": "Update workflow (admin only)",
                "DELETE /api/workflows/{id}": "Delete workflow (admin only)",
            },
            "Nodes": {
                "GET /api/workflows/{id}/nodes": "Get nodes for workflow",
                "POST /api/workflows/{id}/nodes": "Create node (admin only)",
                "PUT /api/nodes/{id}": "Update node (admin only)",
                "DELETE /api/nodes/{id}": "Delete node (admin only)",
            },
            "Edges": {
                "GET /api/workflows/{id}/edges": "Get edges for workflow",
                "POST /api/workflows/{id}/edges": "Create edge (admin only)",
                "DELETE /api/edges/{id}": "Delete edge (admin only)",
            },
            "FAQs": {
                "GET /api/faqs": "List FAQs (with optional category filter)",
                "GET /api/faqs/questions": "Get FAQ questions only",
                "GET /api/faqs/categories": "Get unique FAQ categories",
                "GET /api/faqs/{id}": "Get FAQ by ID",
                "POST /api/faqs": "Create FAQ (admin only)",
                "PUT /api/faqs/{id}": "Update FAQ (admin only)",
                "DELETE /api/faqs/{id}": "Delete FAQ (admin only)",
            }
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app,
        host=settings.HOST,
        port=settings.PORT,
    )
