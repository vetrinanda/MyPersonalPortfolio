import { useState, useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

const DARK_BG_IMAGES = [
    '/images/dark-bg.jpg',
    '/images/dark-bg-2.jpg',
    '/images/dark-bg-3.jpg',
    '/images/dark-bg-4.jpg',
    '/images/dark-bg-5.jpg',
    '/images/dark-bg-6.jpg',
];

// Random transform origins for the Ken Burns zoom effect
const ZOOM_ORIGINS = [
    'center center',
    'top left',
    'top right',
    'bottom left',
    'bottom right',
    'center top',
];

export default function DarkModeBackground() {
    const { theme } = useTheme();
    const [layers, setLayers] = useState([
        { index: 0, active: true, key: 0 },
    ]);
    const keyRef = useRef(1);

    useEffect(() => {
        if (theme !== 'dark') return;

        const interval = setInterval(() => {
            const nextImgIndex = (layers[layers.length - 1].index + 1) % DARK_BG_IMAGES.length;
            const newKey = keyRef.current++;

            // Add new layer on top (starts invisible, fades + zooms in)
            setLayers(prev => [
                ...prev,
                { index: nextImgIndex, active: false, key: newKey },
            ]);

            // Trigger the animation after a frame
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setLayers(prev =>
                        prev.map(l => l.key === newKey ? { ...l, active: true } : l)
                    );
                });
            });

            // Clean up old layers after transition completes
            setTimeout(() => {
                setLayers(prev => {
                    if (prev.length > 2) {
                        return prev.slice(-2);
                    }
                    return prev;
                });
            }, 2000);
        }, 10000);

        return () => clearInterval(interval);
    }, [theme, layers]);

    if (theme !== 'dark') return null;

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {layers.map((layer) => (
                <div
                    key={layer.key}
                    style={{
                        position: 'absolute',
                        inset: '-20px',
                        backgroundImage: `url('${DARK_BG_IMAGES[layer.index]}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        transformOrigin: ZOOM_ORIGINS[layer.index % ZOOM_ORIGINS.length],
                        opacity: layer.active ? 1 : 0,
                        transform: layer.active ? 'scale(1.08)' : 'scale(1.15)',
                        transition: 'opacity 1.8s ease-in-out, transform 10s ease-out',
                    }}
                />
            ))}
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/75" />
        </div>
    );
}
