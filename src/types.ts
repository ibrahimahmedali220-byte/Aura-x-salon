export type ServiceCategory = 'hair' | 'skin' | 'bridal' | 'spa';

export interface SalonService {
  id: string;
  category: ServiceCategory;
  name: string;
  tagline: string;
  description: string;
  duration: string;
  price: number;
  featured?: boolean;
  image: string;
  inclusions: string[];
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  image: string;
  bio: string;
  awards: string[];
  instagram: string;
}

export interface VIPPackage {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  duration: string;
  popular?: boolean;
  image: string;
  highlights: string[];
  description: string;
}

export interface MembershipTier {
  id: string;
  name: string;
  subtitle: string;
  annualFee: number;
  badge: string;
  themeColor: string;
  cardGradient: string;
  privileges: string[];
  exclusiveBonus: string;
}

export interface ApothecaryProduct {
  id: string;
  name: string;
  subheading: string;
  category: string;
  price: number;
  volume: string;
  image: string;
  description: string;
  keyIngredients: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  roleOrCity: string;
  service: string;
  rating: number;
  comment: string;
  avatar: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'hair' | 'bridal' | 'skin' | 'interior';
  image: string;
  description: string;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  treatment: string;
  stylist: string;
}

export interface BookingFormData {
  serviceId: string;
  stylistId: string;
  date: string;
  timeSlot: string;
  fullName: string;
  email: string;
  phone: string;
  notes: string;
  vipBeveragePreference?: string;
}

export interface PastTreatmentRecord {
  id: string;
  serviceId: string;
  serviceName: string;
  stylistId: string;
  stylistName: string;
  date: string;
  price: number;
  notes?: string;
  formulaNote?: string;
  vipBeverage?: string;
}

export interface BeautyArchiveProfile {
  fullName: string;
  email: string;
  phone: string;
  preferredStylistId: string;
  preferredStylistName: string;
  hairOrSkinNotes: string;
  preferredBeverage: string;
  preferredSoundscape: string;
  favoriteServiceIds: string[];
  treatmentHistory: PastTreatmentRecord[];
  updatedAt: string;
}

export interface WaitlistTicket {
  ticketNumber: string;
  fullName: string;
  phone: string;
  serviceId: string;
  serviceName: string;
  preferredTimeWindow: string;
  partySize: number;
  position: number;
  estimatedWaitMinutes: number;
  status: 'waiting' | 'called' | 'served' | 'cancelled';
  joinedAt: string;
}

export interface SuiteStatus {
  id: number;
  name: string;
  status: 'occupied' | 'available' | 'sanitizing';
  currentRitual?: string;
  stylistName?: string;
  availableInMins?: number;
}

export interface BlogArticle {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string[];
  category: 'Hair Artistry' | 'Skin Science' | 'Red Carpet' | 'Wellness';
  author: string;
  authorRole: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}
