export interface LoyaltyReward {
  id: string;
  name: string;
  category: 'experience' | 'apothecary';
  cost: number;
  value: string;
  description: string;
  image: string;
  code: string;
}

export interface RedeemedVoucher {
  id: string;
  rewardId: string;
  rewardName: string;
  code: string;
  pointsSpent: number;
  redeemedAt: string;
}

export interface LoyaltyProfile {
  points: number;
  tier: 'Gold Sovereign' | 'Imperial Onyx' | 'Celestial Diamond';
  visitsCount: number;
  lifetimePoints: number;
  redeemedVouchers: RedeemedVoucher[];
}

const REWARDS_STORAGE_KEY = 'aurador_sovereign_rewards_v1';

export const INITIAL_LOYALTY_DATA: LoyaltyProfile = {
  points: 2450,
  tier: 'Imperial Onyx',
  visitsCount: 6,
  lifetimePoints: 5800,
  redeemedVouchers: [
    {
      id: 'v-109',
      rewardId: 'rew-champagne',
      rewardName: 'Vintage Dom Pérignon Champagne Flight',
      code: 'SOV-VINTAGE-99',
      pointsSpent: 450,
      redeemedAt: '2026-08-14'
    }
  ]
};

export const REWARDS_CATALOG: LoyaltyReward[] = [
  {
    id: 'rew-champagne',
    name: 'Vintage Sommelier Champagne Flight',
    category: 'experience',
    cost: 450,
    value: '$65 Courtesy',
    description: 'Tasting of two vintage Grand Cru champagnes accompanied by Sicilian pistachios and organic berries in your private suite.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600&auto=format&fit=crop',
    code: 'SOV-CHAMP-45'
  },
  {
    id: 'rew-scalp-steam',
    name: 'Aromatherapy Scalp Detox & Thermal Bath',
    category: 'experience',
    cost: 950,
    value: '$120 Luxury Ritual',
    description: 'Purifying Himalayan salt and cedarwood scalp scrub followed by an ultrasonic ozone steam bath for profound follicle oxygenation.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop',
    code: 'SOV-SCALP-95'
  },
  {
    id: 'rew-gold-infusion',
    name: '24K Gold Cellular Lip & Eye Infusion',
    category: 'experience',
    cost: 1500,
    value: '$165 Add-On',
    description: 'Real 24-karat gold leaf mask infused with Swiss peptides to depuff orbital circles and plump lip contours prior to styling.',
    image: 'https://images.unsplash.com/photo-1512290900672-1f4864506ba5?q=80&w=600&auto=format&fit=crop',
    code: 'SOV-GOLD-15'
  },
  {
    id: 'rew-suite-upgrade',
    name: 'Private Soundproof VIP Chamber Upgrade',
    category: 'experience',
    cost: 2200,
    value: '$250 Exclusive Privilege',
    description: 'Guaranteed reservation in our private acoustic sanctum with Italian leather recliner, custom acoustics, and dedicated butler service.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600&auto=format&fit=crop',
    code: 'SOV-SUITE-22'
  },
  {
    id: 'rew-obsidian-blade',
    name: 'Volcanic Black Obsidian Sculpting Blade',
    category: 'apothecary',
    cost: 1800,
    value: '$110 Boutique Product',
    description: 'Hand-carved geothermal facial contour tool for at-home lymphatic drainage and cheekbone sculpting, encased in silk pouch.',
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop',
    code: 'SOV-GUA-18'
  },
  {
    id: 'rew-rose-mist',
    name: 'Damascene Rose & White Truffle Mist (100ml)',
    category: 'apothecary',
    cost: 2100,
    value: '$125 Boutique Product',
    description: 'Steam-distilled organic floral hydrosol with Alba white truffle extract to lock in hydration and refine dermal tone.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop',
    code: 'SOV-MIST-21'
  },
  {
    id: 'rew-gold-nectar',
    name: '24K Liquid Gold Cellular Hair Nectar (50ml)',
    category: 'apothecary',
    cost: 3200,
    value: '$195 Haute Apothecary',
    description: 'Colloidal Japanese gold with hydrolysed silk protein for diamond-reflective luminosity and heat protection.',
    image: 'https://images.unsplash.com/photo-1608248597359-57351f38e684?q=80&w=600&auto=format&fit=crop',
    code: 'SOV-NECTAR-32'
  }
];

export const getLoyaltyProfile = (): LoyaltyProfile => {
  try {
    const raw = localStorage.getItem(REWARDS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(REWARDS_STORAGE_KEY, JSON.stringify(INITIAL_LOYALTY_DATA));
      return INITIAL_LOYALTY_DATA;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read loyalty profile:', e);
    return INITIAL_LOYALTY_DATA;
  }
};

export const saveLoyaltyProfile = (profile: LoyaltyProfile): void => {
  try {
    localStorage.setItem(REWARDS_STORAGE_KEY, JSON.stringify(profile));
    window.dispatchEvent(new CustomEvent('aurador_rewards_updated', { detail: profile }));
  } catch (e) {
    console.error('Failed to save loyalty profile:', e);
  }
};

export const redeemReward = (reward: LoyaltyReward): RedeemedVoucher | null => {
  const current = getLoyaltyProfile();
  if (current.points < reward.cost) {
    return null;
  }

  const voucher: RedeemedVoucher = {
    id: `v-${Date.now().toString().slice(-4)}`,
    rewardId: reward.id,
    rewardName: reward.name,
    code: `${reward.code}-${Math.floor(100 + Math.random() * 900)}`,
    pointsSpent: reward.cost,
    redeemedAt: new Date().toISOString().split('T')[0]
  };

  const updatedProfile: LoyaltyProfile = {
    ...current,
    points: current.points - reward.cost,
    redeemedVouchers: [voucher, ...current.redeemedVouchers]
  };

  saveLoyaltyProfile(updatedProfile);
  return voucher;
};

export const addSimulatedPoints = (pointsToAdd: number): LoyaltyProfile => {
  const current = getLoyaltyProfile();
  const updatedPoints = current.points + pointsToAdd;
  const lifetime = current.lifetimePoints + pointsToAdd;

  let newTier = current.tier;
  if (lifetime >= 10000) newTier = 'Celestial Diamond';
  else if (lifetime >= 5000) newTier = 'Imperial Onyx';
  else newTier = 'Gold Sovereign';

  const updated: LoyaltyProfile = {
    ...current,
    points: updatedPoints,
    lifetimePoints: lifetime,
    tier: newTier
  };

  saveLoyaltyProfile(updated);
  return updated;
};
