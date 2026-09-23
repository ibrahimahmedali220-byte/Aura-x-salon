import React, { useState, useEffect } from 'react';
import { Sparkles, Users, Clock, Car, ShieldCheck, Zap, ArrowRight, Activity } from 'lucide-react';
import { motion } from 'motion/react';

interface AtelierLivePulseProps {
  onClaimSlot?: () => void;
}

export const AtelierLivePulse: React.FC<AtelierLivePulseProps> = ({ onClaimSlot }) => {
  const [activeChairs, setActiveChairs] = useState(4);
  const [minutesToNextSlot, setMinutesToNextSlot] = useState(18);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'America/Los_Angeles',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#c5a059]/30 bg-gradient-to-r from-[#120c07] via-[#1a1109] to-[#120c07] p-4 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
        {/* Subtle Ambient Shimmer */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
          {/* Left: Atelier Status Header */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2a1c10] to-[#140c06] border border-[#c5a059]/60 flex items-center justify-center text-[#c5a059] shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                <Activity className="w-6 h-6 animate-pulse" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#120c07]" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#c5a059] font-semibold tracking-wide">
                  Live Atelier Telemetry
                </span>
                <span className="text-xs text-[#b8ac9c] font-mono">
                  (Beverly Hills: {currentTime || '9:45 AM PST'})
                </span>
              </div>
              <h2 className="font-cormorant text-xl sm:text-2xl text-white font-medium">
                Atelier Chair Pulse & Express Availability
              </h2>
            </div>
          </div>

          {/* Center: Live Metrics Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4 w-full lg:w-auto">
            {/* Active Chairs */}
            <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#1b120a]/80 border border-[#3b2b1a]">
              <Users className="w-4 h-4 text-[#c5a059]" />
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#a0907e] block">Master Chairs</span>
                <span className="text-xs font-semibold text-white">
                  <span className="text-emerald-400">{activeChairs}</span> / 6 Occupied
                </span>
              </div>
            </div>

            {/* Next Express Slot */}
            <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#1b120a]/80 border border-[#3b2b1a]">
              <Clock className="w-4 h-4 text-[#c5a059]" />
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#a0907e] block">Next Walk-in</span>
                <span className="text-xs font-semibold text-[#f5ebd9]">
                  In <span className="text-[#c5a059] font-mono">{minutesToNextSlot} mins</span>
                </span>
              </div>
            </div>

            {/* Valet Status */}
            <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#1b120a]/80 border border-[#3b2b1a]">
              <Car className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#a0907e] block">Private Valet</span>
                <span className="text-xs font-semibold text-emerald-300">Porters Active</span>
              </div>
            </div>
          </div>

          {/* Right: Quick Action CTA */}
          {onClaimSlot && (
            <button
              onClick={onClaimSlot}
              className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#c5a059] via-[#e5c07b] to-[#c5a059] text-black font-semibold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.7)] hover:scale-[1.03] transition-all cursor-pointer shrink-0 w-full sm:w-auto"
            >
              <Zap className="w-3.5 h-3.5 fill-black" />
              <span>Claim Next Express Opening</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
