import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Crown, Gem, Award, Feather } from 'lucide-react';
import { Card3D } from './Card3D';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: Crown,
      title: '24K Liquid Gold & Rare Botanicals',
      desc: 'Formulations engineered in Swiss laboratories, blending bio-active gold, caviar peptides, and cold-pressed botanical essences.'
    },
    {
      icon: Award,
      title: 'Master European Artisans',
      desc: 'Hand-selected colorists and dermatologic sculptors certified in Paris, Milan, and Beverly Hills with global red-carpet credentials.'
    },
    {
      icon: Gem,
      title: 'Sound-Dampened Private Suites',
      desc: 'Exclusive private chambers designed for high-profile discretion, complete with dedicated concierge, vintage champagne, and curated soundscapes.'
    },
    {
      icon: Feather,
      title: 'Bespoke Chromatic Diagnostics',
      desc: 'Every treatment begins with a multi-spectral scalp, hair porosity, or skin undertone analysis before a single drop of product is blended.'
    }
  ];

  return (
    <section id="about" className="relative py-28 bg-[#0a0a0a] overflow-hidden border-t border-[#1c1813]">
      {/* Subtle atmospheric golden orb in background */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#4a1525]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#14100b] mb-4">
            <Sparkles className="w-3 h-3 text-[#c5a059]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#d4af37] font-medium">
              The Heritage of AURA & D'OR
            </span>
          </div>

          <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.15] mb-6">
            A Studio Dedicated to the <br />
            <span className="italic text-gold-gradient font-light">Sublime Alchemy of Beauty</span>
          </h2>

          <p className="text-sm sm:text-base text-[#b8ad9c] leading-relaxed font-light">
            Founded with an uncompromising European devotion to precision craftsmanship, AURA & D'OR reimagines luxury hair, skin, and wellness into an elevated sensory journey.
          </p>
        </div>

        {/* Two-Column Story & Visual Masterpiece */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          {/* Left Column: Story & Quote */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-cormorant text-3xl sm:text-4xl text-white font-light">
              Crafted in Paris. <br />
              <span className="text-[#c5a059]">Perfected for Beverly Hills.</span>
            </h3>

            <p className="text-[#bfb5a5] text-sm sm:text-base leading-relaxed font-light">
              For over fifteen years, our sanctuary has welcomed royalty, visionaries, and discerning clientele who recognize that true beauty is never generic. We do not follow fleeting trends; we study skeletal contours, hair motility, and dermal cellular health to create silhouettes that breathe effortless poise.
            </p>

            <p className="text-[#bfb5a5] text-sm sm:text-base leading-relaxed font-light">
              From our custom Italian leather reclining shampoo loungers with shiatsu massage to the bespoke floral teas blended exclusively for our guests, every touchpoint reflects quiet, unobtrusive extravagance.
            </p>

            {/* Founder Quote Card */}
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[#16120d] to-[#0d0a07] border border-[#c5a059]/25 relative">
              <span className="text-4xl font-serif text-[#c5a059]/30 absolute top-2 left-4">“</span>
              <p className="font-cormorant text-xl sm:text-2xl text-[#f5ebd7] italic leading-relaxed pl-6 mb-4">
                "Beauty is an intimate celebration of one's innate grace. Our calling is simply to illuminate that light with diamond precision."
              </p>
              <div className="pl-6 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#c5a059] font-semibold">
                    Jean-Luc De Saint
                  </div>
                  <div className="text-[11px] text-[#8d8272]">
                    Founder & Artistic Director
                  </div>
                </div>
                <div className="font-cinzel text-xs text-[#c5a059]/70 tracking-widest border-b border-[#c5a059]/30 pb-0.5">
                  PARIS • 2011
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Luxury Image Showcase */}
          <div className="lg:col-span-6">
            <Card3D intensity={12} glowColor="rgba(212, 175, 55, 0.25)">
              <div className="relative rounded-3xl overflow-hidden border border-[#c5a059]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop"
                  alt="AURA & D'OR Luxury Salon Interior"
                  loading="lazy"
                  className="w-full h-[460px] sm:h-[520px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-85" />

                {/* Floating Inset Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#0c0906]/85 backdrop-blur-md border border-[#c5a059]/30 flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-[#e5c07b] font-semibold">
                      Beverly Hills Atelier
                    </div>
                    <div className="text-[11px] text-[#a89d8d] mt-0.5">
                      4,500 sq.ft of Restorative Serenity & Haute Styling
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-[#c5a059] flex items-center justify-center text-[#c5a059]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Card3D>
          </div>
        </div>

        {/* 4 Pillars of Excellence with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <Card3D key={pillar.title} intensity={10} glowColor="rgba(212, 175, 55, 0.15)">
                <div className="h-full p-7 rounded-2xl bg-gradient-to-b from-[#130f0b] to-[#0b0907] border border-[#2d2419] hover:border-[#c5a059]/50 transition-colors flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#1d1710] border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] group-hover:bg-[#c5a059] group-hover:text-black transition-all mb-6">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h4 className="font-cormorant text-xl text-white font-medium mb-3 leading-snug">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-[#a39786] leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#221a11] flex items-center justify-between text-[10px] uppercase tracking-widest text-[#c5a059]/70">
                    <span>Pillar 0{index + 1}</span>
                    <span>Haute Standard</span>
                  </div>
                </div>
              </Card3D>
            );
          })}
        </div>
      </div>
    </section>
  );
};
