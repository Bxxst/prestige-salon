import React, { useState, useEffect } from 'react';
import { Service, Stylist, Appointment } from '../types';
import { SERVICES, STYLISTS, ADD_ONS, TIME_SLOTS, SALON_INFO, getScheduleForDate } from '../data/salonData';
import { ImageWithFallback } from './ImageWithFallback';
import {
  Calendar,
  Clock,
  Scissors,
  User,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Phone,
  ArrowRight,
  ArrowLeft,
  Coffee,
  Sparkles,
  Check,
  ParkingCircle,
} from 'lucide-react';

interface BookingPageProps {
  preselectedService?: Service | null;
  preselectedStylist?: Stylist | null;
  onBookingConfirmed: (newAppointment: Appointment) => void;
  onNavigateToMyBookings: () => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({
                                                          preselectedService,
                                                          preselectedStylist,
                                                          onBookingConfirmed,
                                                          onNavigateToMyBookings,
                                                        }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Selected Service
  const [selectedService, setSelectedService] = useState<Service>(() => {
    return preselectedService || SERVICES[0]; // Balayage & Refleksy
  });

  // Category filter in Step 1
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Selected Stylist
  const [selectedStylist, setSelectedStylist] = useState<Stylist>(() => {
    return preselectedStylist || STYLISTS[0]; // Aleksandra Wiśniewska
  });

  // Date & Time (adapted to salon opening hours, Sundays closed)
  const today = new Date();
  const getUpcomingDates = () => {
    const list: Date[] = [];
    for (let i = 1; i <= 28; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      // Exclude Sundays when the salon is closed
      if (d.getDay() !== 0) {
        list.push(d);
      }
      if (list.length >= 14) break;
    }
    return list;
  };
  const dates = getUpcomingDates();
  const [selectedDate, setSelectedDate] = useState<string>(dates[0].toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState<string>(() => {
    const sched = getScheduleForDate(dates[0]);
    return sched.slots[0] || '11:00';
  });

  // Automatically adjust selectedTime if current slot is outside the newly selected day's hours
  useEffect(() => {
    const sched = getScheduleForDate(selectedDate);
    if (sched.isOpen && sched.slots.length > 0 && !sched.slots.includes(selectedTime)) {
      setSelectedTime(sched.slots[0]);
    }
  }, [selectedDate, selectedTime]);

  // Guest Details
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // Confirmed booking ticket
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService);
    }
    if (preselectedStylist) {
      setSelectedStylist(preselectedStylist);
    }
  }, [preselectedService, preselectedStylist]);

  // Categories in Step 1 matching screenshot
  const categoryFilters = [
    { id: 'all', label: 'Wszystkie usługi' },
    { id: 'color', label: 'Koloryzacja & Balayage' },
    { id: 'cut', label: 'Strzyżenie & Modelowanie' },
    { id: 'spa', label: 'Kuracje Regeneracyjne' },
  ];

  const filteredServices = SERVICES.filter((s) => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  // Calculate end time
  const calculateEndTime = (start: string, durationMin: number) => {
    const [h, m] = start.split(':').map(Number);
    const totalMinutes = h * 60 + m + durationMin;
    const endH = Math.floor(totalMinutes / 60) % 24;
    const endM = totalMinutes % 60;
    return `${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`;
  };

  const formattedDateString = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleFinishBooking = () => {
    if (!clientName.trim() || !clientPhone.trim()) {
      setFormError('Prosimy o podanie imienia i nazwiska oraz numeru telefonu.');
      return;
    }
    setFormError(null);

    setIsSubmitting(true);
    setTimeout(() => {
      const newAppt: Appointment = {
        id: `HCP-${Math.floor(1000 + Math.random() * 9000)}`,
        service: selectedService,
        stylist: selectedStylist,
        date: selectedDate,
        time: selectedTime,
        clientName,
        clientEmail: clientEmail || 'klient@prestige.pl',
        clientPhone,
        beveragePreference: 'Kawa lub herbata gratis (wybór na miejscu)',
        notes,
        addOns: [],
        totalPrice: selectedService.price,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };

      setConfirmedBooking(newAppt);
      onBookingConfirmed(newAppt);
      setIsSubmitting(false);
    }, 500);
  };

  return (
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* 1. TOP HEADER & TRUST BADGE */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
          <div className="space-y-2 max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF0FF] text-[#1D4ED8] text-xs font-semibold tracking-wide">
              <Calendar className="w-3.5 h-3.5" />
              <span>REZERWACJA WIZYTY ONLINE</span>
            </div>

            {/* Heading with italic wordmark */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#121316] tracking-tight leading-[1.15]">
              Zarezerwuj <span className="italic font-normal">wizytę</span> w Salonie Prestige
            </h1>

            {/* Subtitle */}
            <p className="text-sm text-[#54575F] leading-relaxed max-w-xl">
              Wybierz usługę dla swoich włosów i zarezerwuj dogodny termin u jednej z naszych fryzjerek w przyjaznym, kameralnym salonie.
            </p>
          </div>

          {/* Right side trust card */}
          <div className="bg-[#F5F3F0] rounded-2xl p-4 sm:px-5 sm:py-4 flex items-center justify-between gap-5 border border-[#EAE8E5] self-start lg:self-auto shadow-xs">
            <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#747686] block">
              KONSULTACJA FRYZJERSKA
            </span>
              <span className="text-sm font-semibold text-[#121316] whitespace-nowrap">
              Zawsze w cenie usługi
            </span>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center shrink-0 shadow-xs">
              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* 2. HORIZONTAL STEPPER BAR */}
        <div className="bg-[#F5F3F0] rounded-2xl p-1.5 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none border border-[#EAE8E5]">
          {/* Step 1 */}
          <button
              onClick={() => setCurrentStep(1)}
              className={`flex-1 min-w-[170px] py-2.5 px-4 rounded-xl flex items-center gap-3 transition-all text-left cursor-pointer ${
                  currentStep === 1
                      ? 'bg-white shadow-sm'
                      : 'hover:bg-white/50 text-[#747686]'
              }`}
          >
          <span
              className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                  currentStep === 1
                      ? 'bg-[#1D4ED8] text-white'
                      : currentStep > 1
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#E4E2DF] text-[#747686]'
              }`}
          >
            {currentStep > 1 ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '1'}
          </span>
            <div>
            <span
                className={`text-[10px] font-bold uppercase tracking-wider block ${
                    currentStep === 1 ? 'text-[#1D4ED8]' : 'text-[#747686]'
                }`}
            >
              KROK 1
            </span>
              <span
                  className={`text-xs font-semibold whitespace-nowrap ${
                      currentStep === 1 ? 'text-[#121316]' : 'text-[#54575F]'
                  }`}
              >
              Usługa & Pielęgnacja
            </span>
            </div>
          </button>

          {/* Step 2 */}
          <button
              onClick={() => setCurrentStep(2)}
              className={`flex-1 min-w-[170px] py-2.5 px-4 rounded-xl flex items-center gap-3 transition-all text-left cursor-pointer ${
                  currentStep === 2
                      ? 'bg-white shadow-sm'
                      : 'hover:bg-white/50 text-[#747686]'
              }`}
          >
          <span
              className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                  currentStep === 2
                      ? 'bg-[#1D4ED8] text-white'
                      : currentStep > 2
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#E4E2DF] text-[#747686]'
              }`}
          >
            {currentStep > 2 ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '2'}
          </span>
            <div>
            <span
                className={`text-[10px] font-bold uppercase tracking-wider block ${
                    currentStep === 2 ? 'text-[#1D4ED8]' : 'text-[#747686]'
                }`}
            >
              KROK 2
            </span>
              <span
                  className={`text-xs font-semibold whitespace-nowrap ${
                      currentStep === 2 ? 'text-[#121316]' : 'text-[#54575F]'
                  }`}
              >
              Wybierz Stylistkę
            </span>
            </div>
          </button>

          {/* Step 3 */}
          <button
              onClick={() => setCurrentStep(3)}
              className={`flex-1 min-w-[170px] py-2.5 px-4 rounded-xl flex items-center gap-3 transition-all text-left cursor-pointer ${
                  currentStep === 3
                      ? 'bg-white shadow-sm'
                      : 'hover:bg-white/50 text-[#747686]'
              }`}
          >
          <span
              className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                  currentStep === 3
                      ? 'bg-[#1D4ED8] text-white'
                      : currentStep > 3
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#E4E2DF] text-[#747686]'
              }`}
          >
            {currentStep > 3 ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '3'}
          </span>
            <div>
            <span
                className={`text-[10px] font-bold uppercase tracking-wider block ${
                    currentStep === 3 ? 'text-[#1D4ED8]' : 'text-[#747686]'
                }`}
            >
              KROK 3
            </span>
              <span
                  className={`text-xs font-semibold whitespace-nowrap ${
                      currentStep === 3 ? 'text-[#121316]' : 'text-[#54575F]'
                  }`}
              >
              Termin & Czas
            </span>
            </div>
          </button>

          {/* Step 4 */}
          <button
              onClick={() => setCurrentStep(4)}
              className={`flex-1 min-w-[170px] py-2.5 px-4 rounded-xl flex items-center gap-3 transition-all text-left cursor-pointer ${
                  currentStep === 4
                      ? 'bg-white shadow-sm'
                      : 'hover:bg-white/50 text-[#747686]'
              }`}
          >
          <span
              className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                  currentStep === 4
                      ? 'bg-[#1D4ED8] text-white'
                      : confirmedBooking
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#E4E2DF] text-[#747686]'
              }`}
          >
            {confirmedBooking ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '4'}
          </span>
            <div>
            <span
                className={`text-[10px] font-bold uppercase tracking-wider block ${
                    currentStep === 4 ? 'text-[#1D4ED8]' : 'text-[#747686]'
                }`}
            >
              KROK 4
            </span>
              <span
                  className={`text-xs font-semibold whitespace-nowrap ${
                      currentStep === 4 ? 'text-[#121316]' : 'text-[#54575F]'
                  }`}
              >
              Potwierdzenie
            </span>
            </div>
          </button>
        </div>

        {/* 3. MAIN WORKFLOW LAYOUT: LEFT CONTENT + RIGHT SUMMARY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: INTERACTIVE STEPS */}
          <div className="lg:col-span-8 space-y-8">
            {/* SUCCESS VIEW IF BOOKED */}
            {confirmedBooking ? (
                <div className="bg-white rounded-2xl border border-[#EAE4DC] p-8 sm:p-10 text-center space-y-6 shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <div>
                <span className="text-xs uppercase tracking-widest text-[#1D4ED8] font-bold">
                  Rezerwacja Potwierdzona · Kod: {confirmedBooking.id}
                </span>
                    <h2 className="font-serif text-3xl font-medium text-[#121316] mt-1">
                      Dziękujemy, {confirmedBooking.clientName}!
                    </h2>
                    <p className="text-sm text-[#54575F] max-w-md mx-auto mt-2">
                      Czekamy na Ciebie w <strong>Studio Fryzur Prestige</strong> przy ul. <strong>Polna 13b w Zamościu</strong>.
                    </p>
                  </div>

                  <div className="p-5 bg-[#FAF8F5] rounded-xl border border-[#EAE4DC] max-w-md mx-auto text-left space-y-3 text-xs text-[#54575F]">
                    <div className="flex justify-between pb-2 border-b border-[#EAE4DC]">
                      <span className="font-semibold text-[#121316]">Wybrana usługa:</span>
                      <span>{confirmedBooking.service.name}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-[#EAE4DC]">
                      <span className="font-semibold text-[#121316]">Stylistka:</span>
                      <span>{confirmedBooking.stylist.name}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-[#EAE4DC]">
                      <span className="font-semibold text-[#121316]">Termin:</span>
                      <span>{formattedDateString(confirmedBooking.date)} o {confirmedBooking.time}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-[#EAE4DC]">
                      <span className="font-semibold text-[#121316]">Adres salonu:</span>
                      <span>Polna 13b, Zamość</span>
                    </div>
                    <div className="flex justify-between pt-1 text-sm font-semibold text-[#121316]">
                      <span>Do zapłaty na miejscu:</span>
                      <span className="text-[#1D4ED8] font-bold">{confirmedBooking.totalPrice} PLN</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                    <button
                        onClick={onNavigateToMyBookings}
                        className="px-7 py-3 bg-[#1D4ED8] hover:bg-[#172554] text-white text-xs font-semibold rounded-full shadow-md transition-all cursor-pointer"
                    >
                      Zobacz w „Moje Wizyty”
                    </button>
                    <button
                        onClick={() => {
                          setConfirmedBooking(null);
                          setCurrentStep(1);
                        }}
                        className="px-6 py-3 bg-white border border-[#EAE4DC] hover:bg-[#F3EFEA] text-[#121316] text-xs font-semibold rounded-full transition-all cursor-pointer"
                    >
                      Zarezerwuj kolejną wizytę
                    </button>
                  </div>
                </div>
            ) : (
                <>
                  {/* STEP 1: WYBIERZ USŁUGĘ */}
                  {currentStep === 1 && (
                      <div className="space-y-6">
                        <div className="flex flex-row justify-between pb-2">
                          <div>
                            <h2 className="font-serif text-2xl font-medium text-[#121316]">
                              Krok 1: Wybierz usługę
                            </h2>
                            <p className="text-xs sm:text-sm text-[#54575F] mt-1">
                              Do każdej usługi oferujemy bezpłatną konsultację i mycie włosów.
                            </p>
                          </div>
                          {/* Next Step CTA */}
                          <div className="flex justify-end pt-4">
                            <button
                                onClick={() => setCurrentStep(2)}
                                className="px-7 py-3 bg-[#1D4ED8] hover:bg-[#172554] text-white text-xs font-semibold rounded-full shadow-md transition-all cursor-pointer flex items-center gap-2 active:scale-[0.98]"
                            >
                              <span>Dalej: Wybierz Stylistkę</span>
                              {/*<span>Dalej</span>*/}
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Filter Pills */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                          {categoryFilters.map((cat) => {
                            const isActive = activeCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`px-4 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition-all cursor-pointer ${
                                        isActive
                                            ? 'bg-[#1D4ED8] text-white shadow-sm'
                                            : 'bg-[#F3EFEA] text-[#54575F] hover:bg-[#EAE4DC] hover:text-[#121316]'
                                    }`}
                                >
                                  {cat.label}
                                </button>
                            );
                          })}
                        </div>

                        {/* Services 2x2 Grid matching screenshot */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {filteredServices.map((service) => {
                            const isSelected = selectedService.id === service.id;
                            return (
                                <div
                                    key={service.id}
                                    onClick={() => setSelectedService(service)}
                                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between bg-white relative hover:shadow-md ${
                                        isSelected
                                            ? 'border-[#1D4ED8] ring-2 ring-[#1D4ED8]/15 shadow-sm'
                                            : 'border-[#EAE4DC] hover:border-[#1D4ED8]/40'
                                    }`}
                                >
                                  <div>
                                    {/* Top row: badge & radio indicator */}
                                    <div className="flex items-center justify-between gap-2 mb-2.5">
                                      {service.badge ? (
                                          <span className="px-2.5 py-1 rounded-md bg-[#EBF0FF] text-[#1D4ED8] text-[10px] font-bold uppercase tracking-wider">
                                  {service.badge}
                                </span>
                                      ) : (
                                          <span className="px-2.5 py-1 rounded-md bg-[#F3EFEA] text-[#747686] text-[10px] font-bold uppercase tracking-wider">
                                  {service.categoryLabel}
                                </span>
                                      )}

                                      {/* Radio selection indicator */}
                                      <div
                                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                                              isSelected
                                                  ? 'border-[#1D4ED8] bg-[#1D4ED8]'
                                                  : 'border-[#D5CECE] bg-white'
                                          }`}
                                      >
                                        {isSelected && (
                                            <div className="w-2 h-2 rounded-full bg-white" />
                                        )}
                                      </div>
                                    </div>

                                    {/* Service title */}
                                    <h3 className="font-serif text-lg font-medium text-[#121316] leading-snug">
                                      {service.name}
                                    </h3>

                                    {/* Service description */}
                                    <p className="text-xs text-[#54575F] leading-relaxed mt-2 line-clamp-3">
                                      {service.description}
                                    </p>
                                  </div>

                                  {/* Bottom row: duration & price */}
                                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#F5F3F0]">
                            <span className="flex items-center gap-1.5 text-xs text-[#747686]">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{service.duration} min</span>
                            </span>
                                    <span className="font-serif font-bold text-base text-[#1D4ED8]">
                              {service.price} PLN
                            </span>
                                  </div>
                                </div>
                            );
                          })}
                        </div>

                      {/* TU WCZEŚNIEJ BYŁ PRZYCISK DALEJ */}
                        {/* Next Step CTA */}
                        {/*<div className="flex justify-end pt-4">*/}
                        {/*  <button*/}
                        {/*      onClick={() => setCurrentStep(2)}*/}
                        {/*      className="px-7 py-3 bg-[#1D4ED8] hover:bg-[#172554] text-white text-xs font-semibold rounded-full shadow-md transition-all cursor-pointer flex items-center gap-2 active:scale-[0.98]"*/}
                        {/*  >*/}
                        {/*    <span>Dalej: Wybierz Stylistkę</span>*/}
                        {/*    /!*<span>Dalej</span>*!/*/}
                        {/*    <ArrowRight className="w-4 h-4" />*/}
                        {/*  </button>*/}
                        {/*</div>*/}
                      </div>
                  )}

                  {/* STEP 2: WYBIERZ STYLISTKĘ */}
                  {currentStep === 2 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="font-serif text-2xl font-medium text-[#121316]">
                            Krok 2: Wybierz Stylistkę
                          </h2>
                          <p className="text-xs sm:text-sm text-[#54575F] mt-1">
                            Wybierz swoją ulubioną specjalistkę lub zdaj się na nasz wybór.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {STYLISTS.map((stylist) => {
                            const isSelected = selectedStylist.id === stylist.id;
                            return (
                                <div
                                    key={stylist.id}
                                    onClick={() => setSelectedStylist(stylist)}
                                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 items-center bg-white ${
                                        isSelected
                                            ? 'border-[#1D4ED8] ring-2 ring-[#1D4ED8]/15 shadow-sm'
                                            : 'border-[#EAE4DC] hover:border-[#1D4ED8]/40'
                                    }`}
                                >
                                  <div className="w-16 h-20 rounded-xl overflow-hidden shrink-0 bg-[#F3EFEA]">
                                    <ImageWithFallback
                                        src={stylist.image}
                                        alt={stylist.name}
                                        className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-[#1D4ED8]">
                              {stylist.title}
                            </span>
                                    <h4 className="font-serif text-base font-semibold text-[#121316] truncate">
                                      {stylist.name}
                                    </h4>
                                    <p className="text-xs text-[#54575F] line-clamp-1 mt-0.5">
                                      {stylist.role}
                                    </p>
                                    <p className="text-[11px] text-[#747686] mt-1">
                                      {stylist.experienceYears} lat doświadczenia
                                    </p>
                                  </div>
                                  <div
                                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                                          isSelected
                                              ? 'border-[#1D4ED8] bg-[#1D4ED8]'
                                              : 'border-[#D5CECE] bg-white'
                                      }`}
                                  >
                                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                                  </div>
                                </div>
                            );
                          })}
                        </div>

                        {/* Navigation buttons */}
                        <div className="flex items-center justify-between pt-4">
                          <button
                              onClick={() => setCurrentStep(1)}
                              className="px-6 py-2.5 bg-white border border-[#EAE4DC] text-[#121316] text-xs font-semibold rounded-full hover:bg-[#F3EFEA] transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Wróć</span>
                          </button>
                          <button
                              onClick={() => setCurrentStep(3)}
                              className="px-7 py-3 bg-[#1D4ED8] hover:bg-[#172554] text-white text-xs font-semibold rounded-full shadow-md transition-all cursor-pointer flex items-center gap-2 active:scale-[0.98]"
                          >
                            <span>Dalej: Termin & Czas</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                  )}

                  {/* STEP 3: TERMIN & CZAS */}
                  {currentStep === 3 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="font-serif text-2xl font-medium text-[#121316]">
                            Krok 3: Wybierz termin & czas
                          </h2>
                          <p className="text-xs sm:text-sm text-[#54575F] mt-1">
                            Wybierz dogodny dzień oraz godzinę rozpoczęcia rytuału.
                          </p>
                        </div>

                        {/* Horizontal Date Picker */}
                        <div>
                          <label className="text-xs font-semibold uppercase tracking-wider text-[#54575F] mb-3 block">
                            Dostępne dni w kalendarzu (poniedziałek – sobota)
                          </label>
                          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                            {dates.map((d) => {
                              const dateStr = d.toISOString().split('T')[0];
                              const isSelected = selectedDate === dateStr;
                              const dayName = d.toLocaleDateString('pl-PL', { weekday: 'short' });
                              const dayNum = d.getDate();
                              const monthName = d.toLocaleDateString('pl-PL', { month: 'short' });
                              const daySchedule = getScheduleForDate(d);

                              return (
                                  <button
                                      key={dateStr}
                                      type="button"
                                      onClick={() => setSelectedDate(dateStr)}
                                      className={`min-w-[76px] p-2.5 rounded-2xl border flex flex-col items-center transition-all cursor-pointer ${
                                          isSelected
                                              ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-sm'
                                              : 'bg-white text-[#121316] border-[#EAE4DC] hover:border-[#1D4ED8]/40'
                                      }`}
                                  >
                            <span className={`text-[11px] uppercase font-medium ${isSelected ? 'text-white/80' : 'text-[#747686]'}`}>
                              {dayName}
                            </span>
                                    <span className="text-xl font-bold font-serif my-0.5">{dayNum}</span>
                                    <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-[#747686]'}`}>
                              {monthName}
                            </span>
                                    <span className={`text-[9px] mt-1 font-semibold px-1.5 py-0.5 rounded-full ${
                                        isSelected ? 'bg-white/20 text-white' : 'bg-[#F3EFEA] text-[#54575F]'
                                    }`}>
                              {daySchedule.hours.replace(':00', '').replace(':00', '')}
                            </span>
                                  </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Time Slots Grid (adapted strictly to opening hours) */}
                        {(() => {
                          const activeSchedule = getScheduleForDate(selectedDate);
                          return (
                              <div>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3">
                                  <label className="text-xs font-semibold uppercase tracking-wider text-[#54575F] block">
                                    Dostępne godziny rozpoczęcia
                                  </label>
                                  <span className="text-[11px] text-[#1D4ED8] font-medium bg-[#EBF0FF] px-2.5 py-1 rounded-full self-start sm:self-auto flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-[#1D4ED8]" />
                            <span>Godziny otwarcia w ten dzień: <strong>{activeSchedule.hours}</strong></span>
                          </span>
                                </div>

                                {activeSchedule.isOpen && activeSchedule.slots.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                      {activeSchedule.slots.map((slot) => {
                                        const isSelected = selectedTime === slot;
                                        return (
                                            <button
                                                key={slot}
                                                type="button"
                                                onClick={() => setSelectedTime(slot)}
                                                className={`py-3 px-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                                                    isSelected
                                                        ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-sm'
                                                        : 'bg-white text-[#121316] border-[#EAE4DC] hover:border-[#1D4ED8]/40'
                                                }`}
                                            >
                                              <Clock className="w-3.5 h-3.5" />
                                              <span>{slot}</span>
                                            </button>
                                        );
                                      })}
                                    </div>
                                ) : (
                                    <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl">
                                      W wybranym dniu salon jest nieczynny. Prosimy wybrać inny termin z kalendarza.
                                    </div>
                                )}
                              </div>
                          );
                        })()}

                        {/* Summary row */}
                        <div className="p-4 bg-white rounded-xl border border-[#EAE4DC] flex items-center gap-3 text-xs text-[#54575F]">
                          <Calendar className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                          <span>
                      Termin: <strong>{formattedDateString(selectedDate)}</strong> w godzinach{' '}
                            <strong>
                        {selectedTime} – {calculateEndTime(selectedTime, selectedService.duration)}
                      </strong>{' '}
                            ({selectedService.duration} min)
                    </span>
                        </div>

                        {/* Navigation buttons */}
                        <div className="flex items-center justify-between pt-4">
                          <button
                              onClick={() => setCurrentStep(2)}
                              className="px-6 py-2.5 bg-white border border-[#EAE4DC] text-[#121316] text-xs font-semibold rounded-full hover:bg-[#F3EFEA] transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Wróć</span>
                          </button>
                          <button
                              onClick={() => setCurrentStep(4)}
                              className="px-7 py-3 bg-[#1D4ED8] hover:bg-[#172554] text-white text-xs font-semibold rounded-full shadow-md transition-all cursor-pointer flex items-center gap-2 active:scale-[0.98]"
                          >
                            <span>Dalej: Potwierdzenie</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                  )}

                  {/* STEP 4: DANE I POTWIERDZENIE */}
                  {currentStep === 4 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="font-serif text-2xl font-medium text-[#121316]">
                            Krok 4: Dane kontaktowe & Potwierdzenie
                          </h2>
                          <p className="text-xs sm:text-sm text-[#54575F] mt-1">
                            Wpisz dane do potwierdzenia rezerwacji SMS. Nie wymagamy przedpłaty.
                          </p>
                        </div>

                        <div className="bg-white rounded-2xl border border-[#EAE4DC] p-6 space-y-4">
                          {formError && (
                              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                                <span className="font-semibold">Błąd:</span>
                                <span>{formError}</span>
                              </div>
                          )}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs font-semibold text-[#121316] mb-1.5 block">
                                Imię i Nazwisko <span className="text-red-500">*</span>
                              </label>
                              <input
                                  type="text"
                                  required
                                  value={clientName}
                                  onChange={(e) => setClientName(e.target.value)}
                                  placeholder="np. Anna Nowak"
                                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#EAE4DC] rounded-xl text-sm focus:border-[#1D4ED8] focus:bg-white outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-[#121316] mb-1.5 block">
                                Numer Telefonu <span className="text-red-500">*</span>
                              </label>
                              <input
                                  type="tel"
                                  required
                                  value={clientPhone}
                                  onChange={(e) => setClientPhone(e.target.value)}
                                  placeholder="+48 600 123 456"
                                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#EAE4DC] rounded-xl text-sm focus:border-[#1D4ED8] focus:bg-white outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-xs font-semibold text-[#121316] mb-1.5 block">
                              Adres E-mail (do kalendarza)
                            </label>
                            <input
                                type="email"
                                value={clientEmail}
                                onChange={(e) => setClientEmail(e.target.value)}
                                placeholder="anna.nowak@gmail.com"
                                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#EAE4DC] rounded-xl text-sm focus:border-[#1D4ED8] focus:bg-white outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-xs font-semibold text-[#121316] mb-1.5 block">
                              Uwagi dla stylistki (opcjonalnie)
                            </label>
                            <textarea
                                rows={2}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="np. Włosy naturalne, zależy mi na chłodnym odcieniu..."
                                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#EAE4DC] rounded-xl text-sm focus:border-[#1D4ED8] focus:bg-white outline-none resize-none"
                            />
                          </div>
                        </div>

                        {/* Navigation buttons */}
                        <div className="flex items-center justify-between pt-4">
                          <button
                              onClick={() => setCurrentStep(3)}
                              className="px-6 py-2.5 bg-white border border-[#EAE4DC] text-[#121316] text-xs font-semibold rounded-full hover:bg-[#F3EFEA] transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Wróć</span>
                          </button>
                          <button
                              onClick={handleFinishBooking}
                              disabled={isSubmitting}
                              className="px-8 py-3.5 bg-[#1D4ED8] hover:bg-[#172554] text-white text-xs font-semibold rounded-full shadow-md transition-all cursor-pointer flex items-center gap-2 active:scale-[0.98] disabled:opacity-50"
                          >
                            <ShieldCheck className="w-4 h-4" />
                            <span>{isSubmitting ? 'Potwierdzanie...' : 'Potwierdź i Zarezerwuj Wizytę'}</span>
                          </button>
                        </div>
                      </div>
                  )}
                </>
            )}
          </div>

          {/* RIGHT COLUMN: STICKY SUMMARY "TWOJA WIZYTA" (EXACTLY MATCHING SCREENSHOT) */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            {/* Main Summary Card with Blue Top Accent */}
            <div className="bg-white rounded-2xl border border-[#EAE4DC] shadow-sm overflow-hidden">
              {/* Top blue bar */}
              <div className="h-1 bg-[#1D4ED8] w-full" />

              <div className="p-6 space-y-5">
                {/* Card Header */}
                <div>
                  <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D4ED8]">
                    SALON PRESTIGE
                  </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#F5F3F0] text-[#747686] text-[10px] font-medium">
                    Podsumowanie
                  </span>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-[#121316] mt-1.5">
                    Twoja Wizyta
                  </h3>
                </div>

                {/* Three Selected Tiles */}
                <div className="space-y-2.5">
                  {/* Tile 1: Wybrana usługa */}
                  <div className="bg-[#FAF8F5] border border-[#EAE4DC] rounded-xl p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#EBF0FF] text-[#1D4ED8] flex items-center justify-center shrink-0">
                      <Scissors className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#747686] block">
                      WYBRANA USŁUGA
                    </span>
                      <h4 className="text-xs font-semibold text-[#121316] truncate">
                        {selectedService.name}
                      </h4>
                      <span className="flex items-center gap-1 text-[11px] text-[#747686] mt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{selectedService.duration} min</span>
                    </span>
                    </div>
                  </div>

                  {/* Tile 2: Stylista */}
                  <div className="bg-[#FAF8F5] border border-[#EAE4DC] rounded-xl p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F0EFEA] text-[#121316] flex items-center justify-center shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#747686] block">
                      STYLISTA
                    </span>
                      <h4 className="text-xs font-semibold text-[#121316] truncate">
                        {selectedStylist.name}
                      </h4>
                      <span className="text-[11px] text-[#747686] block">
                      {selectedStylist.title}
                    </span>
                    </div>
                  </div>

                  {/* Tile 3: Wybrany termin */}
                  <div className="bg-[#FAF8F5] border border-[#EAE4DC] rounded-xl p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F0EFEA] text-[#121316] flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#747686] block">
                      WYBRANY TERMIN
                    </span>
                      <h4 className="text-xs font-semibold text-[#121316] truncate">
                        {formattedDateString(selectedDate)}
                      </h4>
                      <span className="flex items-center gap-1 text-[11px] text-[#747686] mt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{selectedTime} – {calculateEndTime(selectedTime, selectedService.duration)}</span>
                    </span>
                    </div>
                  </div>
                </div>

                {/* Location pin */}
                <div className="flex items-center gap-2 text-xs text-[#54575F] px-1">
                  <MapPin className="w-3.5 h-3.5 text-[#747686] shrink-0" />
                  <span className="truncate">{SALON_INFO.address}</span>
                </div>

                {/* Price breakdown table */}
                <div className="bg-[#FAF8F5] rounded-xl p-4 border border-[#EAE4DC] space-y-2.5 text-xs text-[#54575F]">
                  <div className="flex justify-between items-center">
                    <span>Rytuał bazowy</span>
                    <span className="font-semibold text-[#121316]">{selectedService.price} PLN</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Konsultacja stylistki</span>
                    <span className="font-semibold text-[#1D4ED8]">W cenie</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Kawa lub herbata</span>
                    <span className="font-semibold text-[#1D4ED8]">Gratis</span>
                  </div>

                  {/* Total */}
                  <div className="pt-3 border-t border-[#EAE4DC] flex justify-between items-baseline">
                    <div>
                    <span className="font-semibold text-sm text-[#121316] block leading-tight">
                      Łącznie do
                    </span>
                      <span className="font-semibold text-sm text-[#121316] block leading-tight">
                      zapłaty
                    </span>
                    </div>
                    <span className="font-serif text-3xl font-bold text-[#1D4ED8] tracking-tight">
                    {selectedService.price} PLN
                  </span>
                  </div>
                  <p className="text-[10px] text-[#747686] text-center pt-1">
                    Płatność na miejscu w salonie (karta / BLIK / gotówka)
                  </p>
                </div>

                {/* Trust markers */}
                <div className="space-y-2 pt-1 text-xs text-[#54575F]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                    <span>100% Gwarancja satysfakcji lub bezpłatna korekta</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ParkingCircle className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                    <span>Bezpłatny parking dla gości salonu</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Card: Rezerwacja telefoniczna */}
            <div className="bg-[#FAF8F5] rounded-2xl border border-[#EAE4DC] p-4 flex items-center gap-3.5 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#EBF0FF] text-[#1D4ED8] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[#121316]">
                  Rezerwacja telefoniczna
                </h4>
                <p className="text-[11px] text-[#747686]">Wolisz zadzwonić?</p>
                <a
                    href={`tel:${SALON_INFO.phone}`}
                    className="text-xs font-bold text-[#1D4ED8] hover:underline"
                >
                  {SALON_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
