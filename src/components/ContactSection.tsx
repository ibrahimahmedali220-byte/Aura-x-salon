import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, MapPin, Phone, Mail, Clock, MessageSquare, Send, Car, CheckCircle2 } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { Card3D } from './Card3D';

export const ContactSection: React.FC = () => {
  const [inquirySent, setInquirySent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-28 bg-[#0a0806] border-t border-[#1c1813] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#14100b] mb-4">
            <Sparkles className="w-3 h-3 text-[#c5a059]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#d4af37] font-medium">
              Sanctuary Location & Concierge
            </span>
          </div>

          <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.15] mb-6">
            Visit the <span className="italic text-gold-gradient font-light">Beverly Hills Atelier</span>
          </h2>

          <p className="text-sm sm:text-base text-[#b5a896] leading-relaxed font-light">
            Conveniently situated along the prestigious Royale Promenade, featuring private subterranean valet reception and secure VIP entry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact Cards & Concierge Channels */}
          <div className="lg:col-span-5 space-y-6">
            {/* Atelier Address & Hours Card */}
            <Card3D intensity={8} glowColor="rgba(212, 175, 55, 0.15)">
              <div className="p-7 rounded-2xl bg-[#120e0a] border border-[#2b2116] space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1c1610] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-[#d8cfc0] font-semibold mb-1">
                      Promenade Address
                    </h3>
                    <p className="text-sm text-[#e6ded0] font-light leading-relaxed">
                      {SALON_INFO.address}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-[#c5a059]">
                      <Car className="w-3.5 h-3.5" />
                      <span>Complimentary White-Glove Valet Parking</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-4 border-t border-[#201811]">
                  <div className="w-10 h-10 rounded-xl bg-[#1c1610] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 text-xs text-[#b8ac9c]">
                    <h3 className="text-xs uppercase tracking-widest text-[#d8cfc0] font-semibold mb-1">
                      Hours of Operation
                    </h3>
                    <p>{SALON_INFO.hours.weekdays}</p>
                    <p>{SALON_INFO.hours.saturday}</p>
                    <p>{SALON_INFO.hours.sunday}</p>
                    <p className="text-[#c5a059] italic">{SALON_INFO.hours.monday}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#201811] flex flex-col sm:flex-row gap-3">
                  <a
                    href={`tel:${SALON_INFO.phone}`}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#1c1610] hover:bg-[#c5a059] text-[#e8ded1] hover:text-black border border-[#c5a059]/30 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Concierge</span>
                  </a>

                  <a
                    href={SALON_INFO.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-700/30 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp VIP</span>
                  </a>
                </div>
              </div>
            </Card3D>

            {/* Quick Inquiry Form */}
            <div className="p-7 rounded-2xl bg-[#120e0a] border border-[#2b2116]">
              <h3 className="text-xs uppercase tracking-widest text-[#d8cfc0] font-semibold mb-2 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#c5a059]" />
                Direct Concierge Inquiry
              </h3>
              <p className="text-xs text-[#9c907f] font-light mb-5">
                Have bespoke requirements, bridal party inquiries, or press requests? Send us a direct note.
              </p>

              {inquirySent ? (
                <div className="p-4 rounded-xl bg-[#19130d] border border-emerald-500/40 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Your note has reached our Head Concierge. We shall respond within 2 hours.</span>
                </div>
              ) : (
                <form onSubmit={handleSendInquiry} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1a140e] border border-[#362a1c] focus:border-[#c5a059] focus:outline-none rounded-xl px-4 py-2.5 text-xs text-[#e6decb]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#1a140e] border border-[#362a1c] focus:border-[#c5a059] focus:outline-none rounded-xl px-4 py-2.5 text-xs text-[#e6decb]"
                  />
                  <textarea
                    required
                    rows={3}
                    placeholder="How may our concierge assist your visit?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#1a140e] border border-[#362a1c] focus:border-[#c5a059] focus:outline-none rounded-xl px-4 py-2.5 text-xs text-[#e6decb] resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gold-gradient text-black font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Concierge</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Google Maps Location Embed & Atmosphere View */}
          <div className="lg:col-span-7">
            <Card3D intensity={6} glowColor="rgba(212, 175, 55, 0.2)">
              <div className="rounded-3xl overflow-hidden border border-[#c5a059]/40 bg-[#120e0a] shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col">
                {/* Map View Header */}
                <div className="p-4 px-6 bg-[#16110c] border-b border-[#2a2015] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs uppercase tracking-widest text-[#d6cec0] font-medium">
                      Live Atelier Coordinates
                    </span>
                  </div>
                  <span className="text-[11px] text-[#c5a059] font-cinzel">
                    34.0736° N, 118.4004° W
                  </span>
                </div>

                {/* Google Maps Styled Iframe Embed */}
                <div className="relative w-full h-[480px] bg-[#0c0906]">
                  <iframe
                    title="AURA & D'OR Luxury Salon Beverly Hills Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13220.730308070997!2d-118.4074828695026!3d34.07362035987114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0xd6c7c379fd081ed1!2sBeverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.1) brightness(0.85)' }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />

                  {/* Luxury Floating Pin Overlay */}
                  <div className="absolute top-6 left-6 p-4 rounded-2xl bg-[#0e0a07]/90 backdrop-blur-md border border-[#c5a059]/50 shadow-2xl pointer-events-none max-w-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-gold-gradient text-black flex items-center justify-center font-cinzel font-bold text-[10px]">
                        AD
                      </div>
                      <span className="text-xs uppercase tracking-wider text-white font-bold">
                        AURA & D'OR ATELIER
                      </span>
                    </div>
                    <p className="text-[11px] text-[#a89c8a] leading-tight">
                      Private Valet drive-in located via north archway of Royale Promenade.
                    </p>
                  </div>
                </div>
              </div>
            </Card3D>
          </div>
        </div>
      </div>
    </section>
  );
};
