import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, User, Minimize2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { portfolioData } from '../data/portfolioData';
import ReactMarkdown from 'react-markdown';

export default function Chatbot({ isOpen, onToggle }) {
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: 'assistant',
            content: `Hi there! I'm Luffy, an Genius AI assistant for my friend's ${portfolioData.personal.name}'s portfolio. I can answer questions about his background, projects, skills, and experience. What would you like to know about my friend?`
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = {
            id: Date.now(),
            role: 'user',
            content: input.trim()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Try to connect to the backend
            const response = await fetch('http://localhost:8000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage.content,
                    session_id: 'user-session-' + Date.now()
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessages(prev => [...prev, {
                    id: Date.now(),
                    role: 'assistant',
                    content: data.response
                }]);
            } else {
                throw new Error('Backend not available');
            }
        } catch (error) {
            // Fallback: Generate response from local data
            const fallbackResponse = generateLocalResponse(userMessage.content);
            setMessages(prev => [...prev, {
                id: Date.now(),
                role: 'assistant',
                content: fallbackResponse
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Generate response from local portfolio data when backend is not available
    const generateLocalResponse = (query) => {
        const q = query.toLowerCase();
        const { personal, skills, projects, experience, education, certifications } = portfolioData;

        // Skills related
        if (q.includes('skill') || q.includes('technology') || q.includes('tech stack') || q.includes('know')) {
            const allSkills = skills.flatMap(cat => cat.items.map(s => s.name)).join(', ');
            return `${personal.name} is proficient in a wide range of technologies including: ${allSkills}. Their strongest areas include frontend development with React.js and backend development with Node.js and FastAPI.`;
        }

        // Projects related
        if (q.includes('project') || q.includes('work') || q.includes('built') || q.includes('portfolio')) {
            const projectList = projects.slice(0, 3).map(p => `**${p.title}**: ${p.description}`).join('\n\n');
            return `Here are some of ${personal.name}'s notable projects:\n\n${projectList}\n\nYou can find more details and links to live demos in the Projects section above!`;
        }

        // Experience related
        if (q.includes('experience') || q.includes('internship') || q.includes('job') || q.includes('company')) {
            if (experience.length === 0) {
                return `${personal.name} is actively seeking opportunities. Feel free to reach out via the contact section!`;
            }
            const expList = experience.map(e => `**${e.position}** at ${e.company} (${e.startDate} - ${e.endDate})`).join('\n');
            return `Here's ${personal.name}'s professional experience:\n\n${expList}`;
        }

        // Education related
        if (q.includes('education') || q.includes('degree') || q.includes('study') || q.includes('college') || q.includes('university')) {
            const eduList = education.map(e => `**${e.degree}** in ${e.field} from ${e.institution} (${e.endYear}) - ${e.grade}`).join('\n');
            return `Here's ${personal.name}'s educational background:\n\n${eduList}`;
        }

        // Certifications
        if (q.includes('certification') || q.includes('certificate') || q.includes('certified')) {
            const certList = certifications.map(c => `**${c.name}** from ${c.issuer} (${c.dateIssued})`).join('\n');
            return `${personal.name} holds the following certifications:\n\n${certList}`;
        }

        // Contact info
        if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire')) {
            return `You can reach ${personal.name} at:\n\n📧 Email: ${personal.email}\n📍 Location: ${personal.location}\n\nOr use the contact form above to send a message directly!`;
        }

        // About/Bio
        if (q.includes('about') || q.includes('who') || q.includes('tell me about') || q.includes('introduction')) {
            return `${personal.name} is a ${personal.title} based in ${personal.location}. ${personal.bio.split('\n')[0]}`;
        }

        // Default response
        return `I can help you learn about ${personal.name}'s:\n\n• **Skills & Technologies** - Programming languages, frameworks, and tools\n• **Projects** - Portfolio of work with live demos\n• **Experience** - Work history and internships\n• **Education** - Academic background\n• **Certifications** - Professional certifications\n• **Contact** - How to get in touch\n\nWhat would you like to know more about?`;
    };

    return (
        <>
            {/* Chat Button */}
            <button
                onClick={onToggle}
                className={cn(
                    'fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all duration-300 z-50',
                    isOpen
                        ? 'bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]'
                        : 'gradient-bg text-white hover:scale-110'
                )}
                aria-label="Toggle chat"
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <MessageCircle className="w-6 h-6" />
                )}
            </button>

            {/* Chat Window */}
            <div
                className={cn(
                    'fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-3rem)] rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 z-40',
                    'bg-[hsl(var(--card))] border border-[hsl(var(--border))]',
                    isOpen
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 translate-y-4 pointer-events-none'
                )}
            >
                {/* Header */}
                <div className="gradient-bg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary-foreground/20">
                            <img src="/luffy-manga.png" alt="Luffy AI" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="font-bold text-primary-foreground">AI Assistant</h3>
                            <p className="text-xs text-primary-foreground/70">Ask me anything!</p>
                        </div>
                    </div>
                    <button
                        onClick={onToggle}
                        className="p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors text-primary-foreground"
                        aria-label="Minimize chat"
                    >
                        <Minimize2 className="w-5 h-5" />
                    </button>
                </div>

                {/* Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={cn(
                                'flex gap-3',
                                message.role === 'user' ? 'flex-row-reverse' : ''
                            )}
                        >
                            <div
                                className={cn(
                                    'w-10 h-10 rounded-full flex items-center justify-center shrink-0 overflow-hidden',
                                    message.role === 'user'
                                        ? 'bg-primary border border-primary-foreground/20'
                                        : 'border border-primary/20 bg-background'
                                )}
                            >
                                {message.role === 'user' ? (
                                    <User className="w-4 h-4 text-primary-foreground" />
                                ) : (
                                    <img src="/luffy-manga.png" alt="Luffy AI" className="w-full h-full object-cover" />
                                )}
                            </div>


                            <div
                                className={cn(
                                    'max-w-[75%] p-3 rounded-2xl text-sm shadow-md border',
                                    message.role === 'user'
                                        ? 'bg-primary text-primary-foreground rounded-tr-sm border-primary/20'
                                        : 'bg-muted rounded-tl-sm border-border/50'
                                )}
                            >
                                <div className="prose dark:prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-black/10 prose-pre:p-2 prose-pre:rounded-lg">
                                    <ReactMarkdown
                                        components={{
                                            p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                            ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2 last:mb-0" {...props} />,
                                            ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2 last:mb-0" {...props} />,
                                            li: ({ node, ...props }) => <li className="mb-1 last:mb-0" {...props} />,
                                            a: ({ node, ...props }) => <a className="underline hover:text-primary font-medium" target="_blank" rel="noopener noreferrer" {...props} />,
                                        }}
                                    >
                                        {message.content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-primary/20 bg-background">
                                <img src="/luffy-manga.png" alt="Luffy AI" className="w-full h-full object-cover" />
                            </div>
                            <div className="bg-[hsl(var(--muted))] p-3 rounded-2xl rounded-tl-sm">
                                <Loader2 className="w-5 h-5 animate-spin text-[hsl(var(--primary))]" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={sendMessage} className="p-4 border-t border-[hsl(var(--border))]">
                    <div className="flex gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-2 rounded-full bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:ring-opacity-20 text-sm transition-all"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="p-2 rounded-full gradient-bg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
