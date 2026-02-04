# Portfolio Backend

This is the FastAPI backend for the Personal Portfolio. It handles the AI Chatbot (using Gemini/LiteLLM) and the Contact Form (using SMTP).

## 🚀 Deployment on Render

### 1. Build & Start Commands
- **Build Command:** `uv sync`
- **Start Command:** `uv run uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### 2. Environment Variables
You MUST set the following Environment Variables in your Render Dashboard for the features to work.

#### **Required for Chatbot (Gemini)**
| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Your Google Gemini API Key. |
| `LITELLM_MODEL` | (Optional) Model to use, defaulting to `gemini/gemini-1.5-flash` or similar. |

#### **Required for Contact Form (Email)**
To enable the contact form to actually send emails, you need to provide SMTP details. If you have a Gmail account, you can use an [App Password](https://support.google.com/accounts/answer/185833).

| Variable | Description | Example |
|----------|-------------|---------|
| `EMAIL_USER` | Your email address (sender). | `yourname@gmail.com` |
| `EMAIL_PASSWORD` | Your email App Password. | `xxxx xxxx xxxx xxxx` |
| `EMAIL_TO` | Where to send the contact messages. | `yourname@gmail.com` |
| `EMAIL_HOST` | SMTP Host. | `smtp.gmail.com` |
| `EMAIL_PORT` | SMTP Port. | `587` |

> **Note:** If these are not set, the backend will simply LOG the messages to the console instead of sending an email.

### 3. API Endpoints
- `POST /api/chat`: Chat with the AI.
- `POST /api/contact`: Send a contact message.
- `GET /health`: Check if backend is running.
