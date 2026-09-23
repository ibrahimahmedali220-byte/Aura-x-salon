import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Camera,
  Sliders,
  Check,
  ArrowRight,
  RefreshCw,
  Eye,
  Layers,
  Upload,
  User,
  Zap,
  Bookmark,
  Share2,
  Scan,
  ShieldCheck
} from 'lucide-react';
import { Card3D } from './Card3D';
import { updatePreferredStylist, addTreatmentRecord, getBeautyArchive } from '../utils/archiveStorage';

interface StyleVisualizerProps {
  onBookLook: (serviceId: string, stylistId?: string) => void;
}

interface HairFilter {
  id: string;
  name: string;
  tone: string;
  hex: string;
  serviceId: string;
  serviceName: string;
  recommendedStylist: string;
  stylistId: string;
  filterStyle: {
    colorFilter: string;
    blendMode: string;
    opacity: number;
    gradient: string;
  };
  description: string;
}

interface MakeupFilter {
  id: string;
  name: string;
  style: string;
  serviceId: string;
  serviceName: string;
  recommendedStylist: string;
  stylistId: string;
  filterStyle: {
    tintColor: string;
    highlightGlow: string;
    contrast: number;
    brightness: number;
    saturate: number;
  };
  description: string;
}

const PRESET_MODELS = [
  {
    id: 'model-1',
    name: 'Camille (Parisian Natural)',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=900&auto=format&fit=crop'
  },
  {
    id: 'model-2',
    name: 'Genevieve (Editorial Warm)',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=900&auto=format&fit=crop'
  },
  {
    id: 'model-3',
    name: 'Sienna (Golden Silhouette)',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=900&auto=format&fit=crop'
  }
];

const HAIR_FILTERS: HairFilter[] = [
  {
    id: 'hair-champagne-balayage',
    name: 'Haute Champagne Balayage',
    tone: 'Sun-kissed French Sand & Pearl',
    hex: '#e3c68a',
    serviceId: 'hair-balayage',
    serviceName: 'Haute Parisian Balayage & Gloss',
    recommendedStylist: 'Jean-Luc Moreau',
    stylistId: 'stylist-jean-luc',
    filterStyle: {
      colorFilter: 'sepia(0.3) saturate(1.4) hue-rotate(-15deg)',
      blendMode: 'color-dodge',
      opacity: 0.65,
      gradient: 'linear-gradient(135deg, rgba(227,198,138,0.5) 0%, rgba(197,160,89,0.3) 100%)'
    },
    description: 'Freehand Parisian micro-lighting providing soft dimensional halo around the cheekbones with iced caviar gloss.'
  },
  {
    id: 'hair-24k-liquid-gold',
    name: 'Liquid 24K Gold Keratin',
    tone: 'Warm Ultra-Reflective Metallic Lustre',
    hex: '#dfba73',
    serviceId: 'hair-royal-keratin',
    serviceName: 'Liquid Gold 24K Keratin Reconstruction',
    recommendedStylist: 'Elena Rostova',
    stylistId: 'stylist-elena',
    filterStyle: {
      colorFilter: 'sepia(0.5) saturate(1.8) brightness(1.05)',
      blendMode: 'soft-light',
      opacity: 0.75,
      gradient: 'radial-gradient(circle, rgba(223,186,115,0.6) 0%, rgba(120,80,20,0.4) 100%)'
    },
    description: 'Ultra-fluid mirror reflection with intense cuticle compression, eliminating humidity frizz entirely.'
  },
  {
    id: 'hair-burgundy-velvet',
    name: 'Burgundy Velvet Noir',
    tone: 'Deep Bordeaux & Dark Cherry Velvet',
    hex: '#721b2b',
    serviceId: 'hair-balayage',
    serviceName: 'Haute Parisian Balayage & Gloss',
    recommendedStylist: 'Jean-Luc Moreau',
    stylistId: 'stylist-jean-luc',
    filterStyle: {
      colorFilter: 'hue-rotate(280deg) saturate(1.7) contrast(1.1)',
      blendMode: 'overlay',
      opacity: 0.65,
      gradient: 'linear-gradient(180deg, rgba(114,27,43,0.55) 0%, rgba(40,10,18,0.7) 100%)'
    },
    description: 'Opulent aristocratic red wine undertones that reveal rich ruby luminescence only under direct chandelier light.'
  },
  {
    id: 'hair-platinum-ice',
    name: 'Nordic Crystal Platinum',
    tone: 'Anti-Brass Violet-Ash Pearl',
    hex: '#d8e1e8',
    serviceId: 'hair-balayage',
    serviceName: 'Haute Parisian Balayage & Gloss',
    recommendedStylist: 'Marie-Claire Laurent',
    stylistId: 'stylist-marie-claire',
    filterStyle: {
      colorFilter: 'saturate(0.4) brightness(1.2) contrast(1.15)',
      blendMode: 'hard-light',
      opacity: 0.45,
      gradient: 'linear-gradient(135deg, rgba(216,225,232,0.6) 0%, rgba(180,200,220,0.3) 100%)'
    },
    description: 'Pristine diamond reflection without yellow undertones, treated with bio-peptide bond-fortifying glazing.'
  },
  {
    id: 'hair-espresso-noir',
    name: 'Parisian Obsidian Espresso',
    tone: 'High-Gloss Caviar Jet Brunette',
    hex: '#2b1e19',
    serviceId: 'hair-bespoke-sculpt',
    serviceName: 'Architectural Haute Cut & Styling',
    recommendedStylist: 'Hiroshi Tanaka',
    stylistId: 'stylist-hiroshi',
    filterStyle: {
      colorFilter: 'contrast(1.3) brightness(0.85) saturate(1.1)',
      blendMode: 'multiply',
      opacity: 0.7,
      gradient: 'linear-gradient(180deg, rgba(43,30,25,0.6) 0%, rgba(10,8,7,0.75) 100%)'
    },
    description: 'Deep, rich dark chocolate with an ultra-reflective high-gloss lacquer finish.'
  }
];

