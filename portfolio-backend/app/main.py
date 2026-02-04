import os
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv

from app.database import init_db
from app.routers import portfolio, chat, contact
from app.services.rag_service import rag_service

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events"""
    # Startup
    logger.info("Starting Portfolio API...")
    
    # Initialize database
    init_db()
    logger.info("Database initialized")
    
    # Initialize RAG service with resume
    try:
        rag_service.load_and_index_resume()
        logger.info("RAG service initialized")
    except Exception as e:
        logger.warning(f"RAG initialization warning: {e}")
    
    yield
    
    # Shutdown
    logger.info("Shutting down Portfolio API...")


# Create FastAPI app
app = FastAPI(
    title="Portfolio API",
    description="Backend API for personal portfolio with AI chatbot",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
# For production, we allow all origins by default to ensure the Vercel frontend can connect
# Since we don't rely on cookies/credentials, this is safe for a portfolio site
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(portfolio.router)
app.include_router(chat.router)
app.include_router(contact.router)

# Mount static files for resume download
if os.path.exists("data"):
    app.mount("/files", StaticFiles(directory="data"), name="files")


# Health check endpoint
@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "version": "1.0.0"
    }


@app.get("/")
def root():
    """Root endpoint"""
    return {
        "message": "Portfolio API",
        "docs": "/docs",
        "health": "/health"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
