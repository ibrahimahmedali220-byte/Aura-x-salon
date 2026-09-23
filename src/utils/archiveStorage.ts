import { BeautyArchiveProfile, PastTreatmentRecord } from '../types';

const ARCHIVE_STORAGE_KEY = 'aurador_beauty_archive_v1';

export const INITIAL_ARCHIVE_DATA: BeautyArchiveProfile = {
  fullName: 'Lady Genevieve Sterling',
  email: 'g.sterling@beverlyhills.estate',
  phone: '+1 (310) 849-2910',
  preferredStylistId: 'stylist-jean-luc',
  preferredStylistName: 'Jean-Luc Moreau (Master Artistic Director)',
  hairOrSkinNotes: 'Fine textured hair prone to brassiness; requires cool pearl-ash micro-toner and gentle bio-protein heat protectant. Sensitive scalp.',
  preferredBeverage: 'Vintage Dom Pérignon Brut Champagne with Lemon Verbena',
  preferredSoundscape: 'Parisian Velvet Lounge (108 Hz)',
  favoriteServiceIds: ['hair-balayage', 'skin-24k-gold', 'spa-thermal-stone'],
  treatmentHistory: [
    {
      id: 'tx-8921',
      serviceId: 'hair-balayage',
      serviceName: 'Haute Parisian Balayage & Gloss',
      stylistId: 'stylist-jean-luc',
      stylistName: 'Jean-Luc Moreau',
      date: '2026-08-14',
      price: 380,
      notes: 'Root shadow applied with gentle 7.1 ash-cool glaze. Feathered transition along cheekbones.',
      formulaNote: 'Formula 9.12 Pearl + 20vol Bio-Enzyme Lift. Oligo-mineral caviar gloss for 18 mins.',
      vipBeverage: 'Sommelier Vintage Champagne'
    },
    {
      id: 'tx-8610',
      serviceId: 'skin-24k-gold',
      serviceName: '24K Imperial Gold Cellular Facial',
      stylistId: 'stylist-elena',
      stylistName: 'Elena Rostova',
      date: '2026-07-02',
      price: 420,
      notes: 'Targeted hydration treatment prior to Paris Fashion Gala. Excellent lymphatic drainage response.',
      formulaNote: 'Swiss Alpine Cellular Peptides with 24K Leaf application and Cryo-Jade rolling.',
      vipBeverage: 'Matcha Ceremonial Elixir'
    }
  ],
  updatedAt: new Date().toISOString()
};

export const getBeautyArchive = (): BeautyArchiveProfile => {
  try {
    const raw = localStorage.getItem(ARCHIVE_STORAGE_KEY);
    if (!raw) {
      // Seed initial high-end sample so patron sees immediate luxury utility
      localStorage.setItem(ARCHIVE_STORAGE_KEY, JSON.stringify(INITIAL_ARCHIVE_DATA));
      return INITIAL_ARCHIVE_DATA;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read Beauty Archive from storage:', e);
    return INITIAL_ARCHIVE_DATA;
  }
};

export const saveBeautyArchive = (profile: BeautyArchiveProfile): void => {
  try {
    const updated = {
      ...profile,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(ARCHIVE_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('aurador_archive_updated', { detail: updated }));
  } catch (e) {
    console.error('Failed to save Beauty Archive:', e);
  }
};

export const addTreatmentRecord = (
  record: Omit<PastTreatmentRecord, 'id'>
): PastTreatmentRecord => {
  const current = getBeautyArchive();
  const newRecord: PastTreatmentRecord = {
    ...record,
    id: `tx-${Date.now().toString().slice(-4)}`
  };
  const updatedHistory = [newRecord, ...current.treatmentHistory];
  saveBeautyArchive({
    ...current,
    treatmentHistory: updatedHistory
  });
  return newRecord;
};

export const updatePreferredStylist = (stylistId: string, stylistName: string): void => {
  const current = getBeautyArchive();
  saveBeautyArchive({
    ...current,
    preferredStylistId: stylistId,
    preferredStylistName: stylistName
  });
};

export const toggleFavoriteService = (serviceId: string): void => {
  const current = getBeautyArchive();
  const exists = current.favoriteServiceIds.includes(serviceId);
  const updatedFavorites = exists
    ? current.favoriteServiceIds.filter((id) => id !== serviceId)
    : [...current.favoriteServiceIds, serviceId];

  saveBeautyArchive({
    ...current,
    favoriteServiceIds: updatedFavorites
  });
};

export const clearBeautyArchive = (): void => {
  try {
    localStorage.removeItem(ARCHIVE_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('aurador_archive_updated', { detail: null }));
  } catch (e) {
    console.error('Failed to clear Beauty Archive:', e);
  }
};
