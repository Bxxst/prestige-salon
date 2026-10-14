import React, { useState } from 'react';
import { LookbookItem, Service, Stylist } from '../types';
import { LOOKBOOK_ITEMS, SERVICES, STYLISTS } from '../data/salonData';
import { ImageWithFallback } from './ImageWithFallback';
import { ScrollReveal } from './ScrollReveal';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Clock,
  User,
  ArrowRight,
  X,
  Split,
  Eye,
} from 'lucide-react';

interface LookbookViewProps {
  onSelectForBooking: (service: Service, stylist?: Stylist) => void;
}

export const LookbookView: React.FC<LookbookViewProps> = ({ onSelectForBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<LookbookItem | null>(null);
  const [showBefore, setShowBefore] = useState<{ [id: string]: boolean }>({});

  const categories = [
    { id: 'all', label: 'Wszystkie Kreacje' },
    { id: 'balayage', label: 'Balayage & Blond' },
    { id: 'brunette', label: 'Brunette Gloss' },
    { id: 'bobs', label: 'Architektura & Bobs' },
    { id: 'bridal', label: 'Updo & Bridal' },
    { id: 'transformation', label: 'Metamorfozy Przed / Po' },
  ];

  const filteredItems = LOOKBOOK_ITEMS.filter((item) =>
      selectedCategory === 'all' ? true : item.category === selectedCategory
  );

  const toggleBeforeAfter = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowBefore((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleBookLook = (item: LookbookItem) => {
    const matchedService = SERVICES.find((s) => s.id === item.serviceIdRef) || SERVICES[0];
    const matchedStylist = STYLISTS.find((st) => st.id === item.stylistId);
    setActiveItem(null);
    onSelectForBooking(matchedService, matchedStylist);
  };

  return (
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        {/* Page Header with onscroll reveal */}
        <ScrollReveal direction="up">
          <div className="max-w-3xl space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#1D4ED8]">
            Kolekcja Atelier
          </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#121316] leading-tight">
              Lookbook & Portfolio Stylizacji
            </h1>
            <p className="text-sm sm:text-base text-[#54575F] leading-relaxed">
              Autentyczne metamorfozy i efekty koloryzacji zrealizowane w naszym salonie. Kliknij na stylizację, aby poznać zastosowaną technikę i umówić wizytę u wybranego mistrza.
            </p>
          </div>
        </ScrollReveal>

        {/* Segmented Filter with onscroll reveal */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#EAE4DC] pb-4">
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
        </ScrollReveal>

        {/* Lookbook Gallery Grid with smooth category transition */}
        <AnimatePresence mode="popLayout">
          <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems.map((item) => {
              const isShowingBefore = showBefore[item.id] && item.beforeImage;
              const currentImg = isShowingBefore ? item.beforeImage! : item.image;

              return (
                  <div
                      key={item.id}
                      onClick={() => setActiveItem(item)}
                      className="bg-white rounded-xl border border-[#EAE4DC] overflow-hidden flex flex-col justify-between group cursor-pointer hover:shadow-xl hover:border-[#1D4ED8]/40 hover:-translate-y-1.5 transition-all duration-300 h-full"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#F3EFEA]">
                      <ImageWithFallback
                          src={currentImg}
                          alt={item.title}
                          fallbackTitle={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Tag for category */}
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/80 text-[10px] font-bold uppercase tracking-wider text-[#1D4ED8]">
                        {item.categoryLabel}
                      </div>

                      {/* Before / After toggle badge if available */}
                      {item.beforeImage && (
                          <button
                              onClick={(e) => toggleBeforeAfter(item.id, e)}
                              className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#121316]/80 hover:bg-[#121316] text-white backdrop-blur-md text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Split className="w-3.5 h-3.5" />
                            <span>{isShowingBefore ? 'Pokaż PO' : 'Pokaż PRZED'}</span>
                          </button>
                      )}

                      {/* View Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-white/95 rounded-full text-xs font-semibold text-[#121316] shadow-md flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-[#1D4ED8]" />
                      <span>Zobacz szczegóły</span>
                    </span>
                      </div>
                    </div>

                    {/* Card Meta */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className="font-serif text-lg font-medium text-[#121316] group-hover:text-[#1D4ED8] transition-colors leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#54575F] mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#F3EFEA] flex items-center justify-between text-xs text-[#747686]">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#1D4ED8]" />
                      <span className="font-medium text-[#121316]">{item.stylistName}</span>
                    </span>
                        <span>{item.duration}</span>
                      </div>
                    </div>
                  </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Lookbook Detail Modal */}
        {activeItem && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
              <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#EAE4DC] overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
                <button
                    onClick={() => setActiveItem(null)}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-[#121316] rounded-full shadow-md transition-colors cursor-pointer"
                    aria-label="Zamknij"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Image Frame */}
                <div className="md:w-1/2 relative bg-[#F3EFEA] aspect-[4/5] md:aspect-auto">
                  <ImageWithFallback
                      src={
                        showBefore[activeItem.id] && activeItem.beforeImage
                            ? activeItem.beforeImage
                            : activeItem.image
                      }
                      alt={activeItem.title}
                      fallbackTitle={activeItem.title}
                      className="w-full h-full object-cover"
                  />

                  {activeItem.beforeImage && (
                      <div className="absolute bottom-4 left-4">
                        <button
                            onClick={(e) => toggleBeforeAfter(activeItem.id, e)}
                            className="px-4 py-2 bg-white/90 hover:bg-white text-[#121316] text-xs font-semibold rounded-full shadow-md flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <Split className="w-4 h-4 text-[#1D4ED8]" />
                          <span>
                      {showBefore[activeItem.id] ? 'Widok Efektu (PO)' : 'Widok Wyjściowy (PRZED)'}
                    </span>
                        </button>
                      </div>
                  )}
                </div>

                {/* Modal Content */}
                <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
                  <div className="space-y-5">
                    <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1D4ED8]">
                    {activeItem.categoryLabel}
                  </span>
                      <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#121316] mt-1">
                        {activeItem.title}
                      </h2>
                    </div>

                    <p className="text-sm text-[#54575F] leading-relaxed">
                      {activeItem.description}
                    </p>

                    <div className="p-4 bg-white rounded-xl border border-[#EAE4DC] space-y-3 text-xs">
                      <div>
                    <span className="text-[#747686] block text-[11px] uppercase tracking-wider">
                      Użyta technika:
                    </span>
                        <p className="font-semibold text-[#121316] text-sm mt-0.5">
                          {activeItem.technique}
                        </p>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-[#F3EFEA]">
                        <span className="text-[#747686]">Czas wykonania:</span>
                        <span className="font-semibold text-[#121316]">{activeItem.duration}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-[#F3EFEA]">
                        <span className="text-[#747686]">Mistrz stylizacji:</span>
                        <span className="font-semibold text-[#121316]">{activeItem.stylistName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#EAE4DC] mt-6">
                    <button
                        onClick={() => handleBookLook(activeItem)}
                        className="w-full py-3.5 bg-[#1D4ED8] hover:bg-[#172554] text-white text-sm font-semibold rounded-full shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Chcę taki efekt · Umów Wizytę</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};
