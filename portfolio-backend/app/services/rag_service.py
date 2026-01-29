import os
import logging
from pathlib import Path
from typing import List, Optional
import chromadb
from chromadb.config import Settings
from PyPDF2 import PdfReader
import litellm
from dotenv import load_dotenv

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Disable litellm verbose logging
litellm.set_verbose = False


class RAGService:
    """RAG (Retrieval Augmented Generation) service for portfolio chatbot"""
    
    def __init__(self, data_dir: str = "data"):
        self.data_dir = Path(data_dir)
        self.data_dir.mkdir(exist_ok=True)
        
        # Initialize ChromaDB with persistent storage
        # Initialize ChromaDB with persistent storage
        self.chroma_client = chromadb.PersistentClient(
            path=str(self.data_dir / "chroma_db")
        )
        
        # Get or create collection
        self.collection = self.chroma_client.get_or_create_collection(
            name="portfolio_docs",
            metadata={"hnsw:space": "cosine"}
        )
        
        # LLM configuration
        # LLM configuration
        # Prefix with 'gemini/' to use Google AI Studio API Key instead of Vertex AI
        self.llm_model = os.getenv("LLM_MODEL", "gemini/gemini-3-flash-preview")
        
        # Portfolio context for fallback
        self.portfolio_context = ""
        
        logger.info(f"RAG Service initialized with model: {self.llm_model}")
    
    def load_resume_pdf(self, pdf_path: str) -> str:
        """Load and extract text from resume PDF"""
        try:
            reader = PdfReader(pdf_path)
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n"
            logger.info(f"Loaded resume from {pdf_path}: {len(text)} characters")
            return text
        except Exception as e:
            logger.error(f"Error loading PDF: {e}")
            return ""
    
    def chunk_text(self, text: str, chunk_size: int = 500, overlap: int = 50) -> List[str]:
        """Split text into overlapping chunks for better context retrieval"""
        chunks = []
        words = text.split()
        
        for i in range(0, len(words), chunk_size - overlap):
            chunk = " ".join(words[i:i + chunk_size])
            if chunk.strip():
                chunks.append(chunk)
        
        return chunks
    
    def index_documents(self, text: str, source: str = "resume") -> int:
        """Index text chunks into vector database"""
        # Clear existing documents
        try:
            existing = self.collection.get()
            if existing["ids"]:
                self.collection.delete(ids=existing["ids"])
        except Exception:
            pass
        
        # Store full context for fallback
        self.portfolio_context = text
        
        # Chunk and index
        chunks = self.chunk_text(text)
        
        if not chunks:
            logger.warning("No chunks to index")
            return 0
        
        # Add to ChromaDB
        self.collection.add(
            documents=chunks,
            ids=[f"{source}_{i}" for i in range(len(chunks))],
            metadatas=[{"source": source, "chunk_id": i} for i in range(len(chunks))]
        )
        
        logger.info(f"Indexed {len(chunks)} chunks from {source}")
        return len(chunks)
    
    def load_and_index_resume(self) -> bool:
        """Load resume PDF and index it"""
        resume_path = self.data_dir / "resume.pdf"
        
        if not resume_path.exists():
            logger.warning(f"Resume not found at {resume_path}")
            # Create sample context from portfolio data
            self._create_sample_context()
            return False
        
        text = self.load_resume_pdf(str(resume_path))
        if text:
            self.index_documents(text, "resume")
            return True
        return False
    
    def _create_sample_context(self):
        """Create sample context when no resume is available"""
        self.portfolio_context = """
        This is a portfolio website for a GenAI Full Stack Developer.
        
        Skills include:
        - Frontend: React.js, Vue.js, HTML/CSS, Tailwind CSS, Next.js
        - Backend: Node.js, FastAPI, Express.js, Django
        - Databases: MongoDB, PostgreSQL, MySQL, Firebase
        - Tools: Git, Docker, AWS, CI/CD
        
        The developer has experience in building web applications, e-commerce platforms,
        and task management tools. They hold certifications in AWS and Full Stack Development.
        
        Education includes a Bachelor's degree in Computer Science.
        
        For more specific information, please add a resume.pdf to the data folder.
        """
        
        self.index_documents(self.portfolio_context, "sample")
        logger.info("Created sample context - add resume.pdf for personalized responses")
    
    def search_context(self, query: str, n_results: int = 3) -> List[str]:
        """Search for relevant context chunks"""
        try:
            results = self.collection.query(
                query_texts=[query],
                n_results=n_results
            )
            
            if results and results["documents"]:
                return results["documents"][0]
        except Exception as e:
            logger.error(f"Search error: {e}")
        
        return []
    
    async def generate_response(self, user_message: str, session_id: Optional[str] = None) -> dict:
        """Generate AI response using RAG"""
        
        # Get relevant context
        context_chunks = self.search_context(user_message)
        context = "\n\n".join(context_chunks) if context_chunks else self.portfolio_context[:2000]
        
        # Build prompt
        system_prompt = """You are an  genius AI assistant named as 'Luffy' for a personal portfolio website. 
Your role is to answer questions about the portfolio owner's background, skills, projects, 
education, and experience based on the provided context.

Guidelines:
- Be helpful, friendly,energetic,cheerful,loyal,high creativity, adaptability and professional
- If information isn't in the context, politely say you don't have that specific information
-Understand the user query and the context and answer the question based on the context. If the user greets you, greet him back and if they ask any general question, answer it and then ask how can you help him.
- Keep responses concise but informative
- Encourage users to explore the portfolio website for more details
- You can answer general questions about the portfolio sections available
- If user ask about you, then say you are Luffy, an Genius AI assistant for my friend's portfolio
Context from portfolio:
"""
        
        messages = [
            {"role": "system", "content": system_prompt + context},
            {"role": "user", "content": user_message}
        ]
        
        try:
            # Call LLM using litellm for multi-provider support
            response = await litellm.acompletion(
                model=self.llm_model,
                messages=messages,
                max_tokens=500,
                temperature=0.7
            )
            
            assistant_message = response.choices[0].message.content
            
            return {
                "response": assistant_message,
                "sources": [chunk[:100] + "..." for chunk in context_chunks] if context_chunks else [],
                "model": self.llm_model
            }
            
        except Exception as e:
            logger.error(f"LLM error: {e}")
            # Fallback response
            return {
                "response": self._generate_fallback_response(user_message),
                "sources": [],
                "model": "fallback"
            }
    
    def _generate_fallback_response(self, query: str) -> str:
        """Generate a simple fallback response when LLM is unavailable"""
        q = query.lower()
        
        if any(word in q for word in ["skill", "technology", "stack", "know"]):
            return "The portfolio owner is skilled in various technologies including React, Node.js, Python, and more. Check out the Skills section for detailed proficiency levels!"
        
        if any(word in q for word in ["project", "work", "built"]):
            return "There are several exciting projects showcased in the Projects section, including full-stack applications with live demos. Feel free to explore them!"
        
        if any(word in q for word in ["experience", "job", "intern"]):
            return "Work experience and internships are detailed in the Experience section. It covers roles, responsibilities, and achievements."
        
        if any(word in q for word in ["education", "degree", "study"]):
            return "Educational background is available in the Education section, covering degrees, institutions, and grades."
        
        if any(word in q for word in ["contact", "email", "reach"]):
            return "You can reach out through the Contact section at the bottom of the page. There's a contact form and social media links available!"
        
        return "I'm here to help you learn about this portfolio! You can ask about skills, projects, experience, education, or how to get in touch. What would you like to know?"


# Global instance
rag_service = RAGService()
