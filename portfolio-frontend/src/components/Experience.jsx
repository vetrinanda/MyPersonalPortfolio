import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Experience() {
    const { experience } = portfolioData;

    return (
        <section id="experience" className="section bg-muted/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="section-title gradient-text">Experience</h2>
                    <p className="section-subtitle">
                        My professional journey and internships
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {experience.map((item, index) => (
                        <Card
                            key={item.id}
                            className="hover-lift animate-fadeIn shadow-md"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <CardContent className="p-6 md:p-8">
                                {/* Header */}
                                <div className="flex flex-col md:flex-row md:items-start gap-4 mb-6">
                                    <div className="p-3 rounded-xl gradient-bg text-white shrink-0 w-fit shadow-lg">
                                        <Briefcase className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                            <div>
                                                <h3 className="text-xl font-bold">{item.position}</h3>
                                                <p className="text-primary font-semibold text-lg">{item.company}</p>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                                                <Calendar className="w-4 h-4" />
                                                <span>{item.startDate} - {item.current ? 'Present' : item.endDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    {item.description}
                                </p>

                                {/* Achievements */}
                                {item.achievements && item.achievements.length > 0 && (
                                    <div className="mb-6 bg-muted/30 p-4 rounded-lg">
                                        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-primary" />
                                            Key Achievements
                                        </h4>
                                        <ul className="space-y-2">
                                            {item.achievements.map((achievement, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                                    <span>{achievement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2">
                                    {item.technologies.map((tech) => (
                                        <Badge
                                            key={tech}
                                            variant="secondary"
                                            className="px-3 py-1 text-xs font-medium"
                                        >
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {experience.length === 0 && (
                        <Card className="text-center py-12">
                            <CardContent>
                                <Briefcase className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                                <p className="text-muted-foreground">
                                    Experience entries will appear here once added to portfolioData.js
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </section>
    );
}
