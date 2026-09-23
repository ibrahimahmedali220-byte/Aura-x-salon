import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Gift, Send, Check, Share2, Copy, Download, X, Crown, ShieldCheck } from 'lucide-react';
import { Card3D } from './Card3D';

interface VoucherPass {
  code: string;
  amount: number;
  recipient: string;
  sender: string;
  occasion: string;
  note: string;
  issueDate: string;
}

export const GiftVoucherSection: React.FC = () => {
  const [amount, setAmount] = useState<number>(500);
  const [recipient, setRecipient] = useState<string>('Lady Vivienne');
  const [sender, setSender] = useState<string>('Lord Alexander');
  const [occasion, setOccasion] = useState<string>('Anniversary Celebration');
  const [note, setNote] = useState<string>('May your beauty journey at AURA & D\'OR be as breathtaking as your spirit.');
  
  const [activeModal, setActiveModal] = useState<VoucherPass | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const amounts = [
    { value: 250, label: "L'Éclat Pass", desc: 'Ideal for signature blowout, scalp treatment & caviar glaze.' },
    { value: 500, label: 'Prestige Sanctuary', desc: 'Full Parisian balayage or 24K cellular facial ritual.' },
    { value: 1000, label: 'Imperial Haute Vault', desc: 'All-inclusive multi-ritual suite day with champagne.' },
    { value: 2500, label: 'Royal Patron Carte', desc: 'Bespoke annual privilege with master director styling.' },
  ];

  const handleAcquireVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    const passCode = `AD-GIFT-${Math.floor(10000 + Math.random() * 90000)}`;
    const newPass: VoucherPass = {
      code: passCode,
      amount,
      recipient: recipient || 'Valued Guest',
      sender: sender || 'A Discerning Patron',
      occasion,
      note,
      issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    setActiveModal(newPass);
  };

  const copyVoucherCode = () => {
    if (!activeModal) return;
    navigator.clipboard.writeText(activeModal.code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const getWhatsAppShareUrl = () => {
    if (!activeModal) return '#';
    const text = `Dear ${activeModal.recipient},%0A%0AYou have been gifted an exclusive AURA & D'OR Luxury Gift Pass valued at $${activeModal.amount}.%0A%0AGift Code: ${activeModal.code}%0AOccasion: ${activeModal.occasion}%0AFrom: ${activeModal.sender}%0A%0APersonal Note:%0A"${activeModal.note}"%0A%0ARedeemable for any Haute Coiffure or Dermal Ritual at 452 Royale Promenade, Beverly Hills.`;
    return `https://wa.me/?text=${text}`;
  };

  return (
    <section id="gift-vault" className="relative py-28 bg-[#0a0806] border-t border-[#1c1813] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/4 w-[550px] h-[550px] bg-[#c5a059]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#14100b] mb-4">
            <Gift className="w-3 h-3 text-[#c5a059]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#d4af37] font-medium">
              Digital Luxury Gift Vault
            </span>
          </div>

          <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.15] mb-6">
            Bestow the Gift of <span className="italic text-gold-gradient font-light">Haute Elevation</span>
          </h2>

          <p className="text-sm sm:text-base text-[#b5a896] leading-relaxed font-light">
            Instantly formulate a bespoke 3D metallic digital gift pass with gold-foil personalization. Delivered instantaneously via WhatsApp or digital certificate pass.
          </p>
        </div>

        {/* Customizer + Live 3D Card Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Form: Customizer Controls (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <form onSubmit={handleAcquireVoucher} className="p-7 sm:p-9 rounded-3xl bg-[#120d09] border border-[#2b2014] space-y-6 shadow-2xl">
              
              {/* Denominations */}
              <div>
                <label className="text-xs uppercase tracking-widest text-[#d8cfc0] font-semibold block mb-3">
                  1. Select Gift Investment Denomination:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {amounts.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setAmount(item.value)}
                      className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col justify-center items-center min-h-[72px] ${
                        amount === item.value
                          ? 'bg-gold-gradient text-black border-transparent font-bold shadow-[0_0_20px_rgba(197,160,89,0.3)]'
                          : 'bg-[#1a140e] text-[#c9bfae] border-[#36291a] hover:border-[#c5a059]/40'
                      }`}
                    >
                      <span className="text-base font-cinzel block">${item.value}</span>
                      <span className="text-xs tracking-wide block opacity-90 leading-tight whitespace-normal break-words mt-1">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient & Sender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#a89d8d] font-medium block mb-1.5">
                    Honored Recipient Name
                  </label>
                  <input
                    type="text"
                    required
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="e.g. Lady Genevieve"
                    className="w-full bg-[#18120c] border border-[#36291a] focus:border-[#c5a059] focus:outline-none rounded-xl px-4 py-2.5 text-xs text-[#e8dfcf]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#a89d8d] font-medium block mb-1.5">
                    From (Your Name / Entity)
                  </label>
                  <input
                    type="text"
                    required
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    placeholder="e.g. Lord Harrison"
                    className="w-full bg-[#18120c] border border-[#36291a] focus:border-[#c5a059] focus:outline-none rounded-xl px-4 py-2.5 text-xs text-[#e8dfcf]"
                  />
                </div>
              </div>

              {/* Occasion */}
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#a89d8d] font-medium block mb-1.5">
                  Prestige Occasion
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full bg-[#18120c] border border-[#36291a] focus:border-[#c5a059] focus:outline-none rounded-xl px-4 py-2.5 text-xs text-[#e8dfcf]"
                >
                  <option value="Anniversary Celebration">Anniversary Celebration</option>
                  <option value="Birthday Royalty">Birthday Royalty</option>
                  <option value="Bridal Bliss & Nuptials">Bridal Bliss & Nuptials</option>
                  <option value="Corporate Executive Privilege">Corporate Executive Privilege</option>
                  <option value="Just Because / Spontaneous Devotion">Just Because / Spontaneous Devotion</option>
                </select>
              </div>

              {/* Personal Gold Note */}
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#a89d8d] font-medium block mb-1.5">
                  Personal Inscription (Rendered in Gold Foil)
                </label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Enter your personal sentiment..."
                  className="w-full bg-[#18120c] border border-[#36291a] focus:border-[#c5a059] focus:outline-none rounded-xl px-4 py-2.5 text-xs text-[#e8dfcf] resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-gold-luxury w-full py-4 rounded-full flex items-center justify-center gap-3 cursor-pointer group text-xs"
              >
                <Gift className="w-4 h-4 text-black group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-300" />
                <span>Acquire & Dispatch Gift Pass (${amount})</span>
              </button>
            </form>
          </div>

          {/* Right Preview: Live 3D Metallic Foil Card (6 Cols) */}
          <div className="lg:col-span-6 flex justify-center">
            <Card3D intensity={12} glowColor="rgba(212, 175, 55, 0.4)" className="w-full max-w-md">
              <div className="aspect-[1.58/1] rounded-3xl p-7 sm:p-8 bg-gradient-to-br from-[#2b2012] via-[#171109] to-[#0a0704] border-2 border-[#dfba73]/70 shadow-[0_30px_70px_rgba(0,0,0,0.95)] flex flex-col justify-between relative overflow-hidden text-left">
                
                {/* Gold Card Top Bar */}
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full border border-[#c5a059] flex items-center justify-center bg-black/60">
                      <span className="font-cinzel text-xs font-bold text-[#c5a059]">A&D</span>
                    </div>
                    <div>
                      <span className="font-cinzel text-xs tracking-widest font-bold text-white block">
                        AURA & D'OR
                      </span>
                      <span className="text-xs uppercase tracking-[0.15em] text-[#c5a059] block">
                        BEVERLY HILLS ATELIER
                      </span>
                    </div>
                  </div>

                  <span className="text-2xl sm:text-3xl font-cinzel font-bold text-gold-gradient">
                    ${amount}
                  </span>
                </div>

                {/* Card Center Inscription */}
                <div className="relative z-10 space-y-1">
                  <span className="text-xs uppercase tracking-widest text-[#a89b88] block">
                    HONORED RECIPIENT
                  </span>
                  <div className="font-cormorant text-2xl sm:text-3xl text-white font-medium italic truncate">
                    {recipient || 'Honored Guest'}
                  </div>
                  <p className="text-xs text-[#c4b5a2] font-light line-clamp-2 italic leading-relaxed pt-1">
                    "{note}"
                  </p>
                </div>

                {/* Card Bottom Meta */}
                <div className="flex items-end justify-between pt-3 border-t border-[#3b2d1c] relative z-10 text-xs">
                  <div>
                    <span className="text-[#a89b88] uppercase tracking-wider block text-xs">
                      PRESENTED BY
                    </span>
                    <span className="text-white font-medium">{sender || 'A Patron'}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[#a89b88] uppercase tracking-wider block text-xs">
                      OCCASION
                    </span>
                    <span className="text-[#c5a059] font-medium">{occasion}</span>
                  </div>
                </div>

                {/* Holographic Watermark Crest */}
                <div className="absolute right-4 bottom-4 w-36 h-36 rounded-full border border-[#c5a059]/10 pointer-events-none flex items-center justify-center">
                  <Crown className="w-20 h-20 text-[#c5a059]/10" />
                </div>
              </div>
            </Card3D>
          </div>
        </div>
      </div>

      {/* Generated Gift Voucher Pass Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-lg rounded-3xl bg-[#120e0a] border border-[#c5a059]/50 p-7 sm:p-9 relative shadow-2xl text-left"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-5 right-5 p-1 text-[#8f8270] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gold-gradient text-black flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                  <Gift className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-semibold block">
                  VIP Gift Pass Certified & Active
                </span>
                <h3 className="font-cormorant text-3xl text-white font-medium">
                  {activeModal.recipient}'s Sanctuary Pass
                </h3>
                <span className="text-xl font-cinzel text-gold-gradient font-bold">
                  ${activeModal.amount} USD
                </span>
              </div>

              {/* Code Box */}
              <div className="p-4 rounded-2xl bg-[#1b140d] border border-[#3b2d1c] mb-6 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#8e816f] block">
                    Digital Pass Security Code:
                  </span>
                  <span className="font-mono text-base font-bold text-white tracking-widest">
                    {activeModal.code}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={copyVoucherCode}
                  className="px-3 py-1.5 rounded-lg bg-[#2b1f14] hover:bg-[#c5a059] text-[#e8ded0] hover:text-black border border-[#c5a059]/30 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <a
                  href={getWhatsAppShareUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Gift Directly via WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="w-full py-3 rounded-full bg-[#1e1710] hover:bg-[#281f15] text-[#d6cec0] border border-[#3a2c1b] font-medium text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Save / Print PDF Certificate</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
