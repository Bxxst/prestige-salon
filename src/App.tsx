/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActiveTab, Service, Stylist, Appointment } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AtelierView } from './components/AtelierView';
import { ServicesView } from './components/ServicesView';
import { StylistsView } from './components/StylistsView';
import { LookbookView } from './components/LookbookView';
import { MyAppointmentsView } from './components/MyAppointmentsView';
import { BookingPage } from './components/BookingPage';
import { INITIAL_APPOINTMENTS } from './data/salonData';
import { Check } from 'lucide-react';
import { motion, useScroll, useSpring } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('atelier');
  const [preselectedService, setPreselectedService] = useState<Service | null>(null);
  const [preselectedStylist, setPreselectedStylist] = useState<Stylist | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Smooth scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Appointments in localStorage
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem('hcp_appointments');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_APPOINTMENTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('hcp_appointments', JSON.stringify(appointments));
    } catch (e) {
      console.error(e);
    }
  }, [appointments]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleOpenBooking = (service?: Service | null, stylist?: Stylist | null) => {
    setPreselectedService(service || null);
    setPreselectedStylist(stylist || null);
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServiceForBooking = (service: Service) => {
    handleOpenBooking(service, null);
  };

  const handleSelectStylistForBooking = (stylist: Stylist) => {
    handleOpenBooking(null, stylist);
  };

  const handleLookbookBook = (service: Service, stylist?: Stylist) => {
    handleOpenBooking(service, stylist || null);
  };

  const handleBookingConfirmed = (newAppt: Appointment) => {
    setAppointments((prev) => [newAppt, ...prev]);
    showToast(`Rezerwacja ${newAppt.id} została pomyślnie utworzona!`);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: 'cancelled' } : appt
      )
    );
    showToast(`Wizyta została odwołana.`);
  };

  const activeBookingsCount = appointments.filter((a) => a.status !== 'cancelled').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#121316] font-sans">
      {/* Top Bar with 3-Zone Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={() => handleOpenBooking()}
        bookingCount={activeBookingsCount}
      />

      {/* Dynamic Scroll Progress Bar */}
      <motion.div
        className="fixed top-20 left-0 right-0 h-[2.5px] bg-[#1D4ED8] origin-left z-40 pointer-events-none"
        style={{ scaleX }}
      />

      {/* Main Screen Content */}
      <main className="flex-1">
        {activeTab === 'atelier' && (
          <AtelierView
            onSelectServiceForBooking={handleSelectServiceForBooking}
            onSelectStylistForBooking={handleSelectStylistForBooking}
            onOpenBooking={() => handleOpenBooking()}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'booking' && (
          <BookingPage
            preselectedService={preselectedService}
            preselectedStylist={preselectedStylist}
            onBookingConfirmed={handleBookingConfirmed}
            onNavigateToMyBookings={() => {
              setActiveTab('my-bookings');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'services' && (
          <ServicesView
            onSelectServiceForBooking={handleSelectServiceForBooking}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {activeTab === 'stylists' && (
          <StylistsView
            onSelectStylistForBooking={handleSelectStylistForBooking}
          />
        )}

        {activeTab === 'lookbook' && (
          <LookbookView
            onSelectForBooking={handleLookbookBook}
          />
        )}

        {activeTab === 'my-bookings' && (
          <MyAppointmentsView
            appointments={appointments}
            onCancelAppointment={handleCancelAppointment}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#121316] text-white px-5 py-3 rounded-xl shadow-2xl border border-white/10 flex items-center gap-3 animate-in fade-in slide-in-from-bottom duration-300">
          <div className="w-6 h-6 rounded-full bg-[#1D4ED8] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
          </div>
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
