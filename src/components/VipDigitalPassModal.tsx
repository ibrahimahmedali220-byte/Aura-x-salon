import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Crown, Sparkles, X, Download, Check, ShieldCheck, QrCode, Smartphone, Share2 } from 'lucide-react';

interface VipDigitalPassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VipDigitalPassModal: React.FC<VipDigitalPassModalProps> = ({ isOpen, onClose }) => {
  const [clientName, setClientName] = useState('Alexandra Laurent');
  const [memberTier, setMemberTier] = useState<'Gold Sovereign' | 'Platinum Royale' | 'Obsidian Black Card'>('Platinum Royale');
  const [downloaded, setDownloaded] = useState(false);

  const getTierGradient = () => {
    switch (memberTier) {
      case 'Gold Sovereign':
        return 'from-[#2e1d0f] via-[#4a3319] to-[#1e130a] border-[#c5a059] shadow-[0_0_30px_rgba(212,175,55,0.4)]';
      case 'Platinum Royale':
        return 'from-[#1c232e] via-[#2f3b4d] to-[#12171e] border-[#a0b4cc] shadow-[0_0_30px_rgba(160,180,204,0.4)]';
      case 'Obsidian Black Card':
        return 'from-[#0d0d0d] via-[#1a1a1a] to-[#050505] border-[#c5a059]/80 shadow-[0_0_35px_rgba(212,175,55,0.5)]';
    }
  };

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => {
      setDownloaded(false);
    }, 4000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-xl rounded-3xl bg-[#120d08] border border-[#c5a059]/60 p-6 sm:p-8 relative shadow-2xl text-left overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-1 text-[#8f806e] hover:text-white transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gold-gradient text-black flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                <Crown className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold block">
                Official Sovereign Guild
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl text-white font-bold">
                VIP Digital Wallet Pass
              </h3>
            </div>

            {/* Customization Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#a0907e] font-semibold block mb-1">
                  Cardholder Full Name
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#1a120b] border border-[#3b2b1a] text-white text-xs focus:border-[#c5a059] outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#a0907e] font-semibold block mb-1">
                  Membership Guild Tier
                </label>
                <select
                  value={memberTier}
                  onChange={(e) => setMemberTier(e.target.value as any)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#1a120b] border border-[#3b2b1a] text-white text-xs focus:border-[#c5a059] outline-none cursor-pointer"
                >
                  <option value="Gold Sovereign">Gold Sovereign (Tier I)</option>
                  <option value="Platinum Royale">Platinum Royale (Tier II)</option>
                  <option value="Obsidian Black Card">Obsidian Black Card (Tier III)</option>
                </select>
              </div>
            </div>

            {/* 3D Holographic Pass Card Preview */}
            <div className="relative mb-6 perspective-1000">
              <div
                className={`w-full aspect-[1.58/1] rounded-2xl bg-gradient-to-br ${getTierGradient()} border p-5 sm:p-6 flex flex-col justify-between text-white relative overflow-hidden transition-all duration-500`}
              >
                {/* Holographic Watermark Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />
                <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-[#c5a059]/20 rounded-full blur-2xl pointer-events-none" />

                {/* Top Row: Logo & Chip */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center bg-black/40">
                      <span className="font-cinzel text-xs font-bold text-[#e5c07b]">A&D</span>
                    </div>
                    <div>
                      <span className="font-cinzel text-xs font-bold tracking-widest block">AURA & D'OR</span>
                      <span className="text-[8px] uppercase tracking-widest text-[#d4c3ae]">Haute Coiffure & Spa</span>
                    </div>
                  </div>

                  <span className="text-[9px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                    {memberTier}
                  </span>
                </div>

                {/* Middle: Emv Chip + Hologram */}
                <div className="flex items-center gap-4 relative z-10 my-2">
                  <div className="w-10 h-7 rounded-md bg-gradient-to-tr from-[#d4af37] via-[#fff3c4] to-[#aa8010] border border-[#d4af37]/60 shadow-inner" />
                  <div className="font-mono text-sm tracking-[0.2em] text-[#e8dcce] shadow-sm">
                    •••• •••• •••• 8849
                  </div>
                </div>

                {/* Bottom Row: Name & QR Key */}
                <div className="flex items-end justify-between relative z-10 pt-2 border-t border-white/15">
                  <div>
                    <span className="text-[8px] uppercase tracking-widest text-[#a89987] block">Cardholder</span>
                    <span className="font-cinzel text-sm font-semibold tracking-wider text-white">
                      {clientName || 'VIP GUEST'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <span className="text-[8px] uppercase tracking-widest text-[#a89987] block">Valid Thru</span>
                      <span className="font-mono text-xs text-white">12/28</span>
                    </div>
                    <div className="w-8 h-8 bg-white p-1 rounded-md flex items-center justify-center shadow-md">
                      <QrCode className="w-full h-full text-black" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDownload}
                className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-[#c5a059] via-[#e5c07b] to-[#c5a059] text-black font-semibold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {downloaded ? (
                  <>
                    <Check className="w-4 h-4 text-black" />
                    <span>Pass Saved to Apple & Google Wallet!</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="w-4 h-4 text-black" />
                    <span>Save to Apple / Google Wallet</span>
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="px-6 py-3.5 rounded-full border border-[#3b2b1a] text-[#a0907e] hover:text-white text-xs uppercase tracking-wider transition-colors cursor-pointer text-center"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
