import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gift,
  Sparkles,
  Heart,
  Share2,
  Copy,
  CheckCircle2,
  Plus,
  Trash2,
  Send,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { Card3D } from './Card3D';

interface WishlistItem {
  id: string;
  name: string;
  category: string;
  price: number;
}

const REGISTRY_OPTIONS: WishlistItem[] = [
  { id: 'hair-royal-keratin', name: 'Liquid Gold 24K Keratin Reconstruction', category: 'Haute Hair Ritual', price: 450 },
  { id: 'spa-diamond-facial', name: 'Imperial 24K Diamond Micro-Sculpting Facial', category: 'Facial Sanctuary', price: 550 },
  { id: 'spa-caviar-infusion', name: 'Caviar & Black Pearl Cellular Scalp Infusion', category: 'Scalp Ritual', price: 380 },
  { id: 'pkg-sovereign-day', name: 'The Sovereign Day of Rejuvenation (5 Hrs)', category: 'VIP Day Retreat', price: 1650 },
  { id: 'apoth-nectar-gold', name: '24K Liquid Gold Cellular Hair Nectar (50ml)', category: 'Haute Apothecary', price: 185 },
  { id: 'apoth-obsidian-blade', name: 'Volcanic Obsidian Facial Sculpting Gua Sha', category: 'Atelier Tool', price: 145 },
  { id: 'apoth-rose-mist', name: 'Damascene Rose & White Truffle Dermal Mist', category: 'Haute Apothecary', price: 125 }
];

