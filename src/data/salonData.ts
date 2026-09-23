import { SalonService, Stylist, VIPPackage, Testimonial, GalleryItem, BeforeAfterItem, MembershipTier, ApothecaryProduct, BlogArticle } from '../types';

export const SALON_INFO = {
  name: "AURA & D'OR",
  title: "Luxury Hair Salon & Wellness Studio",
  tagline: "The Epitome of Luxury Hair Styling, Bespoke Skin Artistry & Restorative Wellness",
  phone: "+1 (800) 789-2872",
  phoneDisplay: "+1 (800) 789-AURA",
  whatsappNumber: "+18007892872",
  whatsappLink: "https://wa.me/18007892872?text=Hello%20Aura%20%26%20D'Or%2C%20I%20would%20like%20to%20reserve%20a%20VIP%20appointment.",
  email: "concierge@aurador-luxury.com",
  address: "452 Royale Promenade, Suite 100, Beverly Hills, CA 90210",
  hours: {
    weekdays: "Tuesday – Friday: 9:00 AM – 8:00 PM",
    saturday: "Saturday: 9:00 AM – 7:00 PM",
    sunday: "Sunday: 10:00 AM – 6:00 PM",
    monday: "Monday: Private VIP Bookings Only"
  }
};

export const SERVICES_DATA: SalonService[] = [
  // Hair Styling
  {
    id: 'hair-balayage',
    category: 'hair',
    name: 'Luxury Custom Balayage & Gloss',
    tagline: 'Sun-kissed multidimensional illumination crafted freehand',
    description: 'Customized hand-painted lighting tailored to facial bone structure and natural undertones, followed by a caviar-infused crystal glaze for diamond radiance.',
    duration: '180 mins',
    price: 380,
    featured: true,
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=900&auto=format&fit=crop',
    inclusions: ['Personalized Chromatic Consultation', 'Freehand Micro-Balayage', 'Caviar Glaze Infusion', 'Scalp Massage & Silk Blowdry']
  },
  {
    id: 'hair-royal-keratin',
    category: 'hair',
    name: 'Liquid Gold 24K Keratin Reconstruction',
    tagline: 'Velvety smooth, glass-like hair transformation',
    description: 'A formaldehyde-free bio-active smoothing elixir with microscopic 24K gold particles and hydrolysed silk proteins that eliminates frizz and restores structural integrity.',
    duration: '150 mins',
    price: 450,
    featured: true,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=900&auto=format&fit=crop',
    inclusions: ['Deep Peptide Clarifying Wash', '24K Liquid Gold Infusion', 'Thermal Sealing Ritual', 'Home Maintenance Luxury Kit']
  },
  {
    id: 'hair-bespoke-sculpt',
    category: 'hair',
    name: 'Architectural Luxury Cut & Styling',
    tagline: 'Precision geometric cutting tailored to your silhouette',
    description: 'A master artistic cut sculpted with Japanese cobalt shears to complement head curvature, lifestyle, and facial harmony, styled with heat-activated botanical oils.',
    duration: '75 mins',
    price: 195,
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=900&auto=format&fit=crop',
    inclusions: ['Aromatherapy Scalp Bath', 'Custom Diamond Shear Sculpt', 'Botanical Thermal Styling', 'Champagne or Herbal Elixir']
  },
  {
    id: 'hair-stem-cell-therapy',
    category: 'hair',
    name: 'Swiss Botanical Stem-Cell Scalp Detox',
    tagline: 'Cellular regeneration for thinning and fatigued tresses',
    description: 'High-frequency microcurrent scalp oxygenation with rare Swiss apple stem cells and cold-pressed botanical extracts to activate dormant follicles.',
    duration: '90 mins',
    price: 290,
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=900&auto=format&fit=crop',
    inclusions: ['Trichological Scalp Camera Scan', 'Enzymatic Exfoliation Bath', 'Cryo-Oxygenation Therapy', 'Acupressure Neck & Shoulder Ritual']
  },

  // Skin & Aesthetics
  {
    id: 'skin-24k-gold-facial',
    category: 'skin',
    name: 'Imperial 24K Gold Cellular Lifting Facial',
    tagline: 'Pure Japanese gold leaf anti-aging masterpiece',
    description: 'An opulent ritual combining sheets of certified 24-karat gold leaf, ultrasound lymph drainage, and marine collagen peptide infusion for instant firmness and porcelain luminosity.',
    duration: '90 mins',
    price: 420,
    featured: true,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=900&auto=format&fit=crop',
    inclusions: ['Double Botanical Cleansing', 'Ultrasound Micro-Firming', 'Real 24K Gold Leaf Application', 'Rose Quartz Guasha Sculpting']
  },
  {
    id: 'skin-hydra-glow',
    category: 'skin',
    name: 'Vortex Glass-Skin Hydra Infusion',
    tagline: 'Deep pore purification and plumping hyaluronic deluge',
    description: 'Medical-grade vortex suction clears cellular debris while vortex-fusing concentrated hyaluronic acid, glutathione, and antioxidant vitamins into dermal layers.',
    duration: '75 mins',
    price: 280,
    image: 'https://images.unsplash.com/photo-1512290900672-1f02e6a9ee80?q=80&w=900&auto=format&fit=crop',
    inclusions: ['Vortex Vacuum Pore Extraction', 'Glycolic Brightening Peel', 'Cold-Plasma Hydration Infusion', 'LED Phototherapy Dome']
  },
  {
    id: 'skin-sculpt-lift',
    category: 'skin',
    name: 'Buccal & Dermal Architectural Sculpt',
    tagline: 'Non-surgical contouring favored by international royalty',
    description: 'Intra-oral buccal massage combined with contour lifting techniques that melts facial tension, sculpts jawlines, and elevates cheekbones naturally.',
    duration: '85 mins',
    price: 340,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=900&auto=format&fit=crop',
    inclusions: ['Warm Herbal Towel Compression', 'Myofascial Release Massage', 'Intra-Oral Buccal Sculpt', 'Cryo-Sculpting Finishing Globes']
  },

  // Bridal & Glamour
  {
    id: 'bridal-couture-makeover',
    category: 'bridal',
    name: 'Royal Bridal Complete Makeover & Hair Styling',
    tagline: 'Perfection on your most memorable day with airbrush mastery',
    description: 'Waterproof high-definition luxury airbrush artistry tailored to bridal lighting and photography, accompanied by bespoke royal hair ornamentation and veil draping.',
    duration: '240 mins',
    price: 750,
    featured: true,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=900&auto=format&fit=crop',
    inclusions: ['Pre-Wedding Trial Consultation', 'Waterproof HD Airbrush Foundation', 'Swarovski / Floral Hair Architecture', 'Emergency Bridal Touch-up Kit']
  },
  {
    id: 'bridal-editorial-glam',
    category: 'bridal',
    name: 'Red Carpet Redefined Evening Glamour',
    tagline: 'Sculpted elegance fit for galas, premieres, and high society',
    description: 'Signature glowing complexion, precision soft-focus eye detailing, bespoke mink/silk lashes, and Hollywood waves that endure throughout the night.',
    duration: '105 mins',
    price: 260,
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=900&auto=format&fit=crop',
    inclusions: ['Skin Prep with Gold Elixir', 'Signature Red Carpet Smokey or Nude Eye', 'Handcrafted Silk Lashes', 'Setting Mist with Pearl Shimmer']
  },

  // Bespoke Spa & Rituals
  {
    id: 'spa-moroccan-hammam',
    category: 'spa',
    name: 'Imperial Moroccan Black Soap & Rose Ritual',
    tagline: 'Steam sanctuary, eucalyptus exfoliation & Damask rose bath',
    description: 'Relax within our heated marble hammam sanctuary with organic eucalyptus black soap, vigorous Kessa mitt body exfoliation, and a restorative warm argan oil bath.',
    duration: '120 mins',
    price: 360,
    featured: true,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=900&auto=format&fit=crop',
    inclusions: ['Private Heated Marble Steam', 'Organic Savon Noir Application', 'Artisanal Kessa Mitt Exfoliation', 'Damascene Rose Mist & Argan Drench']
  },
  {
    id: 'spa-deep-rejuvenation',
    category: 'spa',
    name: 'Warm Basalt & Gold Elixir Hot Stone Massage',
    tagline: 'Melt chronic fatigue beneath volcanic stones and frankincense',
    description: 'Volcanic basalt stones smoothed in organic botanical oils release deep muscular stagnation, complemented by an aromatic Indian head and chakra balance massage.',
    duration: '90 mins',
    price: 290,
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=900&auto=format&fit=crop',
    inclusions: ['Foot Purification Floral Soak', 'Basalt Stone Deep Release', 'Frankincense & Myrrh Warm Oil', 'Tibetan Sound Bowl Grounding']
  }
];

