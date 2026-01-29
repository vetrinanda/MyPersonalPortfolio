import { useEffect, useState, useRef } from 'react';
import { Code2, Layout, Server, Database, Wrench } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { cn } from '../lib/utils';

const categoryIcons = {
    'Programming Languages': Code2,
    'Frontend': Layout,
    'Backend': Server,
    'Database': Database,
    'Tools & DevOps': Wrench,
};

export default function Skills() {
    const { skills } = portfolioData;
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="skills" className="section bg-[hsl(var(--muted))] dark:bg-[hsl(var(--card))]" ref={sectionRef}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="section-title gradient-text">Skills</h2>
                    <p className="section-subtitle">
                        Technologies and tools I work with
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {skills.map((category, categoryIndex) => {
                        const Icon = categoryIcons[category.category] || Code2;

                        return (
                            <div
                                key={category.id}
                                className="card hover-lift animate-fadeIn"
                                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
                            >
                                {/* Category Header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg gradient-bg text-white">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-bold">{category.category}</h3>
                                </div>

                                {/* Skills List */}
                                <div className="space-y-4">
                                    {category.items.map((skill, skillIndex) => (
                                        <div key={skill.name}>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm font-medium">{skill.name}</span>
                                                <span className="text-sm text-[hsl(var(--primary))] font-bold">
                                                    {skill.percentage}%
                                                </span>
                                            </div>
                                            <div className="progress-bar">
                                                <div
                                                    className={cn(
                                                        'progress-bar-fill',
                                                        isVisible ? 'transition-all duration-1000' : ''
                                                    )}
                                                    style={{
                                                        width: isVisible ? `${skill.percentage}%` : '0%',
                                                        transitionDelay: isVisible ? `${(categoryIndex * 5 + skillIndex) * 100}ms` : '0ms'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Tech Icons Marquee */}
                <div className="mt-16 overflow-hidden">
                    <div className="flex gap-8 animate-marquee">
                        {[...skills.flatMap(s => s.items), ...skills.flatMap(s => s.items)].map((skill, i) => (
                            <div
                                key={`${skill.name}-${i}`}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--background))] border border-[hsl(var(--border))] whitespace-nowrap"
                            >
                                <span className="w-2 h-2 rounded-full gradient-bg" />
                                <span className="text-sm font-medium">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
        </section>
    );
}
