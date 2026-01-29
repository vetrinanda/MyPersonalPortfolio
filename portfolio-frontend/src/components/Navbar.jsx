import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, MessageCircle, Home, User, GraduationCap, Briefcase, Folder, Cpu, Award, Mail } from 'lucide-react';

// Map navigation names to icons
const navIcons = {
    "Home": Home,
    "About": User,
    "Education": GraduationCap,
    "Experience": Briefcase,
    "Projects": Folder,
    "Skills": Cpu,
    "Certifications": Award,
    "Contact": Mail
};
import { useTheme } from './ThemeProvider';
import { portfolioData } from '../data/portfolioData';
import { cn } from '../lib/utils';

import { Button } from "@/components/ui/button";

export default function Navbar({ onChatToggle }) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const { theme, toggleTheme } = useTheme();
    const { navigation, personal } = portfolioData;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Update active section based on scroll position
            const sections = navigation.map(item => item.href.substring(1));
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (current) {
                setActiveSection(current);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [navigation]);

    const handleNavClick = (href) => {
        setIsOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                scrolled ? 'glass py-3 shadow-lg' : 'py-5'
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <a
                    href="#home"
                    className="text-xl font-bold gradient-text"
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavClick('#home');
                    }}
                >
                    {personal.name.split(' ')[0]}
                    <span className="text-[hsl(var(--foreground))]">.</span>
                </a>

                {/* Desktop Navigation (Icons) */}
                <div className="hidden md:flex items-center gap-4 bg-muted/50 p-2 rounded-full backdrop-blur-sm border border-border/50 dark:border-white/10 dark:shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                    {navigation.map((item) => {
                        const Icon = navIcons[item.name] || Home;
                        const isActive = activeSection === item.href.substring(1);

                        return (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(item.href);
                                }}
                                className={cn(
                                    "p-3 rounded-2xl transition-all duration-300 group relative flex items-center justify-center",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-md dark:shadow-[0_0_10px_rgba(255,255,255,0.15)] scale-110"
                                        : "hover:bg-background hover:text-foreground text-muted-foreground"
                                )}
                                title={item.name}
                            >
                                <Icon className="w-5 h-5" />
                                {/* Tooltip */}
                                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                    {item.name}
                                </span>
                            </a>
                        );
                    })}
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <Sun className="w-5 h-5" />
                        ) : (
                            <Moon className="w-5 h-5" />
                        )}
                    </button>
                    <Button
                        onClick={onChatToggle}
                        className="rounded-full bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 shadow-md px-6"
                        size="sm"
                    >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Ask Luffy
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden items-center gap-2">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <Sun className="w-5 h-5" />
                        ) : (
                            <Moon className="w-5 h-5" />
                        )}
                    </button>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={cn(
                    'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
                    isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                )}
            >
                <div className="container mx-auto px-4 py-4 glass mt-2 rounded-xl">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(item.href);
                            }}
                            className="block py-3 text-center font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] rounded-lg transition-all"
                        >
                            {item.name}
                        </a>
                    ))}
                    <Button
                        onClick={() => {
                            setIsOpen(false);
                            onChatToggle();
                        }}
                        className="w-full mt-4 rounded-full bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 shadow-md"
                    >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chat with AI
                    </Button>
                </div>
            </div>
        </nav>
    );
}