export const VIP_PACKAGES: VIPPackage[] = [
  {
    id: 'package-empress',
    name: 'The Empress Grand Sanctuary',
    subtitle: 'Full-Day All-Inclusive Royal Metamorphosis',
    price: 1150,
    duration: '6 Hours',
    popular: true,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=900&auto=format&fit=crop',
    description: 'The definitive luxury experience inside our private VIP suite with personal butler, Dom Pérignon service, and a complete head-to-toe rebirth.',
    highlights: [
      'Private VIP Suite Reservation',
      'Imperial 24K Gold Cellular Lifting Facial',
      'Custom Balayage or 24K Keratin Infusion',
      'Warm Basalt & Argan Stone Body Ritual',
      'Luxury Manicure & Pedicure with Paraffin Dip',
      'Vintage Champagne & Artisanal Caviar Canapés'
    ]
  },
  {
    id: 'package-glow',
    name: 'The Golden Radiance Retreat',
    subtitle: 'Half-Day Cellular Rejuvenation & Hair Sculpting',
    price: 680,
    duration: '3.5 Hours',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=900&auto=format&fit=crop',
    description: 'Designed for luminous social appearances and high-profile occasions requiring instant, unblemished radiance.',
    highlights: [
      'Vortex Glass-Skin Hydra Infusion',
      'Architectural Luxury Hair Cut & Crystal Glaze',
      'Targeted Shoulder & Scalp Acupressure',
      'Red Carpet Silk Blowdry & Finishing Mist',
      'Complimentary Organic Gold Serum Take-Home'
    ]
  },
  {
    id: 'package-bridal',
    name: 'Elite Bridal Royale Collection',
    subtitle: 'Comprehensive Pre-Wedding & Wedding Day Sanctuary',
    price: 1650,
    duration: 'Multi-Day Experience',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=900&auto=format&fit=crop',
    description: 'An ultra-exclusive series of bridal preparatory sessions concluding with master wedding day hair and makeup orchestration.',
    highlights: [
      'Preliminary Trial Hair & Makeup Session',
      'Pre-Wedding Hydra-Glow Facial & Body Polish',
      'Wedding Day Airbrush & Hair Ornamentation',
      'Mother of the Bride / Maid of Honor Glamour Look',
      'Private Suite Dressing Concierge & Champagne'
    ]
  }
];

