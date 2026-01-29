import { useState, useRef } from 'react';
import { Github, Linkedin, Twitter, ChevronDown, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { portfolioData } from '../data/portfolioData';
import { DotPattern } from "@/components/ui/dot-pattern";
import MouseParticles from "@/components/ui/MouseParticles";
import { cn } from "@/lib/utils";
import { TbBrandLeetcode } from "react-icons/tb";

export default function Hero() {
    const { personal } = portfolioData;
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const sectionRef = useRef(null);

    const handleMouseMove = (e) => {
        if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    const scrollToAbout = () => {
        document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="home"
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
        >
            <MouseParticles />
            {/* Base Dot Pattern (Small Dots) */}
            <DotPattern
                className={cn(
                    "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
                    "opacity-40"
                )}
            />

            {/* Hover Dot Pattern (Large Dots - Flashlight Effect) */}
            <DotPattern
                cr={4} // Much larger radius for stronger effect
                className={cn(
                    "opacity-100 mix-blend-overlay pointer-events-none transition-opacity duration-300",
                )}
                style={{
                    maskImage: `radial-gradient(250px circle at ${mousePosition.x}px ${mousePosition.y}px, white, transparent)`,
                    WebkitMaskImage: `radial-gradient(250px circle at ${mousePosition.x}px ${mousePosition.y}px, white, transparent)`,
                }}
            />

            {/* Background Elements - Subtle Gradient */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-transparent via-background/50 to-background" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Profile Image */}
                    <div className="relative animate-fadeIn">
                        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[hsl(var(--primary))] p-1 relative">
                            <div className="w-full h-full rounded-full overflow-hidden gradient-bg flex items-center justify-center">
                                {personal.profileImage ? (
                                    <img
                                        src={personal.profileImage}
                                        alt={personal.name}
                                        className="w-full h-full object-cover rounded-full"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                ) : null}
                                <div className="w-full h-full rounded-full gradient-bg flex items-center justify-center text-6xl font-bold text-white" style={{ display: personal.profileImage ? 'none' : 'flex' }}>
                                    {personal.name.split(' ').map(n => n[0]).join('')}
                                </div>
                            </div>
                        </div>
                        {/* Decorative Ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-dashed border-[hsl(var(--primary))] opacity-50 animate-spin" style={{ animationDuration: '20s' }} />
                    </div>

                    {/* Content */}
                    <div className="text-center lg:text-left max-w-2xl">
                        <div className="animate-slideInRight" style={{ animationDelay: '0.2s' }}>
                            <p className="text-[hsl(var(--primary))] font-medium mb-2">Hello, I'm</p>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
                                {personal.name.split(' ').map((word, i) => (
                                    <span key={i}>
                                        {i === 0 ? (
                                            <span className="gradient-text">{word}</span>
                                        ) : (
                                            <span> {word}</span>
                                        )}
                                    </span>
                                ))}
                            </h1>
                            <h2 className="text-xl md:text-2xl text-[hsl(var(--muted-foreground))] mb-4">
                                {personal.title}
                            </h2>
                            <p className="text-lg text-[hsl(var(--muted-foreground))] mb-8 max-w-xl mx-auto lg:mx-0">
                                {personal.tagline}
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-slideInRight" style={{ animationDelay: '0.4s' }}>
                            <Button
                                asChild
                                className="rounded-full bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 shadow-lg px-8"
                                size="lg"
                            >
                                <a href={personal.resumePDF} download>
                                    <Download className="w-5 h-5 mr-2" />
                                    Download Resume
                                </a>
                            </Button>
                            <Button
                                asChild
                                variant="ghost"
                                size="lg"
                                className="rounded-full px-8 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            >
                                <a
                                    href="#contact"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    Get in Touch
                                </a>
                            </Button>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-5 mt-6 justify-center lg:justify-start animate-slideInRight" style={{ animationDelay: '0.6s' }}>
                            {personal.socialLinks.github && (
                                <a
                                    href={personal.socialLinks.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all hover-lift"
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
                                    className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all hover-lift"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            )}
                            {personal.socialLinks.leetcode && (
                                <a
                                    href={personal.socialLinks.leetcode}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all hover-lift"
                                    aria-label="LeetCode"
                                >
                                    <TbBrandLeetcode className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="mt-16 flex justify-center animate-fadeIn" style={{ animationDelay: '0.8s' }}>
                    <button
                        onClick={scrollToAbout}
                        className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer opacity-70 hover:opacity-100"
                    >
                        <span className="text-xs font-medium uppercase tracking-wider">Scroll Down</span>
                        <ChevronDown className="w-5 h-5 animate-bounce" />
                    </button>
                </div>
            </div>
        </section>
    );
}
