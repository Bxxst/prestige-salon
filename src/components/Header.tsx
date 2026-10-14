import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { Calendar, Menu, X, Sparkles, UserCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenBooking: () => void;
  bookingCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenBooking,
  bookingCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'atelier', label: 'Wizytówka' },
    { id: 'booking', label: 'Rezerwacja' },
    { id: 'services', label: 'Usługi & Cennik' },
    { id: 'stylists', label: 'Stylistki' },
    { id: 'lookbook', label: 'Lookbook' },
    { id: 'my-bookings', label: 'Moje Wizyty' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EAE4DC] transition-all">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark in display face */}
        <button
          onClick={() => {
            setActiveTab('atelier');
            setMobileMenuOpen(false);
          }}
          className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] rounded"
        >
          <span className="font-serif text-xl sm:text-2xl font-semibold tracking-wider text-[#121316] group-hover:text-[#1D4ED8] transition-colors whitespace-nowrap">
            STUDIO FRYZUR PRESTIGE
          </span>
        </button>

        {/* Zone 2: 4-6 nav links, 1-2 word labels, single line */}
        <nav className="hidden lg:flex items-center gap-7 text-[14px] font-medium text-[#54575F]">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative py-1 transition-colors hover:text-[#121316] whitespace-nowrap cursor-pointer ${
                  isActive ? 'text-[#121316] font-semibold' : ''
                }`}
              >
                {item.label}
                {item.id === 'my-bookings' && bookingCount > 0 && (
                  <span className="ml-1.5 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold bg-[#1D4ED8] text-white rounded-full">
                    {bookingCount}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1D4ED8]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 bg-[#1D4ED8] hover:bg-[#172554] text-white text-sm font-semibold rounded-full shadow-sm transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-[0.98]"
          >
            <Calendar className="w-4 h-4" />
            <span>Zarezerwuj Wizytę</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#121316] hover:bg-[#F3EFEA] rounded-lg transition-colors cursor-pointer"
            aria-label="Otwórz menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#EAE4DC] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-left text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#FFFFFF] text-[#1D4ED8] shadow-sm font-semibold'
                      : 'text-[#54575F] hover:bg-[#F3EFEA] hover:text-[#121316]'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.id === 'my-bookings' && bookingCount > 0 && (
                    <span className="px-2 py-0.5 text-xs bg-[#1D4ED8] text-white rounded-full">
                      {bookingCount}
                    </span>
                  )}
                </button>
              );
            })}
            <div className="pt-3 border-t border-[#EAE4DC] mt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#1D4ED8] text-white text-sm font-semibold rounded-full shadow-sm hover:bg-[#172554] transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Zarezerwuj Wizytę Online</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