export const STYLISTS_DATA: Stylist[] = [
  {
    id: 'stylist-jean-luc',
    name: 'Johnathan Cole',
    role: 'Artistic Director & Master Colorist',
    experience: '18 Years Experience (London, Milan, Beverly Hills)',
    specialty: 'Custom Balayage, Color Correction & Structural Cuts',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    bio: 'Trained at premier design studios worldwide, Johnathan’s signature fluid balayage technique has graced red carpets and international fashion magazines.',
    awards: ['World Luxury Hairdresser of the Year', 'Elite Styling Association Laureate'],
    instagram: '@johnathan_styling'
  },
  {
    id: 'stylist-helena',
    name: 'Helena Vane-Kensington',
    role: 'Head Aesthetician & Facial Sculptor',
    experience: '14 Years in Medical & Holistic Aesthetics',
    specialty: '24K Gold Cellular Therapy, Buccal Sculpting & Glass Skin',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    bio: 'Helena harmonizes ancient Japanese face sculpting with Swiss cellular skincare to deliver firm, luminous complexions without invasive interventions.',
    awards: ['Best Aesthetic Specialist - Beverly Hills Living', 'Swiss CIDESCO Certified Master'],
    instagram: '@helenavane_skin'
  },
  {
    id: 'stylist-roberto',
    name: 'Roberto Valente',
    role: 'Celebrity Hair Stylist & Keratin Specialist',
    experience: '16 Years in Luxury Hair Artistry',
    specialty: 'Liquid Gold Keratin, Precision Shears & Red Carpet Glamour',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    bio: 'Roberto crafts sculpted silhouettes that move with magnetic vitality. He is the confidential stylist to Hollywood actresses, models, and fashion houses.',
    awards: ['Hollywood Style Excellence Winner', 'Global Color Trophy Grand Finalist'],
    instagram: '@robertovalente_hair'
  },
  {
    id: 'stylist-soraya',
    name: 'Soraya Al-Mirza',
    role: 'Master Bridal Makeup Artist & Hammam Therapist',
    experience: '12 Years in Royal Bridal & International Glamour',
    specialty: 'HD Airbrush Bridal Glamour, Moroccan Hammam Rituals',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop',
    bio: 'Soraya curates enchanting bridal visions that unite timeless royal poise with camera-ready luminosity, and oversees our private thermal hammam chambers.',
    awards: ['International Bridal Stylist of the Year', 'Vogue Bride Recommended Artisan'],
    instagram: '@soraya_luxurybeauty'
  }
];

