import React, { useState, useEffect } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const progress = (totalScroll / windowHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial measurement

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none bg-transparent"
      role="progressbar"
      aria-label="Atelier journey progress"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Background track subtle glow */}
      <div
        className="h-full bg-gradient-to-r from-[#8a6b2d] via-[#d4af37] via-[#f7e7a9] to-[#d4af37] transition-[width] duration-75 ease-out shadow-[0_0_12px_rgba(212,175,55,0.75)]"
        style={{ width: `${scrollProgress}%` }}
      />
      {/* Glowing tip indicator */}
      {scrollProgress > 0 && scrollProgress < 100 && (
        <div
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#fff5db] shadow-[0_0_8px_#ffffff,0_0_16px_#d4af37] -ml-1 transition-all duration-75 pointer-events-none"
          style={{ left: `${scrollProgress}%` }}
        />
      )}
    </div>
  );
};
