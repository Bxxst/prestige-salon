export type ActiveTab = 'atelier' | 'booking' | 'services' | 'lookbook' | 'stylists' | 'my-bookings';

export interface Service {
  id: string;
  name: string;
  category: 'color' | 'cut' | 'spa' | 'scalp' | 'styling';
  categoryLabel: string;
  badge?: string;
  duration: number; // in minutes
  price: number; // in PLN
  description: string;
  ritualHighlights: string[];
  recommendedFor: string;
  image: string;
  featured?: boolean;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  title: string;
  experienceYears: number;
  specialties: string[];
  quote: string;
  image: string;
  availableDays: string[];
  education: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  category: 'balayage' | 'brunette' | 'bobs' | 'bridal' | 'transformation';
  categoryLabel: string;
  stylistName: string;
  stylistId: string;
  image: string;
  beforeImage?: string;
  description: string;
  technique: string;
  duration: string;
  serviceIdRef: string;
}

export interface Appointment {
  id: string;
  service: Service;
  stylist: Stylist;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  beveragePreference: string;
  notes?: string;
  addOns: string[];
  totalPrice: number;
  status: 'confirmed' | 'rescheduled' | 'cancelled';
  createdAt: string;
}

export interface DiagnosisAnswer {
  hairType?: string;
  condition?: string;
  desiredGoal?: string;
  lastVisit?: string;
}
