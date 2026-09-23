import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star, Award, ChevronRight, X, Check, Heart, Eye } from 'lucide-react';
import { SectionReveal } from './SectionReveal';

interface CelebrityLook {
  id: string;
  title: string;
  event: string;
  year: string;
  stylist: string;
  imageUrl: string;
  description: string;
  productsUsed: string[];
  ritualFormula: string;
  duration: string;
  price: string;
  serviceId: string;
}

const CELEBRITY_LOOKS: CelebrityLook[] = [
  {
    id: 'met-gala-2026',
    title: 'The Gilded Celestial Wave',
    event: 'Met Gala Red Carpet',
    year: '2026',
    stylist: 'Antoine Laurent • Master Artistic Director',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    description: 'Sculpted high-gloss finger waves infused with 24K real gold leaf micro-flakes, paired with caviar root lift for 14-hour high-definition shine under flash photography.',
    productsUsed: ['24K Liquid Gold Diamond Elixir', 'Caviar Collagen Thermal Shield', 'Botanical Luxury Finishing Mist'],
    ritualFormula: 'Double Caviar Steam Bath + Sculpted Thermal Set + Gold Leaf Artistry',
    duration: '2.5 Hours',
    price: '$650',
    serviceId: 'royal-blowout',
  },
  {
    id: 'cannes-palme',
    title: 'Riviera Glass Balayage & French Blowout',
    event: 'Cannes Film Festival Premiere',
    year: '2026',
    stylist: 'Elena Rostova • Color Alchemist',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop',
    description: 'Multi-dimensional sun-kissed champagne blonde ribbons blended seamlessly with organic silk peptides, creating effortless movement on the Croisette red carpet.',
    productsUsed: ['Silk Peptide Bond Multiplier', 'Champagne Gloss Tonality Complex', 'Precious Amber Nectar'],
    ritualFormula: 'Diamond Dust Lightening + Glaze Neutralizer + High-Gloss Glass Shield',
    duration: '3.5 Hours',
    price: '$890',
    serviceId: 'balayage-haute',
  },
  {
    id: 'oscars-radiance',
    title: 'Academy Starlight Updo & Pearl Finish',
    event: '98th Academy Awards Gala',
    year: '2026',
    stylist: 'Marcus Vance • Luxury Hair Styling Laureate',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop',
    description: 'An architectural chignon woven with invisible silk pins, treated with Japanese white truffle essence for celestial shine and zero flyaways.',
    productsUsed: ['White Truffle Moisture Seal', 'Diamond Velvet Sculpting Clay', 'Oud & Rose Infused Aura Spray'],
    ritualFormula: 'Hydro-Infusion Scalp Prep + Architectural Pinning + Starlight Glaze',
    duration: '2 Hours',
    price: '$580',
    serviceId: 'couture-updo',
  },
  {
    id: 'venice-film',
    title: 'Venetian Velvet Obsidian Sleek',
    event: 'Venice International Film Festival',
    year: '2025',
    stylist: 'Chloe Moreau • Texture & Scalp Savant',
    imageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1200&auto=format&fit=crop',
    description: 'Ultra-reflective obsidian glass press with keratin nanospheres that seal every cuticle to withstand lagoon humidity and sea breeze.',
    productsUsed: ['Nanosphere Keratin Complex', 'Moroccan Argan Liquid Gold', 'Hydro-Shield Anti-Humidity Elixir'],
    ritualFormula: 'Nanosphere Ultrasonic Infusion + Precision Glass Polish',
    duration: '3 Hours',
    price: '$720',
    serviceId: 'caviar-hair-facial',
  }
];

interface CelebrityLookbookProps {
  onBookLook?: (serviceId: string) => void;
}

