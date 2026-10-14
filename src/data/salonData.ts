import { Service, Stylist, LookbookItem, Appointment } from '../types';

export const SALON_INFO = {
  name: 'Salon Fryzur Prestige',
  tagline: 'Profesjonalny Salon Fryzjerski i Pielęgnacja Włosa',
  address: 'Polna 13b, Zamość',
  phone: '+48 696 345 877',
  email: 'marcin6114@onet.eu',
  scheduleDetails: [
    { day: 'Poniedziałek', hours: '11:00 – 16:00' },
    { day: 'Wtorek', hours: '12:00 – 20:00' },
    { day: 'Środa – Piątek', hours: '09:00 – 17:00' },
    { day: 'Sobota', hours: '09:00 – 14:00' },
    { day: 'Niedziela', hours: 'Nieczynne' },
  ],
  instagram: '@salon_fryzur_prestige',
  instagram_link: 'https://www.instagram.com/salon_fryzur_prestige',
  facebook: 'Salon Fryzur Prestige',
  facebook_link: 'https://www.facebook.com/prestigezamosc',
};

export const SERVICES: Service[] = [
  {
    id: 'balayage-refleksy',
    name: 'Balayage & Refleksy',
    category: 'color',
    categoryLabel: 'Koloryzacja & Balayage',
    badge: 'BESTSELLER',
    duration: 220,
    price: 300,
    description: 'Precyzyjna technika wielotonowej koloryzacji z wolnej ręki, tonowaniem z ceramidami i maską regenerującą kawiorem.',
    ritualHighlights: ['Tonowanie Gloss bez amoniaku', 'Masaż głowy', 'Modelowanie Red Carpet'],
    recommendedFor: 'Włosy wymagające naturalnego rozświetlenia i głębi bez widocznego odrostu.',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 'strzyzenie-damskie',
    name: 'Strzyżenie damskie & modelowanie',
    category: 'cut',
    categoryLabel: 'Strzyżenie & Modelowanie',
    badge: 'POPULARNE CIĘCIE',
    duration: 75,
    price: 120,
    description: 'Geometria formy dobrana do owalu twarzy, relaksacyjny masaż skóry głowy z aromaterapią i modelowanie redakcyjne.',
    ritualHighlights: ['Konsultacja kształtu twarzy i profilu', 'Peeling enzymatyczny skóry głowy', 'Maska odżywcza z kaszmirem', 'Stylizacja Parisian Wave'],
    recommendedFor: 'Każda długość włosów poszukująca lekkości, dynamiki i elegancji.',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 'strzyzenie-meskie',
    name: 'Strzyżenie męskie',
    category: 'cut',
    categoryLabel: 'Strzyżenie i Modelowanie',
    badge: 'POPULARNE CIĘCIE',
    duration: 40,
    price: 40,
    description: 'Oferujemy strzyżenia męskie dla panów pragnących niewymagających fryzur, które idealnie układają się nawet rano.',
    ritualHighlights: ['Diagnoza mikrokamerą trichoskopową', 'Plex Molecular Bond Protector', 'Rytuał Oribe Gold Lust', 'Cięcie personalizowane końcówek'],
    recommendedFor: 'Klientów poszukujących krótkiej, niewymagającej fryzury.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 'regeneracja-odzywienie',
    name: 'Regeneracja i odżywienie włosów',
    category: 'spa',
    categoryLabel: 'Kuracje Regeneracyjne',
    badge: 'GŁĘBOKA REGENERACJA',
    duration: 90,
    price: 200,
    description: 'Głęboka odbudowa mostków dwusiarczkowych z japońskim kompleksem fulleronu i infuzją termiczną pod sauną ozonową.',
    ritualHighlights: ['Masaż limfatyczny karku i skroni', 'Ampułka bio-kolagenowa', 'Zimna infuzja domykająca łuski'],
    recommendedFor: 'Włosy uwrażliwione, zmęczone stylizacją termiczną i suche.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 'bridal-couture-styling',
    name: 'Stylizacja Ślubna & Red Carpet Couture',
    category: 'styling',
    categoryLabel: 'Stylizacja & Bridal',
    duration: 90,
    price: 450,
    description: 'Dedykowana kreacja fryzury ślubnej lub wieczorowej w prywatnym apartamencie VIP. Utrwalenie odporne na wilgoć z zachowaniem naturalnej lekkości.',
    ritualHighlights: ['Mocowanie ozdób i welonu', 'Utrwalenie z mikrodrobinkami jedwabiu'],
    recommendedFor: 'Wyjątkowe okazje, gale, śluby i sesje zdjęciowe.',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80',
  },
];

