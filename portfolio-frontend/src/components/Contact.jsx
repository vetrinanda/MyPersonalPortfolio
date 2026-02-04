import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Loader2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { cn } from '../lib/utils';
import { Button } from "@/components/ui/button";

export default function Contact() {
    const { personal } = portfolioData;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch('https://mypersonalportfolio-2tko.onrender.com/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            setStatus({
                type: 'success',
                message: 'Thank you for your message! I\'ll get back to you soon.'
            });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error(error);
            setStatus({
                type: 'error',
                message: 'Something went wrong. Please try again or email me directly.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="section bg-[hsl(var(--muted))] dark:bg-[hsl(var(--card))]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="section-title gradient-text">Get In Touch</h2>
                    <p className="section-subtitle">
                        Have a project in mind or want to collaborate? Let's talk!
                    </p>
                </div>

                <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8">
                    {/* Contact Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="card">
                            <h3 className="text-xl font-bold mb-6">Contact Information</h3>

                            <div className="space-y-4">
                                <a
                                    href={`mailto:${personal.email}`}
                                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors group"
                                >
                                    <div className="p-3 rounded-lg gradient-bg text-white shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[hsl(var(--muted-foreground))]">Email</p>
                                        <p className="font-medium group-hover:text-[hsl(var(--primary))] transition-colors">
                                            {personal.email}
                                        </p>
                                    </div>
                                </a>

                                {personal.phone && (
                                    <a
                                        href={`tel:${personal.phone}`}
                                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors group"
                                    >
                                        <div className="p-3 rounded-lg gradient-bg text-white shrink-0">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-[hsl(var(--muted-foreground))]">Phone</p>
                                            <p className="font-medium group-hover:text-[hsl(var(--primary))] transition-colors">
                                                {personal.phone}
                                            </p>
                                        </div>
                                    </a>
                                )}

                                <div className="flex items-center gap-4 p-3">
                                    <div className="p-3 rounded-lg gradient-bg text-white shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[hsl(var(--muted-foreground))]">Location</p>
                                        <p className="font-medium">{personal.location}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="mt-8 pt-6 border-t border-[hsl(var(--border))]">
                                <p className="text-sm font-medium mb-4">Connect with me</p>
                                <div className="flex gap-3">
                                    {personal.socialLinks.github && (
                                        <a
                                            href={personal.socialLinks.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 rounded-lg bg-[hsl(var(--muted))] hover:bg-[hsl(var(--primary))] hover:text-white transition-all hover-lift"
                                            aria-label="GitHub"
                                        >
                                            <Github className="w-5 h-5" />
                                        </a>
                                    )}
                                    {personal.socialLinks.linkedin && (
                                        <a
                                            href={personal.socialLinks.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 rounded-lg bg-[hsl(var(--muted))] hover:bg-[hsl(var(--primary))] hover:text-white transition-all hover-lift"
                                            aria-label="LinkedIn"
                                        >
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                    )}
                                    {personal.socialLinks.twitter && (
                                        <a
                                            href={personal.socialLinks.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 rounded-lg bg-[hsl(var(--muted))] hover:bg-[hsl(var(--primary))] hover:text-white transition-all hover-lift"
                                            aria-label="Twitter"
                                        >
                                            <Twitter className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <div className="card">
                            <h3 className="text-xl font-bold mb-6">Send a Message</h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:ring-opacity-20 transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                                            Your Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:ring-opacity-20 transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:ring-opacity-20 transition-all"
                                        placeholder="Project Collaboration"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-lg bg-[hsl(var(--muted))] border border-[hsl(var(--border))] focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:ring-opacity-20 transition-all resize-none"
                                        placeholder="Tell me about your project..."
                                    />
                                </div>

                                {status.message && (
                                    <div
                                        className={cn(
                                            'p-4 rounded-lg text-sm',
                                            status.type === 'success'
                                                ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                                                : 'bg-red-500/10 text-red-500 border border-red-500/20'
                                        )}
                                    >
                                        {status.message}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full justify-center rounded-full bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 shadow-lg py-6 text-base"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5 mr-2" />
                                            Send Message
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
