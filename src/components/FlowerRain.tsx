import React, { useEffect, useRef } from 'react';

interface FlowerRainProps {
  durationMs?: number;
  onComplete?: () => void;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  emoji: string;
  wobble: number;
  wobbleSpeed: number;
}

// Festive Flower Petal Confetti (🌺🌻🌹🌷)
export const FLOWER_PETAL_EMOJIS = ['🌺', '🌻', '🌹', '🌷'];

interface FlowerRainProps {
  durationMs?: number; // Defaults to 2000ms (2 seconds)
  onComplete?: () => void;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  gravity: number;
  drag: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  emoji: string;
  wobble: number;
  wobbleSpeed: number;
}

export const FlowerRain: React.FC<FlowerRainProps> = ({
  durationMs = 2000,
  onComplete
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const startTime = Date.now();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const count = Math.min(100, Math.max(60, Math.floor(window.innerWidth / 12)));

    // Create a dual-action confetti:
    // 1. Initial celebratory burst from bottom-center/mid-screen
    // 2. Cascading celebratory shower from the top
    for (let i = 0; i < count; i++) {
      const isBurst = i < count * 0.55;
      const angle = Math.random() * Math.PI - Math.PI; // upward burst angle
      const speed = Math.random() * 12 + 6;

      particles.push({
        x: isBurst ? canvas.width * 0.5 + (Math.random() - 0.5) * 200 : Math.random() * canvas.width,
        y: isBurst ? canvas.height * 0.55 + (Math.random() - 0.5) * 100 : -20 - Math.random() * 250,
        size: Math.random() * 16 + 24, // 24px - 40px
        speedX: isBurst ? Math.cos(angle) * speed : (Math.random() - 0.5) * 3,
        speedY: isBurst ? Math.sin(angle) * speed : Math.random() * 4 + 4,
        gravity: 0.28,
        drag: isBurst ? 0.96 : 0.99,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        opacity: 1,
        emoji: FLOWER_PETAL_EMOJIS[Math.floor(Math.random() * FLOWER_PETAL_EMOJIS.length)],
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.08 + 0.03
      });
    }

    const render = () => {
      const elapsed = Date.now() - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fade out smoothly in the last 500ms of the 2-second window
      let globalAlpha = 1;
      const fadeDuration = 500;
      if (elapsed > durationMs - fadeDuration) {
        globalAlpha = Math.max(0, (durationMs - elapsed) / fadeDuration);
      }

      particles.forEach((p) => {
        p.speedX *= p.drag;
        p.speedY = p.speedY * p.drag + p.gravity;
        p.x += p.speedX;
        p.y += p.speedY;

        p.wobble += p.wobbleSpeed;
        p.x += Math.sin(p.wobble) * 2;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity * globalAlpha;
        ctx.font = `${p.size}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.emoji, 0, 0);
        ctx.restore();
      });

      if (elapsed < durationMs) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (onComplete) onComplete();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [durationMs, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};