export const BEFORE_AFTER_ITEMS: BeforeAfterItem[] = [
  {
    id: 'ba-balayage',
    title: 'Custom Blonde Balayage & Glaze Transformation',
    category: 'Hair Styling',
    description: 'Transforming brassy, uneven tones into a multi-tonal, pearl-blonde dimensional balayage with mirror-shine reflection.',
    beforeImage: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=900&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=900&auto=format&fit=crop',
    treatment: 'Custom Balayage + Caviar Glaze',
    stylist: 'Johnathan Cole'
  },
  {
    id: 'ba-facial',
    title: '24K Gold Cellular Lifting & Glass Skin',
    category: 'Skin Aesthetics',
    description: 'Revitalizing stressed, dehydrated skin into radiant, contoured glass skin with visible nasolabial smoothing and cheekbone elevation.',
    beforeImage: 'https://images.unsplash.com/photo-1512290900672-1f02e6a9ee80?q=80&w=900&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=900&auto=format&fit=crop',
    treatment: 'Imperial 24K Gold Cellular Lifting Facial',
    stylist: 'Helena Vane-Kensington'
  },
  {
    id: 'ba-keratin',
    title: 'Damaged Curl Restoration & Liquid Silk',
    category: 'Hair Restructure',
    description: 'Eliminating environmental frizz and thermal damage, sealing cuticles with 24K nano-gold for featherlight fluid movement.',
    beforeImage: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=900&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=900&auto=format&fit=crop',
    treatment: 'Liquid Gold 24K Keratin Reconstruction',
    stylist: 'Roberto Valente'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Atmospheric Private VIP Suite',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000&auto=format&fit=crop',
    description: 'Sound-dampened Italian marble, warm indirect gold cove lighting, and private champagne bar.'
  },
  {
    id: 'gal-2',
    title: 'Signature Rose Gold Balayage',
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000&auto=format&fit=crop',
    description: 'Hand-blended metallic rose gold hues layered with deep hazelnut roots.'
  },
  {
    id: 'gal-3',
    title: 'Heated Basalt Spa Sanctuary',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop',
    description: 'Private mineral bath and hammam retreat for deep rejuvenation.'
  },
  {
    id: 'gal-4',
    title: 'Editorial Bridal Lookbook',
    category: 'bridal',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000&auto=format&fit=crop',
    description: 'Flawless luminous skin with sculpted chignon and bespoke pearl hairpins.'
  },
  {
    id: 'gal-5',
    title: 'Luminous Cellular Skin Glow',
    category: 'skin',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop',
    description: 'Post-treatment diamond shine with pure botanical gold serum.'
  },
  {
    id: 'gal-6',
    title: 'Geometric Hair Sculpture',
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop',
    description: 'Polished precision bob with high gloss velvet finish.'
  },
  {
    id: 'gal-7',
    title: 'Royal Wedding Veil Artistry',
    category: 'bridal',
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1000&auto=format&fit=crop',
    description: 'Seamless veil integration with hand-placed crystal tiara styling.'
  },
  {
    id: 'gal-8',
    title: 'Botanical Dispensary',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=1000&auto=format&fit=crop',
    description: 'Where our artisanal organic essences, oils, and 24K gold leaves are freshly formulated.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    clientName: 'Countess Genevieve De Montfort',
    roleOrCity: 'London & Bel Air',
    service: 'Custom Balayage & 24K Gold Facial',
    rating: 5,
    comment: "AURA & D'OR is without peer. Johnathan’s balayage has that rare effortless distinction, and the private VIP suite gave me complete discretion. It truly is the Ritz-Carlton of salons.",
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
    date: 'September 2026'
  },
  {
    id: 't-2',
    clientName: 'Sienna Sterling',
    roleOrCity: 'Fashion Editor, Vogue International',
    service: 'Liquid Gold Keratin & Dermal Sculpt',
    rating: 5,
    comment: "After decades in the fashion circuit, my hair was severely sensitized. Roberto reconstructed my curls into liquid glass in a single session. The attention to detail is breathtaking.",
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    date: 'August 2026'
  },
  {
    id: 't-3',
    clientName: 'Dr. Elena Rostova',
    roleOrCity: 'Dermatologic Surgeon, Zurich',
    service: 'Imperial 24K Gold Cellular Lifting Facial',
    rating: 5,
    comment: "As a clinician, I am naturally skeptical of beauty claims. Helena’s buccal sculpting and 24K formulation stimulated undeniable lymphatic drainage and deep facial contouring. Exceptional mastery.",
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
    date: 'September 2026'
  },
  {
    id: 't-4',
    clientName: 'Camilla & Harrison Vance',
    roleOrCity: 'Monaco',
    service: 'Elite Bridal Royale Collection',
    rating: 5,
    comment: "Soraya and the team orchestrated our wedding day with calm regal perfection. My bridal airbrush stayed pristine until 4 AM. They made me feel like royalty from the moment we stepped inside.",
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop',
    date: 'July 2026'
  }
];