const MAKEUP_FILTERS: MakeupFilter[] = [
  {
    id: 'makeup-red-carpet',
    name: 'Cannes Red Carpet Glamour',
    style: 'Velvet Ruby Lip & Gilded Sculpted Cheekbones',
    serviceId: 'skin-24k-gold',
    serviceName: '24K Imperial Gold Cellular Facial',
    recommendedStylist: 'Elena Rostova',
    stylistId: 'stylist-elena',
    filterStyle: {
      tintColor: 'rgba(212,175,55,0.22)',
      highlightGlow: 'drop-shadow(0 0 15px rgba(223,186,115,0.4))',
      contrast: 1.15,
      brightness: 1.05,
      saturate: 1.3
    },
    description: 'Sculpted contours with micro-gold strobe points, satin ruby lips, and soft Parisian smoky wing.'
  },
  {
    id: 'makeup-glass-radiance',
    name: 'Au Naturel Glass Radiance',
    style: 'Dewy Parisian Minimalist Skin & Peony Lip',
    serviceId: 'skin-24k-gold',
    serviceName: '24K Imperial Gold Cellular Facial',
    recommendedStylist: 'Marie-Claire Laurent',
    stylistId: 'stylist-marie-claire',
    filterStyle: {
      tintColor: 'rgba(255,225,200,0.18)',
      highlightGlow: 'drop-shadow(0 0 25px rgba(255,240,225,0.5))',
      contrast: 1.05,
      brightness: 1.12,
      saturate: 1.1
    },
    description: 'Translucent skin with hydro-thermal glow, feathered brows, and sheer rosehip balm finish.'
  },
  {
    id: 'makeup-imperial-gold',
    name: '24K Imperial Gold Highlighting',
    style: 'Prismatic Gold Leaf Temple & Cupid Strobe',
    serviceId: 'skin-24k-gold',
    serviceName: '24K Imperial Gold Cellular Facial',
    recommendedStylist: 'Elena Rostova',
    stylistId: 'stylist-elena',
    filterStyle: {
      tintColor: 'rgba(223,186,115,0.3)',
      highlightGlow: 'drop-shadow(0 0 22px rgba(212,175,55,0.6))',
      contrast: 1.18,
      brightness: 1.08,
      saturate: 1.45
    },
    description: 'Accents of real 24K gold foil applied across the high temple planes and upper collarbone.'
  },
  {
    id: 'makeup-royal-bridal',
    name: 'Sovereign Bridal Elegance',
    style: 'Soft Champagne Shimmer & Silk Airbrush',
    serviceId: 'bridal-royale',
    serviceName: 'Grand Imperial Bridal Couture Collection',
    recommendedStylist: 'Marie-Claire Laurent',
    stylistId: 'stylist-marie-claire',
    filterStyle: {
      tintColor: 'rgba(240,210,180,0.22)',
      highlightGlow: 'drop-shadow(0 0 18px rgba(240,210,180,0.45))',
      contrast: 1.08,
      brightness: 1.09,
      saturate: 1.2
    },
    description: 'Long-wearing HD silicon airbrush with tear-resistant velvet finish, rose quartz flush, and cashmere eyes.'
  }
];

