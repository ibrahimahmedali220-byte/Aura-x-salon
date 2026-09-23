import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShoppingBag, Check, Eye, X, Droplets, Bell, Flame } from 'lucide-react';
import { APOTHECARY_PRODUCTS } from '../data/salonData';
import { ApothecaryProduct } from '../types';
import { Card3D } from './Card3D';
import { ExclusiveSmsAlertModal } from './ExclusiveSmsAlertModal';

export const ApothecarySection: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ApothecaryProduct | null>(null);
  const [reservedProducts, setReservedProducts] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleReserveProduct = (prod: ApothecaryProduct) => {
    if (!reservedProducts.includes(prod.id)) {
      setReservedProducts([...reservedProducts, prod.id]);
    }
    setToastMessage(`"${prod.name}" has been reserved for your private suite arrival.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <section id="apothecary" className="relative py-28 bg-[#0a0806] border-t border-[#1c1813] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#14100b] mb-4">
            <Droplets className="w-3 h-3 text-[#c5a059]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#d4af37] font-medium">
              Haute Botanique & Alchemy
            </span>
          </div>

          <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.15] mb-6">
            The Atelier <span className="italic text-gold-gradient font-light">Apothecary Boutique</span>
          </h2>

          <p className="text-sm sm:text-base text-[#b5a896] leading-relaxed font-light">
            Proprietary bio-active concentrates formulated in our Swiss alpine laboratory. Available exclusively to clients of AURA & D'OR for continued home elevation.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {APOTHECARY_PRODUCTS.map((prod) => {
            const isReserved = reservedProducts.includes(prod.id);
            return (
              <Card3D key={prod.id} intensity={8} glowColor="rgba(212, 175, 55, 0.2)">
                <div className="rounded-3xl bg-[#120d09] border border-[#2b2014] p-5 flex flex-col justify-between h-full group hover:border-[#c5a059]/50 transition-colors">
                  <div>
                    {/* Image */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden mb-5 bg-[#0a0806]">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <span className="absolute top-3 left-3 text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[#c5a059] border border-[#c5a059]/30 font-medium">
                        {prod.category}
                      </span>
                    </div>

                    {/* Meta */}
                    <span className="text-[10px] text-[#8e816f] uppercase tracking-wider block mb-1">
                      {prod.volume}
                    </span>
                    <h3 className="font-cormorant text-xl text-white font-medium mb-1 line-clamp-1">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-[#a09483] font-light mb-4 line-clamp-2 leading-relaxed">
                      {prod.subheading}
                    </p>

                    {/* Ingredients tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {prod.keyIngredients.map((ing, i) => (
                        <span
                          key={i}
                          className="text-[9px] px-2 py-0.5 rounded-md bg-[#1c150e] text-[#c7bcac] border border-[#302517]"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-4 border-t border-[#201810] flex items-center justify-between gap-3">
                    <span className="font-cinzel text-xl font-bold text-gold-gradient">
                      ${prod.price}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(prod)}
                        className="p-2 rounded-xl border border-[#382b1c] text-[#a09483] hover:text-white hover:border-[#c5a059] transition-colors"
                        title="View Full Ingredients"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleReserveProduct(prod)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer group ${
                          isReserved
                            ? 'bg-emerald-700/40 text-emerald-300 border border-emerald-500/40'
                            : 'btn-gold-luxury'
                        }`}
                      >
                        {isReserved ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Reserved</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5 text-black group-hover:scale-125 transition-transform duration-300" />
                            <span>Reserve</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </Card3D>
            );
          })}
        </div>

        {/* Exclusive SMS Alerts Feature Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#18110b] via-[#21160d] to-[#160f09] border border-[#c5a059]/40 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2a1d12] to-[#120c07] border border-[#c5a059]/50 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(212,175,55,0.25)]">
              <Bell className="w-6 h-6 text-[#e5c07b] animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37] px-2 py-0.5 rounded-full bg-[#352312] border border-[#c5a059]/40">
                  Priority Dispatch
                </span>
                <span className="text-[10px] text-[#91816f]">Limited to 150 VIP Patrons</span>
              </div>
              <h3 className="font-cormorant text-xl sm:text-2xl text-white font-normal">
                Never Miss a <span className="italic text-gold-gradient font-light">Rare Apothecary Drop</span> or VIP Opening
              </h3>
              <p className="text-xs text-[#a89a87] font-light max-w-xl mt-0.5 leading-relaxed">
                Receive instant, discreet mobile text alerts minutes before micro-batch Swiss formulations go live or when master stylists have last-minute suite cancellations.
              </p>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <ExclusiveSmsAlertModal />
          </div>
        </div>
      </div>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-24 right-6 z-50 p-4 rounded-2xl bg-[#140e0a]/95 border border-[#c5a059] text-xs text-[#e6ded0] shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center gap-3 max-w-sm"
          >
            <div className="w-7 h-7 rounded-full bg-gold-gradient text-black flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-lg rounded-3xl bg-[#120e0a] border border-[#c5a059]/50 p-7 sm:p-8 relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 right-5 p-1 text-[#8f8270] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex gap-4 items-center mb-6">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-20 h-20 rounded-2xl object-cover border border-[#c5a059]/40"
                />
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-semibold block">
                    {selectedProduct.category} • {selectedProduct.volume}
                  </span>
                  <h3 className="font-cormorant text-2xl text-white font-medium">
                    {selectedProduct.name}
                  </h3>
                  <span className="font-cinzel text-lg text-gold-gradient font-bold">
                    ${selectedProduct.price}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#b8ac9c] leading-relaxed font-light mb-6">
                {selectedProduct.description}
              </p>

              <div className="p-4 rounded-xl bg-[#1c150e] border border-[#2b2014] space-y-2 mb-6">
                <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-semibold block">
                  Bio-Active Key Ingredients:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.keyIngredients.map((ing, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-lg bg-[#271d13] text-[#e6ded0] border border-[#3b2d1c]"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  handleReserveProduct(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="btn-gold-luxury w-full py-3.5 rounded-full text-xs flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <ShoppingBag className="w-4 h-4 text-black group-hover:scale-125 transition-transform duration-300" />
                <span>Reserve for Atelier Suite Visit</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