export const EDITORIAL_PRESS = [
  {
    publication: 'VOGUE LUXURY STYLING',
    quote: '"The definitive pinnacle of custom balayage artistry and discretion in Beverly Hills."',
    year: '2026'
  },
  {
    publication: "HARPER'S BAZAAR",
    quote: '"Their 24K gold cellular lift facial is the confidential secret behind red-carpet radiance."',
    year: '2026'
  },
  {
    publication: 'GLOBAL FASHION REVIEW',
    quote: '"A sanctuary uniting the rare alchemy of Swiss cellular science with master craftsmanship."',
    year: '2025'
  },
  {
    publication: 'VANITY FAIR ELITE',
    quote: '"Where high society retreats for soundproof VIP suites and museum-grade aesthetic restoration."',
    year: '2025'
  }
];

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'tier-gold',
    name: "Sovereign Guild",
    subtitle: 'The Essential Private Circle Privilege',
    annualFee: 2400,
    badge: 'GOLD PRIVILEGE',
    themeColor: '#c5a059',
    cardGradient: 'from-[#2a2013] via-[#1a140c] to-[#0d0905]',
    privileges: [
      'Guaranteed Same-Day VIP Reservation Access',
      '12 Complimentary Signature Botanical Blowouts/Yr',
      '15% Privilege Courtesy on All Services',
      'Private Sommelier Champagne Bar Access',
      'Seasonal Master Alchemist Formulation Gift Box'
    ],
    exclusiveBonus: 'Dedicated Concierge WhatsApp Direct Line'
  },
  {
    id: 'tier-platinum',
    name: 'Platinum Sanctuary Circle',
    subtitle: 'Unrestricted Studio Immersion & Suites',
    annualFee: 4800,
    badge: 'MOST COVETED',
    themeColor: '#e5e0d8',
    cardGradient: 'from-[#2e2a26] via-[#1c1a17] to-[#0c0b0a]',
    privileges: [
      'Unlimited Private Soundproof Suite Upgrades',
      '24 Complimentary Blowouts & Treatments/Yr',
      '20% Courtesy on All Services & Products',
      'Direct Cell Access to Artistic Director Johnathan',
      'Full-Day Sanctuary Guest Pass for Companion (2x/Yr)',
      'Complimentary In-Residence or Yacht Styling (LA Metro)'
    ],
    exclusiveBonus: 'Personal Monogrammed Silk Robe in Private Chamber'
  },
  {
    id: 'tier-black-diamond',
    name: 'Black Diamond Imperial Patron',
    subtitle: 'Strictly Limited to 25 Worldwide Patrons',
    annualFee: 9500,
    badge: 'ROYAL PATRONAGE',
    themeColor: '#d4af37',
    cardGradient: 'from-[#1f0e14] via-[#11070b] to-[#050204]',
    privileges: [
      'Unlimited Blowouts & Reconstructive Glazes',
      'Bespoke Formula Locked Exclusively to Your DNA Profile',
      '24/7 Global On-Call Styling for Met Gala, Cannes, & Oscars',
      'Full Buyout Privileges for Private Evening Studios',
      'Personal Dedicated Butler & Caviar Service Upon Arrival',
      'Direct Master Artisan Escort at International Fashion Weeks'
    ],
    exclusiveBonus: 'Certified 24K Gold Engraved Patron Card & Lifetime Legacy Rate'
  }
];

