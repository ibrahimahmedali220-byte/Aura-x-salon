import React, { useState, useEffect, useRef } from 'react';
import { Crown, Sparkles, ChevronUp, ChevronDown, ArrowUpRight, Gift, Trophy, CheckCircle2, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getLoyaltyProfile, addSimulatedPoints, REWARDS_CATALOG } from '../utils/rewardsStorage';

interface CrownPointsTrackerProps {
  onOpenReferral?: () => void;
}

export const CrownPointsTracker: React.FC<CrownPointsTrackerProps> = ({ onOpenReferral }) => {
  const { t } = useTranslation();
  const [profile, setProfile] = useState(getLoyaltyProfile);
  const [sessionPoints, setSessionPoints] = useState(25); // Welcome session bonus
  const [isExpanded, setIsExpanded] = useState(false);
  const [pointsNotification, setPointsNotification] = useState<number | null>(null);
  const notificationTimeoutRef = useRef<number | null>(null);

  // Sync with global rewards storage events
  useEffect(() => {
    const handleStorageUpdate = (e: CustomEvent) => {
      if (e.detail) {
        setProfile(e.detail);
      }
    };
    window.addEventListener('aurador_rewards_updated', handleStorageUpdate as EventListener);
    return () => {
      window.removeEventListener('aurador_rewards_updated', handleStorageUpdate as EventListener);
    };
  }, []);

  // Award subtle real-time exploration points throughout the session
  useEffect(() => {
    // Initial welcome reward after 3s
    const initialTimer = window.setTimeout(() => {
      triggerPointAward(15, 'Session Exploration');
    }, 3000);

    // Subtle passive points every 40s while engaged in the atelier sanctuary
    const interval = window.setInterval(() => {
      triggerPointAward(10, 'Sanctuary Lounge Time');
    }, 45000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  const triggerPointAward = (points: number, reason?: string) => {
    setSessionPoints((prev) => prev + points);
    const updated = addSimulatedPoints(points);
    setProfile(updated);

    // Show floating point notification badge
    setPointsNotification(points);
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    notificationTimeoutRef.current = window.setTimeout(() => {
      setPointsNotification(null);
    }, 3200);
  };

  const scrollToRewards = () => {
    const el = document.getElementById('rewards');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Find next unlockable reward
  const nextReward = REWARDS_CATALOG.find((r) => r.cost > profile.points) || REWARDS_CATALOG[REWARDS_CATALOG.length - 1];
  const progressPercent = Math.min(100, Math.round((profile.points / (nextReward?.cost || 3000)) * 100));

  return (
    <div
      id="crown-points-floating-widget"
      className="fixed bottom-6 left-4 sm:left-6 z-40 font-sans select-none"
    >
      {/* Floating Points Gained Notification Toast */}
      {pointsNotification && (
        <div className="absolute -top-12 left-0 sm:left-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#291b0f] to-[#17100a] border border-[#ffd700]/70 text-[#f5ebd7] text-xs font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)] animate-in slide-in-from-bottom-3 fade-in duration-200">
          <Sparkles className="w-3.5 h-3.5 text-[#ffd700] animate-spin" />
          <span className="text-[#ffd700]">+{pointsNotification}</span>
          <span className="text-[11px] text-[#e8dcce]">{t('crownPoints.widgetTitle', 'Crown Points')}</span>
        </div>
      )}

      {/* Expanded VIP Loyalty Passport Card */}
      {isExpanded ? (
        <div className="w-72 sm:w-80 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#19120b]/98 via-[#120d08]/98 to-[#0a0705]/98 border border-[#c5a059]/50 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl p-4 sm:p-5 text-[#e8ded1] animate-in zoom-in-95 fade-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#2b1f14]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3b2a16] to-[#1a1107] border border-[#c5a059] flex items-center justify-center text-[#dfba73] shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                <Crown className="w-4 h-4 text-[#ffd700]" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  {t('crownPoints.widgetTitle', 'Crown Points Loyalty')}
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-[#a89987]">
                  <span className="text-[#c5a059] font-medium">{profile.tier}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold">+{sessionPoints} {t('crownPoints.sessionEarned', 'this session')}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              aria-label="Collapse Crown Points widget"
              className="p-1 rounded-full text-[#8f806e] hover:text-white hover:bg-[#261a10] transition-colors cursor-pointer"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Current Points Balance */}
          <div className="my-4 p-3.5 rounded-xl bg-gradient-to-r from-[#24170d] to-[#191009] border border-[#3d2a19] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#a89987] font-semibold block">
                {t('crownPoints.currentBalance', 'Total Crown Points')}
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="font-cormorant text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {profile.points.toLocaleString()}
                </span>
                <span className="text-xs text-[#dfba73] font-semibold uppercase tracking-wider">PTS</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-emerald-400 font-medium block">
                Session Active
              </span>
              <span className="text-xs text-[#dcd1c2] font-semibold">
                +{sessionPoints} PTS Earned
              </span>
            </div>
          </div>

          {/* Next Reward Progress */}
          {nextReward && (
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#9e8f7e] flex items-center gap-1 truncate max-w-[170px]">
                  <Gift className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                  <span className="truncate">{nextReward.name}</span>
                </span>
                <span className="text-[#dfba73] font-semibold shrink-0">
                  {profile.points} / {nextReward.cost} PTS
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full rounded-full bg-[#241a12] overflow-hidden border border-[#382618]">
                <div
                  className="h-full bg-gradient-to-r from-[#c5a059] via-[#e5c07b] to-[#ffd700] rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(212,175,55,0.5)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 border-t border-[#241a11] flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false);
                  scrollToRewards();
                }}
                className="flex-1 py-2.5 px-3 rounded-full bg-gradient-to-r from-[#c5a059] to-[#dfba73] hover:from-[#dfba73] hover:to-[#ffd700] text-black font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{t('crownPoints.exploreRewards', 'Redeem in Guild')}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {onOpenReferral && (
                <button
                  type="button"
                  id="crown-tracker-refer-btn"
                  onClick={() => {
                    setIsExpanded(false);
                    onOpenReferral();
                  }}
                  className="py-2.5 px-3 rounded-full bg-[#20150c] hover:bg-[#2e1d0f] border border-[#c5a059]/50 text-[#ffd700] hover:text-white font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                  title="Refer a Friend & Earn 500 Crown Points"
                >
                  <UserPlus className="w-3.5 h-3.5 text-[#ffd700]" />
                  <span>Refer (+500)</span>
                </button>
              )}
            </div>
          </div>

          <div className="mt-2 text-center">
            <span className="text-[9px] text-[#7d6f5e] font-light italic">
              {t('crownPoints.earnHint', 'Browsing & exploring earns real-time points')}
            </span>
          </div>
        </div>
      ) : (
        /* Compact Floating Pill Badge */
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          aria-label="Open Crown Points loyalty details"
          className="group relative flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-gradient-to-r from-[#1b1209]/95 via-[#24170d]/95 to-[#150d06]/95 hover:from-[#2a1b0e] hover:to-[#1e1309] border border-[#c5a059]/60 hover:border-[#ffd700] text-[#f2e6d6] hover:text-white shadow-[0_8px_25px_rgba(0,0,0,0.85)] hover:shadow-[0_0_25px_rgba(212,175,55,0.35)] backdrop-blur-xl transition-all duration-300 cursor-pointer hover:scale-[1.03]"
        >
          {/* Animated Glowing Crown Crest */}
          <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#3b2a16] to-[#1a1107] border border-[#c5a059] flex items-center justify-center text-[#dfba73] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm">
            <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ffd700]" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-black animate-pulse" />
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                {profile.points.toLocaleString()}
              </span>
              <span className="text-[10px] text-[#dfba73] font-semibold">PTS</span>
              {sessionPoints > 0 && (
                <span className="text-[10px] text-emerald-400 font-bold bg-[#132717] px-1.5 py-0.2 rounded-full border border-emerald-500/30">
                  +{sessionPoints}
                </span>
              )}
            </div>
            <span className="text-[9px] uppercase tracking-wider text-[#a89987] font-medium leading-none">
              {profile.tier}
            </span>
          </div>

          <ChevronUp className="w-3.5 h-3.5 text-[#a89987] group-hover:text-[#c5a059] transition-colors ml-0.5" />
        </button>
      )}
    </div>
  );
};
