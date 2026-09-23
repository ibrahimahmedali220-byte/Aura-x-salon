export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'AED' | 'INR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateFromUSD: number; // Conversion rate relative to USD
  flag: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    rateFromUSD: 1,
    flag: '🇺🇸'
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    rateFromUSD: 0.92,
    flag: '🇪🇺'
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    rateFromUSD: 0.79,
    flag: '🇬🇧'
  },
  AED: {
    code: 'AED',
    symbol: 'AED ',
    name: 'UAE Dirham',
    rateFromUSD: 3.67,
    flag: '🇦🇪'
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
    rateFromUSD: 83.5,
    flag: '🇮🇳'
  }
};

const STORAGE_KEY = 'aurador_selected_currency';

export const getStoredCurrency = (): CurrencyCode => {
  try {
    const val = localStorage.getItem(STORAGE_KEY) as CurrencyCode;
    if (val && CURRENCIES[val]) {
      return val;
    }
  } catch (e) {
    // ignore
  }
  return 'USD';
};

export const setStoredCurrency = (currency: CurrencyCode): void => {
  try {
    localStorage.setItem(STORAGE_KEY, currency);
    window.dispatchEvent(new CustomEvent('aurador_currency_changed', { detail: currency }));
  } catch (e) {
    // ignore
  }
};

export const convertPrice = (usdAmount: number, targetCurrency: CurrencyCode = 'USD'): number => {
  const config = CURRENCIES[targetCurrency] || CURRENCIES.USD;
  return Math.round(usdAmount * config.rateFromUSD);
};

export const formatCurrency = (usdAmount: number, targetCurrency: CurrencyCode = 'USD'): string => {
  const config = CURRENCIES[targetCurrency] || CURRENCIES.USD;
  const converted = convertPrice(usdAmount, targetCurrency);
  return `${config.symbol}${converted.toLocaleString()}`;
};
