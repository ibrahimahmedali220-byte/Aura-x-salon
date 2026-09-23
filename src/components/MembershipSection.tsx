import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Crown, Check, ShieldCheck, X, Send, CreditCard } from 'lucide-react';
import { MEMBERSHIP_TIERS } from '../data/salonData';
import { MembershipTier } from '../types';
import { Card3D } from './Card3D';

export const MembershipSection: React.FC = () => {
  const [activeTierModal, setActiveTierModal] = useState<MembershipTier | null>(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicantData, setApplicantData] = useState({ name: '', phone: '', email: '' });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationSubmitted(true);
    setTimeout(() => {
      setApplicationSubmitted(false);
      setActiveTierModal(null);
      setApplicantData({ name: '', phone: '', email: '' });
    }, 3500);
  };

  return (
    <section id="memberships" className="relative py-28 bg-[#070605] border-t border-[#1c1813] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#c5a059]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#14100b] mb-4">
            <Crown className="w-3 h-3 text-[#c5a059]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#d4af37] font-medium">
              The Sovereign Guild
            </span>
          </div>

          <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.15] mb-6">
            Private VIP <span className="italic text-gold-gradient font-light">Patron Guilds</span>
          </h2>

          <p className="text-sm sm:text-base text-[#b5a896] leading-relaxed font-light">
            Designed for those who view aesthetic excellence not as an occasional appointment, but as a continuous way of life. Membership is limited by annual patron charter.
          </p>
        </div>

        {/* 3D Holographic Membership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {MEMBERSHIP_TIERS.map((tier) => (
            <Card3D
              key={tier.id}
              intensity={10}
              glowColor={tier.id === 'tier-black-diamond' ? 'rgba(212, 175, 55, 0.35)' : 'rgba(197, 160, 89, 0.25)'}
              className="h-full"
            >
              <div className={`h-full rounded-3xl bg-gradient-to-b ${tier.cardGradient} border ${
                tier.id === 'tier-black-diamond' ? 'border-[#d4af37]/60 shadow-[0_0_30px_rgba(212,175,55,0.25)]' : 'border-[#2d2217]'
              } p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden group`}>
                
                {/* Metallic Card Header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] tracking-[0.25em] uppercase font-bold px-3 py-1 rounded-full bg-[#1b150e] border border-[#c5a059]/40 text-[#c5a059]">
                      {tier.badge}
                    </span>
                    <div className="w-8 h-6 rounded border border-[#c5a059]/50 bg-gradient-to-br from-[#dfba73] to-[#8f6a2a] opacity-80" />
                  </div>

                  <h3 className="font-cormorant text-2xl sm:text-3xl text-white font-medium mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-[#a39583] font-light mb-6">
                    {tier.subtitle}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-8 pb-6 border-b border-[#241c14]">
                    <span className="font-cinzel text-3xl sm:text-4xl font-bold text-gold-gradient">
                      ${tier.annualFee.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#8c7f6e] uppercase tracking-wider font-light">
                      / Annual Patronage
                    </span>
                  </div>

                  {/* Privileges Checklist */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[10px] uppercase tracking-widest text-[#d8cfc0] font-semibold block">
                      Privileges of the Order:
                    </span>
                    {tier.privileges.map((privilege, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#c9bfae]">
                        <Check className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                        <span className="font-light leading-snug">{privilege}</span>
                      </div>
                    ))}
                  </div>

                  {/* Exclusive Bonus Pill */}
                  <div className="p-3.5 rounded-xl bg-[#140e0a] border border-[#2b2014] text-[11px] text-[#e0cfba] font-light mb-6 flex items-center gap-2">
                    <Crown className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                    <span>{tier.exclusiveBonus}</span>
                  </div>
                </div>

                {/* Apply Button */}
                <button
                  type="button"
                  onClick={() => setActiveTierModal(tier)}
                  className={`w-full py-3.5 rounded-full font-semibold text-xs uppercase tracking-widest cursor-pointer group flex items-center justify-center gap-2 ${
                    tier.id === 'tier-black-diamond'
                      ? 'btn-gold-luxury'
                      : 'btn-outline-luxury'
                  }`}
                >
                  <Crown className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-125 ${
                    tier.id === 'tier-black-diamond' ? 'text-black' : 'text-[#c5a059]'
                  }`} />
                  <span>Request Guild Invitation</span>
                </button>
              </div>
            </Card3D>
          ))}
        </div>
      </div>

      {/* Guild Application Modal */}
      <AnimatePresence>
        {activeTierModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md rounded-3xl bg-[#120e0a] border border-[#c5a059]/50 p-7 sm:p-8 relative shadow-2xl"
            >
              <button
                onClick={() => setActiveTierModal(null)}
                className="absolute top-5 right-5 p-1 text-[#8f8270] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <Crown className="w-8 h-8 text-[#c5a059] mx-auto mb-2" />
                <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-semibold block">
                  Confidential Patron Inquiry
                </span>
                <h3 className="font-cormorant text-2xl text-white font-medium">
                  {activeTierModal.name}
                </h3>
                <span className="text-xs text-[#a09483]">
                  ${activeTierModal.annualFee.toLocaleString()} / Annual Patronage
                </span>
              </div>

              {applicationSubmitted ? (
                <div className="p-6 rounded-2xl bg-[#19130d] border border-emerald-500/40 text-center space-y-3">
                  <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-sm font-semibold text-white">
                    Application Docket Received
                  </h4>
                  <p className="text-xs text-[#b8ac9c] leading-relaxed font-light">
                    Our Private Membership Governor will review your docket and contact you via phone within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-4">
                  <input
                    type="text"
                    required
                    placeholder="Full Legal Name"
                    value={applicantData.name}
                    onChange={(e) => setApplicantData({ ...applicantData, name: e.target.value })}
                    className="w-full bg-[#1c150e] border border-[#382b1c] focus:border-[#c5a059] focus:outline-none rounded-xl px-4 py-3 text-xs text-[#e6decb]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Private Phone Number"
                    value={applicantData.phone}
                    onChange={(e) => setApplicantData({ ...applicantData, phone: e.target.value })}
                    className="w-full bg-[#1c150e] border border-[#382b1c] focus:border-[#c5a059] focus:outline-none rounded-xl px-4 py-3 text-xs text-[#e6decb]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Confidential Email Address"
                    value={applicantData.email}
                    onChange={(e) => setApplicantData({ ...applicantData, email: e.target.value })}
                    className="w-full bg-[#1c150e] border border-[#382b1c] focus:border-[#c5a059] focus:outline-none rounded-xl px-4 py-3 text-xs text-[#e6decb]"
                  />
                  <button
                    type="submit"
                    className="btn-gold-luxury w-full py-3.5 rounded-full flex items-center justify-center gap-2 cursor-pointer group text-xs"
                  >
                    <Send className="w-3.5 h-3.5 text-black group-hover:translate-x-1 transition-transform duration-300" />
                    <span>Submit Patron Application</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
