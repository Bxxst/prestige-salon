import React, { useState } from 'react';
import { Appointment } from '../types';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { motion } from 'motion/react';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  User,
  Coffee,
  XCircle,
  QrCode,
  Award,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface MyAppointmentsViewProps {
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  onOpenBooking: () => void;
}

export const MyAppointmentsView: React.FC<MyAppointmentsViewProps> = ({
  appointments,
  onCancelAppointment,
  onOpenBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'privilege'>('upcoming');

  const formatDateDisplay = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pl-PL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <ScrollReveal direction="up">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#EAE4DC]">
          <div className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1D4ED8]">
              Panel Klienta VIP
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#121316] leading-tight">
              Moje Wizyty
            </h1>
            <p className="text-sm text-[#54575F]">
              Zarządzaj swoimi wizytami w Atelier i korzystaj z przywilejów programu Haute Prestige.
            </p>
          </div>

          {/* Tab switch */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F3EFEA] rounded-full self-start md:self-auto">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-5 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                activeTab === 'upcoming'
                  ? 'bg-white text-[#121316] shadow-sm'
                  : 'text-[#54575F] hover:text-[#121316]'
              }`}
            >
              Zaplanowane Wizyty ({appointments.length})
            </button>
            {/*<button*/}
            {/*  onClick={() => setActiveTab('privilege')}*/}
            {/*  className={`px-5 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${*/}
            {/*    activeTab === 'privilege'*/}
            {/*      ? 'bg-white text-[#121316] shadow-sm'*/}
            {/*      : 'text-[#54575F] hover:text-[#121316]'*/}
            {/*  }`}*/}
            {/*>*/}
            {/*  Karta HCP Privilege*/}
            {/*</button>*/}
          </div>
        </div>
      </ScrollReveal>

      {activeTab === 'upcoming' && (
        <div className="space-y-6">
          {appointments.length === 0 ? (
            <div className="py-20 text-center space-y-4 bg-white rounded-2xl border border-[#EAE4DC] max-w-2xl mx-auto p-8">
              <div className="w-16 h-16 bg-[#FAF8F5] rounded-full flex items-center justify-center mx-auto text-[#1D4ED8]">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-[#121316]">
                Brak zaplanowanych wizyt
              </h3>
              <p className="text-sm text-[#54575F] max-w-md mx-auto">
                Nie masz obecnie aktywnych rezerwacji w kalendarzu. Wybierz zabieg i dołącz do grona gości naszego salonu.
              </p>
              <button
                onClick={onOpenBooking}
                className="mt-2 px-8 py-3 bg-[#1D4ED8] hover:bg-[#172554] text-white text-xs font-semibold rounded-full shadow-md transition-all cursor-pointer"
              >
                Zarezerwuj pierwszą wizytę
              </button>
            </div>
          ) : (
            <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {appointments.map((appt) => {
                const isCancelled = appt.status === 'cancelled';

                return (
                  <StaggerItem key={appt.id}>
                    <div
                      className={`bg-white rounded-2xl border p-6 sm:p-7 space-y-6 transition-all h-full ${
                        isCancelled
                          ? 'border-[#EAE4DC] opacity-60 bg-[#FAF8F5]'
                          : 'border-[#EAE4DC] hover:border-[#1D4ED8]/40 shadow-sm hover:-translate-y-1'
                      }`}
                    >
                      {/* Header info */}
                      <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#F3EFEA]">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1D4ED8]">
                              ID: {appt.id}
                            </span>
                            <span>·</span>
                            <span
                              className={`text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                                isCancelled
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {isCancelled ? 'Odwołana' : 'Potwierdzona'}
                            </span>
                          </div>
                          <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#121316] mt-1">
                            {appt.service.name}
                          </h3>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-serif text-xl font-semibold text-[#121316]">
                            {appt.totalPrice} zł
                          </span>
                          <span className="text-[11px] text-[#747686] block">
                            Płatność na miejscu
                          </span>
                        </div>
                      </div>

                      {/* Metadata fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#54575F]">
                        <div className="flex items-start gap-2.5">
                          <Calendar className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-[#121316] block">Termin:</span>
                            <span>{formatDateDisplay(appt.date)}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <Clock className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-[#121316] block">Godzina:</span>
                            <span>{appt.time} (ok. {appt.service.duration} min)</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <User className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-[#121316] block">Stylista:</span>
                            <span>{appt.stylist.name} ({appt.stylist.title})</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <Coffee className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-[#121316] block">Napój w salonie:</span>
                            <span>{appt.beveragePreference}</span>
                          </div>
                        </div>
                      </div>

                      {/* Add-ons list if present */}
                      {appt.addOns && appt.addOns.length > 0 && (
                        <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE4DC] text-xs">
                          <span className="font-semibold text-[#121316] block mb-1">
                            Wybrane rytuały dodatkowe:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {appt.addOns.map((addOn, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-0.5 bg-white border border-[#EAE4DC] rounded-md text-[11px] text-[#54575F]"
                              >
                                + {addOn}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Location banner */}
                      <div className="flex items-center gap-2 text-xs text-[#747686] pt-1">
                        <MapPin className="w-4 h-4 text-[#1D4ED8]" />
                        <span>{SALON_INFO.address}</span>
                      </div>

                      {/* Actions */}
                      {!isCancelled && (
                        <div className="pt-4 border-t border-[#F3EFEA] flex items-center justify-between">
                          <span className="text-[11px] text-[#747686]">
                            Bezpłatne odwołanie do 24h przed
                          </span>
                          <button
                            onClick={() => onCancelAppointment(appt.id)}
                            className="text-xs font-semibold text-[#BA1A1A] hover:text-[#93000A] transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Odwołaj wizytę</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          )}
        </div>
      )}

      {/* PRIVILEGE CARD TAB */}
      {activeTab === 'privilege' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* VIP Card Preview */}
            <ScrollReveal direction="right" className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-tr from-[#121316] via-[#1E2024] to-[#354272] text-white p-7 shadow-2xl border border-white/20 aspect-[1.58/1] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#CAD3FF]">
                        STUDIO FRYZUR PRESTIGE
                      </span>
                      <h4 className="font-serif text-xl tracking-wider text-white mt-1">
                        PRIVILEGE CLUB
                      </h4>
                    </div>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[11px] uppercase tracking-widest font-bold border border-white/20 text-[#CAD3FF]">
                      Status Platine
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs font-mono text-[#CAD3FF]">
                    <span>•••• •••• •••• 8492</span>
                    <span className="text-white/60">EXP 12/28</span>
                  </div>

                  <div className="flex justify-between items-end pt-2 border-t border-white/10">
                    <div>
                      <span className="text-[10px] uppercase text-white/60 block">Posiadacz Karty</span>
                      <span className="font-medium text-sm">Magdalena Czajkowska</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase text-white/60 block">Punkty Luksusu</span>
                      <span className="font-serif text-lg font-bold text-[#CAD3FF]">2 450 pkt</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-white rounded-xl border border-[#EAE4DC] flex items-center gap-3 shadow-sm">
                <QrCode className="w-8 h-8 text-[#121316] shrink-0" />
                <div className="text-xs text-[#54575F]">
                  Pokaż kod QR concierge podczas wizyty, aby naliczyć punkty i odebrać darmowe rytuały.
                </div>
              </div>
            </ScrollReveal>

            {/* Privileges Details */}
            <ScrollReveal direction="left" className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-[#EAE4DC] p-6 sm:p-8 space-y-6 shadow-sm">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1D4ED8]">
                    Przywileje Członkowskie
                  </span>
                  <h3 className="font-serif text-2xl font-medium text-[#121316] mt-1">
                    Przywileje Statusu Platine
                  </h3>
                  <p className="text-xs sm:text-sm text-[#54575F] mt-1">
                    Jako członek programu Privilege korzystasz z dedykowanych benefitów przy każdej wizycie:
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC] flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-semibold text-[#121316]">
                        Bezpłatny Rytuał Fusio-Dose do każdej koloryzacji
                      </h5>
                      <p className="text-[11px] text-[#54575F] mt-0.5">
                        Wartość 90 zł wliczona gratis do każdego balayage lub dekoloryzacji.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC] flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-semibold text-[#121316]">
                        Dedykowany szampan Moët & Chandon i prywatny gabinet
                      </h5>
                      <p className="text-[11px] text-[#54575F] mt-0.5">
                        Dostęp do apartamentu VIP podczas długich procedur koloryzacji.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC] flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-semibold text-[#121316]">
                        Priorytet w kalendarzu weekendowym
                      </h5>
                      <p className="text-[11px] text-[#54575F] mt-0.5">
                        Gwarancja rezerwacji terminu piątkowego lub sobotniego z 7-dniowym wyprzedzeniem.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      )}
    </div>
  );
};
