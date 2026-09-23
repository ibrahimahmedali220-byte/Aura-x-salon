import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PhoneCall, Clock, CheckCircle2, X, Sparkles, ShieldCheck } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { sanitizePhone, rateLimiter } from '../utils/security';

export const QuickCallbackModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [preferredWindow, setPreferredWindow] = useState('Within 5 Minutes');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-Abuse Rate Limit
    if (!rateLimiter.isAllowed('quick_callback', 3, 60000)) {
      alert('Too many requests. Please wait a minute before requesting another callback.');
      return;
    }

    const cleanPhone = sanitizePhone(phoneNumber);
    if (!cleanPhone || cleanPhone.replace(/\D/g, '').length < 10) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
      setPhoneNumber('');
    }, 4000);
  };

  return (
    <>
      {/* Attractive Luxury Trigger Button in Top Bar with Animation */}
      <button
        type="button"
        id="topbar-fasttrack-callback-btn"
        onClick={() => setIsOpen(true)}
        className="group relative inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#22160c] via-[#2d1d10] to-[#1a1109] border border-[#c5a059]/60 hover:border-[#f5d796] text-[#f7ebd4] hover:text-white text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_0_12px_rgba(212,175,55,0.25)] hover:shadow-[0_0_22px_rgba(212,175,55,0.5)] hover:scale-[1.03] cursor-pointer"
        title="Request Fast-Track 5-Min Concierge Call"
      >
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f3d289] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]" />
        </span>
        <PhoneCall className="w-3 h-3 text-[#d4af37] group-hover:rotate-12 transition-transform duration-300" />
        <span className="tracking-wider">Fast-Track Callback</span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md rounded-3xl bg-[#120e0a] border border-[#c5a059]/50 p-7 sm:p-8 relative shadow-2xl text-left"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 p-1 text-[#8f8270] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gold-gradient text-black flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-semibold block">
                  60-Second Fast Track
                </span>
                <h3 className="font-cormorant text-2xl text-white font-medium">
                  Head Concierge Callback
                </h3>
                <p className="text-xs text-[#a39785] font-light mt-1">
                  Skip the online form. Enter your phone number and our Beverly Hills Head Concierge will call you directly to reserve your suite.
                </p>
              </div>

              {submitted ? (
                <div className="p-5 rounded-2xl bg-[#1a140d] border border-emerald-500/40 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="text-sm font-semibold text-white">
                    Priority Dispatch Queued
                  </h4>
                  <p className="text-xs text-[#b8ac9c] font-light leading-relaxed">
                    Our Head Concierge is preparing your call for <strong className="text-white">{phoneNumber}</strong> ({preferredWindow}).
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#a89d8d] font-medium block mb-1.5">
                      Your Direct Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-[#1c150e] border border-[#3b2d1c] focus:border-[#c5a059] focus:outline-none rounded-xl px-4 py-3 text-sm text-[#e6decb]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#a89d8d] font-medium block mb-1.5">
                      Preferred Callback Window
                    </label>
                    <select
                      value={preferredWindow}
                      onChange={(e) => setPreferredWindow(e.target.value)}
                      className="w-full bg-[#1c150e] border border-[#3b2d1c] focus:border-[#c5a059] focus:outline-none rounded-xl px-4 py-3 text-xs text-[#e6decb]"
                    >
                      <option value="Within 5 Minutes">Immediately (Within 5 Minutes)</option>
                      <option value="Today Afternoon">This Afternoon (1:00 PM – 4:00 PM)</option>
                      <option value="Today Evening">This Evening (5:00 PM – 8:00 PM)</option>
                      <option value="Tomorrow Morning">Tomorrow Morning (9:00 AM – 11:00 AM)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn-gold-luxury w-full py-3.5 rounded-full text-xs flex items-center justify-center gap-2.5 cursor-pointer group"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-black group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
                    <span>Request Priority Callback</span>
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-[#7d705f] pt-1">
                    <ShieldCheck className="w-3 h-3 text-[#c5a059]" />
                    <span>Your private number is strictly confidential and never shared.</span>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
