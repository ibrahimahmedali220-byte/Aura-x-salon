import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Scan,
  Sparkles,
  Camera,
  Activity,
  CheckCircle2,
  RefreshCw,
  Zap,
  Bookmark,
  ArrowRight,
  ShieldAlert,
  Droplets,
  Layers,
  Thermometer
} from 'lucide-react';
import { Card3D } from './Card3D';
import { addTreatmentRecord } from '../utils/archiveStorage';

interface HairScalpScannerProps {
  onBookPrescribedRitual: (serviceId: string) => void;
}

export const HairScalpScanner: React.FC<HairScalpScannerProps> = ({
  onBookPrescribedRitual
}) => {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'complete'>('idle');
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [archiveSaved, setArchiveSaved] = useState<boolean>(false);

  const startScanSimulation = () => {
    setScanState('scanning');
    setScanProgress(0);
    setArchiveSaved(false);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanState('complete');
          return 100;
        }
        return prev + 12;
      });
    }, 180);
  };

  const handleSaveToArchive = () => {
    addTreatmentRecord({
      serviceId: 'hair-royal-keratin',
      serviceName: 'Liquid Gold 24K Keratin Reconstruction (AI Prescribed)',
      stylistId: 'stylist-jean-luc',
      stylistName: 'Jean-Luc Moreau',
      date: new Date().toISOString().split('T')[0],
      price: 450,
      notes: 'AI Trichology Diagnostic: High Cuticle Porosity, 38% Lipid Moisture Depletion.',
      formulaNote: 'Swiss Peptide Deep Sealant + 24K Colloidal Liquid Gold Infusion (pH 4.8).',
      vipBeverage: 'Sommelier Champagne'
    });
    setArchiveSaved(true);
    setTimeout(() => setArchiveSaved(false), 3500);
  };

  return (
    <section id="ai-scanner" className="py-24 sm:py-32 relative bg-[#090704] overflow-hidden border-t border-[#1c150e]">
      {/* Background glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[350px] bg-[#c5a059]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18110b] border border-[#c5a059]/40 mb-4 shadow-[0_0_20px_rgba(197,160,89,0.15)]">
            <Scan className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="text-[11px] font-semibold tracking-widest text-[#dfba73] uppercase">
              AI Trichology Biometrics
            </span>
          </div>

          <h2 className="font-cormorant text-3xl sm:text-5xl lg:text-6xl text-white font-medium tracking-tight mb-5 leading-tight">
            AI Scalp Health & Hair <br />
            <span className="text-gold-gradient italic font-normal">Porosity Diagnostic Scanner</span>
          </h2>

          <p className="text-sm sm:text-base text-[#bfb4a4] font-light leading-relaxed">
            Our proprietary optical diagnostic engine measures cuticle lipid cohesion, follicle density, and hydration balance to formulate your bespoke biological ritual.
          </p>
        </div>

        {/* Scanner Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Optical Scanner Stage (6 cols) */}
          <div className="lg:col-span-6">
            <Card3D intensity={6} glowColor="rgba(212, 175, 55, 0.2)">
              <div className="relative rounded-3xl overflow-hidden bg-black border border-[#c5a059]/40 aspect-[4/3] shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex items-center justify-center">
                
                {/* Background Sample Photo */}
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=900&auto=format&fit=crop"
                  alt="Microscopic Hair Analysis"
                  className="absolute inset-0 w-full h-full object-cover opacity-35"
                />

                {/* Scan Overlay Lines */}
                {scanState === 'scanning' && (
                  <motion.div
                    initial={{ top: '0%' }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#dfba73] to-transparent shadow-[0_0_20px_#dfba73]"
                  />
                )}

                {/* Microscopic Grid HUD */}
                <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">
                  <div className="flex justify-between text-[9px] font-mono text-[#c5a059]/80 uppercase tracking-widest">
                    <span>SENSOR: TRICHO-SPECTRA 8X</span>
                    <span>OPTICAL RESOLUTION: 4K UHD</span>
                  </div>

                  {/* Target Reticle */}
                  <div className="relative w-36 h-36 mx-auto border-2 border-dashed border-[#c5a059]/50 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#c5a059] animate-ping" />
                    <span className="absolute -bottom-7 text-[9px] font-mono text-[#c5a059] uppercase tracking-wider">
                      {scanState === 'scanning' ? `ANALYZING... ${scanProgress}%` : 'ALIGN FOLLICLE ZONE'}
                    </span>
                  </div>

                  <div className="flex justify-between text-[9px] font-mono text-[#c5a059]/80 uppercase tracking-widest">
                    <span>CUTICLE INTEGRITY: {scanState === 'complete' ? 'EVALUATED' : 'STANDBY'}</span>
                    <span>BIO-MAP: READY</span>
                  </div>
                </div>

                {/* Idle / Initial Activation CTA */}
                {scanState === 'idle' && (
                  <div className="relative z-20 text-center p-6 bg-[#120d08]/85 backdrop-blur-md rounded-2xl border border-[#3b2c1c] max-w-xs">
                    <Camera className="w-8 h-8 text-[#c5a059] mx-auto mb-3" />
                    <h3 className="text-sm font-semibold text-white mb-1">
                      Activate Optical Diagnostic
                    </h3>
                    <p className="text-xs text-[#b8ac9c] mb-4">
                      Simulate a deep cellular scan of your hair fiber and follicle health.
                    </p>
                    <button
                      type="button"
                      onClick={startScanSimulation}
                      className="btn-gold-luxury w-full py-2.5 rounded-xl text-xs uppercase font-bold"
                    >
                      Begin Trichology Scan
                    </button>
                  </div>
                )}

                {/* Scanning Progress Screen */}
                {scanState === 'scanning' && (
                  <div className="relative z-20 text-center p-5 bg-[#120d08]/90 backdrop-blur-md rounded-2xl border border-[#c5a059] max-w-xs">
                    <Activity className="w-7 h-7 text-[#c5a059] mx-auto mb-2 animate-spin" />
                    <span className="text-xs uppercase font-mono tracking-widest text-[#dfba73] block mb-2">
                      Spectral Mapping in Progress
                    </span>
                    <div className="w-48 h-1.5 bg-[#241a10] rounded-full mx-auto overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#c5a059] to-[#dfba73] transition-all"
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                  </div>
                )}

              </div>
            </Card3D>
          </div>

          {/* Right: Diagnostic Telemetry & Bespoke Prescription (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Live Metrics */}
            <div className="p-6 rounded-3xl bg-[#0e0a06] border border-[#2b1f13] space-y-5">
              <div className="flex items-center justify-between border-b border-[#21170d] pb-3">
                <span className="text-xs uppercase tracking-widest text-[#c5a059] font-bold">
                  Biometric Telemetry Readout
                </span>
                <button
                  type="button"
                  onClick={startScanSimulation}
                  className="text-[11px] text-[#938573] hover:text-[#c5a059] flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Re-Calibrate</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: Layers,
                    label: 'Cuticle Porosity',
                    value: scanState === 'complete' ? 'High Porosity' : 'Simulating...',
                    status: 'Open Scales (Moisture Loss)',
                    statusColor: 'text-amber-400'
                  },
                  {
                    icon: Droplets,
                    label: 'Lipid Moisture Index',
                    value: scanState === 'complete' ? '62% (Moderate)' : 'Simulating...',
                    status: 'Requires Ceramide Infusion',
                    statusColor: 'text-rose-400'
                  },
                  {
                    icon: Zap,
                    label: 'Keratin Elasticity',
                    value: scanState === 'complete' ? '74% Resilience' : 'Simulating...',
                    status: 'Optimal Cortex Core',
                    statusColor: 'text-emerald-400'
                  },
                  {
                    icon: Thermometer,
                    label: 'Scalp Sebum Balance',
                    value: scanState === 'complete' ? 'Normal / Sensitive' : 'Simulating...',
                    status: 'Micro-Inflammation Detected',
                    statusColor: 'text-amber-400'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-[#140e08] border border-[#261b11]">
                    <div className="flex items-center gap-2 mb-1.5">
                      <item.icon className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span className="text-[10px] text-[#8e806e] uppercase tracking-wider block">
                        {item.label}
                      </span>
                    </div>
                    <span className="font-semibold text-white text-sm block">
                      {item.value}
                    </span>
                    <span className={`text-[10px] ${item.statusColor} block truncate`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prescribed Formulation Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#181109] to-[#0d0905] border border-[#c5a059]/50 shadow-xl space-y-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#dfba73] font-bold block mb-1">
                  Atelier Prescription
                </span>
                <h3 className="font-cormorant text-2xl text-white font-medium">
                  Liquid Gold 24K Keratin & Bio-Peptide Seal
                </h3>
                <p className="text-xs text-[#b8ac9b] font-light mt-1 leading-relaxed">
                  Infuses pure colloidal gold particles with Swiss apple stem cells into sensitized cuticles, compressing porosity scales by 94% for mirror-grade silk reflection.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#130d08] border border-[#261b11] space-y-1 text-xs">
                <span className="text-[10px] uppercase tracking-wider text-[#a89987] font-semibold block">
                  Recommended At-Home Apothecary:
                </span>
                <span className="text-[#e2d5c3] block">
                  • 24K Liquid Gold Cellular Hair Nectar (50ml)
                </span>
                <span className="text-[#e2d5c3] block">
                  • Damascene Rose Scalp Hydrosol Elixir
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => onBookPrescribedRitual('hair-royal-keratin')}
                  className="btn-gold-luxury w-full py-3.5 rounded-full text-xs flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Reserve Prescribed Keratin Ritual ($450)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-black" />
                </button>

                <button
                  type="button"
                  onClick={handleSaveToArchive}
                  className="btn-outline-luxury w-full py-2.5 rounded-full text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Bookmark className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Save Diagnostic to Beauty Archive</span>
                </button>

                {archiveSaved && (
                  <div className="p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-xs flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Prescription archived to your browser dossier!</span>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
