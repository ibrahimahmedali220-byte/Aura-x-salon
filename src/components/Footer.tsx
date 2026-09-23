import React, { useState } from 'react';
import { Sparkles, Instagram, Facebook, Youtube, ArrowUp, Send, Check, Bell, ShieldCheck, Lock } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { ExclusiveSmsAlertModal } from './ExclusiveSmsAlertModal';
import { SecurityShieldModal } from './SecurityShieldModal';
import { sanitizeEmail, rateLimiter } from '../utils/security';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rateLimiter.isAllowed('newsletter_sub', 3, 60000)) {
      alert('Too many requests. Please wait a minute.');
      return;
    }
    const cleanEmail = sanitizeEmail(email);
    if (!cleanEmail) {
      alert('Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#050505] text-[#b8ad9d] border-t border-[#1c1813] relative overflow-hidden">
      {/* Top Gold Accent Border Line */}
      <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Col 1: Brand Info (5 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#c5a059]/60 flex items-center justify-center bg-gradient-to-br from-[#1b1712] to-[#0a0a0a]">
                <span className="font-cinzel text-base font-bold text-[#c5a059]">A&D</span>
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel tracking-[0.25em] text-lg font-bold text-white">
                  AURA & D'OR
                </span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#a09482] font-light">
                  Haute Coiffure & Spa
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-[#9f9281] font-light max-w-sm">
              The premier five-star atelier in Beverly Hills and Paris. Dedicated to the bespoke artistry of hair couture, cellular rejuvenation, and holistic relaxation.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-[#2d2217] hover:border-[#c5a059] bg-[#120e0a] text-[#b0a493] hover:text-[#c5a059] flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-[#2d2217] hover:border-[#c5a059] bg-[#120e0a] text-[#b0a493] hover:text-[#c5a059] flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full border border-[#2d2217] hover:border-[#c5a059] bg-[#120e0a] text-[#b0a493] hover:text-[#c5a059] flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-cinzel text-xs uppercase tracking-[0.2em] text-white font-semibold">
              The Atelier
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9d907e]">
              <li>
                <a href="#about" className="hover:text-[#c5a059] transition-colors">Heritage & Story</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#c5a059] transition-colors">Haute Coiffure</a>
              </li>
              <li>
                <a href="#transformations" className="hover:text-[#c5a059] transition-colors">Transformations</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#c5a059] transition-colors">Editorial Lookbook</a>
              </li>
              <li>
                <a href="#packages" className="hover:text-[#c5a059] transition-colors">VIP Day Retreats</a>
              </li>
              <li>
                <a href="#team" className="hover:text-[#c5a059] transition-colors">Master Artisans</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Services Breakdown (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-cinzel text-xs uppercase tracking-[0.2em] text-white font-semibold">
              Signature Rituals
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9d907e]">
              <li>
                <a href="#services" className="hover:text-[#c5a059] transition-colors">Parisian Balayage</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#c5a059] transition-colors">24K Gold Cellular Facial</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#c5a059] transition-colors">Liquid Gold Keratin</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#c5a059] transition-colors">Royal Bridal Makeover</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#c5a059] transition-colors">Moroccan Hammam Bath</a>
              </li>
              <li>
                <a href="#booking" className="hover:text-[#c5a059] transition-colors">VIP Suite Reservation</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter VIP Club (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-cinzel text-xs uppercase tracking-[0.2em] text-white font-semibold">
              The AURA & D'OR Journal
            </h4>
            <p className="text-xs text-[#9d907e] leading-relaxed font-light">
              Receive private invitations to seasonal beauty previews, masterclass access, and priority holiday reservations.
            </p>

            {subscribed ? (
              <div className="p-3.5 rounded-xl bg-[#14100b] border border-emerald-500/40 text-emerald-400 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Welcome to the circle. Privilege details sent to your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#120e0a] border border-[#332719] focus:border-[#c5a059] focus:outline-none rounded-xl px-4 py-3 text-xs text-[#e6decb] pr-12"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gold-gradient text-black hover:scale-105 transition-transform cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-[#6d6152] block">
                  We respect your discretion. Unsubscribe at any time.
                </span>
              </form>
            )}

            <div className="pt-2 border-t border-[#1f1710]">
              <span className="text-[10px] uppercase tracking-wider text-[#c5a059] block mb-2 font-medium">
                Prefer Real-Time Mobile Text?
              </span>
              <ExclusiveSmsAlertModal />
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 border-t border-[#1a140f] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#786b5b]">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} AURA & D'OR Haute Coiffure & Spa Atelier. All Rights Reserved.</span>
            <button
              onClick={() => setIsSecurityModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#17110a] border border-emerald-500/40 text-emerald-400 hover:text-white hover:border-emerald-400 text-[10px] font-medium transition-all cursor-pointer"
              title="View 256-Bit SSL/TLS Security Dossier"
            >
              <Lock className="w-2.5 h-2.5" />
              <span>256-Bit SSL Encrypted</span>
            </button>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSecurityModalOpen(true)}
              className="hover:text-[#c5a059] transition-colors cursor-pointer"
            >
              Privacy & Security Protocol
            </button>
            <span className="hover:text-[#c5a059] cursor-pointer">Reservation Terms</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#c5a059] hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Zenith</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Security & Cryptographic Charter Modal */}
      <SecurityShieldModal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
      />
    </footer>
  );
};
