import React from 'react';
import { Stylist } from '../types';
import { STYLISTS } from '../data/salonData';
import { ImageWithFallback } from './ImageWithFallback';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import {
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

interface StylistsViewProps {
  onSelectStylistForBooking: (stylist: Stylist) => void;
}

export const StylistsView: React.FC<StylistsViewProps> = ({
  onSelectStylistForBooking,
}) => {
  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header with onscroll reveal */}
      <ScrollReveal direction="up">
        <div className="max-w-3xl space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1D4ED8]">
            Kreatorzy Stylu
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#121316] leading-tight">
            Styliści Salonu Prestige
          </h1>
          <p className="text-sm sm:text-base text-[#54575F] leading-relaxed">
            Nasz zespół tworzą międzynarodowi szkoleniowcy, wielokrotni laureaci konkursów fryzjerstwa artystycznego oraz pasjonaci zdrowych, promiennych włosów.
          </p>
        </div>
      </ScrollReveal>

      {/* Stylists Roster Grid with onscroll stagger */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {STYLISTS.map((stylist) => (
          <StaggerItem key={stylist.id}>
            <div className="bg-white rounded-2xl border border-[#EAE4DC] overflow-hidden p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl hover:border-[#1D4ED8]/40 hover:-translate-y-1 transition-all duration-300 h-full">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="w-28 sm:w-36 aspect-[3/4] rounded-xl overflow-hidden shrink-0 shadow-sm border border-[#EAE4DC]">
                    <ImageWithFallback
                      src={stylist.image}
                      alt={stylist.name}
                      fallbackTitle={stylist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-2 flex-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1D4ED8]">
                      {stylist.title}
                    </span>
                    <h2 className="font-serif text-2xl font-medium text-[#121316]">
                      {stylist.name}
                    </h2>
                    <p className="text-xs text-[#54575F] font-medium">{stylist.role}</p>

                    <div className="flex items-center gap-1.5 text-xs text-[#747686] pt-1">
                      <Award className="w-4 h-4 text-[#1D4ED8]" />
                      <span>{stylist.experienceYears} lat doświadczenia w branży</span>
                    </div>

                    <div className="flex items-start gap-1.5 text-xs text-[#54575F] pt-1">
                      <GraduationCap className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" />
                      <span className="leading-tight">{stylist.education}</span>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#EAE4DC] italic text-xs sm:text-sm text-[#54575F] leading-relaxed">
                  &bdquo;{stylist.quote}&rdquo;
                </div>

                {/* Specialties */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#121316] block">
                    Kluczowe specjalizacje:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {stylist.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-[#F3EFEA] text-[#121316] text-xs rounded-md font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Available days */}
                <div className="flex items-center gap-2 text-xs text-[#747686] pt-2">
                  <Clock className="w-3.5 h-3.5 text-[#1D4ED8]" />
                  <span>
                    Dni pracy: <strong>{stylist.availableDays.join(', ')}</strong>
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-[#F3EFEA] mt-6 flex items-center justify-between">
                <span className="text-xs text-[#747686]">Konsultacja wliczona w wizytę</span>
                <button
                  onClick={() => onSelectStylistForBooking(stylist)}
                  className="px-6 py-2.5 bg-[#1D4ED8] hover:bg-[#172554] text-white text-xs font-semibold rounded-full transition-all cursor-pointer shadow-sm active:scale-[0.98] flex items-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Umów wizytę u stylistki</span>
                </button>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Quality commitment with onscroll reveal */}
      <ScrollReveal direction="up" delay={0.15}>
        <div className="p-8 bg-[#FAF8F5] rounded-2xl border border-[#EAE4DC] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-serif text-xl font-medium text-[#121316]">
              Ciągły Rozwój i Szkolenia
            </h3>
            <p className="text-xs sm:text-sm text-[#54575F] leading-relaxed">
              Każdy fryzjer w naszym salonie przechodzi minimum 40 godzin rocznie zaawansowanych szkoleń. Nieustannie doskonalimy techniki cięć i bezpiecznego rozjaśniania.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0 text-xs text-[#1D4ED8] font-semibold">
            <span className="p-3 bg-white rounded-xl border border-[#EAE4DC] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              100% Certyfikowani
            </span>
            <span className="p-3 bg-white rounded-xl border border-[#EAE4DC] flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Standard L&apos;Oréal Pro
            </span>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};
