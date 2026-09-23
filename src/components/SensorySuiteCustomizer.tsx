import React, { useState } from 'react';
import { Wine, Sparkles, Flame, Moon, Sun, Check, Heart, ShieldCheck, ArrowRight } from 'lucide-react';
import { SectionReveal } from './SectionReveal';

interface ElixirOption {
  id: string;
  name: string;
  origin: string;
  description: string;
  badge: string;
}

const ELIXIRS: ElixirOption[] = [
  {
    id: 'champagne',
    name: 'Dom Pérignon Vintage Champagne',
    origin: 'Épernay, France',
    description: 'Chilled grand cru brut served in crystal flutes with gold-dusted organic strawberries.',
    badge: 'Signature Pairing',
  },
  {
    id: 'matcha',
    name: 'Ceremonial Uji Gold Leaf Matcha',
    origin: 'Kyoto, Japan',
    description: 'Single-estate stoneground green tea whisked tableside, garnished with 24K edible gold flakes.',
    badge: 'Antioxidant Ritual',
  },
  {
    id: 'rose-elixir',
    name: 'Damask Rose & Botanical Sparkling Nectar',
    origin: 'Grasse, France',
    description: 'Non-alcoholic infusion of fresh wild roses, organic elderflower, and Himalayan pink crystal essence.',
    badge: 'Non-Alcoholic',
  },
  {
    id: 'cappuccino',
    name: 'Gold Dust Artisan Cappuccino',
    origin: 'Milano, Italy',
    description: 'Single-origin Ethiopian Yirgacheffe espresso topped with micro-foam and embossed 24K gold leaf monogram.',
    badge: 'Barista Reserve',
  }
];

interface ScentOption {
  id: string;
  name: string;
  notes: string;
  mood: string;
}

const SCENTS: ScentOption[] = [
  {
    id: 'royal-oud',
    name: 'Royal Oud & Amber Noir',
    notes: 'Smoked Agarwood, Warm Golden Amber, Moroccan Cedar',
    mood: 'Deeply Calming & Opulent',
  },
  {
    id: 'rose-santal',
    name: 'Grasse Rose & Sandalwood',
    notes: 'Fresh May Rose, Creamy Mysore Sandalwood, Bergamot',
    mood: 'Romantic & Rejuvenating',
  },
  {
    id: 'jasmine-neroli',
    name: 'Sicilian Bergamot & White Jasmine',
    notes: 'Sun-Drenched Citrus Blossom, Tunisian Neroli, White Musk',
    mood: 'Energizing & Uplifting',
  }
];

interface LightingOption {
  id: string;
  name: string;
  desc: string;
}

const LIGHTING: LightingOption[] = [
  { id: 'candlelit', name: 'Candlelit Amber Sanctuary', desc: 'Soft 2200K warm glow recreating natural beeswax candlelight' },
  { id: 'starlight', name: 'Starlight Twilight Suite', desc: 'Subtle celestial overhead dimming for deep scalp relaxation' },
  { id: 'golden-hour', name: 'Golden Hour Luminescence', desc: 'Flattering editorial warm spectrum ideal for color appointments' },
];

