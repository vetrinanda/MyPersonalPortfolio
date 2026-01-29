import { Heart, Github, Linkedin, Twitter } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Footer() {
    const { personal, navigation } = portfolioData;
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 border-t border-[hsl(var(--border))]">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <a href="#home" className="text-2xl font-bold gradient-text">
                            {personal.name.split(' ')[0]}
                            <span className="text-[hsl(var(--foreground))]">.</span>
                        </a>
                        <p className="mt-4 text-[hsl(var(--muted-foreground))] text-sm max-w-xs">
                            {personal.tagline}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {navigation.slice(0, 5).map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="font-semibold mb-4">Connect</h4>
                        <div className="flex gap-3">
                            {personal.socialLinks.github && (
                                <a
                                    href={personal.socialLinks.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-[hsl(var(--muted))] hover:bg-[hsl(var(--primary))] hover:text-white transition-all"
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
                                    className="p-2 rounded-lg bg-[hsl(var(--muted))] hover:bg-[hsl(var(--primary))] hover:text-white transition-all"
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
                                    className="p-2 rounded-lg bg-[hsl(var(--muted))] hover:bg-[hsl(var(--primary))] hover:text-white transition-all"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                        <p className="mt-4 text-sm text-[hsl(var(--muted-foreground))]">
                            {personal.email}
                        </p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-[hsl(var(--border))] text-center">
                    <p className="text-sm text-[hsl(var(--muted-foreground))] flex items-center justify-center gap-1">
                        © {currentYear} {personal.name}. Made with{' '}
                        <Heart className="w-4 h-4 text-red-500 fill-red-500" /> and React
                    </p>
                </div>
            </div>
        </footer>
    );
}
