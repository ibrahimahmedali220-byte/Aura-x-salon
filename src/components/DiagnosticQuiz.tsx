import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, ArrowRight, RotateCcw, Calendar, UserCheck, ShieldCheck, Heart } from 'lucide-react';
import { SERVICES_DATA, STYLISTS_DATA } from '../data/salonData';
import { SalonService } from '../types';
import { Card3D } from './Card3D';

interface DiagnosticQuizProps {
  onSelectServiceForBooking: (service: SalonService) => void;
}

export const DiagnosticQuiz: React.FC<DiagnosticQuizProps> = ({ onSelectServiceForBooking }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [focus, setFocus] = useState<string>('hair');
  const [concern, setConcern] = useState<string>('frizz_color');
  const [tempo, setTempo] = useState<string>('immersive');
  const [result, setResult] = useState<{
    service: SalonService;
    stylistName: string;
    reason: string;
    expectedOutcome: string;
  } | null>(null);

  const handleCalculatePrescription = (f: string, c: string, t: string) => {
    let matchedService = SERVICES_DATA[0]; // default balayage
    let stylistName = STYLISTS_DATA[0].name; // Jean-Luc
    let reason = "Your hair profile indicates a desire for dimensional light and cuticle protection.";
    let expectedOutcome = "Lustrous multidimensional color with zero frizz and diamond bounce.";

    if (f === 'hair') {
      if (c === 'frizz_color' || c === 'damaged') {
        matchedService = SERVICES_DATA[1]; // 24K keratin
        stylistName = STYLISTS_DATA[2].name; // Roberto
        reason = "A deep bio-active protein and 24K nano-gold restructuring to seal porous cuticles.";
        expectedOutcome = "Liquid glass fluidity, total humidity immunity, and structural regeneration.";
      } else {
        matchedService = SERVICES_DATA[0]; // Balayage
        stylistName = STYLISTS_DATA[0].name; // Jean-Luc
        reason = "Custom Parisian hand-painted lighting tailored to complement your facial bone harmony.";
        expectedOutcome = "Sun-kissed high-society balayage with lasting caviar reflection.";
      }
    } else if (f === 'skin') {
      matchedService = SERVICES_DATA[4]; // 24K gold facial
      stylistName = STYLISTS_DATA[1].name; // Helena
      reason = "Cellular microcurrent activation combined with certified Japanese 24K gold leaves.";
      expectedOutcome = "Instant cheekbone contour elevation, pore refinement, and porcelain glow.";
    } else if (f === 'bridal') {
      matchedService = SERVICES_DATA[7]; // Bridal makeover
      stylistName = STYLISTS_DATA[3].name; // Soraya
      reason = "Waterproof high-definition airbrush architecture crafted for 18-hour editorial perfection.";
      expectedOutcome = "Timeless royal poise, camera-ready complexion, and bespoke hair architecture.";
    } else {
      matchedService = SERVICES_DATA[9]; // Moroccan Hammam
      stylistName = STYLISTS_DATA[3].name; // Soraya
      reason = "Deep thermal marble steam detoxification with cold-pressed botanical argan drench.";
      expectedOutcome = "Complete mental rejuvenation, profound muscular release, and baby-soft skin.";
    }

    setResult({
      service: matchedService,
      stylistName,
      reason,
      expectedOutcome
    });
    setCurrentStep(4);
  };

  const resetQuiz = () => {
    setCurrentStep(1);
    setResult(null);
  };

  return (
    <section id="diagnostic-quiz" className="relative py-28 bg-[#0a0806] border-t border-[#1c1813] overflow-hidden">
      {/* Background illumination */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-[#c5a059]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c5a059]/30 bg-[#14100b] mb-4">
            <Sparkles className="w-3 h-3 text-[#c5a059]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#d4af37] font-medium">
              Bespoke Diagnostic Concierge
            </span>
          </div>

          <h2 className="font-cormorant text-4xl sm:text-5xl font-normal text-white tracking-tight leading-[1.15] mb-4">
            Discover Your <span className="italic text-gold-gradient font-light">Signature Ritual</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#b5a896] leading-relaxed font-light">
            Answer 3 short diagnostic inquiries to receive a personalized aesthetic prescription curated by our European artistic directors.
          </p>
        </div>

        {/* Quiz Container with 3D Card */}
        <Card3D intensity={6} glowColor="rgba(212, 175, 55, 0.2)">
          <div className="p-6 sm:p-10 md:p-12 rounded-3xl bg-gradient-to-b from-[#140f0a] via-[#100c08] to-[#0a0806] border border-[#c5a059]/35 shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
            {/* Step Progress Bar */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#211a12]">
              <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-semibold">
                {currentStep <= 3 ? `Consultation Phase 0${currentStep} of 03` : 'Prescription Formulated'}
              </span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((step) => (
                  <span
                    key={step}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentStep === step
                        ? 'w-8 bg-gold-gradient'
                        : currentStep > step
                        ? 'w-4 bg-[#c5a059]'
                        : 'w-2 bg-[#2a2015]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Quiz Body */}
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="font-cormorant text-2xl sm:text-3xl text-white font-medium">
                    1. Where shall we center your transformation today?
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'hair', title: 'Haute Coiffure & Balayage', desc: 'Precision dimensional coloring, keratin smoothing, or structural diamond cut.' },
                      { id: 'skin', title: '24K Cellular Skin Aesthetics', desc: 'Dermal lifting, buccal cheekbone sculpting, or vortex glass-skin deluge.' },
                      { id: 'bridal', title: 'Royal Bridal & Gala Glamour', desc: 'Waterproof airbrush radiance, veil architecture, and red-carpet poises.' },
                      { id: 'spa', title: 'Restorative Spa & Hammam Sanctum', desc: 'Private marble steam bath, hot basalt volcanic stones, and deep release.' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setFocus(item.id);
                          setCurrentStep(2);
                        }}
                        className={`p-5 rounded-2xl text-left border transition-all duration-300 flex flex-col justify-between group ${
                          focus === item.id
                            ? 'bg-[#1e1710] border-[#c5a059] shadow-[0_0_20px_rgba(197,160,89,0.25)]'
                            : 'bg-[#120d09] border-[#292015] hover:border-[#c5a059]/50 hover:bg-[#18120c]'
                        }`}
                      >
                        <div>
                          <div className="text-base font-semibold text-white group-hover:text-gold-gradient transition-colors mb-1">
                            {item.title}
                          </div>
                          <div className="text-xs text-[#9d907e] font-light leading-relaxed">
                            {item.desc}
                          </div>
                        </div>
                        <div className="mt-4 flex items-center gap-1 text-[11px] text-[#c5a059] uppercase tracking-wider font-semibold">
                          <span>Select Focus</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="font-cormorant text-2xl sm:text-3xl text-white font-medium">
                    2. What is your primary aesthetic aspiration or challenge?
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'frizz_color', title: 'Sensitized Cuticle / Frizz / Unruly Motility', desc: 'Requires molecular keratin and silk lipid reinforcement.' },
                      { id: 'dull_porous', title: 'Desire Dimensional Luminosity & High Fashion Tone', desc: 'Seeking Parisian freehand balayage with zero harsh demarcation.' },
                      { id: 'cellular_aging', title: 'Loss of Firmness, Nasolabial Creases & Dehydration', desc: 'Desire instant structural cheekbone lift and dermal plumping.' },
                      { id: 'chronic_fatigue', title: 'Severe Sensory Fatigue & Stagnant Muscular Tension', desc: 'Require thermal volcanic stone grounding and eucalyptus hammam.' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setConcern(item.id);
                          setCurrentStep(3);
                        }}
                        className={`p-5 rounded-2xl text-left border transition-all duration-300 flex flex-col justify-between group ${
                          concern === item.id
                            ? 'bg-[#1e1710] border-[#c5a059] shadow-[0_0_20px_rgba(197,160,89,0.25)]'
                            : 'bg-[#120d09] border-[#292015] hover:border-[#c5a059]/50 hover:bg-[#18120c]'
                        }`}
                      >
                        <div>
                          <div className="text-base font-semibold text-white group-hover:text-gold-gradient transition-colors mb-1">
                            {item.title}
                          </div>
                          <div className="text-xs text-[#9d907e] font-light leading-relaxed">
                            {item.desc}
                          </div>
                        </div>
                        <div className="mt-4 flex items-center gap-1 text-[11px] text-[#c5a059] uppercase tracking-wider font-semibold">
                          <span>Confirm Condition</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-[#8f8270] hover:text-[#c5a059] underline cursor-pointer pt-2"
                  >
                    ← Back to Previous Inquiry
                  </button>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="font-cormorant text-2xl sm:text-3xl text-white font-medium">
                    3. What is your preferred temporal sanctuary investment?
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: 'express', title: 'Haute Express', duration: '75 – 90 Mins', desc: 'Precision artistic focus for busy executive schedules.' },
                      { id: 'immersive', title: 'Immersion Ritual', duration: '2.5 – 3.5 Hours', desc: 'Complete rejuvenation with private tea & scalp relaxation.' },
                      { id: 'royal_suite', title: 'All-Day Suite Retreat', duration: '5 – 6 Hours', desc: 'Soundproof VIP suite with personal butler & champagne.' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setTempo(item.id);
                          handleCalculatePrescription(focus, concern, item.id);
                        }}
                        className="p-5 rounded-2xl text-left border bg-[#120d09] border-[#292015] hover:border-[#c5a059] hover:bg-[#1a140d] transition-all group flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold block mb-1">
                            {item.duration}
                          </span>
                          <div className="text-base font-semibold text-white group-hover:text-gold-gradient transition-colors mb-2">
                            {item.title}
                          </div>
                          <div className="text-xs text-[#9d907e] font-light leading-relaxed">
                            {item.desc}
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-[#221a11] text-[11px] text-[#c5a059] uppercase tracking-wider font-semibold">
                          Formulate Prescription →
                        </div>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-xs text-[#8f8270] hover:text-[#c5a059] underline cursor-pointer pt-2"
                  >
                    ← Back to Previous Inquiry
                  </button>
                </motion.div>
              )}

              {/* Step 4: Formulated Prescription */}
              {currentStep === 4 && result && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="p-6 rounded-2xl bg-[#1a140d] border border-[#c5a059]/40 flex flex-col md:flex-row items-center gap-6">
                    <img
                      src={result.service.image}
                      alt={result.service.name}
                      className="w-full md:w-48 h-48 rounded-xl object-cover border border-[#c5a059]/40 shadow-md shrink-0"
                    />

                    <div className="space-y-2 text-left flex-1">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a059] font-bold">
                        Formulated Atelier Prescription
                      </span>
                      <h4 className="font-cormorant text-2xl sm:text-3xl text-white font-medium leading-tight">
                        {result.service.name}
                      </h4>
                      <p className="text-xs text-[#e5c07b] italic font-light">
                        {result.service.tagline}
                      </p>
                      <p className="text-xs text-[#b8ac9c] font-light leading-relaxed">
                        {result.reason}
                      </p>

                      <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#d6cec0]">
                        <span className="flex items-center gap-1">
                          <UserCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                          Matched Director: <strong className="text-white ml-1">{result.stylistName}</strong>
                        </span>
                        <span>•</span>
                        <span>Duration: <strong className="text-white">{result.service.duration}</strong></span>
                        <span>•</span>
                        <span>Investment: <strong className="text-gold-gradient font-cinzel text-base">${result.service.price}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Expected Results */}
                  <div className="p-4 rounded-xl bg-[#120e0a] border border-[#261e14] text-left flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#9f917f] block font-semibold">
                        Guaranteed Transformation Standard
                      </span>
                      <span className="text-xs text-[#e0d6c8] font-light">
                        {result.expectedOutcome}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <button
                      onClick={resetQuiz}
                      className="flex items-center gap-1.5 text-xs text-[#8f8270] hover:text-[#c5a059] uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake Diagnostic Consultation</span>
                    </button>

                    <button
                      onClick={() => onSelectServiceForBooking(result.service)}
                      className="btn-gold-luxury w-full sm:w-auto px-8 py-3.5 rounded-full flex items-center justify-center gap-2.5 text-xs group"
                    >
                      <Calendar className="w-4 h-4 text-black group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                      <span>Book Prescribed Ritual</span>
                      <ArrowRight className="w-3.5 h-3.5 text-black group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card3D>
      </div>
    </section>
  );
};
