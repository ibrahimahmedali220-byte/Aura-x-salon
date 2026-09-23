import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Heart,
  Sparkles,
  Users,
  Wine,
  Crown,
  Calendar,
  CheckCircle2,
  Shield,
  ArrowRight,
  Camera,
  Home
} from 'lucide-react';
import { Card3D } from './Card3D';

interface BridalConciergeEstimatorProps {
  onBookBridalParty: (serviceId: string, partyDetails: string) => void;
}

export const BridalConciergeEstimator: React.FC<BridalConciergeEstimatorProps> = ({
  onBookBridalParty
}) => {
  const [bridesmaidsCount, setBridesmaidsCount] = useState<number>(3);
  const [includeMother, setIncludeMother] = useState<boolean>(true);
  const [includeSuiteBuyout, setIncludeSuiteBuyout] = useState<boolean>(true);
  const [includeCaviarChampagne, setIncludeCaviarChampagne] = useState<boolean>(true);
  const [includePhotographer, setIncludePhotographer] = useState<boolean>(false);
  const [includeOnSiteEscort, setIncludeOnSiteEscort] = useState<boolean>(false);
  const [weddingDate, setWeddingDate] = useState<string>('');

  // Base pricing math
  const BRIDE_PRICE = 950; // Grand Bridal Coiffure & 24K Gold Airbrush
  const BRIDESMAID_RATE = 280; // per attendant
  const MOTHER_RATE = 320; // Mother of bride/groom
  const SUITE_BUYOUT_RATE = 800; // Full day private soundproof suite
  const CAVIAR_CHAMPAGNE_RATE = 450; // Dom Pérignon & Petrossian Caviar Brunch
  const PHOTOGRAPHER_RATE = 500; // Atelier BTS editorial shoot
  const ON_SITE_ESCORT_RATE = 600; // Venue travel stylist

  const totalEstimate =
    BRIDE_PRICE +
    bridesmaidsCount * BRIDESMAID_RATE +
    (includeMother ? MOTHER_RATE : 0) +
    (includeSuiteBuyout ? SUITE_BUYOUT_RATE : 0) +
    (includeCaviarChampagne ? CAVIAR_CHAMPAGNE_RATE : 0) +
    (includePhotographer ? PHOTOGRAPHER_RATE : 0) +
    (includeOnSiteEscort ? ON_SITE_ESCORT_RATE : 0);

  const depositRequired = Math.round(totalEstimate * 0.5);

  const handleProceedToBooking = () => {
    const details = `Bridal Party Sanctuary (${bridesmaidsCount + 1 + (includeMother ? 1 : 0)} Guests). Bride + ${bridesmaidsCount} Bridesmaids${
      includeMother ? ' + Mother of the Bride' : ''
    }. Add-ons: ${includeSuiteBuyout ? 'Suite Buyout, ' : ''}${
      includeCaviarChampagne ? 'Caviar & Champagne, ' : ''
    }${includePhotographer ? 'BTS Editorial Shoot, ' : ''}${
      includeOnSiteEscort ? 'On-site Escort' : ''
    }. Total Estimate: $${totalEstimate}`;

    onBookBridalParty('pkg-bridal-royale', details);
  };

  return (
    <section id="bridal-concierge" className="py-24 sm:py-32 relative bg-[#060403] overflow-hidden border-t border-[#1c150e]">
      {/* Background glow */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[350px] bg-[#611222]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[300px] bg-[#c5a059]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18110b] border border-[#c5a059]/40 mb-4 shadow-[0_0_20px_rgba(197,160,89,0.15)]">
            <Heart className="w-3.5 h-3.5 text-[#e5a2b0]" />
            <span className="text-[11px] font-semibold tracking-widest text-[#dfba73] uppercase">
              Bespoke Wedding & Gala Entourage
            </span>
          </div>

          <h2 className="font-cormorant text-3xl sm:text-5xl lg:text-6xl text-white font-medium tracking-tight mb-5 leading-tight">
            Haute Bridal & Red-Carpet <br />
            <span className="text-gold-gradient italic font-normal">Entourage Concierge Estimator</span>
          </h2>

          <p className="text-sm sm:text-base text-[#bfb4a4] font-light leading-relaxed">
            Curate a seamless bridal morning for you and your wedding party. Calculate live estimates for bespoke veil setting, airbrush makeup, private suite buyout, and sommelier champagne service.
          </p>
        </div>

        {/* Interactive Estimator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Party Composition */}
            <div className="p-6 rounded-3xl bg-[#0e0a06] border border-[#291e13] space-y-5">
              <div className="flex items-center justify-between border-b border-[#21170d] pb-3">
                <span className="text-xs uppercase tracking-widest text-[#c5a059] font-bold">
                  1. Bridal Party Size & Attendees
                </span>
                <span className="text-[11px] text-[#8e8170]">
                  Full couture hair & makeup
                </span>
              </div>

              {/* Bride fixed badge */}
              <div className="p-3.5 rounded-2xl bg-[#161009] border border-[#3b2a1a] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#2a1d12] flex items-center justify-center text-[#c5a059]">
                    <Crown className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      The Bride (Grand Couture Ritual)
                    </span>
                    <span className="text-[10px] text-[#9c8e7d]">
                      Trial session, veil setting, 24K gold facial prep & waterproof airbrush
                    </span>
                  </div>
                </div>
                <span className="font-cinzel text-sm text-[#e0cfbe] font-bold">
                  ${BRIDE_PRICE}
                </span>
              </div>

              {/* Bridesmaids Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#a49684] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Number of Bridesmaids / Attendants</span>
                  </span>
                  <span className="font-mono text-base font-bold text-white bg-[#1a130b] px-3 py-1 rounded-xl border border-[#3b2a1a]">
                    {bridesmaidsCount} Attendants (${bridesmaidsCount * BRIDESMAID_RATE})
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={bridesmaidsCount}
                  onChange={(e) => setBridesmaidsCount(Number(e.target.value))}
                  className="w-full h-2 bg-[#21170e] rounded-lg appearance-none cursor-pointer accent-[#c5a059]"
                />
                <div className="flex justify-between text-[10px] text-[#716556]">
                  <span>Solo Bride</span>
                  <span>5 Attendants</span>
                  <span>10 Attendants</span>
                </div>
              </div>

              {/* Mother of Bride / Groom Checkbox */}
              <label className="p-3.5 rounded-2xl bg-[#161009] border border-[#2b1f13] hover:border-[#c5a059]/40 flex items-center justify-between cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={includeMother}
                    onChange={(e) => setIncludeMother(e.target.checked)}
                    className="w-4 h-4 accent-[#c5a059] rounded"
                  />
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      Include Mother of the Bride / Groom
                    </span>
                    <span className="text-[10px] text-[#9c8e7d]">
                      Lifting blowout, elegant contouring & de-aging eye prep
                    </span>
                  </div>
                </div>
                <span className="font-cinzel text-xs text-[#c5a059] font-bold">
                  +${MOTHER_RATE}
                </span>
              </label>
            </div>

            {/* Step 2: Luxury Sanctuary Amenities */}
            <div className="p-6 rounded-3xl bg-[#0e0a06] border border-[#291e13] space-y-4">
              <div className="flex items-center justify-between border-b border-[#21170d] pb-3">
                <span className="text-xs uppercase tracking-widest text-[#c5a059] font-bold">
                  2. Atelier Sanctuary Upgrades
                </span>
                <span className="text-[11px] text-[#8e8170]">
                  Exclusive event options
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    checked: includeSuiteBuyout,
                    toggle: () => setIncludeSuiteBuyout(!includeSuiteBuyout),
                    title: 'Private Soundproof VIP Chamber Buyout (Full Day)',
                    desc: 'Complete privacy with custom lighting, acoustic playlist control & dressing room.',
                    price: SUITE_BUYOUT_RATE,
                    icon: Home
                  },
                  {
                    checked: includeCaviarChampagne,
                    toggle: () => setIncludeCaviarChampagne(!includeCaviarChampagne),
                    title: 'Sommelier Vintage Champagne & Caviar Brunch',
                    desc: '2 bottles of Dom Pérignon, Petrossian Royal caviar, fresh blinis & berries.',
                    price: CAVIAR_CHAMPAGNE_RATE,
                    icon: Wine
                  },
                  {
                    checked: includePhotographer,
                    toggle: () => setIncludePhotographer(!includePhotographer),
                    title: 'Pre-Ceremony Atelier Editorial Photography (BTS)',
                    desc: 'Dedicated high-fashion photographer to document hair and makeup preparations.',
                    price: PHOTOGRAPHER_RATE,
                    icon: Camera
                  },
                  {
                    checked: includeOnSiteEscort,
                    toggle: () => setIncludeOnSiteEscort(!includeOnSiteEscort),
                    title: 'Master Artisan Escort to Ceremony / Venue',
                    desc: 'Artistic Director accompanies bride to the altar for veil adjustment & touch-ups.',
                    price: ON_SITE_ESCORT_RATE,
                    icon: Sparkles
                  }
                ].map((item, idx) => (
                  <label
                    key={idx}
                    onClick={item.toggle}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      item.checked
                        ? 'bg-[#1b140b] border-[#c5a059] shadow-sm'
                        : 'bg-[#120d08] border-[#261b11] hover:border-[#c5a059]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => {}} // handled by parent label click
                        className="w-4 h-4 accent-[#c5a059] rounded shrink-0"
                      />
                      <item.icon className="w-4 h-4 text-[#c5a059] shrink-0" />
                      <div>
                        <span className="text-xs font-semibold text-white block">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-[#938573] block">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                    <span className="font-cinzel text-xs text-[#c5a059] font-bold shrink-0">
                      +${item.price}
                    </span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Quotation & Reservation Summary Card (5 Cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <Card3D intensity={8} glowColor="rgba(212, 175, 55, 0.25)">
              <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#171109] to-[#0c0906] border-2 border-[#c5a059]/60 shadow-[0_25px_60px_rgba(0,0,0,0.85)] space-y-6">
                
                <div className="border-b border-[#291f13] pb-4">
                  <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold block mb-1">
                    Bespoke Quotation
                  </span>
                  <h3 className="font-cormorant text-2xl sm:text-3xl text-white font-medium">
                    Grand Bridal Concierge Summary
                  </h3>
                  <span className="text-xs text-[#9d8f7e] mt-1 block">
                    Party of {bridesmaidsCount + 1 + (includeMother ? 1 : 0)} Honored Guests
                  </span>
                </div>

                {/* Line Item Breakdown */}
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-[#d6c9b8]">
                    <span>Bride Haute Ritual & Trial</span>
                    <span className="font-mono">${BRIDE_PRICE}</span>
                  </div>

                  {bridesmaidsCount > 0 && (
                    <div className="flex justify-between text-[#d6c9b8]">
                      <span>{bridesmaidsCount} Bridesmaids (${BRIDESMAID_RATE} ea)</span>
                      <span className="font-mono">${bridesmaidsCount * BRIDESMAID_RATE}</span>
                    </div>
                  )}

                  {includeMother && (
                    <div className="flex justify-between text-[#d6c9b8]">
                      <span>Mother of Bride / Groom</span>
                      <span className="font-mono">${MOTHER_RATE}</span>
                    </div>
                  )}

                  {includeSuiteBuyout && (
                    <div className="flex justify-between text-[#c5a059]">
                      <span>Private VIP Suite Buyout</span>
                      <span className="font-mono">${SUITE_BUYOUT_RATE}</span>
                    </div>
                  )}

                  {includeCaviarChampagne && (
                    <div className="flex justify-between text-[#c5a059]">
                      <span>Dom Pérignon & Caviar Brunch</span>
                      <span className="font-mono">${CAVIAR_CHAMPAGNE_RATE}</span>
                    </div>
                  )}

                  {includePhotographer && (
                    <div className="flex justify-between text-[#c5a059]">
                      <span>BTS Editorial Photographer</span>
                      <span className="font-mono">${PHOTOGRAPHER_RATE}</span>
                    </div>
                  )}

                  {includeOnSiteEscort && (
                    <div className="flex justify-between text-[#c5a059]">
                      <span>Venue Escort Stylist</span>
                      <span className="font-mono">${ON_SITE_ESCORT_RATE}</span>
                    </div>
                  )}
                </div>

                {/* Grand Total */}
                <div className="pt-4 border-t border-[#291f13] space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs uppercase tracking-wider text-[#a89987]">
                      Estimated Investment
                    </span>
                    <span className="font-cinzel text-3xl sm:text-4xl text-gold-gradient font-bold">
                      ${totalEstimate.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#7d7060]">
                    <span>50% Sanctuary Holding Deposit:</span>
                    <span className="font-mono text-[#c5a059] font-medium">${depositRequired.toLocaleString()}</span>
                  </div>
                </div>

                {/* Wedding Date Input */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9f907e] mb-1.5 font-medium">
                    Anticipated Wedding Date
                  </label>
                  <input
                    type="date"
                    value={weddingDate}
                    onChange={(e) => setWeddingDate(e.target.value)}
                    className="w-full bg-[#1b140c] border border-[#3b2b1a] focus:border-[#c5a059] rounded-xl px-3.5 py-2.5 text-xs text-[#e6decb] focus:outline-none"
                  />
                </div>

                {/* Direct Action Button */}
                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={handleProceedToBooking}
                    className="btn-gold-luxury w-full py-4 rounded-full text-xs flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>Lock In Bridal Suite Sanctuary</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#807261] pt-1">
                    <Shield className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Dedicated Wedding Director assigned within 2 hours</span>
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
