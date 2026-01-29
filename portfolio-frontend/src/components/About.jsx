import { Download, Mail, MapPin, Phone } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function About() {
    const { personal } = portfolioData;

    return (
        <section id="about" className="section bg-muted/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="section-title gradient-text">About Me</h2>
                    <p className="section-subtitle">
                        Get to know more about my journey and passion for technology
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <Card className="hover-lift shadow-lg dark:border-white/20">
                        <CardContent className="p-8 md:p-10">
                            <div className="grid md:grid-cols-3 gap-8">
                                {/* Bio Section */}
                                <div className="md:col-span-2 space-y-4">
                                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                        Hey there! <span className="animate-wave">👋</span>
                                    </h3>
                                    <div className="text-muted-foreground space-y-4 leading-relaxed">
                                        {personal.bio.split('\n\n').map((paragraph, i) => (
                                            <p key={i}>{paragraph.trim()}</p>
                                        ))}
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="space-y-6">
                                    <h4 className="text-lg font-semibold">Quick Info</h4>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-muted-foreground group">
                                            <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-muted-foreground/80">Email</p>
                                                <a
                                                    href={`mailto:${personal.email}`}
                                                    className="text-sm font-medium hover:text-primary transition-colors"
                                                >
                                                    {personal.email}
                                                </a>
                                            </div>
                                        </div>

                                        {personal.phone && (
                                            <div className="flex items-center gap-3 text-muted-foreground group">
                                                <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                    <Phone className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium text-muted-foreground/80">Phone</p>
                                                    <a
                                                        href={`tel:${personal.phone}`}
                                                        className="text-sm font-medium hover:text-primary transition-colors"
                                                    >
                                                        {personal.phone}
                                                    </a>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-3 text-muted-foreground group">
                                            <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                <MapPin className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-muted-foreground/80">Location</p>
                                                <p className="text-sm font-medium">{personal.location}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Download Resume */}
                                    <Button
                                        className="w-full mt-6 rounded-full bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 shadow-md"
                                        size="lg"
                                        asChild
                                    >
                                        <a href={personal.resumePDF} download>
                                            <Download className="w-4 h-4 mr-2" />
                                            Download Resume
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
