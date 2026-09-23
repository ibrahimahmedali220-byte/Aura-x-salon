import { WaitlistTicket, SuiteStatus } from '../types';

const WAITLIST_STORAGE_KEY = 'aurador_active_waitlist_ticket_v1';

export const INITIAL_SUITE_STATUSES: SuiteStatus[] = [
  { id: 1, name: 'Imperial Gold Salon Suite I', status: 'occupied', currentRitual: 'Haute Parisian Balayage', stylistName: 'Jean-Luc Moreau', availableInMins: 45 },
  { id: 2, name: 'Soundproof Royal Sanctuary II', status: 'occupied', currentRitual: 'Liquid Gold 24K Keratin', stylistName: 'Elena Rostova', availableInMins: 20 },
  { id: 3, name: 'Celeste Hammam & Scalp Bath III', status: 'sanitizing', currentRitual: 'Caviar Scalp Detox Prep', stylistName: 'Artisan Concierge', availableInMins: 8 },
  { id: 4, name: 'L’Éclat Private Bridal Pavilion IV', status: 'occupied', currentRitual: 'Grand Imperial Bridal Couture', stylistName: 'Marie-Claire Laurent', availableInMins: 80 },
  { id: 5, name: 'Obsidian Hydro-Thermal Lounge V', status: 'occupied', currentRitual: 'Swiss Volcanic Hot Stone', stylistName: 'Hiroshi Tanaka', availableInMins: 35 },
  { id: 6, name: 'Sovereign VIP Color Bar VI', status: 'available', currentRitual: 'Ready for Immediate Walk-In / Standby', stylistName: 'Available Master Stylist', availableInMins: 0 },
  { id: 7, name: 'Couture Precision Suite VII', status: 'occupied', currentRitual: 'Architectural Diamond Cut', stylistName: 'Jean-Luc Moreau', availableInMins: 15 },
  { id: 8, name: 'Diamond Botanical Haven VIII', status: 'occupied', currentRitual: 'Cellular Peptide Facial', stylistName: 'Elena Rostova', availableInMins: 55 },
];

export const getActiveWaitlistTicket = (): WaitlistTicket | null => {
  try {
    const raw = localStorage.getItem(WAITLIST_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read waitlist ticket:', e);
    return null;
  }
};

export const saveActiveWaitlistTicket = (ticket: WaitlistTicket): void => {
  try {
    localStorage.setItem(WAITLIST_STORAGE_KEY, JSON.stringify(ticket));
    window.dispatchEvent(new CustomEvent('aurador_waitlist_updated', { detail: ticket }));
  } catch (e) {
    console.error('Failed to save waitlist ticket:', e);
  }
};

export const joinWaitlist = (
  entry: Omit<WaitlistTicket, 'ticketNumber' | 'position' | 'estimatedWaitMinutes' | 'status' | 'joinedAt'>
): WaitlistTicket => {
  // Generate high-end ticket code e.g. WL-4829
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const ticketNumber = `WL-${randomSuffix}`;
  
  // Dynamic queue estimation
  const position = Math.floor(Math.random() * 2) + 2; // e.g. #2 or #3 in line
  const estimatedWaitMinutes = position * 12 + Math.floor(Math.random() * 6);

  const ticket: WaitlistTicket = {
    ...entry,
    ticketNumber,
    position,
    estimatedWaitMinutes,
    status: 'waiting',
    joinedAt: new Date().toISOString(),
  };

  saveActiveWaitlistTicket(ticket);
  return ticket;
};

export const cancelWaitlistTicket = (): void => {
  try {
    localStorage.removeItem(WAITLIST_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('aurador_waitlist_updated', { detail: null }));
  } catch (e) {
    console.error('Failed to cancel waitlist ticket:', e);
  }
};