export const STYLISTS: Stylist[] = [
  {
    id: 'agnieszka-koziol',
    name: 'Agnieszka Kozioł',
    role: 'Mistrzyni Koloryzacji & Cięcia',
    title: 'Mistrzyni Koloryzacji & Cięcia',
    experienceYears: 20,
    specialties: ['Balayage & Refleksy', 'AirTouch Sombre', 'Architektoniczne cięcia'],
    quote: 'Włosy to Twoja codzienna wizytówka. Zadbaj o nie i codziennie prezentuj się w stylowej formie.',
    image: 'https://placehold.co/600x400',
    availableDays: ['Poniedziałek','Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
    education: 'placeholder',
  },
  {
    id: 'temp1',
    name: 'test',
    role: 'test',
    title: 'test',
    experienceYears: 16,
    specialties: ['Architektoniczne cięcia', 'Metamorfozy Haute Couture', 'Editorial Styling'],
    quote: 'Włosy są jak rzeźba w ruchu. Dobra forma nie potrzebuje wysiłku, lecz doskonałej kompozycji.',
    image: 'https://placehold.co/600x400',
    availableDays: ['Czwartek', 'Piątek', 'Sobota'],
    education: 'test',
  },
  {
    id: 'temp2',
    name: 'test',
    role: 'test',
    title: 'test',
    experienceYears: 11,
    specialties: ['AirTouch Technika', 'Chłodne i kremowe blondy', 'Korekta trudnych kolorów'],
    quote: 'Luksusowy blond to nie kwestia przypadku, lecz precyzyjnej chemii i delikatności dotyku.',
    image: 'https://placehold.co/600x400',
    availableDays: ['Poniedziałek', 'Wtorek', 'Czwartek', 'Piątek'],
    education: 'test',
  },
];

export const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: 'look-1',
    title: 'Champagne Beige Balayage',
    category: 'balayage',
    categoryLabel: 'Balayage & Blond',
    stylistName: 'Agnieszka Kozioł',
    stylistId: 'agnieszka-koziol',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    description: 'Jedwabiście miękkie przejście z naturalnej nasady w świetlisty odcień szampana i wanilii.',
    technique: 'Francuski Balayage z wolnej ręki + Gloss Tonowanie',
    duration: '3h 30 min',
    serviceIdRef: 'balayage-couture',
  },
  {
    id: 'look-3',
    title: 'Parisian Textured French Bob',
    category: 'bobs',
    categoryLabel: 'Architektura & Bobs',
    stylistName: 'Agnieszka Kozioł',
    stylistId: 'agnieszka-koziol',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'Geometryczne cięcie z organicznym cieniowaniem końców, podkreślające linię kości policzkowych.',
    technique: 'Dry Cut Scissors Sculpting',
    duration: '1h 15 min',
    serviceIdRef: 'strzyzenie-architektoniczne',
  },
  {
    id: 'look-4',
    title: 'AirTouch Platinum Silk Wave',
    category: 'balayage',
    categoryLabel: 'Balayage & Blond',
    stylistName: 'test',
    stylistId: 'test',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    description: 'Krystaliczny, chłodny blond uzyskany technologią przedmuchiwania powietrzem bez uszczerbku dla kondycji.',
    technique: 'AirTouch Original + Molecular Bond Rebuild',
    duration: '4h 00 min',
    serviceIdRef: 'airtouch-prestige',
  },
  {
    id: 'look-5',
    title: 'Romantic Ethereal Bridal Chignon',
    category: 'bridal',
    categoryLabel: 'Updo & Bridal',
    stylistName: 'test',
    stylistId: 'test',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80',
    description: 'Nowoczesne, zmysłowe upięcie ślubne z luźnymi pasmami otulającymi skronie i szyję.',
    technique: 'Couture Hand-Pinning & Silk Mist Hold',
    duration: '1h 30 min',
    serviceIdRef: 'bridal-couture-styling',
  },
  {
    id: 'look-6',
    title: 'Metamorfoza: Z Żółtego Blondu w Nordycki Krem',
    category: 'transformation',
    categoryLabel: 'Metamorfozy Przed / Po',
    stylistName: 'test',
    stylistId: 'test',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80',
    description: 'Usunięcie niechcianych odcieni z poprzednich salonów i stworzenie luksusowego, miękkiego beżu.',
    technique: 'Color Correction + Kérastase Fusio-Dose',
    duration: '4h 30 min',
    serviceIdRef: 'airtouch-prestige',
  },
];