export const CelebrityLookbook: React.FC<CelebrityLookbookProps> = ({ onBookLook }) => {
  const [selectedLook, setSelectedLook] = useState<CelebrityLook | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'Met Gala' | 'Cannes' | 'Oscars' | 'Venice'>('all');

  const filteredLooks = activeFilter === 'all'
    ? CELEBRITY_LOOKS
    : CELEBRITY_LOOKS.filter((look) => look.event.includes(activeFilter));

  return (
    <section id="celebrity-lookbook" className="py-24 bg-[#0a0705] relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#c5a059]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <SectionReveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181008] border border-[#c5a059]/40 text-[#c5a059] text-xs uppercase tracking-widest mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Red Carpet & Haute Couture Lookbook</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wider mb-6">
            Celebrity Galas & Red Carpet Creations
          </h2>
          <p className="font-cormorant text-xl text-[#c4b9a8] italic">
            Discover the iconic red carpet looks crafted by the Master Directors of Aura & D'Or for world premieres, galas, and film festivals.
          </p>
        </SectionReveal>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {(['all', 'Met Gala', 'Cannes', 'Oscars', 'Venice'] as const).map((filter) => {
            const isSelected = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#ffe49e] via-[#dfba73] to-[#c5a059] text-[#0a0704] font-bold ring-2 ring-[#ffe49e] shadow-[0_0_20px_rgba(243,203,117,0.55)] scale-105'
                    : 'bg-[#140e08] text-[#c4b9a8] border border-[#2a1d12] hover:border-[#c5a059]/60 hover:text-white'
                }`}
              >
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />}
                <span>{filter === 'all' ? 'All Red Carpet Looks' : filter}</span>
              </button>
            );
          })}
        </div>

        {/* Lookbook Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredLooks.map((look) => (
            <SectionReveal key={look.id} delay={0.1}>
              <div
                onClick={() => setSelectedLook(look)}
                className="group relative rounded-2xl overflow-hidden bg-[#120d08] border border-[#2d1f14] hover:border-[#c5a059]/70 transition-all duration-500 shadow-xl cursor-pointer flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={look.imageUrl}
                    alt={look.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120d08] via-black/20 to-transparent" />

                  {/* Event Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[#c5a059]/40 text-[#c5a059] text-[10px] font-semibold tracking-wider uppercase">
                    {look.event} • {look.year}
                  </div>

                  {/* Get The Look Overlay Icon */}
                  <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/80 border border-[#c5a059] flex items-center justify-center text-[#c5a059] group-hover:scale-110 group-hover:bg-[#c5a059] group-hover:text-black transition-all">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-cormorant text-2xl text-white font-medium group-hover:text-[#c5a059] transition-colors mb-1.5">
                      {look.title}
                    </h3>
                    <p className="text-xs text-[#a0907e] mb-3">
                      Styled by <span className="text-[#e2d5c2]">{look.stylist.split('•')[0]}</span>
                    </p>
                    <p className="text-xs text-[#8f806e] line-clamp-2 leading-relaxed">
                      {look.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#24170d] flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#c5a059] font-mono">
                      {look.price}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-white group-hover:text-[#c5a059] font-medium inline-flex items-center gap-1">
                      Get The Look <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>

      {/* "Get The Look" Deep-Dive Modal */}
      <AnimatePresence>
        {selectedLook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="w-full max-w-2xl rounded-3xl bg-[#120d08] border border-[#c5a059]/60 p-6 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedLook(null)}
                className="absolute top-5 right-5 p-1 text-[#8f806e] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c5a059] font-semibold mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Haute Coiffure Breakdown • {selectedLook.event}</span>
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl text-white font-bold mb-4">
                {selectedLook.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="rounded-2xl overflow-hidden aspect-[4/5] border border-[#2d1f14]">
                  <img
                    src={selectedLook.imageUrl}
                    alt={selectedLook.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#a0907e] block">Master Stylist</span>
                      <p className="text-sm font-semibold text-white">{selectedLook.stylist}</p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#a0907e] block">Treatment Formula</span>
                      <p className="text-xs text-[#d6c7b3] leading-relaxed">{selectedLook.ritualFormula}</p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#a0907e] block mb-1.5">Products Applied</span>
                      <div className="space-y-1">
                        {selectedLook.productsUsed.map((p, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-[#f5ebd9]">
                            <Check className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                            <span>{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#24170d] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#a0907e] block">Ritual Price</span>
                      <span className="text-xl font-bold text-[#c5a059] font-mono">{selectedLook.price}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#a0907e] block">Duration</span>
                      <span className="text-sm font-medium text-white">{selectedLook.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    const sId = selectedLook.serviceId;
                    setSelectedLook(null);
                    if (onBookLook) onBookLook(sId);
                  }}
                  className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-[#c5a059] via-[#e5c07b] to-[#c5a059] text-black font-semibold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-[1.02] transition-all cursor-pointer text-center"
                >
                  Book This Exact Red Carpet Look
                </button>
                <button
                  onClick={() => setSelectedLook(null)}
                  className="px-6 py-3.5 rounded-full border border-[#3b2b1a] text-[#a0907e] hover:text-white text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