export const APOTHECARY_PRODUCTS: ApothecaryProduct[] = [
  {
    id: 'prod-gold-nectar',
    name: '24K Liquid Gold Cellular Hair Nectar',
    subheading: 'Pure colloidal gold & hydrolyzed silk peptide serum',
    category: 'Hair Elixir',
    price: 195,
    volume: '50 ml / 1.7 fl.oz',
    image: 'https://images.unsplash.com/photo-1608248597359-57351f38e684?q=80&w=600&auto=format&fit=crop',
    description: 'Weightless micro-droplets of pure Japanese 24K gold infused with rare argan and camellia oils. Shields cuticles against UV and heat while bestowing liquid silk reflection.',
    keyIngredients: ['24K Colloidal Gold', 'Camellia Seed Oil', 'Hydrolyzed Marine Collagen']
  },
  {
    id: 'prod-stem-cell-serum',
    name: 'Swiss Phyto-Cell Dermal Rebirth Serum',
    subheading: 'Rare Uttwiler Spätlauber apple stem cell matrix',
    category: 'Facial Concentrate',
    price: 245,
    volume: '30 ml / 1.0 fl.oz',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop',
    description: 'Clinically proven bio-identical stem cells accelerate dermal longevity, visibly smoothing deep expression lines and activating youthful elasticity within 14 days.',
    keyIngredients: ['Swiss Apple Stem Cells', 'Tri-Hyaluronic Acid Matrix', 'Glutathione 2.0']
  },
  {
    id: 'prod-rose-mist',
    name: 'Damascene Rose & White Truffle Mist',
    subheading: 'Organic steam-distilled floral hydrosol',
    category: 'Dermal Hydrosol',
    price: 125,
    volume: '100 ml / 3.4 fl.oz',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop',
    description: 'Hand-picked dawn Damask rose petals distilled in pure alpine glacier water, enriched with Alba white truffle extract to instantly quench, refresh, and tighten pores.',
    keyIngredients: ['Damask Rose Hydrosol', 'Italian White Truffle Extract', 'Niacinamide Gold']
  },
  {
    id: 'prod-obsidian-guasha',
    name: 'Volcanic Black Obsidian Sculpting Blade',
    subheading: 'Hand-carved geothermal facial contour tool',
    category: 'Sculpting Tool',
    price: 110,
    volume: 'Handcrafted',
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=600&auto=format&fit=crop',
    description: 'Formed by rapidly cooled volcanic lava, this dual-edge architectural gua sha drains sluggish lymphatic congestion, sculpts jawline contours, and releases deep facial fascia.',
    keyIngredients: ['100% Genuine Volcanic Obsidian', 'Polished Dual-Bevel Contours', 'Velvet Storage Pouch']
  }
];

