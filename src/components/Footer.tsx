import React from 'react';
import { SALON_INFO } from '../data/salonData';
import { ActiveTab } from '../types';
import { MapPin, Phone, Mail, Clock, Instagram } from 'lucide-react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenBooking }) => {
  return (
    <footer className="bg-[#121316] text-[#FAF8F5] pt-16 pb-12 border-t border-[#1E2024]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-[#2B2D31]">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl tracking-wider text-white">
              STUDIO FRYZUR PRESTIGE
            </h3>
            <p className="text-sm text-[#A0A2AA] leading-relaxed">
              Profesjonalny salon fryzjerski z miłą atmosferą i doświadczonymi stylistkami. Precyzyjne cięcia, nowoczesna koloryzacja i regeneracja włosa w Zamościu.
            </p>
            <div className="pt-2">
              <span className="text-xs uppercase tracking-widest text-[#1D4ED8] font-semibold">
                Salon Fryzjerski & Pielęgnacja Włosa
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-base tracking-wide text-white">
              Salon & Usługi
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A0A2AA]">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Menu Usług & Cennik
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('lookbook');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Lookbook & Metamorfozy
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('stylists');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Nasz zespół
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('booking');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Rezerwacja Wizyty Online
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Details */}
          <div className="space-y-4">
            <h4 className="font-serif text-base tracking-wide text-white">
              Kontakt & Adres
            </h4>
            <ul className="space-y-3 text-sm text-[#A0A2AA]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" />
                <span>{SALON_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                <a href={`tel:${SALON_INFO.phone}`} className="hover:text-white transition-colors">
                  {SALON_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                <a href={`mailto:${SALON_INFO.email}`} className="hover:text-white transition-colors">
                  {SALON_INFO.email}
                </a>
              </li>
            </ul>
            {/* Opening hours schedule */}
            <div className="pt-2 border-t border-[#2B2D31]/80 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-wider mb-2">
                <Clock className="w-3.5 h-3.5 text-[#1D4ED8]" />
                <span>Godziny otwarcia</span>
              </div>
              <div className="space-y-1 text-xs text-[#A0A2AA]">
                <div className="flex justify-between">
                  <span>Poniedziałek:</span>
                  <span className="text-white font-medium">11:00 – 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Wtorek:</span>
                  <span className="text-white font-medium">12:00 – 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Środa – Piątek:</span>
                  <span className="text-white font-medium">09:00 – 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sobota:</span>
                  <span className="text-white font-medium">09:00 – 14:00</span>
                </div>
                <div className="flex justify-between text-[#747686]">
                  <span>Niedziela:</span>
                  <span>Nieczynne</span>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-3">
              <FaFacebook className="text-[24px] hover:cursor-pointer text-blue-600 hover:text-blue-700" onClick={() => window.open(SALON_INFO.facebook_link)}/>
              <FaInstagram className="text-[24px] hover:cursor-pointer text-pink-600 hover:text-pink-700" onClick={() => window.open(SALON_INFO.instagram_link)}/>
            </div>
          </div>

          {/* Col 4: Private Booking & Concierge */}
          <div className="space-y-4">
            <h4 className="font-serif text-base tracking-wide text-white">
              Rezerwacja Online
            </h4>
            <p className="text-xs text-[#A0A2AA] leading-relaxed">
              Zarezerwuj wizytę bez wychodzenia z domu w 5 minut używając tylko kilku kliknięć!
            </p>
            <button
              onClick={onOpenBooking}
              className="w-full py-2.5 px-4 bg-[#1D4ED8] hover:bg-[#2563EB] text-white text-xs font-semibold rounded-full tracking-wide transition-all cursor-pointer active:scale-[0.98]"
            >
              Rezerwuj Termin Online
            </button>
            <p className="text-[11px] text-[#747686]">
              {SALON_INFO.instagram} · Polna 13b, Zamość
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#747686] gap-4">
          <p>© {new Date().getFullYear()} Studio Fryzur Prestige. Wszelkie prawa zastrzeżone.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#A0A2AA] transition-colors cursor-pointer">Polityka Prywatności</span>
            <span className="hover:text-[#A0A2AA] transition-colors cursor-pointer">Regulamin</span>
            {/*<span className="hover:text-[#A0A2AA] transition-colors cursor-pointer">Karta VIP Privilege</span>*/}
          </div>
        </div>
      </div>
    </footer>
  );
};