export const SensorySuiteCustomizer: React.FC = () => {
  const [selectedElixir, setSelectedElixir] = useState<string>('champagne');
  const [selectedScent, setSelectedScent] = useState<string>('royal-oud');
  const [selectedLighting, setSelectedLighting] = useState<string>('candlelit');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSavePreferences = () => {
    setIsSaved(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('aura_sensory_preferences', JSON.stringify({
        elixir: selectedElixir,
        scent: selectedScent,
        lighting: selectedLighting,
      }));
    }
    setTimeout(() => setIsSaved(false), 4000);
  };

  const activeElixirObj = ELIXIRS.find((e) => e.id === selectedElixir) || ELIXIRS[0];
  const activeScentObj = SCENTS.find((s) => s.id === selectedScent) || SCENTS[0];

  return (
    <section id="sensory-customizer" className="py-24 bg-[#080604] relative overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionReveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181008] border border-[#c5a059]/40 text-[#c5a059] text-xs uppercase tracking-widest mb-4">
            <Wine className="w-3.5 h-3.5" />
            <span>Complimentary Bespoke Suite Hospitality</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wider mb-6">
            Aura Sensory Suite Customizer
          </h2>
          <p className="font-cormorant text-xl text-[#c4b9a8] italic">
            Tailor your upcoming visit. Select your complimentary grand cru beverage, bespoke suite aromatherapy, and ambient sanctuary lighting.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Step 1: Welcome Elixir */}
          <SectionReveal delay={0.1} className="p-6 sm:p-8 rounded-3xl bg-[#120d08] border border-[#2d1f14] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#24170d]">
                <div className="w-10 h-10 rounded-full bg-[#27190e] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059]">
                  <Wine className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold">Step 1</span>
                  <h3 className="font-cinzel text-lg text-white font-bold">Welcome Elixir</h3>
                </div>
              </div>

              <div className="space-y-3">
                {ELIXIRS.map((elixir) => (
                  <div
                    key={elixir.id}
                    onClick={() => setSelectedElixir(elixir.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      selectedElixir === elixir.id
                        ? 'bg-[#20150d] border-[#c5a059] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                        : 'bg-[#150f0a] border-[#291c12] hover:border-[#3d2b1b]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="font-medium text-sm text-white">{elixir.name}</span>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#2c1c0f] text-[#c5a059] border border-[#c5a059]/30 shrink-0">
                        {elixir.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#8f806e]">{elixir.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Step 2: Aromatherapy Scent */}
          <SectionReveal delay={0.2} className="p-6 sm:p-8 rounded-3xl bg-[#120d08] border border-[#2d1f14] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#24170d]">
                <div className="w-10 h-10 rounded-full bg-[#27190e] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059]">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold">Step 2</span>
                  <h3 className="font-cinzel text-lg text-white font-bold">Suite Aromatherapy</h3>
                </div>
              </div>

              <div className="space-y-3">
                {SCENTS.map((scent) => (
                  <div
                    key={scent.id}
                    onClick={() => setSelectedScent(scent.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      selectedScent === scent.id
                        ? 'bg-[#20150d] border-[#c5a059] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                        : 'bg-[#150f0a] border-[#291c12] hover:border-[#3d2b1b]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="font-medium text-sm text-white">{scent.name}</span>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#2c1c0f] text-[#e5c07b] border border-[#c5a059]/30 shrink-0">
                        {scent.mood}
                      </span>
                    </div>
                    <p className="text-xs text-[#8f806e]">Notes: {scent.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Step 3: Ambient Lighting & Confirmation Keycard */}
          <SectionReveal delay={0.3} className="p-6 sm:p-8 rounded-3xl bg-[#120d08] border border-[#2d1f14] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#24170d]">
                <div className="w-10 h-10 rounded-full bg-[#27190e] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold">Step 3</span>
                  <h3 className="font-cinzel text-lg text-white font-bold">Lighting & Summary</h3>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {LIGHTING.map((light) => (
                  <div
                    key={light.id}
                    onClick={() => setSelectedLighting(light.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                      selectedLighting === light.id
                        ? 'bg-[#20150d] border-[#c5a059]'
                        : 'bg-[#150f0a] border-[#291c12]'
                    }`}
                  >
                    <div className="font-medium text-xs text-white mb-0.5">{light.name}</div>
                    <p className="text-[11px] text-[#8f806e]">{light.desc}</p>
                  </div>
                ))}
              </div>

              {/* Saved Pass Summary Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1c130b] to-[#100a06] border border-[#c5a059]/40">
                <div className="text-[9px] uppercase tracking-widest text-[#c5a059] font-bold mb-2">
                  Active Sensory Protocol
                </div>
                <div className="text-xs text-[#e8dcce] space-y-1">
                  <div>🍷 <strong>Elixir:</strong> {activeElixirObj.name}</div>
                  <div>🕯️ <strong>Scent:</strong> {activeScentObj.name}</div>
                </div>
              </div>
            </div>

            <button
              onClick={handleSavePreferences}
              className="mt-6 w-full py-3 rounded-full bg-gradient-to-r from-[#c5a059] to-[#e5c07b] text-black font-semibold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4 text-black" />
                  <span>Sensory Protocol Saved!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Save Suite Preferences</span>
                </>
              )}
            </button>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
};
