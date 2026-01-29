# Personal Portfolio Website with AI Chatbot

A full-stack personal portfolio website featuring React with shadcn/ui frontend and FastAPI backend with RAG-powered AI chatbot.

## 🚀 Features

- **Modern UI**: Beautiful, responsive design with dark/light mode
- **Portfolio Sections**: Hero, About, Education, Experience, Projects, Skills, Certifications, Contact
- **AI Chatbot**: RAG-powered chatbot that answers questions about your background
- **Centralized Data**: Easy-to-edit data file for content management
- **SEO Optimized**: Meta tags, Open Graph, and semantic HTML

## 📁 Project Structure

```
MyPersonalPortfolio/
├── portfolio-frontend/          # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/         # UI components
│   │   ├── data/
│   │   │   └── portfolioData.js  # ← Edit this to update content!
│   │   ├── lib/
│   │   └── App.jsx
│   └── public/
│       ├── images/             # Your images
│       └── files/              # Resume PDF
│
└── portfolio-backend/           # FastAPI + SQLite + RAG
    ├── app/
    │   ├── models/             # Database models
    │   ├── routers/            # API endpoints
    │   ├── services/           # RAG service
    │   └── main.py
    └── data/
        └── resume.pdf          # ← Add your resume here!
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- An LLM API key (OpenAI, Google AI, or Anthropic)

### Frontend Setup

```bash
cd portfolio-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend runs at `http://localhost:5173`

### Backend Setup

```bash
cd portfolio-backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and add your LLM API key

# Run the server
uvicorn app.main:app --reload
```

The backend runs at `http://localhost:8000`
API docs available at `http://localhost:8000/docs`

## 📝 Customizing Your Portfolio

### 1. Update Content

Edit `portfolio-frontend/src/data/portfolioData.js`:

```javascript
export const portfolioData = {
  personal: {
    name: "Your Name",
    title: "Your Title",
    email: "your@email.com",
    // ... more fields
  },
  // education, experience, projects, skills, certifications...
};
```

### 2. Add Your Resume

Place your resume at `portfolio-backend/data/resume.pdf`

The AI chatbot will use this to answer questions about you!

### 3. Add Images

- Profile image: `portfolio-frontend/public/images/profile.jpg`
- Project images: `portfolio-frontend/public/images/project1.jpg`, etc.
- Certification badges: `portfolio-frontend/public/images/cert1.png`, etc.

### 4. Configure LLM Provider

Edit `portfolio-backend/.env`:

```env
# For OpenAI
OPENAI_API_KEY=your-key
LLM_MODEL=gpt-3.5-turbo

# For Google AI
GOOGLE_API_KEY=your-key
LLM_MODEL=gemini/gemini-pro

# For Anthropic
ANTHROPIC_API_KEY=your-key
LLM_MODEL=claude-3-sonnet-20240229
```

## 🎨 Customizing Design

### Colors

Edit the CSS variables in `portfolio-frontend/src/index.css`:

```css
:root {
  --primary: 262.1 83.3% 57.8%;  /* Purple */
  --gradient-end: 330 81% 60%;    /* Pink */
  /* ... */
}
```

### Fonts

The portfolio uses Inter and Outfit fonts. Change them in `index.css`.

## 🌐 Deployment

### Frontend (Vercel/Netlify)

```bash
cd portfolio-frontend
npm run build
# Deploy the 'dist' folder
```

### Backend (Railway/Render)

1. Push your code to GitHub
2. Connect to Railway/Render
3. Set environment variables
4. Deploy!

## 📄 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/profile` | GET | Profile information |
| `/api/education` | GET | Education list |
| `/api/experience` | GET | Experience list |
| `/api/projects` | GET | Projects list |
| `/api/skills` | GET | Skills by category |
| `/api/certifications` | GET | Certifications |
| `/api/resume/download` | GET | Download resume |
| `/api/chat` | POST | Chat with AI |
| `/api/chat/history/{session_id}` | GET | Chat history |

## 🤖 AI Chatbot

The chatbot uses RAG (Retrieval Augmented Generation):

1. Your resume PDF is processed and indexed
2. User questions trigger semantic search
3. Relevant context is sent to the LLM
4. The LLM generates personalized responses

Even without a resume, the chatbot provides helpful responses based on your portfolio data!

## 📜 License

MIT License - Feel free to use this for your own portfolio!

---

Made with ❤️ using React, FastAPI, and AI
