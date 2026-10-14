import React from 'react';
import { Service, Stylist, ActiveTab } from '../types';
import { SERVICES, STYLISTS, SALON_INFO } from '../data/salonData';
import { ImageWithFallback } from './ImageWithFallback';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';
import { motion } from 'motion/react';
import {
  Calendar,
  Sparkles,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Award,
  Heart,
  ChevronRight,
} from 'lucide-react';

interface AtelierViewProps {
  onSelectServiceForBooking: (service: Service) => void;
  onSelectStylistForBooking: (stylist: Stylist) => void;
  onOpenBooking: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const AtelierView: React.FC<AtelierViewProps> = ({
  onSelectServiceForBooking,
  onSelectStylistForBooking,
  onOpenBooking,
  setActiveTab,
}) => {
  const signatureServices = SERVICES.filter((s) => s.featured).slice(0, 3);

  return (
    <div className="space-y-24 sm:space-y-32 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-12">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Editorial Copy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="lg:col-span-7 space-y-6 sm:space-y-8"
            >
              {/* Category eyebrow with generous tracking */}
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.15em] font-semibold text-[#1D4ED8]">
                <span>STUDIO FRYZUR PRESTIGE</span>
                <span className="text-[#C4C5D7]">·</span>
                <span>POLNA 13B, ZAMOŚĆ</span>
              </div>

              {/* Display Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#121316] leading-[1.12] text-balance">
                Sztuka perfekcyjnej formy & zmysłowej koloryzacji
              </h1>

              {/* Atmospheric Subtitle */}
              <p className="text-base sm:text-lg text-[#54575F] leading-relaxed max-w-xl font-normal">
                Kreujemy luksusowe fryzury, które układają się z naturalną lekkością. Doświadcz autorskich technik francuskiego balayage, geometrii Vidal Sassoon oraz kojących rytuałów japońskiego Head Spa.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={onOpenBooking}
                  className="px-8 py-3.5 bg-[#1D4ED8] hover:bg-[#172554] text-white text-sm font-semibold rounded-full shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Zarezerwuj Wizytę</span>
                </button>
                <button
                  onClick={() => setActiveTab('services')}
                  className="px-7 py-3.5 bg-white hover:bg-[#F3EFEA] border border-[#EAE4DC] hover:border-[#1D4ED8] text-[#121316] text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Poznaj Menu Usług</span>
                  <ArrowRight className="w-4 h-4 text-[#54575F]" />
                </button>
              </div>

              {/* Proof Marker: Unboxed clean metadata */}
              <div className="pt-6 border-t border-[#EAE4DC] flex flex-wrap items-center gap-y-3 gap-x-8 text-xs text-[#54575F]">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#1D4ED8]" />
                  <span>Certyfikowani mistrzowie</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#1D4ED8]" />
                  <span>100% ochrona mostków keratynowych</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#1D4ED8]" />
                  <span>Kosmetyki zatwierdzone dermatologicznie </span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hero Visual Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="lg:col-span-5"
            >
              <div className="relative">
                {/* Decorative border frame */}
                <div className="absolute -inset-2.5 rounded-2xl border border-[#EAE4DC]/80 -z-10 bg-gradient-to-tr from-[#FAF8F5] to-white" />
                
                <div className="rounded-xl overflow-hidden aspect-[4/5] shadow-xl border border-[#EAE4DC] relative group">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80"
                    alt="Studio Fryzur Prestige"
                    fallbackTitle="Studio Fryzur Prestige"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                  {/* Frosted overlay badge */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/80 shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-[#1D4ED8] font-bold">
                          Zamość · Polna 13b
                        </p>
                        <h4 className="font-serif text-base text-[#121316] font-semibold">
                          Studio Fryzur Prestige
                        </h4>
                      </div>
                      <button
                        onClick={onOpenBooking}
                        className="text-xs text-[#1D4ED8] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Rezerwacja</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. THREE PILLARS OF PRESTIGE (OnScroll Staggered) */}
      <section className="bg-white border-y border-[#EAE4DC] py-16 sm:py-20">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              {/*<span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1D4ED8]">*/}
              {/*</span>*/}
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#121316]">
                Twoje zadowolenie jest priorytetem
              </h2>
              <p className="text-sm text-[#54575F] leading-relaxed">
                Każde spotkanie traktujemy jako unikalny proces twórczy oparty na nauce o strukturze włosa.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StaggerItem>
              <div className="p-8 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC] hover:border-[#1D4ED8]/40 hover:-translate-y-1 transition-all duration-300 h-full">
                <span className="font-serif text-2xl text-[#1D4ED8] block mb-4 font-semibold">01.</span>
                <h3 className="font-serif text-xl font-medium text-[#121316] mb-2">
                  Architektura & Proporcje
                </h3>
                <p className="text-sm text-[#54575F] leading-relaxed">
                  Precyzyjna analiza kształtu twarzy, profilu oraz naturalnego kierunku wzrostu włosów. Cięcie ma podkreślać Twoje unikalne rysy bez wymuszonej stylizacji każdego poranka.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-8 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC] hover:border-[#1D4ED8]/40 hover:-translate-y-1 transition-all duration-300 h-full">
                <span className="font-serif text-2xl text-[#1D4ED8] block mb-4 font-semibold">02.</span>
                <h3 className="font-serif text-xl font-medium text-[#121316] mb-2">
                  Koloryzacja Światłem
                </h3>
                <p className="text-sm text-[#54575F] leading-relaxed">
                  Techniki Balayage Couture i AirTouch z użyciem najczystszych pigmentów. Zapewniamy płynne, świetliste przejścia tonalne i brak widocznego odrostu nawet przez kilka miesięcy.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-8 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC] hover:border-[#1D4ED8]/40 hover:-translate-y-1 transition-all duration-300 h-full">
                <span className="font-serif text-2xl text-[#1D4ED8] block mb-4 font-semibold">03.</span>
                <h3 className="font-serif text-xl font-medium text-[#121316] mb-2">
                  Head Spa
                </h3>
                <p className="text-sm text-[#54575F] leading-relaxed">
                  Przed każdym cięciem zapewniamy głęboki relaks w strefie mycia. Masaż akupresurowy Shiatsu i dogłębna kuracja biologiczna skóry głowy.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* 3. SIGNATURE TREATMENTS SPOTLIGHT (OnScroll Staggered) */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1D4ED8]">
                Ikoniczne Rytuały
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#121316] mt-1">
                Oferowane Usługi
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('services')}
              className="text-sm font-semibold text-[#1D4ED8] hover:text-[#172554] flex items-center gap-1 cursor-pointer"
            >
              <span>Zobacz pełny cennik i menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {signatureServices.map((service) => (
            <StaggerItem key={service.id}>
              <div className="bg-white rounded-xl border border-[#EAE4DC] overflow-hidden flex flex-col h-full hover:shadow-xl hover:border-[#1D4ED8]/50 hover:-translate-y-1.5 transition-all duration-300 group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.name}
                    fallbackTitle={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/70 text-xs font-semibold text-[#121316]">
                    {service.price} zł
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#747686] mb-1.5">
                      <span className="text-[#1D4ED8] font-bold uppercase tracking-wider">
                        {service.categoryLabel}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {service.duration} min
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-medium text-[#121316] leading-snug">
                      {service.name}
                    </h3>
                    <p className="text-xs text-[#54575F] mt-2 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F3EFEA] flex items-center justify-between">
                    <button
                      onClick={() => onSelectServiceForBooking(service)}
                      className="px-5 py-2 bg-[#1D4ED8] hover:bg-[#172554] text-white text-xs font-semibold rounded-full transition-colors cursor-pointer"
                    >
                      Rezerwuj termin
                    </button>
                    <button
                      onClick={() => setActiveTab('services')}
                      className="text-xs text-[#54575F] hover:text-[#121316] transition-colors cursor-pointer font-medium"
                    >
                      Szczegóły
                    </button>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 4. MASTER STYLISTS PREVIEW (OnScroll Staggered) */}
      <section className="bg-[#FAF8F5]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1D4ED8]">
                  Nasi Artyści
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#121316] mt-1">
                  Zespół Fryzjerów Prestige
                </h2>
              </div>
              <button
                onClick={() => setActiveTab('stylists')}
                className="text-sm font-semibold text-[#1D4ED8] hover:text-[#172554] flex items-center gap-1 cursor-pointer"
              >
                <span>Poznaj wszystkich stylistów</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STYLISTS.map((stylist) => (
              <StaggerItem key={stylist.id}>
                <div className="bg-white rounded-xl border border-[#EAE4DC] p-5 flex flex-col justify-between hover:border-[#1D4ED8]/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group h-full">
                  <div>
                    <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4">
                      <ImageWithFallback
                        src={stylist.image}
                        alt={stylist.name}
                        fallbackTitle={stylist.name}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#1D4ED8]">
                      {stylist.title}
                    </span>
                    <h3 className="font-serif text-lg font-medium text-[#121316] mt-0.5">
                      {stylist.name}
                    </h3>
                    <p className="text-xs text-[#54575F] mt-1 line-clamp-1">
                      {stylist.role}
                    </p>
                    <p className="text-[11px] text-[#747686] mt-2 italic line-clamp-2">
                      &bdquo;{stylist.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F3EFEA] mt-4 flex items-center justify-between">
                    <span className="text-[11px] text-[#747686]">
                      {stylist.experienceYears} lat dośw.
                    </span>
                    <button
                      onClick={() => onSelectStylistForBooking(stylist)}
                      className="text-xs font-semibold text-[#1D4ED8] hover:underline cursor-pointer"
                    >
                      Umów wizytę →
                    </button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 5. BOOKING CALL-TO-ACTION BANNER (OnScroll Scale/Fade) */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" duration={0.75}>
          <div className="bg-[#121316] text-white rounded-2xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl space-y-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1D4ED8]">
                Komfort & Indywidualne Podejście
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight text-white">
                Zarezerwuj wizytę w Studio Fryzur Prestige
              </h2>
              <p className="text-sm sm:text-base text-[#C4C5D7] leading-relaxed">
                Każdą wizytę rozpoczynamy od bezpłatnej, życzliwej konsultacji i analizy struktury włosa. Wybierz dogodny termin online bez przedpłaty i zrelaksuj się w naszym salonie przy ul. Polnej 13b w Zamościu.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={onOpenBooking}
                  className="px-8 py-3.5 bg-[#1D4ED8] hover:bg-[#2563EB] text-white text-sm font-semibold rounded-full shadow-lg transition-all cursor-pointer inline-flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Zarezerwuj Wizytę Online</span>
                </button>
                <button
                  onClick={() => setActiveTab('services')}
                  className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-full transition-all cursor-pointer inline-flex items-center justify-center gap-2 border border-white/15"
                >
                  <span>Zobacz Menu Usług</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            {/* Subtle decorative circles */}
            <div className="absolute right-[-10%] top-[-30%] w-96 h-96 rounded-full bg-[#1D4ED8]/10 blur-3xl pointer-events-none" />
          </div>
        </ScrollReveal>
      </section>

      {/* 6. VERIFIED TESTIMONIALS (OnScroll Staggered) */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1D4ED8]">
              Zaufanie Klientek
            </span>
            <h2 className="font-serif text-3xl font-medium text-[#121316]">
              Opinie o Studio Fryzur Prestige
            </h2>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StaggerItem>
            <div className="p-6 bg-white rounded-xl border border-[#EAE4DC] flex flex-col justify-between space-y-4 hover:shadow-md hover:border-[#1D4ED8]/30 transition-all duration-300 h-full">
              <p className="text-sm text-[#54575F] leading-relaxed italic">
                &bdquo;AirTouch wykonany przez Karolinę to absolutne mistrzostwo świata. Po 6 miesiącach odrost jest niemal niewidoczny, a włosy są w lepszej kondycji niż przed rozjaśnianiem.&rdquo;
              </p>
              <div className="pt-3 border-t border-[#F3EFEA] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#121316]">Marta Lewandowska</span>
                <span className="text-[#747686]">AirTouch Prestige</span>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="p-6 bg-white rounded-xl border border-[#EAE4DC] flex flex-col justify-between space-y-4 hover:shadow-md hover:border-[#1D4ED8]/30 transition-all duration-300 h-full">
              <p className="text-sm text-[#54575F] leading-relaxed italic">
                &bdquo;Architektoniczne strzyżenie u Aleksandra odmieniło moją codzienność. Wstaję rano, suszę włosy palcami i fryzura wygląda jak z paryskiego pokazu mody.&rdquo;
              </p>
              <div className="pt-3 border-t border-[#F3EFEA] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#121316]">Patrycja Ziółkowska</span>
                <span className="text-[#747686]">Strzyżenie Architektoniczne</span>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="p-6 bg-white rounded-xl border border-[#EAE4DC] flex flex-col justify-between space-y-4 hover:shadow-md hover:border-[#1D4ED8]/30 transition-all duration-300 h-full">
              <p className="text-sm text-[#54575F] leading-relaxed italic">
                &bdquo;Head Spa i rytuał Oribe to coś, co każdy powinien sobie sprezentować chociaż raz w miesiącu. Relaks na najwyższym poziomie, intymna atmosfera i kieliszek wyśmienitego szampana.&rdquo;
              </p>
              <div className="pt-3 border-t border-[#F3EFEA] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#121316]">Weronika Kosińska</span>
                <span className="text-[#747686]">Japanese Head Spa</span>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>
    </div>
  );
};
