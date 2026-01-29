import { GraduationCap, Calendar, Award } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Education() {
    const { education } = portfolioData;

    // Sort by endYear descending (most recent first)
    const sortedEducation = [...education].sort((a, b) => b.endYear - a.endYear);

    return (
        <section id="education" className="section">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="section-title gradient-text">Education</h2>
                    <p className="section-subtitle">
                        My academic journey and qualifications
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[hsl(var(--primary))] to-[hsl(var(--gradient-end))]" />

                        {sortedEducation.map((item, index) => (
                            <div
                                key={item.id}
                                className={`relative flex items-center mb-8 last:mb-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[hsl(var(--primary))] border-4 border-[hsl(var(--background))] transform -translate-x-1/2 z-10" />

                                {/* Content */}
                                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 pl-12 md:pl-0' : 'md:pl-12 pl-12'}`}>
                                    <div className="card hover-lift animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                                        {/* Header */}
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="p-3 rounded-xl gradient-bg text-white shrink-0">
                                                <GraduationCap className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold">{item.degree}</h3>
                                                <p className="text-[hsl(var(--primary))] font-medium">{item.field}</p>
                                            </div>
                                        </div>

                                        {/* Institution */}
                                        <h4 className="text-[hsl(var(--muted-foreground))] font-medium mb-2">
                                            {item.institution}
                                        </h4>

                                        {/* Meta Info */}
                                        <div className="flex flex-wrap gap-4 text-sm text-[hsl(var(--muted-foreground))] mb-3">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>{item.startYear} - {item.endYear}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Award className="w-4 h-4" />
                                                <span className="text-[hsl(var(--primary))] font-medium">{item.grade}</span>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        {item.description && (
                                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
