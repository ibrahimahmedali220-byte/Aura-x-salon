import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check, ChevronDown } from 'lucide-react';

interface LanguageOption {
  code: string;
  label: string;
  nativeLabel: string;
  flag: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिंदी', flag: '🇮🇳' },
];

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLangCode = i18n.language ? i18n.language.substring(0, 2) : 'en';
  const currentLang = LANGUAGES.find((l) => l.code === currentLangCode) || LANGUAGES[0];

  const handleSelectLanguage = (code: string) => {
    i18n.changeLanguage(code);
    if (typeof window !== 'undefined') {
      localStorage.setItem('aura_dor_lang', code);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        type="button"
        id="luxury-language-switcher-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#3d2c1b] hover:border-[#c5a059] bg-gradient-to-r from-[#17110a] to-[#120d07] hover:bg-[#20150d] transition-all duration-300 text-[11px] text-[#e2d6c4] hover:text-white cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.25)] hover:scale-[1.02] group"
        title="Select Language / भाषा चुनें / Choisir la langue"
      >
        <span className="text-xs group-hover:scale-110 transition-transform">{currentLang.flag}</span>
        <Globe className="w-3 h-3 text-[#c5a059] group-hover:rotate-45 transition-transform duration-500" />
        <span className="text-[11px] font-medium tracking-wide text-[#f2e6d6]">
          {currentLang.nativeLabel}
        </span>
        <ChevronDown className={`w-3 h-3 text-[#a89a87] group-hover:text-[#c5a059] transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#c5a059]' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-[#140e0a] border border-[#c5a059]/50 shadow-[0_15px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 border-b border-[#251b12] text-[10px] uppercase tracking-widest text-[#8a7a67] font-semibold">
            Select Language
          </div>
          <div className="py-1">
            {LANGUAGES.map((lang) => {
              const isSelected = currentLang.code === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#26190f] text-[#f5ebd7] font-medium'
                      : 'text-[#bbb09f] hover:bg-[#1a120b] hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm">{lang.flag}</span>
                    <span>{lang.nativeLabel}</span>
                    <span className="text-[10px] text-[#7d6f5e] font-light">({lang.label})</span>
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#c5a059]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
