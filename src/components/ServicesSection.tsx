import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Clock, Check, ChevronRight, X, Calendar, Flame, Eye } from 'lucide-react';
import { SERVICES_DATA } from '../data/salonData';
import { SalonService, ServiceCategory } from '../types';
import { Card3D } from './Card3D';

interface ServicesSectionProps {
  onSelectServiceForBooking: (service: SalonService) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedModalService, setSelectedModalService] = useState<SalonService | null>(null);

  const categories = [
    { id: 'all', label: 'All Offerings' },
    { id: 'hair', label: 'Hair Couture' },
    { id: 'skin', label: 'Skin & Aesthetics' },
    { id: 'bridal', label: 'Bridal & Glamour' },
    { id: 'spa', label: 'Bespoke Spa' },
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="relative py-28 bg-[#080808] border-t border-[#1c1813]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#14100b] mb-4">
            <Sparkles className="w-3 h-3 text-[#c5a059]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#d4af37] font-medium">
              Curated Haute Coiffure & Wellness
            </span>
          </div>

          <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.15] mb-6">
            Our Signature <span className="italic text-gold-gradient font-light">Bespoke Rituals</span>
          </h2>

          <p className="text-sm sm:text-base text-[#b5a896] leading-relaxed font-light">
            Every ritual is a harmonious symphony of certified Swiss actives, French artisan technique, and deep physiological rejuvenation.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`service-cat-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full text-xs tracking-[0.18em] uppercase transition-all duration-300 font-medium ${
                activeCategory === cat.id
                  ? 'bg-gold-gradient text-black font-semibold shadow-[0_0_20px_rgba(197,160,89,0.35)] scale-105'
                  : 'bg-[#120f0b] text-[#b0a493] border border-[#2d2418] hover:border-[#c5a059]/40 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid with 3D Tilt Cards */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredServices.map((service) => (
              <motion.div
                layout
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
              >
                <Card3D intensity={12} glowColor="rgba(212, 175, 55, 0.2)">
                  <div className="h-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#14100b] to-[#0a0806] border border-[#2d2316] hover:border-[#c5a059]/50 transition-all flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.7)] group">
                    {/* Card Image with Floating Badges */}
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0806] via-transparent to-transparent opacity-80" />

                      {service.featured && (
                        <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a0806]/80 backdrop-blur-md border border-[#c5a059]/50 text-[10px] uppercase tracking-widest text-[#e5c07b] font-semibold">
                          <Flame className="w-3 h-3 text-[#c5a059]" />
                          Signature Ritual
                        </div>
                      )}

                      <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#0a0806]/85 backdrop-blur-md border border-[#2d2419] text-[11px] text-[#d6cec0]">
                        <Clock className="w-3 h-3 text-[#c5a059]" />
                        <span>{service.duration}</span>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-[#c5a059]/80 font-medium">
                          {service.category.toUpperCase()} ATELIER
                        </span>
                        <div className="text-right">
                          <span className="text-[10px] text-[#938776] uppercase tracking-wider block">Investment</span>
                          <span className="text-xl font-cinzel font-bold text-white">${service.price}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-cormorant text-2xl text-white font-medium mb-1 group-hover:text-gold-gradient transition-colors">
                          {service.name}
                        </h3>
                        <p className="text-xs text-[#c5a059] italic mb-3 font-light">
                          {service.tagline}
                        </p>
                        <p className="text-xs text-[#9f9382] leading-relaxed line-clamp-3 mb-5 font-light">
                          {service.description}
                        </p>

                        {/* Inclusions Preview */}
                        <div className="space-y-1.5 mb-6 pt-3 border-t border-[#1e1710]">
                          {service.inclusions.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-[11px] text-[#c4b9a8]">
                              <Check className="w-3 h-3 text-[#c5a059] shrink-0" />
                              <span className="truncate">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2.5 pt-4 border-t border-[#1f1710]">
                        <button
                          onClick={() => setSelectedModalService(service)}
                          className="px-3.5 py-2 rounded-lg border border-[#2c2216] hover:border-[#c5a059]/40 text-[11px] uppercase tracking-wider text-[#b8ad9d] hover:text-white flex items-center gap-1 transition-colors"
                          title="View Inclusions"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#c5a059]" />
                          <span>Details</span>
                        </button>

                        <button
                          onClick={() => onSelectServiceForBooking(service)}
                          className="btn-gold-luxury flex-1 py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 group/btn cursor-pointer"
                        >
                          <span>Book Ritual</span>
                          <ChevronRight className="w-4 h-4 text-black group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedModalService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0f0b08] border border-[#c5a059]/40 rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] max-h-[90vh] flex flex-col"
            >
              {/* Modal Image Header */}
              <div className="relative h-60 w-full overflow-hidden shrink-0">
                <img
                  src={selectedModalService.image}
                  alt={selectedModalService.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0b08] via-transparent to-black/60" />

                <button
                  onClick={() => setSelectedModalService(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-[#d8cfc0] hover:text-white hover:bg-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#c5a059] font-medium">
                      {selectedModalService.category.toUpperCase()} SANCTUARY
                    </span>
                    <h3 className="font-cormorant text-2xl sm:text-3xl text-white font-medium">
                      {selectedModalService.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-cinzel font-bold text-gold-gradient">
                      ${selectedModalService.price}
                    </span>
                    <span className="block text-[11px] text-[#a19584]">
                      {selectedModalService.duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#c5a059] font-semibold mb-2">
                    The Experience
                  </h4>
                  <p className="text-sm text-[#d1c6b6] leading-relaxed font-light">
                    {selectedModalService.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#c5a059] font-semibold mb-3">
                    Complimentary Inclusions & Protocol
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedModalService.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-[#18130e] border border-[#2b2116]">
                        <Check className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                        <span className="text-xs text-[#e4dbce]">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#261e15] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-[#968a78]">
                    Includes private lounge access, artisan herbal infusion, and consultation.
                  </span>

                  <button
                    onClick={() => {
                      const s = selectedModalService;
                      setSelectedModalService(null);
                      onSelectServiceForBooking(s);
                    }}
                    className="btn-gold-luxury w-full sm:w-auto px-8 py-3 rounded-full text-xs flex items-center justify-center gap-2.5 group cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-black group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Reserve This Ritual</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
