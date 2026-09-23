import React, { useState, useEffect } from 'react';
import { Palette, Sparkles, Moon, Sun, Check, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type LuxuryTheme = 'midnight-gold' | 'champagne' | 'rose-gold';

interface ThemeMoodSwitcherProps {
  onThemeChange?: (theme: LuxuryTheme) => void;
}

export const ThemeMoodSwitcher: React.FC<ThemeMoodSwitcherProps> = ({ onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<LuxuryTheme>('midnight-gold');
  const [goldDustEnabled, setGoldDustEnabled] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('aura_theme_mood') as LuxuryTheme;
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      applyThemeToDocument(savedTheme);
    }
  }, []);

  const applyThemeToDocument = (theme: LuxuryTheme) => {
    document.documentElement.classList.remove('theme-midnight-gold', 'theme-champagne', 'theme-rose-gold');
    document.documentElement.classList.add(`theme-${theme}`);
  };

  const handleSelectTheme = (theme: LuxuryTheme) => {
    setCurrentTheme(theme);
    localStorage.setItem('aura_theme_mood', theme);
    applyThemeToDocument(theme);
    if (onThemeChange) onThemeChange(theme);
  };

  const toggleGoldDust = () => {
    const next = !goldDustEnabled;
    setGoldDustEnabled(next);
    window.dispatchEvent(new CustomEvent('toggle_gold_dust', { detail: next }));
  };

  return (
    <div className="fixed bottom-24 left-6 z-40">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-[#171009] to-[#0d0905] border border-[#c5a059]/60 hover:border-[#c5a059] text-[#e5c07b] hover:text-white shadow-[0_4px_25px_rgba(0,0,0,0.8)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer group"
        title="Customize Atelier Atmosphere & Luxury Theme"
      >
        <Palette className="w-4 h-4 text-[#c5a059] group-hover:rotate-45 transition-transform" />
        <span className="text-[11px] font-semibold tracking-wider uppercase hidden sm:inline">
          Mood Suite
        </span>
      </button>

      {/* Mood Selector Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-12 left-0 w-64 rounded-2xl bg-[#140e08] border border-[#c5a059]/60 shadow-[0_15px_40px_rgba(0,0,0,0.9)] p-4 z-50 text-left"
            >
              <div className="text-[10px] uppercase tracking-widest text-[#a0907e] font-bold pb-2 mb-3 border-b border-[#291c12] flex items-center justify-between">
                <span>Atelier Atmosphere</span>
                <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              </div>

              {/* Theme Options */}
              <div className="space-y-2 mb-4">
                <button
                  onClick={() => handleSelectTheme('midnight-gold')}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                    currentTheme === 'midnight-gold'
                      ? 'bg-[#251a0f] border-[#c5a059] text-white'
                      : 'bg-[#18110a] border-[#2d1e12] text-[#a0907e] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-black to-[#c5a059] border border-white/20" />
                    <span className="font-medium">Midnight Royale</span>
                  </div>
                  {currentTheme === 'midnight-gold' && <Check className="w-3.5 h-3.5 text-[#c5a059]" />}
                </button>

                <button
                  onClick={() => handleSelectTheme('champagne')}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                    currentTheme === 'champagne'
                      ? 'bg-[#251a0f] border-[#e2d5b5] text-white'
                      : 'bg-[#18110a] border-[#2d1e12] text-[#a0907e] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-[#2a2418] to-[#e8dcb9] border border-white/20" />
                    <span className="font-medium">Champagne Radiance</span>
                  </div>
                  {currentTheme === 'champagne' && <Check className="w-3.5 h-3.5 text-[#e2d5b5]" />}
                </button>

                <button
                  onClick={() => handleSelectTheme('rose-gold')}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                    currentTheme === 'rose-gold'
                      ? 'bg-[#251a0f] border-[#d48b7d] text-white'
                      : 'bg-[#18110a] border-[#2d1e12] text-[#a0907e] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-[#2d1215] to-[#d48b7d] border border-white/20" />
                    <span className="font-medium">Rose Gold Velvet</span>
                  </div>
                  {currentTheme === 'rose-gold' && <Check className="w-3.5 h-3.5 text-[#d48b7d]" />}
                </button>
              </div>

              {/* Gold Dust Toggle */}
              <div className="pt-3 border-t border-[#291c12] flex items-center justify-between">
                <span className="text-xs text-[#a0907e] flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#c5a059]" />
                  <span>24K Gold Particles</span>
                </span>
                <button
                  onClick={toggleGoldDust}
                  className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                    goldDustEnabled ? 'bg-[#c5a059]' : 'bg-[#2a1d12]'
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full bg-black absolute top-0.5 transition-transform ${
                      goldDustEnabled ? 'left-4.5' : 'left-1'
                    }`}
                  />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