export const GiftRegistryWishlist: React.FC = () => {
  const [registryName, setRegistryName] = useState<string>('Lady Genevieve Montgomery');
  const [occasion, setOccasion] = useState<string>('Wedding & Paris Honeymoon');
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([
    'hair-royal-keratin',
    'spa-diamond-facial',
    'apoth-nectar-gold'
  ]);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const selectedItems = REGISTRY_OPTIONS.filter((item) => selectedItemIds.includes(item.id));
  const totalRegistryValue = selectedItems.reduce((acc, item) => acc + item.price, 0);

  const toggleItem = (id: string) => {
    if (selectedItemIds.includes(id)) {
      setSelectedItemIds(selectedItemIds.filter((itemId) => itemId !== id));
    } else {
      setSelectedItemIds([...selectedItemIds, id]);
    }
  };

  const registryShareUrl = `https://whatsapp.com/channel/0029VbDjq2eBVJl7tp9j6J2b?registry=${encodeURIComponent(
    registryName
  )}&val=${totalRegistryValue}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(registryShareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <section id="gift-registry" className="py-24 sm:py-32 relative bg-[#060402] overflow-hidden border-t border-[#1c150e]">
      {/* Background glow */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[350px] bg-[#c5a059]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18110b] border border-[#c5a059]/40 mb-4 shadow-[0_0_20px_rgba(197,160,89,0.15)]">
            <Gift className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="text-[11px] font-semibold tracking-widest text-[#dfba73] uppercase">
              Patron Celebrations
            </span>
          </div>

          <h2 className="font-cormorant text-3xl sm:text-5xl lg:text-6xl text-white font-medium tracking-tight mb-5 leading-tight">
            VIP Gift Registry & <br />
            <span className="text-gold-gradient italic font-normal">Sanctuary Wishlist Concierge</span>
          </h2>

          <p className="text-sm sm:text-base text-[#bfb4a4] font-light leading-relaxed">
            Curate your confidential luxury wishlist for weddings, anniversaries, or birthdays. Share your private dossier with friends, family, or partners who wish to gift you exceptional atelier rituals.
          </p>
        </div>

        {/* Layout: Selector + Live Registry Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Customizer & Catalog (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Occasion & Beneficiary Details */}
            <div className="p-6 rounded-3xl bg-[#0e0a06] border border-[#2b1f13] space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#c5a059] font-bold block border-b border-[#21170d] pb-2">
                1. Registry Profile & Milestone
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9d8e7c] mb-1.5 font-medium">
                    Patron / Couple Name
                  </label>
                  <input
                    type="text"
                    value={registryName}
                    onChange={(e) => setRegistryName(e.target.value)}
                    className="w-full bg-[#18110a] border border-[#3b2a1a] focus:border-[#c5a059] rounded-xl px-4 py-2.5 text-xs text-[#e6decb] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9d8e7c] mb-1.5 font-medium">
                    Celebrated Occasion
                  </label>
                  <input
                    type="text"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full bg-[#18110a] border border-[#3b2a1a] focus:border-[#c5a059] rounded-xl px-4 py-2.5 text-xs text-[#e6decb] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Catalog of Curated Rituals to Add */}
            <div className="p-6 rounded-3xl bg-[#0e0a06] border border-[#2b1f13] space-y-4">
              <div className="flex items-center justify-between border-b border-[#21170d] pb-2">
                <span className="text-xs uppercase tracking-widest text-[#c5a059] font-bold">
                  2. Select Rituals & Apothecary to Include
                </span>
                <span className="text-[11px] text-[#8e8170]">
                  {selectedItemIds.length} rituals pinned
                </span>
              </div>

              <div className="space-y-2.5">
                {REGISTRY_OPTIONS.map((item) => {
                  const isSelected = selectedItemIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#1b140b] border-[#c5a059] shadow-sm'
                          : 'bg-[#120d08] border-[#261b11] hover:border-[#c5a059]/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center border text-xs ${
                            isSelected
                              ? 'bg-[#c5a059] border-[#c5a059] text-black font-bold'
                              : 'border-[#3d2d1d] text-transparent'
                          }`}
                        >
                          ✓
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-white block">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-[#938573] block">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <span className="font-cinzel text-xs text-[#c5a059] font-bold shrink-0">
                        ${item.price}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right: Live Shareable Registry Card (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <Card3D intensity={8} glowColor="rgba(212, 175, 55, 0.25)">
              <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#181109] to-[#0d0905] border-2 border-[#c5a059]/60 shadow-[0_25px_60px_rgba(0,0,0,0.85)] space-y-6">
                
                {/* Registry Crest */}
                <div className="text-center border-b border-[#291f13] pb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#2b1f13] border border-[#c5a059]/50 mx-auto flex items-center justify-center text-[#c5a059] mb-3 shadow-[0_0_15px_rgba(197,160,89,0.3)]">
                    <Gift className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold block mb-1">
                    Atelier Gift Registry
                  </span>
                  <h3 className="font-cormorant text-2xl text-white font-medium">
                    {registryName || 'Patron Registry'}
                  </h3>
                  <span className="text-xs text-[#9d8f7e] italic block mt-0.5">
                    {occasion || 'Special Celebration'}
                  </span>
                </div>

                {/* Selected Rituals Ticker */}
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {selectedItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-xl bg-[#140e08] border border-[#2b1f13] flex justify-between items-center text-xs"
                    >
                      <div className="truncate pr-2">
                        <span className="text-white block truncate font-medium">{item.name}</span>
                        <span className="text-[10px] text-[#8e8170] block">{item.category}</span>
                      </div>
                      <span className="font-mono text-[#c5a059] font-bold shrink-0">
                        ${item.price}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total Value */}
                <div className="pt-3 border-t border-[#291f13] flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-wider text-[#a89987]">
                    Total Registry Tally:
                  </span>
                  <span className="font-cinzel text-3xl text-gold-gradient font-bold">
                    ${totalRegistryValue.toLocaleString()}
                  </span>
                </div>

                {/* Shareable Link Box */}
                <div className="space-y-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="btn-gold-luxury w-full py-3.5 rounded-full text-xs flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4 text-black" />
                    <span>Copy Confidential Registry Link</span>
                  </button>

                  <a
                    href="https://whatsapp.com/channel/0029VbDjq2eBVJl7tp9j6J2b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-luxury w-full py-2.5 rounded-full text-xs flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Publish Wishlist to WhatsApp Channel</span>
                  </a>

                  {copiedLink && (
                    <div className="p-2 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-[11px] flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Link copied to clipboard! Share with your entourage.</span>
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#807261]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>100% Secure patron redemption concierge</span>
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