export const EDITORIAL_BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'art-24k-gold-science',
    title: 'The Cellular Alchemy of 24K Gold in Dermal Aesthetics',
    subtitle: 'How colloidal nanogold promotes microcirculation and collagen synthesis',
    excerpt: 'Exploring the regenerative bio-conductivity of pure 24-karat gold sheets and how ultrasonic waves drive precious peptides deep into the cutaneous membrane.',
    content: [
      'Gold has captivated ancient civilizations from Egyptian dynasties to Imperial dynastic courts as the quintessential emblem of divine vitality. In contemporary aesthetic medicine and luxury dermatological care, the focus has shifted from symbolic reverence to cellular biochemistry.',
      'When pure 24-karat gold is milled into colloidal nano-particles, it displays profound anti-inflammatory and antioxidant properties. Colloidal gold acts as an electron donor, neutralizing destructive reactive oxygen species (ROS) produced by ultraviolet radiation and urban atmospheric pollution.',
      'At AURA & D’OR, our Imperial 24K Gold Cellular Lifting Facial pairs certified Swiss gold foil with medical-grade ultrasound cavitation. This vibrational acoustic field creates transient micro-channels in the stratum corneum, enabling marine collagen tri-peptides to penetrate five times deeper than topical applications.',
      'The clinical result is immediate and noticeable: accelerated lymphatic drainage, reduced puffiness around delicate ocular margins, and a distinct porcelain radiance that lasts for weeks.'
    ],
    category: 'Skin Science',
    author: 'Helena Vane-Kensington',
    authorRole: 'Head Aesthetician & Facial Sculptor',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
    date: 'September 18, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop',
    tags: ['24K Gold', 'Facial Sculpting', 'Cellular Skincare', 'Anti-Aging']
  },
  {
    id: 'art-haute-balayage',
    title: 'Architectural Balayage: French Freehand Chromatic Artistry',
    subtitle: 'Tailoring multidimensional light to facial bone curvature and skin undertones',
    excerpt: 'True luxury balayage is never formulaic. Artistic Director Johnathan Cole reveals how bespoke micro-placement elevates facial symmetry and eliminates harsh demarcation.',
    content: [
      'The French term "balayer" translates to "to sweep." Unlike traditional foils that enforce rigid, symmetrical horizontal rows, authentic architectural balayage approaches every crown of hair as an individualized canvas.',
      'The key to red-carpet distinction lies in understanding bone structure. By placing brighter chromatic ribbons around the zygomatic arches and jawline, we reflect natural ambient light upward, creating an optical contouring effect akin to soft-focus studio illumination.',
      'Our color formulations at AURA & D’OR eschew ammonia and heavy silicones in favor of organic cold-pressed camellia seed oil and caviar protein extracts. This shields the hair fiber during melanin dispersion, ensuring the cuticle remains glass-smooth.',
      'Maintenance is effortless. Because hand-painted gradients seamlessly meld into natural roots, regrowth remains pristine and elegant for up to six months without high-maintenance salon visits.'
    ],
    category: 'Hair Artistry',
    author: 'Johnathan Cole',
    authorRole: 'Artistic Director & Master Colorist',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    date: 'September 12, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1000&auto=format&fit=crop',
    tags: ['Balayage', 'Hair Color', 'Hair Architecture', 'Caviar Glaze']
  },
  {
    id: 'art-red-carpet-prep',
    title: 'Confidential Protocols: Preparing Hair for Cannes & The Met Gala',
    subtitle: 'Behind-the-scenes techniques for 16-hour humidity resistance and flawless camera poise',
    excerpt: 'Celebrity stylist Roberto Valente shares the secret layering protocols that keep haute couture hairstyles immaculate under intense high-definition flash photography.',
    content: [
      'When styling for the Cannes red carpet or the Met Gala staircase, ordinary setting sprays and styling gels simply fail. The combination of intense paparazzi strobes, humidity, and hours of movement requires an uncompromising architectural approach.',
      'The secret begins 48 hours prior with our Liquid Gold 24K Keratin treatment. By sealing the outer lipid layer with bio-compatible silk keratin, hair is rendered virtually immune to ambient moisture fluctuations.',
      'On the day of the gala, Roberto employs directional thermal pinning. Each wave is sculpted with customized Japanese ceramic tools and allowed to cool while anchored in velvet-cushioned clips. This sets the hydrogen bonds permanently in place before any hairspray touches the strand.',
      'The crowning finish is our ultra-fine Damascene Rose & White Truffle mist, delivering weightless, light-refracting luminescence without stiffness or residue.'
    ],
    category: 'Red Carpet',
    author: 'Roberto Valente',
    authorRole: 'Celebrity Hair Stylist & Keratin Specialist',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    date: 'September 5, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop',
    tags: ['Red Carpet', 'Keratin', 'Celebrity Styling', 'Met Gala']
  },
  {
    id: 'art-phyto-stem-cells',
    title: 'Swiss Phyto-Stem Cells: The New Frontier in Follicle Regeneration',
    subtitle: 'Unlocking dormant follicular vitality with rare Uttwiler Spätlauber apple culture',
    excerpt: 'Discover why high-frequency microcurrent scalp oxygenation combined with epigenetic plant stem cells is reversing follicular thinning for our distinguished clientele.',
    content: [
      'Hair density and luster are fundamentally governed by the health of the scalp micro-biome and the dermal papilla stem cells nestled at the base of each follicle. With age, hormonal flux, and oxidative stress, these cells slow their regenerative cycle.',
      'In our Swiss Botanical Scalp Sanctuary, we utilize extracts derived from the rare Swiss apple variety Uttwiler Spätlauber, renowned for its extraordinary storage longevity and rich epigenetic longevity factors.',
      'Clinical studies demonstrate that these botanical stem cells protect human follicular cells from premature apoptosis. Combined with cold-plasma oxygenation and microcurrent scalp stimulation, blood circulation to dormant follicles increases by up to 140%.',
      'Within three sessions, clients experience reduced shedding, increased strand diameter, and a revitalized scalp foundation primed for robust growth.'
    ],
    category: 'Wellness',
    author: 'Helena Vane-Kensington',
    authorRole: 'Head Aesthetician & Facial Sculptor',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
    date: 'August 28, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=1000&auto=format&fit=crop',
    tags: ['Stem Cells', 'Scalp Detox', 'Hair Loss Prevention', 'Swiss Botany']
  },
  {
    id: 'art-royal-bridal-couture',
    title: 'The Art of Royal Bridal Makeover: Camera-Ready Poise',
    subtitle: 'Curating waterproof HD airbrush artistry and bespoke veil draping',
    excerpt: 'Master Bridal Artist Soraya Al-Mirza details the rigorous preparation timeline required for royal and society weddings that span 14 hours of celebration.',
    content: [
      'A luxury bride demands makeup that appears whisper-light in daylight intimate moments, yet radiates with sculptural definition under high-intensity photography and evening ballroom candelabras.',
      'Soraya begins bridal prep months in advance with gentle lymphatic sculpt sessions to ensure natural bone definition. On the wedding morning, medical-grade micro-fine airbrushing deposits micronized pigment droplets that fuse with the skin rather than sitting on top of it.',
      'This creates a velvety, sweat-resistant, tear-resistant barrier that will not oxidize, cake, or migrate throughout emotional vows or celebratory dances.',
      'From custom-designed Swarovski hairpins to handcrafted silk lash extensions calibrated to the bride’s eye curvature, every detail is orchestrated with regal poise.'
    ],
    category: 'Red Carpet',
    author: 'Soraya Al-Mirza',
    authorRole: 'Master Bridal Makeup Artist',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop',
    date: 'August 15, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000&auto=format&fit=crop',
    tags: ['Bridal', 'Airbrush Makeup', 'Wedding Glamour', 'Veil Styling']
  }
];
