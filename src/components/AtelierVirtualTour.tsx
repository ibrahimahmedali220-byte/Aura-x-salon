import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Sparkles,
  Maximize2,
  Volume2,
  VolumeX,
  Info,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle2,
  MapPin,
  MoveHorizontal
} from 'lucide-react';
import { Card3D } from './Card3D';

interface Hotspot {
  id: string;
  xPercent: number;
  yPercent: number;
  title: string;
  description: string;
}

interface TourChamber {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  hotspots: Hotspot[];
}

const TOUR_CHAMBERS: TourChamber[] = [
  {
    id: 'chamber-vip-suite',
    name: 'The Sovereign Soundproof VIP Chamber',
    subtitle: 'Suite Imperiale 01 — Maximum Discretion',
    description: 'Constructed with double acoustic isolation panels, ergonomic Italian heated leather recliners, and bespoke circadian lighting mimicking natural sunlight for flawless color fidelity.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1600&auto=format&fit=crop',
    hotspots: [
      {
        id: 'hs-1',
        xPercent: 35,
        yPercent: 60,
        title: 'Poltrona Frau Heated Styling Chair',
        description: 'Hand-stitched full-grain Italian leather with integrated multi-zone lumbar massage and silent electric recline.'
      },
      {
        id: 'hs-2',
        xPercent: 70,
        yPercent: 35,
        title: 'Circadian Sunlight Mirror',
        description: 'Color-rendering index (CRI 98+) replicating natural midday French daylight to ensure zero toner distortion.'
      },
      {
        id: 'hs-3',
        xPercent: 15,
        yPercent: 75,
        title: 'Dedicated Sommelier Butler Cart',
        description: 'Private refrigerated chamber stocked with chilled Dom Pérignon, San Pellegrino, and Petrossian caviar service.'
      }
    ]
  },
  {
    id: 'chamber-champagne-lounge',
    name: 'The Grand Sommelier Champagne Vault',
    subtitle: 'Private Reception & Reception Bar',
    description: 'Black Marquina marble bar curated with over 40 vintage Grand Cru champagnes, organic herbal elixirs, and single-origin Sicilian pistachios for patrons awaiting their ritual.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop',
    hotspots: [
      {
        id: 'hs-4',
        xPercent: 48,
        yPercent: 50,
        title: 'Temperature-Controlled Champagne Cellar',
        description: 'Maintained at strict 9°C with vintage vintages spanning 1996–2018 for complimentary patron enjoyment.'
      },
      {
        id: 'hs-5',
        xPercent: 80,
        yPercent: 65,
        title: 'Private Velvet Banquettes',
        description: 'Secluded booths designed for confidential telephone briefings or quiet contemplation before service.'
      }
    ]
  },
  {
    id: 'chamber-hair-atelier',
    name: 'Haute Coiffure Master Gallery',
    subtitle: 'Main Styling Floor & Colorist Stations',
    description: 'Expansive open-concept hall with soaring ceilings, Belgian antique chandeliers, and shadowless directional lighting where our International Art Directors execute precision balayage.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1600&auto=format&fit=crop',
    hotspots: [
      {
        id: 'hs-6',
        xPercent: 30,
        yPercent: 45,
        title: 'Shadowless Overhead Spotlights',
        description: 'Directional 5000K daylight-balanced illumination eliminates ambient shadows during micro-foil placement.'
      },
      {
        id: 'hs-7',
        xPercent: 65,
        yPercent: 70,
        title: 'Japanese Takara Belmont Wash Unit',
        description: 'Full-flat shampoo beds with micro-mist steam hoods for deep botanical hair bath rituals.'
      }
    ]
  },
  {
    id: 'chamber-apothecary-lab',
    name: 'Swiss Cellular Formulation Apothecary',
    subtitle: 'Custom Pigment & Botanical Blending Lab',
    description: 'Our confidential formulation laboratory where organic Swiss botanicals, cold-pressed seed oils, and colloidal 24K gold infusions are custom-blended to your hair DNA.',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=1600&auto=format&fit=crop',
    hotspots: [
      {
        id: 'hs-8',
        xPercent: 40,
        yPercent: 55,
        title: 'Precision Micro-Pigment Dispensary',
        description: 'Calibrated down to 0.01g to replicate your exact toner formula upon every visit.'
      },
      {
        id: 'hs-9',
        xPercent: 75,
        yPercent: 40,
        title: 'Hydro-Distillation Botanical Chamber',
        description: 'Organic Bulgarian rose and white truffle steam extraction for our signature dermal mists.'
      }
    ]
  }
];

