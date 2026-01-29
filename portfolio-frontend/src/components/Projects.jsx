import { useState } from 'react';
import { Github, ExternalLink, Folder, Star, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { portfolioData } from '../data/portfolioData';
import { cn } from '../lib/utils';

export default function Projects() {
    const { projects } = portfolioData;
    const [filter, setFilter] = useState('all');

    const filteredProjects = filter === 'featured'
        ? projects.filter(p => p.featured)
        : projects;

    return (
        <section id="projects" className="section">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="section-title gradient-text">Projects</h2>
                    <p className="section-subtitle">
                        A showcase of my recent work and side projects
                    </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <Button
                        variant={filter === 'all' ? 'default' : 'ghost'}
                        size="lg"
                        onClick={() => setFilter('all')}
                        className={cn(
                            "rounded-full px-8 font-medium transition-all",
                            filter === 'all'
                                ? "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 shadow-md"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        )}
                    >
                        All Projects
                    </Button>
                    <Button
                        variant={filter === 'featured' ? 'default' : 'ghost'}
                        size="lg"
                        onClick={() => setFilter('featured')}
                        className={cn(
                            "rounded-full px-8 gap-2 font-medium transition-all",
                            filter === 'featured'
                                ? "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 shadow-md"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        )}
                    >
                        <Star className="w-4 h-4" />
                        Featured
                    </Button>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <Card
                            key={project.id}
                            className="group overflow-hidden animate-fadeIn border border-border/40 bg-card hover:shadow-none transition-all duration-300 rounded-[2rem]"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Project Image */}
                            <div className="relative aspect-video overflow-hidden bg-muted m-2 rounded-[1.5rem]">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                ) : null}
                                <div
                                    className="absolute inset-0 flex items-center justify-center gradient-bg"
                                    style={{ display: project.image ? 'none' : 'flex' }}
                                >
                                    <Folder className="w-16 h-16 text-white opacity-50" />
                                </div>

                                {/* Floating Action Buttons */}
                                <div className="absolute top-4 right-4 flex gap-2 z-10">
                                    {project.liveDemoUrl && project.liveDemoUrl !== '#' && (
                                        <Button
                                            size="sm"
                                            className="rounded-full bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 shadow-lg h-8 px-4 text-xs font-medium"
                                            asChild
                                        >
                                            <a
                                                href={project.liveDemoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <ExternalLink className="w-3 h-3 mr-1.5" />
                                                Website
                                            </a>
                                        </Button>
                                    )}
                                    {project.githubUrl && (
                                        <Button
                                            size="sm"
                                            className="rounded-full bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 shadow-lg h-8 px-4 text-xs font-medium"
                                            asChild
                                        >
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Github className="w-3 h-3 mr-1.5" />
                                                Source
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {/* Project Info */}
                            <CardContent className="p-6 pt-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <CardTitle className="text-xl font-bold mb-1">
                                            {project.title}
                                        </CardTitle>
                                        <p className="text-sm text-muted-foreground font-medium">
                                            {project.date}
                                        </p>
                                    </div>
                                    {project.liveDemoUrl && (
                                        <a
                                            href={project.liveDemoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-full hover:bg-muted transition-colors"
                                        >
                                            <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                                        </a>
                                    )}
                                </div>

                                <CardDescription className="text-base mb-6 line-clamp-2 leading-relaxed text-muted-foreground/80">
                                    {project.description}
                                </CardDescription>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.slice(0, 4).map((tech) => (
                                        <Badge
                                            key={tech}
                                            variant="outline"
                                            className="font-medium rounded-full px-3 py-1 border-border/50 bg-background/50"
                                        >
                                            {tech}
                                        </Badge>
                                    ))}
                                    {project.technologies.length > 4 && (
                                        <Badge variant="outline" className="font-medium rounded-full px-3 py-1 border-border/50 bg-background/50">
                                            +{project.technologies.length - 4}
                                        </Badge>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="card text-center py-12 max-w-md mx-auto">
                        <Folder className="w-16 h-16 mx-auto mb-4 text-[hsl(var(--muted-foreground))] opacity-50" />
                        <p className="text-[hsl(var(--muted-foreground))]">
                            No projects found with the current filter.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
