import { Award, ExternalLink, Calendar } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Certifications() {
    const { certifications } = portfolioData;

    return (
        <section id="certifications" className="section">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="section-title gradient-text">Certifications</h2>
                    <p className="section-subtitle">
                        Professional certifications and achievements
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {certifications.map((cert, index) => (
                        <div
                            key={cert.id}
                            className="card hover-lift group animate-fadeIn"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Certificate Image/Icon */}
                            <div className="relative h-32 -mx-6 -mt-6 mb-4 overflow-hidden bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--gradient-end))] flex items-center justify-center">
                                {cert.image ? (
                                    <img
                                        src={cert.image}
                                        alt={cert.name}
                                        className="h-20 w-auto object-contain"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                ) : null}
                                <div
                                    className="flex items-center justify-center"
                                    style={{ display: cert.image ? 'none' : 'flex' }}
                                >
                                    <Award className="w-16 h-16 text-white opacity-80" />
                                </div>

                                {/* Decorative Pattern */}
                                <div className="absolute inset-0 opacity-10">
                                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                            <circle cx="5" cy="5" r="1" fill="white" />
                                        </pattern>
                                        <rect width="100" height="100" fill="url(#grid)" />
                                    </svg>
                                </div>
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className="text-lg font-bold mb-1 group-hover:text-[hsl(var(--primary))] transition-colors line-clamp-2">
                                    {cert.name}
                                </h3>
                                <p className="text-[hsl(var(--primary))] font-medium text-sm mb-2">
                                    {cert.issuer}
                                </p>

                                <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] mb-3">
                                    <Calendar className="w-4 h-4" />
                                    <span>{cert.dateIssued}</span>
                                </div>

                                {cert.description && (
                                    <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4 line-clamp-2">
                                        {cert.description}
                                    </p>
                                )}

                                {cert.credentialUrl && (
                                    <a
                                        href={cert.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-medium text-[hsl(var(--primary))] hover:underline"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Verify Credential
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {certifications.length === 0 && (
                    <div className="card text-center py-12 max-w-md mx-auto">
                        <Award className="w-16 h-16 mx-auto mb-4 text-[hsl(var(--muted-foreground))] opacity-50" />
                        <p className="text-[hsl(var(--muted-foreground))]">
                            Certifications will appear here once added to portfolioData.js
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
