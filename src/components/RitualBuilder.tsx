import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Clock, Check, Plus, Minus, ArrowRight, ShieldCheck, Gem } from 'lucide-react';
import { SERVICES_DATA } from '../data/salonData';
import { SalonService } from '../types';
import { Card3D } from './Card3D';

interface RitualBuilderProps {
  onBookCustomRitual: (combinedService: SalonService) => void;
}

export const RitualBuilder: React.FC<RitualBuilderProps> = ({ onBookCustomRitual }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    SERVICES_DATA[0].id, // Parisian Balayage
    SERVICES_DATA[4].id  // 24K Facial
  ]);

  const toggleService = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectedServices = SERVICES_DATA.filter((s) => selectedIds.includes(s.id));

  // Calculate total price & duration
  const rawTotal = selectedServices.reduce((acc, s) => acc + s.price, 0);
  const discountRate = selectedServices.length >= 2 ? 0.10 : 0;
  const discountAmount = Math.round(rawTotal * discountRate);
  const finalTotal = rawTotal - discountAmount;

  // Approximate minutes
  const totalMinutes = selectedServices.reduce((acc, s) => {
    const mins = parseInt(s.duration.replace(/\D/g, ''), 10) || 60;
    return acc + mins;
  }, 0);

  const formattedHours = Math.floor(totalMinutes / 60);
  const formattedRemainingMins = totalMinutes % 60;
  const formattedDuration = `${formattedHours}h ${formattedRemainingMins > 0 ? `${formattedRemainingMins}m` : ''}`;

  const handleProceedToBooking = () => {
    const combinedService: SalonService = {
      id: `custom-bundle-${Date.now()}`,
      category: 'spa',
      name: `Bespoke Alchemy (${selectedServices.map((s) => s.name.split(' ')[0]).join(' + ')})`,
      tagline: `Custom Curated Multi-Ritual Experience (${selectedServices.length} Treatments)`,
      description: `Includes: ${selectedServices.map((s) => s.name).join('; ')}. With 10% Alchemy Privilege and Private Suite Lounge reservation.`,
      duration: formattedDuration,
      price: finalTotal,
      image: selectedServices[0].image,
      inclusions: selectedServices.flatMap((s) => s.inclusions.slice(0, 2))
    };

    onBookCustomRitual(combinedService);
  };

  return (
    <section id="ritual-builder" className="relative py-28 bg-[#080808] border-t border-[#1c1813]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#14100b] mb-4">
            <Sparkles className="w-3 h-3 text-[#c5a059]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#d4af37] font-medium">
              Bespoke Alchemy Experience
            </span>
          </div>

          <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.15] mb-6">
            Curate Your Own <span className="italic text-gold-gradient font-light">Custom Itinerary</span>
          </h2>

          <p className="text-sm sm:text-base text-[#e0d6c7] leading-relaxed font-light">
            Harmonize multiple hair, dermal, and thermal spa rituals into a seamless single-visit sequence. Combining 2 or more offerings unlocks our 10% Alchemy Courtesy Privilege.
          </p>
        </div>

        {/* Builder Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Services Selector (7 Cols) */}
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#e8ded1] font-semibold block mb-2">
              Select Ritual Offerings to Combine:
            </span>

            <div className="space-y-3">
              {SERVICES_DATA.map((service) => {
                const isSelected = selectedIds.includes(service.id);
                return (
                  <div
                    key={service.id}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        toggleService(service.id);
                      }
                    }}
                    onClick={() => toggleService(service.id)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-[#c5a059] ${
                      isSelected
                        ? 'bg-[#1a140d] border-[#c5a059] shadow-[0_0_20px_rgba(197,160,89,0.2)]'
                        : 'bg-[#110d09] border-[#292015] hover:border-[#c5a059]/40 hover:bg-[#16100b]'
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${
                          isSelected
                            ? 'bg-[#c5a059] border-[#c5a059] text-black shadow-md'
                            : 'border-[#523f2b] bg-[#16100a] text-transparent'
                        }`}
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs uppercase tracking-wider text-[#dfba73] font-medium">
                            {service.category.toUpperCase()}
                          </span>
                          <span className="text-xs text-[#b8ac9c]">• {service.duration}</span>
                        </div>
                        <h3 className="text-sm sm:text-base font-semibold text-white truncate">
                          {service.name}
                        </h3>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-base sm:text-lg font-cinzel font-bold text-gold-gradient">
                        ${service.price}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real-time Alchemy Itinerary Receipt (5 Cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <Card3D intensity={8} glowColor="rgba(212, 175, 55, 0.25)">
              <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-b from-[#16110b] via-[#110d08] to-[#0a0705] border border-[#c5a059]/40 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
                <div className="flex items-center justify-between pb-4 border-b border-[#292015] mb-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-semibold block">
                      Itinerary Summary
                    </span>
                    <h3 className="font-cormorant text-2xl text-white font-medium">
                      Your Custom Day Retreat
                    </h3>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#201810] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059]">
                    <Gem className="w-4 h-4" />
                  </div>
                </div>

                {/* Selected Sequence List */}
                <div className="space-y-3 mb-6">
                  {selectedServices.map((item, index) => (
                    <div key={item.id} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2 text-[#dcd1c2] truncate max-w-[200px] sm:max-w-[240px]">
                        <span className="text-[10px] text-[#c5a059] font-cinzel font-bold">
                          0{index + 1}.
                        </span>
                        <span className="truncate">{item.name}</span>
                      </div>
                      <span className="font-cinzel text-white ml-2">${item.price}</span>
                    </div>
                  ))}
                </div>

                {/* Duration & Privileges Bar */}
                <div className="p-4 rounded-xl bg-[#1c1610] border border-[#382b1b] space-y-2 mb-6">
                  <div className="flex justify-between text-xs text-[#a69988]">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                      Total Sanctuary Time:
                    </span>
                    <span className="text-white font-medium">{formattedDuration}</span>
                  </div>

                  {selectedServices.length >= 2 && (
                    <div className="flex justify-between text-xs text-emerald-400">
                      <span>Multi-Ritual Alchemy Privilege (10%):</span>
                      <span>-${discountAmount}</span>
                    </div>
                  )}

                  {finalTotal >= 600 && (
                    <div className="flex items-center gap-1.5 text-[11px] text-[#e5c07b] pt-1 border-t border-[#292015]">
                      <Sparkles className="w-3 h-3 text-[#c5a059]" />
                      <span>Complimentary Soundproof Private Suite Upgrade Included</span>
                    </div>
                  )}
                </div>

                {/* Total Investment */}
                <div className="flex items-baseline justify-between pt-2 pb-6 border-b border-[#292015] mb-6">
                  <span className="text-xs uppercase tracking-widest text-[#a89d8d]">
                    Net Atelier Investment
                  </span>
                  <div className="text-right">
                    {discountAmount > 0 && (
                      <span className="text-xs text-[#7d7162] line-through mr-2">
                        ${rawTotal}
                      </span>
                    )}
                    <span className="text-3xl font-cinzel font-bold text-white text-gold-gradient">
                      ${finalTotal}
                    </span>
                  </div>
                </div>

                {/* Direct Action */}
                <button
                  onClick={handleProceedToBooking}
                  className="btn-gold-luxury w-full py-4 rounded-full flex items-center justify-center gap-2.5 text-xs group"
                >
                  <span>Reserve Combined Itinerary</span>
                  <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>
              </div>
            </Card3D>
          </div>
        </div>
      </div>
    </section>
  );
};
