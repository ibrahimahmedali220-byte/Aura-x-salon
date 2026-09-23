import React, { useState, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import {
  CurrencyCode,
  CURRENCIES,
  getStoredCurrency,
  setStoredCurrency
} from '../utils/currency';

export const CurrencySwitcher: React.FC = () => {
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyCode>(getStoredCurrency());
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleCurrencyChange = (e: Event) => {
      const customEvent = e as CustomEvent<CurrencyCode>;
      if (customEvent.detail) {
        setCurrentCurrency(customEvent.detail);
      }
    };
    window.addEventListener('aurador_currency_changed', handleCurrencyChange);
    return () => window.removeEventListener('aurador_currency_changed', handleCurrencyChange);
  }, []);

  const handleSelect = (code: CurrencyCode) => {
    setCurrentCurrency(code);
    setStoredCurrency(code);
    setIsOpen(false);
  };

  const activeConfig = CURRENCIES[currentCurrency] || CURRENCIES.USD;

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        id="luxury-currency-switcher-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#17110a] to-[#120d07] border border-[#3d2c1b] hover:border-[#c5a059] hover:bg-[#20150d] text-[11px] text-[#e2d5c2] hover:text-white transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(212,175,55,0.25)] hover:scale-[1.02] cursor-pointer group"
        title="Select International Currency"
      >
        <span className="text-xs group-hover:scale-110 transition-transform">{activeConfig.flag}</span>
        <span className="font-mono font-semibold text-[11px] tracking-wider text-[#e6decb]">{activeConfig.code}</span>
        <span className="text-[10px] text-[#c5a059] font-medium">({activeConfig.symbol.trim()})</span>
        <ChevronDown className={`w-3 h-3 text-[#9b8b78] group-hover:text-[#c5a059] transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#c5a059]' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#140e08] border border-[#c5a059]/60 shadow-[0_15px_40px_rgba(0,0,0,0.9)] py-2 z-50">
            <div className="px-3 py-1.5 text-[9px] uppercase tracking-widest text-[#a89987] font-semibold border-b border-[#241a10]">
              Select Atelier Currency
            </div>
            {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
              const item = CURRENCIES[code];
              const isSelected = item.code === currentCurrency;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleSelect(code)}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#291f13] text-[#dfba73] font-semibold'
                      : 'text-[#d4c5b3] hover:bg-[#1f160e] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{item.flag}</span>
                    <span>{item.name}</span>
                  </div>
                  <span className="font-mono text-[#c5a059]">{item.symbol.trim()}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
