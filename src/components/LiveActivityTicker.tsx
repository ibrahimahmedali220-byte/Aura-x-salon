import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Gift, X, ShieldAlert } from 'lucide-react';

interface ActivityItem {
  icon: 'calendar' | 'gift' | 'alert';
  title: string;
  time: string;
  badge: string;
}

const ACTIVITIES: ActivityItem[] = [
  {
    icon: 'calendar',
    title: 'Lady Genevieve (Bel Air) reserved Haute Parisian Balayage with Master Jean-Luc',
    time: '2 mins ago',
    badge: 'LIVE RESERVATION'
  },
  {
    icon: 'alert',
    title: 'Only 2 Soundproof Private VIP Suites remain available for this Saturday evening',
    time: 'Sanctuary Notice',
    badge: 'SUITE SCARCITY'
  },
  {
    icon: 'gift',
    title: 'Digital Gift Voucher ($1,000 Imperial Pass) gifted to Sophia M. for Anniversary',
    time: '7 mins ago',
    badge: 'GIFT VAULT'
  },
  {
    icon: 'calendar',
    title: 'Sienna Sterling reserved 24K Liquid Gold Keratin Reconstruction with Roberto',
    time: '12 mins ago',
    badge: 'LIVE RESERVATION'
  }
];

export const LiveActivityTicker: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % ACTIVITIES.length);
        setVisible(true);
      }, 500);
    }, 7500);

    return () => clearInterval(interval);
  }, [isDismissed]);

  if (isDismissed) return null;

  const current = ACTIVITIES[index];

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm hidden sm:block">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="p-3.5 rounded-2xl bg-[#120e0a]/95 backdrop-blur-xl border border-[#c5a059]/40 shadow-[0_15px_40px_rgba(0,0,0,0.8)] text-left relative overflow-hidden flex items-start gap-3"
          >
            {/* Left Icon */}
            <div className="w-8 h-8 rounded-xl bg-[#1f1710] border border-[#c5a059]/50 flex items-center justify-center text-[#c5a059] shrink-0 mt-0.5">
              {current.icon === 'calendar' && <Calendar className="w-4 h-4" />}
              {current.icon === 'gift' && <Gift className="w-4 h-4" />}
              {current.icon === 'alert' && <Sparkles className="w-4 h-4" />}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[9px] uppercase tracking-widest font-bold text-[#c5a059]">
                  {current.badge}
                </span>
                <span className="text-[9px] text-[#7d7162]">• {current.time}</span>
              </div>
              <p className="text-xs text-[#e8ded0] font-light leading-snug">
                {current.title}
              </p>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={() => setIsDismissed(true)}
              className="text-[#6d6152] hover:text-[#c5a059] p-0.5 transition-colors cursor-pointer"
              title="Dismiss notifications"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Subtle bottom progress line */}
            <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#221a11]">
              <div className="h-full bg-gold-gradient animate-[progress_7.5s_linear_infinite]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