export const ADD_ONS = [
  { id: 'shiatsu-massage', name: 'Dłuższy Masaż Głowy (15 min)', price: 80, duration: 15 },
  { id: 'peeling-enzymatyczny', name: 'Oczyszczający Peeling Kwasowy Skóry Głowy', price: 110, duration: 20 },
  { id: 'toning-refresh', name: 'Ekspresowe Tonowanie Pigmentem Diamentowym', price: 160, duration: 30 },
];

export interface DaySchedule {
  isOpen: boolean;
  hours: string;
  slots: string[];
}

// Godziny otwarcia:
// Poniedziałek: 11:00 – 16:00
// Wtorek: 12:00 – 20:00
// Środa – Piątek: 09:00 – 17:00
// Sobota: 09:00 – 14:00
// Niedziela: Nieczynne
export const SALON_SCHEDULE: Record<number, DaySchedule> = {
  0: {
    isOpen: false,
    hours: 'Nieczynne',
    slots: [],
  },
  1: {
    isOpen: true,
    hours: '11:00 – 16:00',
    slots: ['11:00', '11:45', '12:30', '13:15', '14:00', '14:45', '15:15'],
  },
  2: {
    isOpen: true,
    hours: '12:00 – 20:00',
    slots: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '18:45'],
  },
  3: {
    isOpen: true,
    hours: '09:00 – 17:00',
    slots: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
  },
  4: {
    isOpen: true,
    hours: '09:00 – 17:00',
    slots: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
  },
  5: {
    isOpen: true,
    hours: '09:00 – 17:00',
    slots: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
  },
  6: {
    isOpen: true,
    hours: '09:00 – 14:00',
    slots: ['09:00', '09:45', '10:30', '11:15', '12:00', '12:45', '13:15'],
  },
};

export const getScheduleForDate = (date: Date | string): DaySchedule => {
  const d = typeof date === 'string' ? new Date(`${date}T12:00:00`) : date;
  const dayOfWeek = d.getDay();
  return SALON_SCHEDULE[dayOfWeek] || { isOpen: false, hours: 'Nieczynne', slots: [] };
};

export const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '18:45',
];


export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'HCP-7819',
    service: SERVICES[0],
    stylist: STYLISTS[1],
    date: '2026-10-14',
    time: '11:45',
    clientName: 'Magdalena Czajkowska',
    clientEmail: 'm.czajkowska@atelier.pl',
    clientPhone: '+48 602 112 334',
    beveragePreference: 'Francuski Szampan Moët & Chandon',
    addOns: ['Rytuał Kérastase Fusio-Dose Booster'],
    totalPrice: 770,
    status: 'confirmed',
    createdAt: '2026-10-06T14:20:00Z',
  },
];
