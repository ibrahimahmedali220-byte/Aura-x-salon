import React from 'react';
import { Sparkles, KeyRound, Wine, ArrowRight, ShieldCheck } from 'lucide-react';

interface PrivilegeBannerProps {
  onClaimPrivilege: () => void;
}

export const PrivilegeBanner: React.FC<PrivilegeBannerProps> = ({ onClaimPrivilege }) => {
  return (
    <div id="first-visit-privilege" className="relative bg-gradient-to-r from-[#171109] via-[#241a0e] to-[#171109] border-y border-[#c5a059]/40 py-5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Privilege Badge & Copy */}
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-12 h-12 rounded-2xl bg-[#0c0906] border border-[#c5a059]/60 flex items-center justify-center text-[#c5a059] shrink-0 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <KeyRound className="w-6 h-6 animate-pulse" />
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1">
              <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#c5a059]">
                First-Visit Royal Privilege Key
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#3d2a13] border border-[#c5a059]/50 text-white font-mono font-bold tracking-widest">
                CODE: AURA-GOLD
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#e8ded0] font-light leading-relaxed">
              Reserve your inaugural ritual today to receive a <strong className="text-white font-semibold">$50 Atelier Courtesy</strong> and <span className="text-[#e5c07b] inline-flex items-center gap-1 font-medium"><Wine className="w-3.5 h-3.5 inline" /> Complimentary Sommelier Champagne</span>.
            </p>
          </div>
        </div>

        {/* Right: Instant Trigger Button */}
        <button
          onClick={onClaimPrivilege}
          className="btn-gold-luxury shrink-0 px-7 py-3 rounded-full flex items-center gap-2.5 cursor-pointer group text-xs"
        >
          <span>Claim $50 Courtesy Key</span>
          <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1.5 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};
