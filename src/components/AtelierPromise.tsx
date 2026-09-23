import React from 'react';
import { ShieldCheck, Lock, Sparkles, Award, CheckCircle } from 'lucide-react';
import { Card3D } from './Card3D';

export const AtelierPromise: React.FC = () => {
  const promises = [
    {
      icon: <Award className="w-6 h-6 text-[#c5a059]" />,
      title: 'Zero-Risk Chromatic Guarantee',
      badge: '7-DAY COURTESY',
      description: 'Your hair color must embody your exact aesthetic vision. Should any tone or reflection require nuance within 7 days of service, our Master Artistic Director personally refines it at zero charge.'
    },
    {
      icon: <Lock className="w-6 h-6 text-[#c5a059]" />,
      title: 'Acoustic Discretion & Privacy',
      badge: 'NDA PROTOCOL',
      description: 'Favored by international dignitaries, executives, and public figures. Every treatment suite features soundproof acoustic insulation, private rear subterranean valet, and strict non-disclosure protocol.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#c5a059]" />,
      title: 'Medical-Grade Swiss Bio-Actives',
      badge: '100% PURE ETHICAL',
      description: 'We strictly ban formaldehyde, harsh sulfates, and toxic parabens. Formulations are powered exclusively by Swiss plant stem cells, 24K Japanese colloidal gold, and certified cold-pressed botanical essences.'
    }
  ];

  return (
    <section id="atelier-promise" className="relative py-24 bg-[#070605] border-t border-[#1c1813] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#14100b] mb-4">
            <Sparkles className="w-3 h-3 text-[#c5a059]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#d4af37] font-medium">
              The Sovereign Standard
            </span>
          </div>

          <h2 className="font-cormorant text-4xl sm:text-5xl font-normal text-white tracking-tight leading-[1.15] mb-4">
            The Haute Atelier <span className="italic text-gold-gradient font-light">Charter of Trust</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#b5a896] leading-relaxed font-light">
            When you enter AURA & D'OR, your investment is safeguarded by the most rigorous guarantees in haute coiffure and aesthetic wellness.
          </p>
        </div>

        {/* 3 Guarantees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promises.map((p, i) => (
            <Card3D key={i} intensity={8} glowColor="rgba(212, 175, 55, 0.2)">
              <div className="rounded-3xl bg-[#120e0a] border border-[#2d2217] p-8 h-full flex flex-col justify-between group hover:border-[#c5a059]/50 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#1c1610] border border-[#c5a059]/40 flex items-center justify-center">
                      {p.icon}
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-[#1b150e] border border-[#c5a059]/40 text-[#c5a059]">
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="font-cormorant text-2xl text-white font-medium mb-3">
                    {p.title}
                  </h3>

                  <p className="text-xs text-[#a39785] font-light leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#221a11] flex items-center gap-2 text-xs text-[#c5a059]">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span className="tracking-wider uppercase text-[10px] font-semibold">
                    Guaranteed in Writing
                  </span>
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
};
