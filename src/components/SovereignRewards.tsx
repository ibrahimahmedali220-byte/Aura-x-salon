import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Crown,
  Sparkles,
  Gift,
  Award,
  ChevronRight,
  CheckCircle2,
  Lock,
  ArrowRight,
  Coins,
  Copy,
  Calendar,
  Zap,
  ShoppingBag,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { Card3D } from './Card3D';
import {
  LoyaltyReward,
  RedeemedVoucher,
  LoyaltyProfile,
  REWARDS_CATALOG,
  getLoyaltyProfile,
  redeemReward,
  addSimulatedPoints
} from '../utils/rewardsStorage';

interface SovereignRewardsProps {
  onApplyVoucherToBooking?: (voucherCode: string) => void;
}

export const SovereignRewards: React.FC<SovereignRewardsProps> = ({
  onApplyVoucherToBooking
}) => {
  const [profile, setProfile] = useState<LoyaltyProfile>(() => getLoyaltyProfile());
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'experience' | 'apothecary'>('all');
  const [redeemedAlert, setRedeemedAlert] = useState<RedeemedVoucher | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [simulatedEarnNotice, setSimulatedEarnNotice] = useState<string | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setProfile(getLoyaltyProfile());
    };
    window.addEventListener('aurador_rewards_updated', handleUpdate);
    return () => window.removeEventListener('aurador_rewards_updated', handleUpdate);
  }, []);

  const handleRedeem = (reward: LoyaltyReward) => {
    if (profile.points < reward.cost) return;

    const voucher = redeemReward(reward);
    if (voucher) {
      setRedeemedAlert(voucher);
    }
  };

  const handleEarnCheckinPoints = () => {
    const updated = addSimulatedPoints(300);
    setProfile(updated);
    setSimulatedEarnNotice('+300 Crown Points Credited from Simulated Salon Check-In!');
    setTimeout(() => setSimulatedEarnNotice(null), 3500);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const filteredRewards = REWARDS_CATALOG.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  // Calculate points progress to next tier
  const tierTarget = profile.tier === 'Gold Sovereign' ? 5000 : profile.tier === 'Imperial Onyx' ? 10000 : 20000;
  const progressPercent = Math.min(100, Math.round((profile.lifetimePoints / tierTarget) * 100));

  return (
    <section id="rewards" className="py-24 sm:py-32 relative bg-[#090705] overflow-hidden border-t border-[#1e1710]">
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[350px] bg-[#c5a059]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18120b] border border-[#c5a059]/40 mb-4 shadow-[0_0_20px_rgba(197,160,89,0.15)]">
            <Crown className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="text-[11px] font-semibold tracking-widest text-[#dfba73] uppercase">
              Patron Loyalty Guild
            </span>
          </div>

          <h2 className="font-cormorant text-3xl sm:text-5xl lg:text-6xl text-white font-medium tracking-tight mb-5 leading-tight">
            The Sovereign Rewards & <br />
            <span className="text-gold-gradient italic font-normal">Crown Points Vault</span>
          </h2>

          <p className="text-sm sm:text-base text-[#bfb4a4] font-light leading-relaxed">
            Every ritual you experience at AURA & D'OR yields prestigious Crown Points. Accumulate privileges redeemable for complimentary vintage champagne, private suite upgrades, or rare apothecaries.
          </p>
        </div>

        {/* Patron's Sovereign Points Passport Card */}
        <div className="mb-16">
          <Card3D intensity={8} glowColor="rgba(212, 175, 55, 0.25)">
            <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-[#17110a] via-[#1f170f] to-[#120d07] border-2 border-[#c5a059]/60 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
              
              {/* Card watermark */}
              <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none text-white font-cinzel text-9xl">
                CROWN
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                
                {/* Left: Points & Tier */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3.5 py-1 rounded-full bg-[#c5a059]/20 border border-[#c5a059] text-[#e8c785] text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <Crown className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>{profile.tier}</span>
                    </span>
                    <span className="text-xs text-[#a0907d]">
                      {profile.visitsCount} Confirmed Atelier Visits
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-[#9e8f7c] block mb-1">
                      Available Crown Points Balance
                    </span>
                    <div className="flex items-baseline gap-3">
                      <span className="font-cinzel text-4xl sm:text-6xl text-gold-gradient font-bold tracking-tight">
                        {profile.points.toLocaleString()}
                      </span>
                      <span className="text-sm text-[#d4af37] font-medium tracking-wide">
                        Crown Points (~${Math.round(profile.points / 10)} Courtesy Value)
                      </span>
                    </div>
                  </div>

                  {/* Tier Progress Bar */}
                  <div className="space-y-1.5 max-w-md pt-2">
                    <div className="flex justify-between text-xs text-[#9d8e7b]">
                      <span>Progress to {profile.tier === 'Gold Sovereign' ? 'Imperial Onyx' : 'Celestial Diamond'}</span>
                      <span className="font-mono text-[#c5a059] font-bold">{progressPercent}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#100b07] border border-[#2b1f13] overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#8c6727] via-[#c5a059] to-[#dfba73] rounded-full transition-all duration-700"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-[#7d7061] text-right">
                      {Math.max(0, tierTarget - profile.lifetimePoints)} points until next ascension
                    </div>
                  </div>
                </div>

                {/* Right: Interactive Earn Simulator & Quick Perks */}
                <div className="lg:col-span-5 bg-[#0e0a06]/80 backdrop-blur-md rounded-2xl p-5 border border-[#2e2114] space-y-3">
                  <span className="text-xs uppercase tracking-widest text-[#c5a059] font-bold block">
                    Guild Privilege Privileges
                  </span>
                  <ul className="text-xs text-[#b8ac9b] space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                      <span>Earn 10 Crown Points per $1 spent on any Haute ritual</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                      <span>Complimentary Sommelier Champagne with all bookings</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                      <span>Priority access to sold-out weekend director slots</span>
                    </li>
                  </ul>

                  {/* Simulate Check-in Button */}
                  <div className="pt-2 border-t border-[#241a10]">
                    <button
                      type="button"
                      onClick={handleEarnCheckinPoints}
                      className="btn-outline-luxury w-full py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>Simulate Salon Visit (+300 Points)</span>
                    </button>
                    {simulatedEarnNotice && (
                      <span className="text-[11px] text-emerald-400 block text-center mt-1.5 font-medium">
                        {simulatedEarnNotice}
                      </span>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </Card3D>
        </div>

        {/* 4 Pillars of Earning */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {[
            {
              title: 'Haute Salon Rituals',
              pts: '10 Pts / $1',
              desc: 'Automatically accrued on hair couture, skin aesthetics, and spa rituals.'
            },
            {
              title: 'VIP Companion Referral',
              pts: '500 Pts',
              desc: 'Awarded when introducing a discerning friend to our sanctuary.'
            },
            {
              title: 'Editorial Review',
              pts: '250 Pts',
              desc: 'Granted for verified feedback on Google or editorial publications.'
            },
            {
              title: 'Patron Anniversary',
              pts: '1,000 Pts',
              desc: 'Complimentary celebration credit bestowed every calendar year.'
            }
          ].map((pillar, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#0f0b07] border border-[#261c12] hover:border-[#c5a059]/40 transition-colors"
            >
              <div className="font-cinzel text-lg text-gold-gradient font-bold mb-1">
                {pillar.pts}
              </div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-1">
                {pillar.title}
              </h4>
              <p className="text-[11px] text-[#938573] font-light leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Rewards Catalog Filter Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="font-cormorant text-2xl sm:text-3xl text-white font-medium">
              Redeemable Guild Privileges
            </h3>
            <p className="text-xs text-[#8f8270]">
              Unlock complimentary luxuries directly with your Crown Points balance.
            </p>
          </div>

          <div className="p-1 rounded-2xl bg-[#120d08] border border-[#2b2014] flex gap-1.5">
            {[
              { id: 'all', label: 'All Catalog' },
              { id: 'experience', label: 'Salon Privileges' },
              { id: 'apothecary', label: 'Apothecary Products' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-[#c5a059] text-black shadow-md'
                    : 'text-[#8f8270] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Rewards Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredRewards.map((reward) => {
            const canAfford = profile.points >= reward.cost;
            return (
              <Card3D key={reward.id} intensity={8} glowColor="rgba(212, 175, 55, 0.2)">
                <div className="h-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#140f0a] to-[#090704] border border-[#2a1f13] hover:border-[#c5a059]/50 transition-all flex flex-col justify-between shadow-xl group">
                  
                  {/* Image & Price Tag */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={reward.image}
                      alt={reward.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090704] via-transparent to-transparent opacity-90" />
                    
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#c5a059]/40 text-[10px] uppercase tracking-wider text-[#dfba73] font-bold">
                      {reward.value}
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b140c]/90 border border-[#c5a059] text-[#e8c785] text-xs font-mono font-bold shadow-md">
                        <Coins className="w-3.5 h-3.5 text-[#c5a059]" />
                        <span>{reward.cost.toLocaleString()} Pts</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="font-cormorant text-2xl text-white font-medium mb-1.5 leading-snug">
                        {reward.name}
                      </h4>
                      <p className="text-xs text-[#a99c8b] font-light leading-relaxed">
                        {reward.description}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="pt-3 border-t border-[#1f1710]">
                      <button
                        type="button"
                        disabled={!canAfford}
                        onClick={() => handleRedeem(reward)}
                        className={`w-full py-3 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          canAfford
                            ? 'btn-gold-luxury'
                            : 'bg-[#15100a] text-[#6b5f51] border border-[#2b2014] cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? (
                          <>
                            <Gift className="w-4 h-4 text-black" />
                            <span>Redeem Privilege</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3.5 h-3.5 text-[#6b5f51]" />
                            <span>Need {(reward.cost - profile.points).toLocaleString()} More Pts</span>
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

        {/* Redeemed Vouchers Vault Drawer (Active Keys) */}
        {profile.redeemedVouchers.length > 0 && (
          <div className="p-6 rounded-3xl bg-[#0f0a06] border border-[#2a1f13] space-y-4">
            <div className="flex items-center justify-between border-b border-[#21170e] pb-3">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-[#c5a059]" />
                <h4 className="text-sm uppercase tracking-widest text-[#dfba73] font-bold">
                  Your Active Sovereign Privilege Keys ({profile.redeemedVouchers.length})
                </h4>
              </div>
              <span className="text-[11px] text-[#8e8170]">
                Apply at checkout or reservation
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {profile.redeemedVouchers.map((voucher) => (
                <div
                  key={voucher.id}
                  className="p-4 rounded-2xl bg-[#171109] border border-[#362717] flex flex-col justify-between gap-3"
                >
                  <div>
                    <span className="text-[10px] text-[#8e806e] uppercase tracking-wider block">
                      Redeemed on {voucher.redeemedAt} ({voucher.pointsSpent} pts)
                    </span>
                    <span className="text-sm font-semibold text-white block mt-0.5">
                      {voucher.rewardName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#261c11]">
                    <span className="font-mono text-xs font-bold text-[#c5a059] tracking-wider">
                      {voucher.code}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleCopyCode(voucher.code)}
                        className="p-2 rounded-lg bg-[#241a10] hover:bg-[#332517] text-[#d6c7b2] text-xs transition-colors cursor-pointer"
                        title="Copy Key"
                      >
                        {copiedCode === voucher.code ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {onApplyVoucherToBooking && (
                        <button
                          type="button"
                          onClick={() => onApplyVoucherToBooking(voucher.code)}
                          className="btn-gold-luxury px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold"
                        >
                          Apply to Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Redeemed Success Modal */}
        <AnimatePresence>
          {redeemedAlert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="w-full max-w-md bg-gradient-to-b from-[#18110a] to-[#0c0906] border-2 border-[#c5a059] rounded-3xl p-6 sm:p-8 text-center shadow-[0_25px_60px_rgba(212,175,55,0.3)] relative"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#dfba73] to-[#9a7332] text-black mx-auto flex items-center justify-center mb-5 shadow-[0_0_25px_rgba(212,175,55,0.5)]">
                  <Gift className="w-8 h-8 text-black" />
                </div>

                <span className="text-[11px] uppercase tracking-[0.25em] text-[#c5a059] font-bold block mb-1">
                  Privilege Unlocked
                </span>
                <h3 className="font-cormorant text-3xl text-white font-medium mb-2">
                  {redeemedAlert.rewardName}
                </h3>
                <p className="text-xs text-[#a99c8b] font-light mb-6">
                  {redeemedAlert.pointsSpent} Crown Points have been deducted from your vault. Your exclusive redemption key is generated below:
                </p>

                {/* Key box */}
                <div className="p-4 rounded-2xl bg-[#22180e] border border-[#c5a059] mb-6 flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[10px] text-[#8f806e] uppercase tracking-wider block">
                      Sovereign Key
                    </span>
                    <span className="font-mono text-base font-bold text-[#dfba73] tracking-widest">
                      {redeemedAlert.code}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyCode(redeemedAlert.code)}
                    className="p-2.5 rounded-xl bg-[#2e2114] text-[#dfba73] hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedCode === redeemedAlert.code ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="space-y-2.5">
                  {onApplyVoucherToBooking && (
                    <button
                      type="button"
                      onClick={() => {
                        onApplyVoucherToBooking(redeemedAlert.code);
                        setRedeemedAlert(null);
                      }}
                      className="btn-gold-luxury w-full py-3.5 rounded-full text-xs font-semibold flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-black" />
                      <span>Apply Key Directly to Reservation</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setRedeemedAlert(null)}
                    className="text-xs text-[#8f8270] hover:text-[#c5a059] uppercase tracking-widest pt-2 underline cursor-pointer"
                  >
                    Close & Keep in Vault
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