export const StyleVisualizer: React.FC<StyleVisualizerProps> = ({ onBookLook }) => {
  const [activeTab, setActiveTab] = useState<'hair' | 'makeup'>('hair');
  const [selectedModel, setSelectedModel] = useState<string>(PRESET_MODELS[0].image);
  const [selectedHairFilter, setSelectedHairFilter] = useState<HairFilter>(HAIR_FILTERS[0]);
  const [selectedMakeupFilter, setSelectedMakeupFilter] = useState<MakeupFilter>(MAKEUP_FILTERS[0]);
  const [filterIntensity, setFilterIntensity] = useState<number>(85);
  const [sheenLevel, setSheenLevel] = useState<'matte' | 'satin' | 'gloss'>('gloss');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isComparing, setIsComparing] = useState<boolean>(true);
  const [showARScanGrid, setShowARScanGrid] = useState<boolean>(true);
  const [archiveNotice, setArchiveNotice] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCustomImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedModel(url);
    }
  };

  const handleSaveLookToArchive = () => {
    const serviceName = activeTab === 'hair' ? selectedHairFilter.serviceName : selectedMakeupFilter.serviceName;
    const stylistName = activeTab === 'hair' ? selectedHairFilter.recommendedStylist : selectedMakeupFilter.recommendedStylist;
    const formulaNote = activeTab === 'hair'
      ? `Visualizer Simulation: ${selectedHairFilter.name} (${selectedHairFilter.tone}) at ${filterIntensity}% density.`
      : `Visualizer Simulation: ${selectedMakeupFilter.name} (${selectedMakeupFilter.style}).`;

    addTreatmentRecord({
      serviceId: activeTab === 'hair' ? selectedHairFilter.serviceId : selectedMakeupFilter.serviceId,
      serviceName: `${serviceName} (AR Look Preview)`,
      stylistId: activeTab === 'hair' ? selectedHairFilter.stylistId : selectedMakeupFilter.stylistId,
      stylistName,
      date: new Date().toISOString().split('T')[0],
      price: 380,
      notes: `Saved from Haute AR Visualizer. Preferred Sheen: ${sheenLevel.toUpperCase()}.`,
      formulaNote,
      vipBeverage: 'Sommelier Champagne'
    });

    setArchiveNotice(`Saved "${activeTab === 'hair' ? selectedHairFilter.name : selectedMakeupFilter.name}" to your Personal Beauty Archive!`);
    setTimeout(() => setArchiveNotice(null), 3500);
  };

  const handleBookCurrentLook = () => {
    if (activeTab === 'hair') {
      onBookLook(selectedHairFilter.serviceId, selectedHairFilter.stylistId);
    } else {
      onBookLook(selectedMakeupFilter.serviceId, selectedMakeupFilter.stylistId);
    }
  };

  // Compute CSS filter string for preview
  const currentHairFilter = selectedHairFilter.filterStyle;
  const currentMakeupFilter = selectedMakeupFilter.filterStyle;

  const sheenMultiplier = sheenLevel === 'gloss' ? 1.15 : sheenLevel === 'satin' ? 1.0 : 0.85;
  const intensityFactor = filterIntensity / 100;

  return (
    <section id="visualizer" className="py-24 sm:py-32 relative bg-[#070503] overflow-hidden border-t border-[#1c160f]">
      {/* Background illumination */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[350px] bg-[#c5a059]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-[#5c1324]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18110a] border border-[#c5a059]/40 mb-4 shadow-[0_0_20px_rgba(197,160,89,0.15)]">
            <Scan className="w-3.5 h-3.5 text-[#c5a059] animate-pulse" />
            <span className="text-[11px] font-semibold tracking-widest text-[#dfba73] uppercase">
              Haute Miroir AR Simulation
            </span>
          </div>

          <h2 className="font-cormorant text-3xl sm:text-5xl lg:text-6xl text-white font-medium tracking-tight mb-5 leading-tight">
            AR Style Visualizer & <br />
            <span className="text-gold-gradient italic font-normal">Chroma Transformation</span>
          </h2>

          <p className="text-sm sm:text-base text-[#bfb4a4] font-light leading-relaxed">
            Preview our master colorists' signature balayage tones, glosses, and red-carpet aesthetics before your visit. Select an atelier model or upload your own portrait to discover your next look.
          </p>
        </div>

        {/* Mode Selector Tabs (Hair vs Makeup) */}
        <div className="flex justify-center mb-10">
          <div className="p-1 rounded-2xl bg-[#120d08] border border-[#2b2014] flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('hair')}
              className={`px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'hair' ? 'btn-gold-luxury' : 'text-[#a39482] hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Haute Hair Shades ({HAIR_FILTERS.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('makeup')}
              className={`px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'makeup' ? 'btn-gold-luxury' : 'text-[#a39482] hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Red-Carpet Aesthetics ({MAKEUP_FILTERS.length})</span>
            </button>
          </div>
        </div>

        {/* Main AR Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: The Interactive AR Visualizer Canvas (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <Card3D intensity={5} glowColor="rgba(212, 175, 55, 0.2)">
              <div
                ref={containerRef}
                className="relative rounded-3xl overflow-hidden bg-black border border-[#c5a059]/40 aspect-[4/5] sm:aspect-[1/1] shadow-[0_30px_90px_rgba(0,0,0,0.9)] select-none group"
              >
                {/* 1. Base / Before Layer (Left Half or full if not comparing) */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={selectedModel}
                    alt="Original Look"
                    className="w-full h-full object-cover"
                  />
                  {/* Before Label */}
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] uppercase tracking-widest text-[#d8cfc0]">
                    Natural Base
                  </div>
                </div>

                {/* 2. Transformed Layer (Clipped by comparison slider or full) */}
                <div
                  className="absolute inset-0 overflow-hidden transition-[clip-path] duration-75"
                  style={{
                    clipPath: isComparing ? `inset(0 0 0 ${sliderPosition}%)` : 'none'
                  }}
                >
                  <img
                    src={selectedModel}
                    alt="Transformed Look"
                    className="w-full h-full object-cover"
                    style={{
                      filter:
                        activeTab === 'hair'
                          ? `${currentHairFilter.colorFilter} brightness(${1 + (sheenMultiplier - 1) * 0.4})`
                          : `contrast(${currentMakeupFilter.contrast}) brightness(${currentMakeupFilter.brightness * sheenMultiplier}) saturate(${currentMakeupFilter.saturate})`
                    }}
                  />

                  {/* Colored Gradient Filter Overlay for Hair / Makeup Depth */}
                  {activeTab === 'hair' ? (
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                      style={{
                        background: currentHairFilter.gradient,
                        mixBlendMode: currentHairFilter.blendMode as any,
                        opacity: currentHairFilter.opacity * intensityFactor
                      }}
                    />
                  ) : (
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                      style={{
                        backgroundColor: currentMakeupFilter.tintColor,
                        mixBlendMode: 'color',
                        opacity: 0.8 * intensityFactor
                      }}
                    />
                  )}

                  {/* Secondary Highlight Glow Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at 50% 35%, rgba(255,230,170,0.2) 0%, transparent 60%)',
                      mixBlendMode: 'screen',
                      opacity: sheenLevel === 'gloss' ? 0.7 * intensityFactor : 0.3 * intensityFactor
                    }}
                  />

                  {/* Transformed Label */}
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-[#1c150c]/90 backdrop-blur-md border border-[#c5a059]/60 text-[10px] uppercase tracking-widest text-[#dfba73] font-bold flex items-center gap-1.5 shadow-lg">
                    <Sparkles className="w-3 h-3 text-[#c5a059]" />
                    <span>
                      {activeTab === 'hair' ? selectedHairFilter.name : selectedMakeupFilter.name}
                    </span>
                  </div>
                </div>

                {/* AR HUD Scanning Telemetry Overlay */}
                {showARScanGrid && (
                  <div className="absolute inset-0 pointer-events-none z-10 p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start text-[9px] font-mono text-[#c5a059]/70 tracking-widest uppercase">
                      <div>
                        <span>[AURA-AR-V4.2]</span>
                        <br />
                        <span>FACIAL MESH: 468 PTS</span>
                      </div>
                      <div className="text-right">
                        <span>LUSTRE: {sheenLevel.toUpperCase()}</span>
                        <br />
                        <span>CHROMA DENSITY: {filterIntensity}%</span>
                      </div>
                    </div>

                    {/* Golden Crosshair Reticles */}
                    <div className="relative w-28 h-28 mx-auto border border-[#c5a059]/30 rounded-full flex items-center justify-center animate-pulse">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-0.5 bg-[#c5a059]" />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-2 h-0.5 bg-[#c5a059]" />
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 h-2 w-0.5 bg-[#c5a059]" />
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 h-2 w-0.5 bg-[#c5a059]" />
                    </div>

                    <div className="flex justify-between items-end text-[9px] font-mono text-[#c5a059]/70 tracking-widest uppercase">
                      <span>BIO-LUMINESCENCE: OPTIMAL</span>
                      <span>PREVIEW ENGINE: LIVE</span>
                    </div>
                  </div>
                )}

                {/* Interactive Slider Bar (when comparing) */}
                {isComparing && (
                  <div
                    className="absolute top-0 bottom-0 z-30 w-1 bg-gradient-to-b from-[#dfba73] via-[#c5a059] to-[#8c6727] cursor-ew-resize flex items-center justify-center shadow-[0_0_15px_rgba(197,160,89,0.8)]"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="w-9 h-9 rounded-full bg-[#110d08] border-2 border-[#dfba73] flex items-center justify-center shadow-xl text-[#dfba73]">
                      <Sliders className="w-4 h-4 rotate-90" />
                    </div>
                  </div>
                )}

                {/* Range Input overlaid over canvas to capture drag effortlessly */}
                {isComparing && (
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    aria-label="Drag before and after visualizer"
                    className="absolute inset-0 w-full h-full opacity-0 z-40 cursor-ew-resize"
                  />
                )}
              </div>
            </Card3D>

            {/* Model Selection & Upload Controls */}
            <div className="p-4 rounded-2xl bg-[#0f0b07] border border-[#2b1f13] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider text-[#9d8e7c] font-semibold">
                  Test Portrait:
                </span>
                <div className="flex items-center gap-1.5">
                  {PRESET_MODELS.map((model) => (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => setSelectedModel(model.image)}
                      className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedModel === model.image
                          ? 'border-[#c5a059] scale-110 shadow-[0_0_10px_rgba(197,160,89,0.5)]'
                          : 'border-[#382b1c] opacity-60 hover:opacity-100'
                      }`}
                      title={model.name}
                    >
                      <img src={model.image} alt={model.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleCustomImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-outline-luxury px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Upload Your Photo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowARScanGrid(!showARScanGrid)}
                  className={`px-3 py-1.5 rounded-xl text-xs border transition-colors cursor-pointer ${
                    showARScanGrid
                      ? 'bg-[#22180e] border-[#c5a059] text-[#dfba73]'
                      : 'border-[#332617] text-[#8c7e6c] hover:text-white'
                  }`}
                  title="Toggle AR facial telemetry grid"
                >
                  AR Grid: {showARScanGrid ? 'ON' : 'OFF'}
                </button>

                <button
                  type="button"
                  onClick={() => setIsComparing(!isComparing)}
                  className={`px-3 py-1.5 rounded-xl text-xs border transition-colors cursor-pointer ${
                    isComparing
                      ? 'bg-[#22180e] border-[#c5a059] text-[#dfba73]'
                      : 'border-[#332617] text-[#8c7e6c] hover:text-white'
                  }`}
                >
                  Split: {isComparing ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Filter Palettes, Tuning & Transformation Engine (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Filter Swatches Palette */}
            <div className="p-6 rounded-3xl bg-[#0f0b07] border border-[#2b1f13] space-y-5">
              <div className="flex items-center justify-between border-b border-[#21180f] pb-3">
                <span className="text-xs uppercase tracking-widest text-[#c5a059] font-bold">
                  {activeTab === 'hair' ? 'Couture Hair Swatches' : 'Red-Carpet Aesthetic Palette'}
                </span>
                <span className="text-[11px] text-[#8e8170]">
                  Select look to preview
                </span>
              </div>

              {/* Swatch List */}
              <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
                {activeTab === 'hair'
                  ? HAIR_FILTERS.map((filter) => {
                      const isSelected = selectedHairFilter.id === filter.id;
                      return (
                        <button
                          key={filter.id}
                          type="button"
                          onClick={() => setSelectedHairFilter(filter)}
                          className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#1e150d] border-[#c5a059] shadow-[0_0_15px_rgba(197,160,89,0.25)]'
                              : 'bg-[#130e09] border-[#291f14] hover:border-[#c5a059]/40'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-7 h-7 rounded-full shadow-inner border border-white/20 shrink-0"
                              style={{ backgroundColor: filter.hex }}
                            />
                            <div>
                              <span className="text-xs font-semibold text-white block">
                                {filter.name}
                              </span>
                              <span className="text-[10px] text-[#9f917f] block truncate">
                                {filter.tone}
                              </span>
                            </div>
                          </div>

                          {isSelected && (
                            <Check className="w-4 h-4 text-[#c5a059] shrink-0" />
                          )}
                        </button>
                      );
                    })
                  : MAKEUP_FILTERS.map((filter) => {
                      const isSelected = selectedMakeupFilter.id === filter.id;
                      return (
                        <button
                          key={filter.id}
                          type="button"
                          onClick={() => setSelectedMakeupFilter(filter)}
                          className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#1e150d] border-[#c5a059] shadow-[0_0_15px_rgba(197,160,89,0.25)]'
                              : 'bg-[#130e09] border-[#291f14] hover:border-[#c5a059]/40'
                          }`}
                        >
                          <div>
                            <span className="text-xs font-semibold text-white block">
                              {filter.name}
                            </span>
                            <span className="text-[10px] text-[#9f917f] block truncate">
                              {filter.style}
                            </span>
                          </div>

                          {isSelected && (
                            <Check className="w-4 h-4 text-[#c5a059] shrink-0" />
                          )}
                        </button>
                      );
                    })}
              </div>

              {/* Sliders for Intensity & Sheen */}
              <div className="space-y-4 pt-3 border-t border-[#21180f]">
                {/* Intensity Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-[#a39482] uppercase tracking-wider text-[10px]">
                      Filter Saturation / Density
                    </span>
                    <span className="font-mono text-[#c5a059] text-[11px] font-bold">
                      {filterIntensity}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    value={filterIntensity}
                    onChange={(e) => setFilterIntensity(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#241a10] rounded-lg appearance-none cursor-pointer accent-[#c5a059]"
                  />
                </div>

                {/* Sheen / Finish Picker */}
                <div>
                  <span className="text-[#a39482] uppercase tracking-wider text-[10px] block mb-2">
                    Lustre & Reflectivity Finish
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {(['matte', 'satin', 'gloss'] as const).map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setSheenLevel(level)}
                        className={`py-2 rounded-xl uppercase text-[10px] tracking-wider font-semibold transition-all cursor-pointer ${
                          sheenLevel === level
                            ? 'bg-[#c5a059] text-black font-bold shadow-md'
                            : 'bg-[#15100a] text-[#8e806e] border border-[#2b1f13] hover:text-white'
                        }`}
                      >
                        {level === 'gloss' ? 'Liquid Gloss' : level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Salon Ritual Card & Direct Booking CTA */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#18110b] to-[#0e0a06] border border-[#c5a059]/40 space-y-4 shadow-xl">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#dfba73] font-bold block mb-1">
                  Matching Atelier Ritual
                </span>
                <h3 className="font-cormorant text-2xl text-white font-medium">
                  {activeTab === 'hair' ? selectedHairFilter.serviceName : selectedMakeupFilter.serviceName}
                </h3>
                <p className="text-xs text-[#b8ac9b] font-light mt-1 leading-relaxed">
                  {activeTab === 'hair' ? selectedHairFilter.description : selectedMakeupFilter.description}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#120d08] border border-[#241a10] flex items-center justify-between text-xs">
                <div>
                  <span className="text-xs text-[#a39582] uppercase tracking-wider block">
                    Recommended Director
                  </span>
                  <span className="text-white font-medium">
                    {activeTab === 'hair' ? selectedHairFilter.recommendedStylist : selectedMakeupFilter.recommendedStylist}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#a39582] uppercase tracking-wider block">
                    Investment
                  </span>
                  <span className="font-cinzel text-base text-gold-gradient font-bold">
                    ${activeTab === 'hair' ? '380' : '420'}
                  </span>
                </div>
              </div>

              {/* Action Buttons with clear visual hierarchy */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleBookCurrentLook}
                  className="btn-gold-luxury w-full py-4 rounded-full text-xs flex items-center justify-center gap-2 shadow-lg"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span className="font-bold">Book This Look at Atelier</span>
                  <ArrowRight className="w-3.5 h-3.5 text-black" />
                </button>

                <button
                  type="button"
                  onClick={handleSaveLookToArchive}
                  className="btn-outline-luxury w-full py-3 rounded-full text-xs flex items-center justify-center gap-2 cursor-pointer opacity-90 hover:opacity-100"
                >
                  <Bookmark className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Save Look to Personal Beauty Archive</span>
                </button>
              </div>

              {archiveNotice && (
                <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{archiveNotice}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
