import React, { useState, useEffect } from 'react';
import { Service, Stylist, Appointment } from '../types';
import { SERVICES, STYLISTS, ADD_ONS, TIME_SLOTS, BEVERAGES, getScheduleForDate } from '../data/salonData';
import { ImageWithFallback } from './ImageWithFallback';
import {
  X,
  Check,
  Calendar,
  Clock,
  Sparkles,
  User,
  Coffee,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: Service | null;
  preselectedStylist?: Stylist | null;
  onBookingConfirmed: (newAppointment: Appointment) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
                                                            isOpen,
                                                            onClose,
                                                            preselectedService,
                                                            preselectedStylist,
                                                            onBookingConfirmed,
                                                          }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedService, setSelectedService] = useState<Service>(
      preselectedService || SERVICES[0]
  );
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(
      preselectedStylist || STYLISTS[1]
  );
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Date selection: upcoming salon business days (excluding closed Sundays)
  const today = new Date();
  const getDates = () => {
    const dates: Date[] = [];
    for (let i = 1; i <= 28; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      if (d.getDay() !== 0) {
        dates.push(d);
      }
      if (dates.length >= 14) break;
    }
    return dates;
  };
  const availableDates = getDates();
  const [selectedDate, setSelectedDate] = useState<string>(
      availableDates[0].toISOString().split('T')[0]
  );
  const [selectedTime, setSelectedTime] = useState<string>(() => {
    const sched = getScheduleForDate(availableDates[0]);
    return sched.slots[0] || '11:00';
  });

  useEffect(() => {
    const sched = getScheduleForDate(selectedDate);
    if (sched.isOpen && sched.slots.length > 0 && !sched.slots.includes(selectedTime)) {
      setSelectedTime(sched.slots[0]);
    }
  }, [selectedDate, selectedTime]);

  // Client info
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [beverage, setBeverage] = useState(BEVERAGES[0]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  // Sync when props change
  useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService);
    }
    if (preselectedStylist) {
      setSelectedStylist(preselectedStylist);
    }
  }, [preselectedService, preselectedStylist]);

  if (!isOpen) return null;

  // Pricing & duration calculations
  const addOnsTotal = selectedAddOns.reduce((sum, addOnId) => {
    const item = ADD_ONS.find((a) => a.id === addOnId);
    return sum + (item ? item.price : 0);
  }, 0);

  const addOnsDuration = selectedAddOns.reduce((sum, addOnId) => {
    const item = ADD_ONS.find((a) => a.id === addOnId);
    return sum + (item ? item.duration : 0);
  }, 0);

  const totalPrice = selectedService.price + addOnsTotal;
  const totalDuration = selectedService.duration + addOnsDuration;

  const toggleAddOn = (id: string) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter((item) => item !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  const handleConfirm = () => {
    if (!clientName || !clientPhone) {
      alert('Prosimy podać imię i numer telefonu.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const assignedStylist = selectedStylist || STYLISTS[0];
      const newAppt: Appointment = {
        id: `HCP-${Math.floor(1000 + Math.random() * 9000)}`,
        service: selectedService,
        stylist: assignedStylist,
        date: selectedDate,
        time: selectedTime,
        clientName,
        clientEmail: clientEmail || 'kontakt@gosc.pl',
        clientPhone,
        beveragePreference: beverage,
        notes,
        addOns: selectedAddOns.map((id) => ADD_ONS.find((a) => a.id === id)?.name || id),
        totalPrice,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };

      setConfirmedBooking(newAppt);
      onBookingConfirmed(newAppt);
      setIsSubmitting(false);
      setStep(5);
    }, 600);
  };

  const resetAndClose = () => {
    setStep(1);
    setConfirmedBooking(null);
    onClose();
  };

  const formatDateDisplay = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pl-PL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
        <div className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#EAE4DC] overflow-hidden flex flex-col max-h-[92vh]">
          {/* Modal Header */}
          <div className="px-6 py-4 bg-white border-b border-[#EAE4DC] flex items-center justify-between">
            <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#1D4ED8]">
              {step === 5 ? 'Rezerwacja Potwierdzona' : `Krok ${step} z 4 · Rezerwacja Wizyty`}
            </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#121316] font-medium">
                {step === 1 && 'Wybierz Usługę i Pielęgnację'}
                {step === 2 && 'Wybierz Mistrza Stylizacji'}
                {step === 3 && 'Termin & Czas Wizyty'}
                {step === 4 && 'Dane Klienta & Preferencje'}
                {step === 5 && 'Twoja Wizyta Jest Zarezerwowana'}
              </h3>
            </div>
            <button
                onClick={resetAndClose}
                className="p-2 text-[#54575F] hover:text-[#121316] hover:bg-[#F3EFEA] rounded-full transition-colors cursor-pointer"
                aria-label="Zamknij"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto flex-1">
            {/* STEP 1: SERVICE SELECTION */}
            {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#54575F] mb-3 block">
                      Podstawowa usługa
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[280px] overflow-y-auto pr-1">
                      {SERVICES.map((s) => {
                        const isSelected = selectedService.id === s.id;
                        return (
                            <div
                                key={s.id}
                                onClick={() => setSelectedService(s)}
                                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                                    isSelected
                                        ? 'border-[#1D4ED8] bg-white ring-2 ring-[#1D4ED8]/20 shadow-sm'
                                        : 'border-[#EAE4DC] bg-white hover:border-[#1D4ED8]/40'
                                }`}
                            >
                              <div>
                                <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-[11px] uppercase tracking-wider text-[#1D4ED8] font-semibold">
                              {s.categoryLabel}
                            </span>
                                  <span className="font-semibold text-sm text-[#121316]">
                              {s.price} zł
                            </span>
                                </div>
                                <h4 className="font-serif text-base font-medium text-[#121316] leading-tight">
                                  {s.name}
                                </h4>
                                <p className="text-xs text-[#54575F] mt-1 line-clamp-2">
                                  {s.description}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-[#747686] mt-3 pt-2 border-t border-[#F3EFEA]">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{s.duration} min</span>
                              </div>
                            </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Add-ons */}
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#54575F] mb-3 block">
                      Rytuały uzupełniające (opcjonalnie)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {ADD_ONS.map((addOn) => {
                        const isChecked = selectedAddOns.includes(addOn.id);
                        return (
                            <div
                                key={addOn.id}
                                onClick={() => toggleAddOn(addOn.id)}
                                className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                                    isChecked
                                        ? 'border-[#1D4ED8] bg-[#1D4ED8]/5'
                                        : 'border-[#EAE4DC] bg-white hover:border-[#1D4ED8]/30'
                                }`}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                    className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                        isChecked
                                            ? 'bg-[#1D4ED8] border-[#1D4ED8] text-white'
                                            : 'border-[#C4C5D7] bg-white'
                                    }`}
                                >
                                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-[#121316]">{addOn.name}</p>
                                  <p className="text-[11px] text-[#747686]">+{addOn.duration} min</p>
                                </div>
                              </div>
                              <span className="text-xs font-semibold text-[#121316] whitespace-nowrap">
                          +{addOn.price} zł
                        </span>
                            </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
            )}

            {/* STEP 2: STYLIST SELECTION */}
            {step === 2 && (
                <div className="space-y-4">
                  <p className="text-xs text-[#54575F]">
                    Wszyscy nasi styliści posiadają międzynarodowe certyfikacje akademii Vidal Sassoon oraz L&apos;Oréal Paris.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {STYLISTS.map((stylist) => {
                      const isSelected = selectedStylist?.id === stylist.id;
                      return (
                          <div
                              key={stylist.id}
                              onClick={() => setSelectedStylist(stylist)}
                              className={`p-4 rounded-xl border bg-white transition-all cursor-pointer flex gap-4 items-center ${
                                  isSelected
                                      ? 'border-[#1D4ED8] ring-2 ring-[#1D4ED8]/20 shadow-sm'
                                      : 'border-[#EAE4DC] hover:border-[#1D4ED8]/40'
                              }`}
                          >
                            <div className="w-16 h-20 rounded-lg overflow-hidden shrink-0">
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
                              <h4 className="font-serif text-base font-medium text-[#121316] truncate">
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
                                        ? 'bg-[#1D4ED8] border-[#1D4ED8] text-white'
                                        : 'border-[#C4C5D7]'
                                }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                          </div>
                      );
                    })}
                  </div>

                  {/* Any available option */}
                  <div
                      onClick={() => setSelectedStylist(null)}
                      className={`p-3.5 rounded-xl border bg-white transition-all cursor-pointer flex items-center justify-between ${
                          selectedStylist === null
                              ? 'border-[#1D4ED8] ring-2 ring-[#1D4ED8]/20 shadow-sm'
                              : 'border-[#EAE4DC] hover:border-[#1D4ED8]/40'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-[#1D4ED8]" />
                      <div>
                        <h5 className="text-sm font-semibold text-[#121316]">
                          Najszybszy dostępny mistrz
                        </h5>
                        <p className="text-xs text-[#54575F]">
                          Salon dobierze stylistę najlepiej odpowiadającego wybranej usłudze
                        </p>
                      </div>
                    </div>
                    <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                            selectedStylist === null
                                ? 'bg-[#1D4ED8] border-[#1D4ED8] text-white'
                                : 'border-[#C4C5D7]'
                        }`}
                    >
                      {selectedStylist === null && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>
            )}

            {/* STEP 3: DATE & TIME SELECTION */}
            {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#54575F] mb-3 block">
                      Wybierz dzień wizyty
                    </label>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                      {availableDates.map((dateObj) => {
                        const dateStr = dateObj.toISOString().split('T')[0];
                        const isSelected = selectedDate === dateStr;
                        const dayName = dateObj.toLocaleDateString('pl-PL', { weekday: 'short' });
                        const dayNum = dateObj.getDate();
                        const monthName = dateObj.toLocaleDateString('pl-PL', { month: 'short' });

                        return (
                            <button
                                key={dateStr}
                                onClick={() => setSelectedDate(dateStr)}
                                className={`min-w-[70px] p-2.5 rounded-xl border flex flex-col items-center transition-all cursor-pointer ${
                                    isSelected
                                        ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-sm'
                                        : 'bg-white text-[#121316] border-[#EAE4DC] hover:border-[#1D4ED8]/40'
                                }`}
                            >
                        <span className={`text-[11px] uppercase ${isSelected ? 'text-white/80' : 'text-[#747686]'}`}>
                          {dayName}
                        </span>
                              <span className="text-lg font-bold font-serif my-0.5">{dayNum}</span>
                              <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-[#747686]'}`}>
                          {monthName}
                        </span>
                            </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    {(() => {
                      const schedule = getScheduleForDate(selectedDate);
                      return (
                          <>
                            <div className="flex items-center justify-between mb-3">
                              <label className="text-xs font-semibold uppercase tracking-wider text-[#54575F] block">
                                Dostępne godziny rozpoczęcia
                              </label>
                              <span className="text-[11px] text-[#1D4ED8] font-medium bg-[#EBF0FF] px-2 py-0.5 rounded-full">
                          Godziny otwarcia: {schedule.hours}
                        </span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                              {schedule.slots.map((slot) => {
                                const isSelected = selectedTime === slot;
                                return (
                                    <button
                                        key={slot}
                                        type="button"
                                        onClick={() => setSelectedTime(slot)}
                                        className={`py-2.5 px-3 rounded-lg border text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
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
                          </>
                      );
                    })()}
                  </div>

                  <div className="p-3.5 bg-[#F3EFEA] rounded-xl border border-[#EAE4DC] flex items-center gap-3 text-xs text-[#54575F]">
                    <Calendar className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                    <span>
                  Wybrany termin: <strong>{formatDateDisplay(selectedDate)}</strong> o godz.{' '}
                      <strong>{selectedTime}</strong> (Czas trwania: ok. {totalDuration} min)
                </span>
                  </div>
                </div>
            )}

            {/* STEP 4: GUEST DETAILS */}
            {step === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#121316] mb-1.5 block">
                        Imię i Nazwisko <span className="text-[#BA1A1A]">*</span>
                      </label>
                      <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="np. Anna Kowalska"
                          className="w-full px-3.5 py-2.5 bg-white border border-[#EAE4DC] rounded-xl text-sm focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/10 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#121316] mb-1.5 block">
                        Numer Telefonu <span className="text-[#BA1A1A]">*</span>
                      </label>
                      <input
                          type="tel"
                          required
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          placeholder="+48 600 000 000"
                          className="w-full px-3.5 py-2.5 bg-white border border-[#EAE4DC] rounded-xl text-sm focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/10 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#121316] mb-1.5 block">
                      Adres E-mail (do potwierdzenia)
                    </label>
                    <input
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="anna.kowalska@example.com"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#EAE4DC] rounded-xl text-sm focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/10 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#121316] mb-1.5 block">
                      Powitalny napój w Salonie (w cenie wizyty)
                    </label>
                    <div className="relative">
                      <select
                          value={beverage}
                          onChange={(e) => setBeverage(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#EAE4DC] rounded-xl text-sm focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/10 outline-none cursor-pointer appearance-none"
                      >
                        {BEVERAGES.map((bev) => (
                            <option key={bev} value={bev}>
                              {bev}
                            </option>
                        ))}
                      </select>
                      <Coffee className="w-4 h-4 text-[#747686] absolute right-3.5 top-3 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#121316] mb-1.5 block">
                      Uwagi do stylisty / historia włosów (opcjonalnie)
                    </label>
                    <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="np. Ostatnie rozjaśnianie 4 miesiące temu, skóra głowy wrażliwa..."
                        className="w-full px-3.5 py-2 bg-white border border-[#EAE4DC] rounded-xl text-sm focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/10 outline-none resize-none"
                    />
                  </div>

                  {/* Order Summary box */}
                  <div className="p-4 bg-white rounded-xl border border-[#EAE4DC] space-y-2 mt-2">
                    <div className="flex justify-between text-xs text-[#54575F]">
                      <span>Usługa: {selectedService.name}</span>
                      <span className="font-semibold text-[#121316]">{selectedService.price} zł</span>
                    </div>
                    {selectedAddOns.map((id) => {
                      const addOn = ADD_ONS.find((a) => a.id === id);
                      if (!addOn) return null;
                      return (
                          <div key={id} className="flex justify-between text-xs text-[#54575F]">
                            <span>+ {addOn.name}</span>
                            <span className="font-semibold text-[#121316]">+{addOn.price} zł</span>
                          </div>
                      );
                    })}
                    <div className="pt-2 border-t border-[#F3EFEA] flex justify-between items-center text-sm">
                      <span className="font-semibold text-[#121316]">Łącznie do zapłaty w salonie:</span>
                      <span className="font-serif text-lg font-bold text-[#1D4ED8]">{totalPrice} zł</span>
                    </div>
                  </div>
                </div>
            )}

            {/* STEP 5: CONFIRMATION SUCCESS */}
            {step === 5 && confirmedBooking && (
                <div className="py-6 text-center space-y-5">
                  <div className="w-16 h-16 bg-[#1D4ED8]/10 text-[#1D4ED8] rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <div>
                <span className="text-xs uppercase tracking-widest text-[#1D4ED8] font-bold">
                  Numer Rezerwacji: {confirmedBooking.id}
                </span>
                    <h3 className="font-serif text-2xl text-[#121316] font-semibold mt-1">
                      Dziękujemy, {confirmedBooking.clientName}!
                    </h3>
                    <p className="text-sm text-[#54575F] max-w-md mx-auto mt-2">
                      Twoja wizyta w Studio Fryzur Prestige (ul. Polna 13b, Zamość) została zarezerwowana. Potwierdzenie SMS zostało wysłane.
                    </p>
                  </div>

                  <div className="p-5 bg-white rounded-xl border border-[#EAE4DC] max-w-md mx-auto text-left space-y-2.5 text-xs text-[#54575F]">
                    <div className="flex justify-between pb-2 border-b border-[#F3EFEA]">
                      <span className="font-semibold text-[#121316]">Lokalizacja:</span>
                      <span className="font-medium text-[#121316]">Polna 13b, Zamość</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-[#F3EFEA]">
                      <span className="font-semibold text-[#121316]">Termin:</span>
                      <span>{formatDateDisplay(confirmedBooking.date)} o {confirmedBooking.time}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-[#F3EFEA]">
                      <span className="font-semibold text-[#121316]">Stylista:</span>
                      <span>{confirmedBooking.stylist.name} ({confirmedBooking.stylist.title})</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-[#F3EFEA]">
                      <span className="font-semibold text-[#121316]">Usługa:</span>
                      <span>{confirmedBooking.service.name}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-[#F3EFEA]">
                      <span className="font-semibold text-[#121316]">Napój powitalny:</span>
                      <span>{confirmedBooking.beveragePreference}</span>
                    </div>
                    <div className="flex justify-between pt-1 text-sm font-semibold text-[#121316]">
                      <span>Kwota do zapłaty:</span>
                      <span className="text-[#1D4ED8]">{confirmedBooking.totalPrice} zł</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <button
                        onClick={resetAndClose}
                        className="px-6 py-2.5 bg-[#121316] text-white text-xs font-semibold rounded-full hover:bg-[#1E2024] transition-colors cursor-pointer"
                    >
                      Zamknij okno
                    </button>
                  </div>
                </div>
            )}
          </div>

          {/* Modal Footer Controls */}
          {step < 5 && (
              <div className="px-6 py-4 bg-white border-t border-[#EAE4DC] flex items-center justify-between">
                {step > 1 ? (
                    <button
                        onClick={() => setStep((step - 1) as any)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#EAE4DC] rounded-full text-xs font-semibold text-[#121316] hover:bg-[#F3EFEA] transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Wstecz</span>
                    </button>
                ) : (
                    <div />
                )}

                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <span className="text-[11px] text-[#747686] block">Suma:</span>
                    <span className="font-serif text-sm font-bold text-[#121316]">
                  {totalPrice} zł ({totalDuration} min)
                </span>
                  </div>

                  {step < 4 ? (
                      <button
                          onClick={() => setStep((step + 1) as any)}
                          className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-[#1D4ED8] hover:bg-[#172554] text-white rounded-full text-xs font-semibold transition-all cursor-pointer active:scale-[0.98]"
                      >
                        <span>Dalej</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                  ) : (
                      <button
                          onClick={handleConfirm}
                          disabled={isSubmitting}
                          className="inline-flex items-center gap-1.5 px-7 py-2.5 bg-[#1D4ED8] hover:bg-[#172554] text-white rounded-full text-xs font-semibold transition-all cursor-pointer active:scale-[0.98] disabled:opacity-50"
                      >
                        {isSubmitting ? (
                            <span>Rezerwowanie...</span>
                        ) : (
                            <>
                              <ShieldCheck className="w-4 h-4" />
                              <span>Potwierdź Rezerwację</span>
                            </>
                        )}
                      </button>
                  )}
                </div>
              </div>
          )}
        </div>
      </div>
  );
};
