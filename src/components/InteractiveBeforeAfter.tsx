import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, MoveHorizontal, Scissors, UserCheck } from 'lucide-react';
import { BEFORE_AFTER_ITEMS } from '../data/salonData';

export const InteractiveBeforeAfter: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentItem = BEFORE_AFTER_ITEMS[selectedIndex];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <section id="transformations" className="relative py-28 bg-[#0a0806] border-t border-[#1c1813] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#14100b] mb-4">
            <Sparkles className="w-3 h-3 text-[#c5a059]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#d4af37] font-medium">
              Interactive Transformations
            </span>
          </div>

          <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.15] mb-6">
            Witness the <span className="italic text-gold-gradient font-light">Haute Metamorphosis</span>
          </h2>

          <p className="text-sm sm:text-base text-[#b5a896] leading-relaxed font-light">
            Slide the golden divider to reveal the dramatic radiance unlocked by our master European colorists and aesthetic sculptors.
          </p>
        </div>

        {/* Transformation Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {BEFORE_AFTER_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedIndex(idx);
                setSliderPos(50);
              }}
              className={`px-5 py-2.5 rounded-full text-xs tracking-wider uppercase transition-all duration-300 ${
                selectedIndex === idx
                  ? 'bg-[#c5a059] text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'bg-[#15100a] text-[#b8ac9c] border border-[#2b2116] hover:border-[#c5a059]/50 hover:text-white'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Slider Box */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#120d09] p-4 sm:p-6 rounded-3xl border border-[#c5a059]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            {/* The Image Viewport */}
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative h-[380px] sm:h-[480px] md:h-[540px] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-[#292015]"
            >
              {/* After Image (Background layer) */}
              <img
                src={currentItem.afterImage}
                alt={`${currentItem.title} - After`}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />

              {/* After Label Badge */}
              <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#c5a059]/40 text-[11px] uppercase tracking-widest text-[#e5c07b] font-semibold">
                Haute Result (After)
              </div>

              {/* Before Image (Clipped layer) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img
                  src={currentItem.beforeImage}
                  alt={`${currentItem.title} - Before`}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                />
                {/* Before Label Badge */}
                <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#44382c] text-[11px] uppercase tracking-widest text-[#b0a595]">
                  Initial State (Before)
                </div>
              </div>

              {/* Golden Divider Line with Interactive Drag Pill */}
              <div
                className="absolute top-0 bottom-0 z-30 pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                {/* Vertical gold glowing line */}
                <div className="w-[2.5px] h-full bg-gold-gradient shadow-[0_0_12px_rgba(212,175,55,0.8)] -translate-x-1/2" />

                {/* Center drag knob */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-gradient-to-br from-[#dfba73] to-[#9a7332] text-black shadow-[0_0_20px_rgba(212,175,55,0.7)] flex items-center justify-center border-2 border-[#fff2cb]">
                  <MoveHorizontal className="w-5 h-5 text-black" />
                </div>
              </div>

              {/* Drag Prompt Tooltip on first glance */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#c5a059]/30 text-[10px] tracking-widest uppercase text-[#d6cec0] pointer-events-none flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#c5a059]" />
                Drag Left or Right to Inspect
              </div>
            </div>

            {/* Metamorphosis Details Meta */}
            <div className="mt-6 pt-6 border-t border-[#241c13] grid grid-cols-1 sm:grid-cols-3 gap-4 items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#8f8270] block">
                  Artisan Treatment
                </span>
                <span className="text-sm font-semibold text-white flex items-center gap-1.5 mt-0.5">
                  <Scissors className="w-3.5 h-3.5 text-[#c5a059]" />
                  {currentItem.treatment}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#8f8270] block">
                  Lead Master Artisan
                </span>
                <span className="text-sm font-semibold text-[#e5c07b] flex items-center gap-1.5 mt-0.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                  {currentItem.stylist}
                </span>
              </div>

              <div className="sm:text-right">
                <span className="text-[11px] text-[#a89d8d] italic block">
                  "{currentItem.description}"
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
