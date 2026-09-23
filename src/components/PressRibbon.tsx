import React from 'react';
import { Award, Sparkles, Star } from 'lucide-react';
import { EDITORIAL_PRESS } from '../data/salonData';

export const PressRibbon: React.FC = () => {
  return (
    <div id="editorial-press-ribbon" className="relative py-8 bg-[#060504] border-y border-[#1c1813] overflow-hidden">
      {/* Subtle gold line accent */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Cannes Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-full border border-[#c5a059]/40 bg-[#16110c] flex items-center justify-center text-[#c5a059]">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs tracking-[0.2em] uppercase text-[#c5a059] font-bold block">
                Cannes Official Partner
              </span>
              <span className="text-xs text-[#b8ac9c]">
                Haute Coiffure Française Accredited
              </span>
            </div>
          </div>

          <div className="hidden lg:block w-[1px] h-8 bg-[#241c13]" />

          {/* Press Quotes Marquee / Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full lg:w-auto">
            {EDITORIAL_PRESS.map((item, idx) => (
              <div key={idx} className="flex flex-col justify-center">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-xs font-cinzel font-bold tracking-widest text-[#f5ebd7]">
                    {item.publication}
                  </span>
                  <span className="text-xs text-[#c5a059]">• {item.year}</span>
                </div>
                <p className="text-xs text-[#b8ac9c] italic font-light line-clamp-2 leading-relaxed">
                  {item.quote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
