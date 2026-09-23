import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Calendar, Clock, Check, X, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';

interface VirtualConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VirtualConsultationModal: React.FC<VirtualConsultationModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [stylist, setStylist] = useState('Antoine Laurent (Hair Director)');
  const [date, setDate] = useState('Tomorrow');
  const [time, setTime] = useState('11:00 AM PST');
  const [isBooked, setIsBooked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      onClose();
    }, 4000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            className="w-full max-w-lg rounded-3xl bg-[#120d08] border border-[#c5a059]/60 p-6 sm:p-8 relative shadow-2xl text-left"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-1 text-[#8f806e] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c5a059] to-[#8c6d32] text-black flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                <Video className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold block">
                Complimentary 10-Min Session
              </span>
              <h3 className="font-cinzel text-2xl text-white font-bold">
                Virtual Video Consultation
              </h3>
            </div>

            {isBooked ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="font-cormorant text-2xl text-white font-semibold">
                  Consultation Confirmed!
                </h4>
                <p className="text-xs text-[#a0907e] max-w-sm mx-auto">
                  An encrypted HD Google Meet link and calendar invitation has been prepared for <span className="text-white font-medium">{stylist}</span> on {date} at {time}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#a0907e] font-semibold block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Lady Genevieve"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a120b] border border-[#3b2b1a] text-white text-xs focus:border-[#c5a059] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#a0907e] font-semibold block mb-1">
                    Email for Video Link
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vip@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a120b] border border-[#3b2b1a] text-white text-xs focus:border-[#c5a059] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#a0907e] font-semibold block mb-1">
                      Preferred Stylist
                    </label>
                    <select
                      value={stylist}
                      onChange={(e) => setStylist(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#1a120b] border border-[#3b2b1a] text-white text-xs focus:border-[#c5a059] outline-none cursor-pointer"
                    >
                      <option value="Antoine Laurent (Hair Director)">Antoine Laurent (Hair)</option>
                      <option value="Elena Rostova (Color Master)">Elena Rostova (Color)</option>
                      <option value="Marcus Vance (Couture Updos)">Marcus Vance (Updos)</option>
                      <option value="Chloe Moreau (Trichologist)">Chloe Moreau (Trichology)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#a0907e] font-semibold block mb-1">
                      Preferred Time Slot
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#1a120b] border border-[#3b2b1a] text-white text-xs focus:border-[#c5a059] outline-none cursor-pointer"
                    >
                      <option value="11:00 AM PST">Tomorrow, 11:00 AM PST</option>
                      <option value="2:30 PM PST">Tomorrow, 2:30 PM PST</option>
                      <option value="5:00 PM PST">Tomorrow, 5:00 PM PST</option>
                      <option value="10:00 AM PST (Thursday)">Thursday, 10:00 AM PST</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 mt-2 rounded-full bg-gradient-to-r from-[#c5a059] via-[#e5c07b] to-[#c5a059] text-black font-semibold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Video className="w-4 h-4 fill-black" />
                  <span>Reserve Free 10-Min Video Session</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
