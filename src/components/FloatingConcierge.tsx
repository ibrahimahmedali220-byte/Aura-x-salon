import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Phone, Calendar, X, Sparkles } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface FloatingConciergeProps {
  onBookClick: () => void;
}

export const FloatingConcierge: React.FC<FloatingConciergeProps> = ({ onBookClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popover Bubble */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            className="mb-4 w-72 sm:w-80 rounded-2xl bg-[#120e0a]/95 backdrop-blur-xl border border-[#c5a059]/40 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-left"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#241a11] mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#d8cfc0] font-semibold">
                    VIP Atelier Concierge
                  </h4>
                  <span className="text-[10px] text-[#c5a059]">Direct Booking Line</span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-[#8f8270] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#b8ac9c] font-light leading-relaxed mb-4">
              Welcome to AURA & D'OR. How may our concierge team assist your beauty journey today?
            </p>

            {/* Actions */}
            <div className="space-y-2">
              <a
                href={SALON_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat via WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setIsOpen(false);
                  onBookClick();
                }}
                className="btn-gold-luxury w-full py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-black group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                <span>Book Online Appointment</span>
              </button>

              <a
                href={`tel:${SALON_INFO.phone}`}
                className="w-full py-2 px-3 rounded-xl bg-[#1c150e] hover:bg-[#281f15] text-[#c5a059] text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 transition-colors border border-[#3b2d1c]"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Concierge: {SALON_INFO.phoneDisplay}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <div className="relative">
        {/* Luminous Pulsing Outer Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#c5a059]/30 blur-sm animate-pulse" />

        <button
          id="floating-concierge-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Concierge Chat"
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#dfba73] via-[#c5a059] to-[#9a7332] text-black shadow-[0_0_25px_rgba(212,175,55,0.5)] hover:shadow-[0_0_35px_rgba(212,175,55,0.8)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer border-2 border-[#fff0c7]"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-black" />
          ) : (
            <div className="relative">
              <MessageCircle className="w-6 h-6 text-black" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
