import React, { useState } from 'react';
import { Service } from '../types';
import { SERVICES, ADD_ONS } from '../data/salonData';
import { ImageWithFallback } from './ImageWithFallback';
import { ScrollReveal } from './ScrollReveal';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock,
  Sparkles,
  Search,
  Check,
  CheckCircle2,
  Calendar,
  ChevronRight,
  Info,
} from 'lucide-react';

interface ServicesViewProps {
  onSelectServiceForBooking: (service: Service) => void;
  onOpenBooking: () => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
                                                            onSelectServiceForBooking,
                                                            onOpenBooking,
                                                          }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const categories = [
    { id: 'all', label: 'Wszystkie Usługi' },
    { id: 'color', label: 'Koloryzacja & Balayage' },
    { id: 'cut', label: 'Strzyżenie & Forma' },
    { id: 'spa', label: 'Rytuały SPA & Odbudowa' },
    { id: 'scalp', label: 'Trychologia & Head Spa' },
    { id: 'styling', label: 'Stylizacja & Bridal' },
  ];

  const filteredServices = SERVICES.filter((s) => {
    const matchesCategory =
        selectedCategory === 'all' || s.category === selectedCategory;
    const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAddOn = (id: string) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter((item) => item !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  const addOnsTotal = selectedAddOns.reduce((sum, id) => {
    const item = ADD_ONS.find((a) => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  return (
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        {/* Page Header with onscroll reveal */}
        <ScrollReveal direction="up">
          <div className="max-w-3xl space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1D4ED8]">
            Cennik & Karta Zabiegów
          </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#121316] leading-tight">
              Menu Usług & Autorskich Rytuałów
            </h1>
            <p className="text-sm sm:text-base text-[#54575F] leading-relaxed">
              Każda wizyta w Atelier obejmuje aromaterapeutyczną kąpiel pielęgnacyjną, indywidualną konsultację kondycji włosa oraz napój z naszej karty powitalnej.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter and Search Bar with onscroll reveal */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#EAE4DC]">
            {/* Interactive segmented filter control */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
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

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-[#747686] absolute left-3.5 top-3 pointer-events-none" />
              <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Szukaj zabiegu..."
                  className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-[#EAE4DC] rounded-full focus:outline-none focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8]"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Services Grid with smooth transition */}
        <AnimatePresence mode="popLayout">
          <motion.div
              key={selectedCategory + '_' + searchQuery}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {filteredServices.map((service) => (
                <div
                    key={service.id}
                    className="bg-white rounded-xl border border-[#EAE4DC] overflow-hidden p-6 sm:p-7 flex flex-col justify-between hover:border-[#1D4ED8]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#F3EFEA]">
                      <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1D4ED8]">
                      {service.categoryLabel}
                    </span>
                        <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#121316] mt-0.5">
                          {service.name}
                        </h3>
                      </div>
                      <div className="text-left sm:text-right shrink-0">
                    <span className="font-serif text-2xl font-semibold text-[#121316]">
                      {service.price} zł
                    </span>
                        <div className="flex items-center gap-1 text-xs text-[#747686] mt-0.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>ok. {service.duration} min</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#54575F] mt-4 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Ritual highlights */}
                    <div className="mt-5 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#121316] block">
                    W pakiecie rytuału:
                  </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.ritualHighlights.map((ritual, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-[#54575F]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#1D4ED8] shrink-0" />
                              <span className="truncate">{ritual}</span>
                            </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommended for note */}
                    <div className="mt-4 p-3 bg-[#FAF8F5] rounded-lg border border-[#EAE4DC]/80 flex items-start gap-2.5 text-xs text-[#747686]">
                      <Info className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" />
                      <span>
                    <strong>Dla kogo:</strong> {service.recommendedFor}
                  </span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#F3EFEA] mt-6 flex items-center justify-between">
                <span className="text-xs text-[#747686]">
                  Konsultacja i napój w cenie
                </span>
                    <button
                        onClick={() => onSelectServiceForBooking(service)}
                        className="px-6 py-2.5 bg-[#1D4ED8] hover:bg-[#172554] text-white text-xs font-semibold rounded-full transition-all cursor-pointer shadow-sm active:scale-[0.98]"
                    >
                      Zarezerwuj tę usługę
                    </button>
                  </div>
                </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredServices.length === 0 && (
            <div className="py-16 text-center space-y-3 bg-white rounded-xl border border-[#EAE4DC]">
              <p className="font-serif text-lg text-[#121316]">Nie znaleziono usług spełniających kryteria</p>
              <p className="text-xs text-[#747686]">Spróbuj zmienić kategorię lub wyczyścić frazę wyszukiwania.</p>
              <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-[#F3EFEA] text-xs font-semibold rounded-full hover:bg-[#EAE4DC] cursor-pointer"
              >
                Wyczyść filtry
              </button>
            </div>
        )}

        {/*/!* Add-ons & Rituel Booster Panel with onscroll reveal *!/*/}
        {/*<ScrollReveal direction="up" delay={0.1}>*/}
        {/*  <div className="bg-[#FAF8F5] rounded-2xl border border-[#EAE4DC] p-6 sm:p-8 space-y-6">*/}
        {/*    <div>*/}
        {/*    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1D4ED8]">*/}
        {/*      Ekskluzywne Uzupełnienie*/}
        {/*    </span>*/}
        {/*      <h3 className="font-serif text-2xl font-medium text-[#121316] mt-1">*/}
        {/*        Rytuały Wzmacniające (Add-ons)*/}
        {/*      </h3>*/}
        {/*      <p className="text-xs sm:text-sm text-[#54575F] mt-1">*/}
        {/*        Wybierz dodatkowy rytuał pielęgnacyjny, który możesz połączyć z dowolną koloryzacją lub strzyżeniem:*/}
        {/*      </p>*/}
        {/*    </div>*/}

        {/*    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">*/}
        {/*      {ADD_ONS.map((addOn) => {*/}
        {/*        const isSelected = selectedAddOns.includes(addOn.id);*/}
        {/*        return (*/}
        {/*            <div*/}
        {/*                key={addOn.id}*/}
        {/*                onClick={() => toggleAddOn(addOn.id)}*/}
        {/*                className={`p-4 rounded-xl border bg-white cursor-pointer transition-all ${*/}
        {/*                    isSelected*/}
        {/*                        ? 'border-[#1D4ED8] ring-2 ring-[#1D4ED8]/20 shadow-sm'*/}
        {/*                        : 'border-[#EAE4DC] hover:border-[#1D4ED8]/40'*/}
        {/*                }`}*/}
        {/*            >*/}
        {/*              <div className="flex items-center justify-between mb-2">*/}
        {/*                <div*/}
        {/*                    className={`w-4 h-4 rounded border flex items-center justify-center ${*/}
        {/*                        isSelected*/}
        {/*                            ? 'bg-[#1D4ED8] border-[#1D4ED8] text-white'*/}
        {/*                            : 'border-[#C4C5D7]'*/}
        {/*                    }`}*/}
        {/*                >*/}
        {/*                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}*/}
        {/*                </div>*/}
        {/*                <span className="font-serif text-sm font-semibold text-[#121316]">*/}
        {/*              +{addOn.price} zł*/}
        {/*            </span>*/}
        {/*              </div>*/}
        {/*              <h4 className="text-xs font-semibold text-[#121316] leading-snug">*/}
        {/*                {addOn.name}*/}
        {/*              </h4>*/}
        {/*              <p className="text-[11px] text-[#747686] mt-1">+{addOn.duration} min</p>*/}
        {/*            </div>*/}
        {/*        );*/}
        {/*      })}*/}
        {/*    </div>*/}

        {/*    {selectedAddOns.length > 0 && (*/}
        {/*        <div className="p-4 bg-white rounded-xl border border-[#1D4ED8]/30 flex flex-col sm:flex-row items-center justify-between gap-4">*/}
        {/*          <div className="text-xs text-[#54575F]">*/}
        {/*            Wybrano {selectedAddOns.length} dodatkowy rytuał (+{addOnsTotal} zł). Zostanie uwzględniony podczas rezerwacji.*/}
        {/*          </div>*/}
        {/*          <button*/}
        {/*              onClick={onOpenBooking}*/}
        {/*              className="px-6 py-2.5 bg-[#1D4ED8] text-white text-xs font-semibold rounded-full hover:bg-[#172554] transition-colors cursor-pointer whitespace-nowrap"*/}
        {/*          >*/}
        {/*            Przejdź do rezerwacji z dodatkami*/}
        {/*          </button>*/}
        {/*        </div>*/}
        {/*    )}*/}
        {/*  </div>*/}
        {/*</ScrollReveal>*/}
      </div>
  );
};