export const AtelierVirtualTour: React.FC = () => {
  const [activeChamberIndex, setActiveChamberIndex] = useState<number>(0);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [panOffset, setPanOffset] = useState<number>(0);

  const currentChamber = TOUR_CHAMBERS[activeChamberIndex];

  const handleNextChamber = () => {
    setActiveHotspot(null);
    setActiveChamberIndex((prev) => (prev + 1) % TOUR_CHAMBERS.length);
  };

  const handlePrevChamber = () => {
    setActiveHotspot(null);
    setActiveChamberIndex((prev) => (prev - 1 + TOUR_CHAMBERS.length) % TOUR_CHAMBERS.length);
  };

  return (
    <section id="virtual-tour" className="py-24 sm:py-32 relative bg-[#070503] overflow-hidden border-t border-[#1c160f]">
      {/* Background illumination */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[350px] bg-[#c5a059]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18110a] border border-[#c5a059]/40 mb-4 shadow-[0_0_20px_rgba(197,160,89,0.15)]">
            <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="text-[11px] font-semibold tracking-widest text-[#dfba73] uppercase">
              360° Sanctuary Walkthrough
            </span>
          </div>

          <h2 className="font-cormorant text-3xl sm:text-5xl lg:text-6xl text-white font-medium tracking-tight mb-5 leading-tight">
            Explore the Confidential <br />
            <span className="text-gold-gradient italic font-normal">Chambers of AURA & D'OR</span>
          </h2>

          <p className="text-sm sm:text-base text-[#bfb4a4] font-light leading-relaxed">
            Step inside our Beverly Hills sanctuary. Tour the private soundproof suites, sommelier lounge, and botanical formulation dispensary with interactive interactive hotspots.
          </p>
        </div>

        {/* Chamber Tab Bar */}
        <div className="flex justify-center mb-8 overflow-x-auto pb-2">
          <div className="p-1.5 rounded-2xl bg-[#110d08] border border-[#2b2014] flex gap-2">
            {TOUR_CHAMBERS.map((ch, idx) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => {
                  setActiveChamberIndex(idx);
                  setActiveHotspot(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeChamberIndex === idx
                    ? 'btn-gold-luxury'
                    : 'text-[#8e8170] hover:text-white'
                }`}
              >
                {ch.name.split(' ')[1] || ch.name}
              </button>
            ))}
          </div>
        </div>

        {/* 360° Tour Stage with Interactive Hotspots */}
        <Card3D intensity={5} glowColor="rgba(212, 175, 55, 0.2)">
          <div className="relative rounded-3xl overflow-hidden bg-black border border-[#c5a059]/40 aspect-[16/9] max-h-[640px] shadow-[0_25px_80px_rgba(0,0,0,0.95)] group select-none">
            
            {/* Interactive Panoramic Image */}
            <motion.div
              key={currentChamber.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="w-full h-full relative overflow-hidden"
            >
              <img
                src={currentChamber.image}
                alt={currentChamber.name}
                className="w-full h-full object-cover"
                style={{ transform: `translateX(${panOffset}px) scale(1.05)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Interactive Hotspot Markers */}
              {currentChamber.hotspots.map((hs) => (
                <div
                  key={hs.id}
                  style={{
                    left: `${hs.xPercent}%`,
                    top: `${hs.yPercent}%`
                  }}
                  className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
                >
                  <button
                    type="button"
                    onClick={() => setActiveHotspot(activeHotspot?.id === hs.id ? null : hs)}
                    className="relative group/btn cursor-pointer p-2"
                  >
                    {/* Pulsing ring */}
                    <span className="absolute inset-0 rounded-full bg-[#c5a059]/40 animate-ping" />
                    <div className="relative w-8 h-8 rounded-full bg-[#18110b] border-2 border-[#dfba73] flex items-center justify-center text-[#dfba73] shadow-[0_0_15px_rgba(212,175,55,0.7)] group-hover/btn:scale-115 transition-transform">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  </button>
                </div>
              ))}
            </motion.div>

            {/* Chamber Telemetry & Header Overlay */}
            <div className="absolute top-6 left-6 z-20 max-w-md">
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#c5a059]/40 text-[10px] uppercase tracking-widest text-[#dfba73] font-bold inline-block mb-2">
                {currentChamber.subtitle}
              </span>
              <h3 className="font-cormorant text-2xl sm:text-4xl text-white font-medium drop-shadow-md">
                {currentChamber.name}
              </h3>
            </div>

            {/* Pan Hint Badge */}
            <div className="absolute bottom-6 left-6 z-20 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-[#b8ac9c]">
              <MoveHorizontal className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Tap glowing pins to inspect architectural amenities</span>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute right-6 bottom-6 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevChamber}
                className="w-11 h-11 rounded-full bg-black/70 backdrop-blur-md border border-[#c5a059]/40 text-white hover:text-[#c5a059] flex items-center justify-center transition-colors cursor-pointer"
                title="Previous Chamber"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNextChamber}
                className="w-11 h-11 rounded-full bg-black/70 backdrop-blur-md border border-[#c5a059]/40 text-white hover:text-[#c5a059] flex items-center justify-center transition-colors cursor-pointer"
                title="Next Chamber"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Active Hotspot Inspector Card Modal */}
            <AnimatePresence>
              {activeHotspot && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute top-6 right-6 z-40 w-80 p-5 rounded-2xl bg-[#140e08]/95 backdrop-blur-xl border border-[#c5a059] shadow-[0_15px_40px_rgba(0,0,0,0.85)] text-left"
                >
                  <div className="flex items-center justify-between border-b border-[#291e13] pb-2 mb-2.5">
                    <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold">
                      Architectural Feature
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveHotspot(null)}
                      className="text-xs text-[#8f806e] hover:text-white cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                  <h4 className="font-cormorant text-xl text-white font-medium mb-1">
                    {activeHotspot.title}
                  </h4>
                  <p className="text-xs text-[#b8ac9b] font-light leading-relaxed">
                    {activeHotspot.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </Card3D>

      </div>
    </section>
  );
};
