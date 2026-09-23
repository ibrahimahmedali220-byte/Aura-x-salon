import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '../data/salonData';
import { Card3D } from './Card3D';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="relative py-28 bg-[#0a0806] border-t border-[#1c1813] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#14100b] mb-4">
            <Sparkles className="w-3 h-3 text-[#c5a059]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#d4af37] font-medium">
              Client Chronicles & Acclaim
            </span>
          </div>

          <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.15] mb-6">
            Words from our <span className="italic text-gold-gradient font-light">Discerning Guests</span>
          </h2>

          <p className="text-sm sm:text-base text-[#b5a896] leading-relaxed font-light">
            Read authentic impressions from international tastemakers, editors, and guests who entrust their beauty rituals to AURA & D'OR.
          </p>
        </div>

        {/* Carousel Container with 3D Tilt Wrapper */}
        <div
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <Card3D intensity={8} glowColor="rgba(212, 175, 55, 0.2)">
            <div className="relative p-8 sm:p-12 md:p-16 rounded-3xl bg-gradient-to-b from-[#140f0a] via-[#100c08] to-[#0a0806] border border-[#c5a059]/35 shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
              {/* Quote Mark Icon */}
              <div className="absolute top-8 right-8 md:top-12 md:right-12 text-[#c5a059]/20">
                <Quote className="w-16 h-16 sm:w-20 sm:h-20 rotate-180" />
              </div>

              {/* Slider Content */}
              <div className="relative z-10 min-h-[260px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Stars & Verified Badge */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex items-center gap-1 text-[#c5a059]">
                        {[...Array(current.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#c5a059]" />
                        ))}
                      </div>
                      <span className="text-[11px] text-[#8e8170]">|</span>
                      <div className="flex items-center gap-1 text-[11px] uppercase tracking-widest text-[#d8c39e]">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                        Verified VIP Atelier Guest
                      </div>
                    </div>

                    {/* Testimonial Quote */}
                    <p className="font-cormorant text-2xl sm:text-3xl text-[#f3ebde] italic leading-relaxed font-light mb-8 max-w-2xl">
                      "{current.comment}"
                    </p>

                    {/* Client Identity & Service Meta */}
                    <div className="flex items-center gap-4 pt-6 border-t border-[#231a11]">
                      <img
                        src={current.avatar}
                        alt={current.clientName}
                        className="w-14 h-14 rounded-full object-cover border-2 border-[#c5a059]/50 shadow-md"
                      />
                      <div>
                        <h4 className="text-base font-semibold text-white tracking-wide">
                          {current.clientName}
                        </h4>
                        <div className="text-xs text-[#c5a059] font-light">
                          {current.roleOrCity}
                        </div>
                        <div className="text-[11px] text-[#8e8271] mt-0.5">
                          Treatment: <span className="text-[#bfb2a0]">{current.service}</span> • {current.date}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Carousel Controls */}
                <div className="flex items-center justify-between mt-8 pt-4">
                  {/* Indicators */}
                  <div className="flex items-center gap-2">
                    {TESTIMONIALS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Go to review ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          currentIndex === idx
                            ? 'w-8 bg-gold-gradient'
                            : 'w-2 bg-[#2d2217] hover:bg-[#c5a059]/50'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      aria-label="Previous Review"
                      className="p-2.5 rounded-full border border-[#312518] bg-[#17120c] text-[#d6cec0] hover:text-[#c5a059] hover:border-[#c5a059]/50 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      aria-label="Next Review"
                      className="p-2.5 rounded-full border border-[#312518] bg-[#17120c] text-[#d6cec0] hover:text-[#c5a059] hover:border-[#c5a059]/50 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card3D>
        </div>
      </div>
    </section>
  );
};
