import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Check, Clock, Crown, ArrowRight } from 'lucide-react';
import { VIP_PACKAGES } from '../data/salonData';
import { VIPPackage } from '../types';
import { Card3D } from './Card3D';

interface PackagesSectionProps {
  onSelectPackageForBooking: (pkg: VIPPackage) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectPackageForBooking }) => {
  return (
    <section id="packages" className="relative py-28 bg-[#0a0806] border-t border-[#1c1813] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c5a059]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#14100b] mb-4">
            <Sparkles className="w-3 h-3 text-[#c5a059]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#d4af37] font-medium">
              Curated VIP Rituals & Day Retreats
            </span>
          </div>

          <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.15] mb-6">
            All-Inclusive <span className="italic text-gold-gradient font-light">VIP Retreat Packages</span>
          </h2>

          <p className="text-sm sm:text-base text-[#b5a896] leading-relaxed font-light">
            Surrender to hours of uninterrupted bliss inside our private suites, complete with dedicated maître d'hôtel and vintage champagne.
          </p>
        </div>

        {/* Packages Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {VIP_PACKAGES.map((pkg) => (
            <Card3D
              key={pkg.id}
              intensity={12}
              glowColor={pkg.popular ? 'rgba(212, 175, 55, 0.35)' : 'rgba(212, 175, 55, 0.15)'}
              className="h-full"
            >
              <div
                className={`h-full rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 relative ${
                  pkg.popular
                    ? 'bg-gradient-to-b from-[#1c140d] via-[#140e08] to-[#0d0906] border-2 border-[#c5a059] shadow-[0_20px_60px_rgba(197,160,89,0.25)]'
                    : 'bg-gradient-to-b from-[#140f0a] to-[#0a0705] border border-[#2b2116] hover:border-[#c5a059]/50 shadow-xl'
                }`}
              >
                {/* Popular Ribbon */}
                {pkg.popular && (
                  <div className="bg-gold-gradient text-black py-1 px-4 text-center text-[10px] uppercase tracking-[0.25em] font-bold shadow-md flex items-center justify-center gap-1.5">
                    <Crown className="w-3.5 h-3.5 text-black" />
                    Most Coveted Sanctuary Experience
                  </div>
                )}

                {/* Package Card Top Area */}
                <div className="p-8 pb-4">
                  <div className="flex items-center justify-between text-xs text-[#a39786] mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                      {pkg.duration}
                    </span>
                    <span className="uppercase tracking-widest text-[#c5a059] text-[10px] font-semibold">
                      Private Suite Included
                    </span>
                  </div>

                  <h3 className="font-cormorant text-3xl font-medium text-white mb-2 leading-tight">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-[#c5a059] italic mb-6 font-light">
                    {pkg.subtitle}
                  </p>

                  {/* Price Banner */}
                  <div className="mb-6 pb-6 border-b border-[#241a10] flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-cinzel font-bold text-white">
                      ${pkg.price}
                    </span>
                    <span className="text-xs text-[#8c806f] uppercase tracking-wider">
                      / Complete Experience
                    </span>
                  </div>

                  <p className="text-xs text-[#b8ad9d] font-light leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  {/* Included Highlights */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[11px] uppercase tracking-widest text-[#d8cfc0] font-semibold block">
                      Package Privileges:
                    </span>
                    {pkg.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#d1c5b4]">
                        <div className="w-4 h-4 rounded-full bg-[#1e160f] border border-[#c5a059]/40 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-[#c5a059]" />
                        </div>
                        <span className="font-light leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-8 pt-0">
                  <button
                    onClick={() => onSelectPackageForBooking(pkg)}
                    className={`w-full py-4 rounded-full text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-2 group cursor-pointer ${
                      pkg.popular
                        ? 'btn-gold-luxury'
                        : 'btn-outline-luxury'
                    }`}
                  >
                    <span>Reserve Package</span>
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 ${
                      pkg.popular ? 'text-black' : 'text-[#c5a059]'
                    }`} />
                  </button>
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
};
