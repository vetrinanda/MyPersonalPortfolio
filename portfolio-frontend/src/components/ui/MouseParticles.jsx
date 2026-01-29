import { useEffect, useRef } from 'react';
import { useTheme } from '../ThemeProvider';

const MouseParticles = () => {
    const canvasRef = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let mouse = { x: null, y: null };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5; // Random size between 0.5 and 2.5
                this.speedX = Math.random() * 1 - 0.5; // Speed between -0.5 and 0.5
                this.speedY = Math.random() * 1 - 0.5;
                this.color = theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)';
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Bounce off edges
                if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
                if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

                // Mouse interaction
                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    const maxDistance = 150;

                    if (distance < maxDistance) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (maxDistance - distance) / maxDistance;
                        const directionX = forceDirectionX * force * 2; // Attraction strength
                        const directionY = forceDirectionY * force * 2;

                        this.x += directionX;
                        this.y += directionY;
                    }
                }
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            const numberOfParticles = (canvas.width * canvas.height) / 15000; // Density
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Draw connections
                // Connect to mouse
                if (mouse.x != null) {
                    let dx = mouse.x - particles[i].x;
                    let dy = mouse.y - particles[i].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = theme === 'dark' ? `rgba(255, 255, 255, ${0.2 - distance / 150 * 0.2})` : `rgba(0, 0, 0, ${0.2 - distance / 150 * 0.2})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }

                // Connect to other particles (optional, can be expensive)
                // for (let j = i; j < particles.length; j++) {
                //     let dx = particles[i].x - particles[j].x;
                //     let dy = particles[i].y - particles[j].y;
                //     let distance = Math.sqrt(dx * dx + dy * dy);
                //     if (distance < 100) {
                //         ctx.beginPath();
                //         ctx.strokeStyle = theme === 'dark' ? `rgba(255, 255, 255, ${0.1 - distance/100 * 0.1})` : `rgba(0, 0, 0, ${0.1 - distance/100 * 0.1})`;
                //         ctx.lineWidth = 0.5;
                //         ctx.moveTo(particles[i].x, particles[i].y);
                //         ctx.lineTo(particles[j].x, particles[j].y);
                //         ctx.stroke();
                //     }
                // }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
        />
    );
};

export default MouseParticles;
