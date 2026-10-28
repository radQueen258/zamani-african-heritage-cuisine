/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DailySpecialsSection } from './components/DailySpecialsSection';
import { SignaturePairingsSection } from './components/SignaturePairingsSection';
import { MenuSection } from './components/MenuSection';
import { WhatsAppContactSection } from './components/WhatsAppContactSection';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { DishDetailModal } from './components/DishDetailModal';
import { MobileQuickBar } from './components/MobileQuickBar';
import { MENU_ITEMS, MenuItem, Reservation, RESTAURANT_INFO } from './data/restaurantData';

export default function App() {
  const [reservationModalOpen, setReservationModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [preSelectedDishIds, setPreSelectedDishIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('zamani_preselected_dishes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [existingReservations, setExistingReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem('zamani_reservations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('zamani_preselected_dishes', JSON.stringify(preSelectedDishIds));
    } catch (e) {
      console.error(e);
    }
  }, [preSelectedDishIds]);

  useEffect(() => {
    try {
      localStorage.setItem('zamani_reservations', JSON.stringify(existingReservations));
    } catch (e) {
      console.error(e);
    }
  }, [existingReservations]);

  const handleTogglePreSelect = (dishId: string) => {
    setPreSelectedDishIds((prev) =>
      prev.includes(dishId) ? prev.filter((id) => id !== dishId) : [...prev, dishId]
    );
  };

  const handleRemovePreSelectedDish = (dishId: string) => {
    setPreSelectedDishIds((prev) => prev.filter((id) => id !== dishId));
  };

  const handleSaveReservation = (res: Reservation) => {
    setExistingReservations((prev) => [res, ...prev]);
  };

  const handleCancelReservation = (id: string) => {
    setExistingReservations((prev) => prev.filter((r) => r.id !== id));
  };

  const handleOpenWhatsApp = (customText?: string) => {
    const defaultText = customText || 'Hello Zamani! I would like to inquire about table availability.';
    const encoded = encodeURIComponent(defaultText);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encoded}`, '_blank');
  };

  const handleOpenWhatsAppForDish = (dish: MenuItem) => {
    const text = `Hello Chef Folake! I have a question regarding "${dish.name}" (£${dish.price.toFixed(2)}).`;
    handleOpenWhatsApp(text);
  };

  return (
    <div className="min-h-screen bg-[#071d15] text-[#e6ece8] flex flex-col font-sans selection:bg-[#c85a32] selection:text-white relative bg-subtle-noise">
      
      {/* Top Navigation */}
      <Navbar
        onOpenReservation={() => setReservationModalOpen(true)}
        onOpenWhatsApp={handleOpenWhatsApp}
        hasActiveBooking={existingReservations.length > 0}
        preSelectedCount={preSelectedDishIds.length}
        onViewBookings={() => setReservationModalOpen(true)}
      />

      {/* Main Page Layout */}
      <main className="flex-grow">
        <HeroSection
          onOpenReservation={() => setReservationModalOpen(true)}
          onExploreMenu={() => {
            document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onSelectFeaturedDish={() => {
            const featured = MENU_ITEMS.find((d) => d.id === 'smoked-party-jollof') || MENU_ITEMS[3];
            setSelectedDish(featured);
          }}
        />

        <DailySpecialsSection
          onSelectDish={(dish) => setSelectedDish(dish)}
          onTogglePreSelect={handleTogglePreSelect}
          preSelectedDishIds={preSelectedDishIds}
          onOpenReservation={() => setReservationModalOpen(true)}
        />

        <SignaturePairingsSection
          onSelectDish={(dish) => setSelectedDish(dish)}
          onTogglePreSelect={handleTogglePreSelect}
          preSelectedDishIds={preSelectedDishIds}
        />

        <MenuSection
          onSelectDish={(dish) => setSelectedDish(dish)}
          onTogglePreSelect={handleTogglePreSelect}
          preSelectedDishIds={preSelectedDishIds}
          onOpenWhatsAppForDish={handleOpenWhatsAppForDish}
        />

        <WhatsAppContactSection
          onOpenReservation={() => setReservationModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenReservation={() => setReservationModalOpen(true)}
        onOpenWhatsApp={handleOpenWhatsApp}
      />

      {/* Mobile Floating Quick Action Bar */}
      <MobileQuickBar
        onOpenReservation={() => setReservationModalOpen(true)}
        onOpenWhatsApp={() => handleOpenWhatsApp()}
        hasActiveBooking={existingReservations.length > 0}
        onViewBookings={() => setReservationModalOpen(true)}
      />

      {/* Persistent Watermark "Developed by AUMA" seen throughout whole scrolling */}
      <div
        className="fixed bottom-5 left-5 max-md:bottom-16 max-md:left-3 z-40 pointer-events-auto select-none"
        title="Website crafted by AUMA"
      >
        <div className="px-3.5 py-1.5 rounded-full bg-[#071d15]/90 backdrop-blur-md border border-[#d4a359]/35 text-[#d4a359] text-[10px] tracking-[0.2em] uppercase font-serif font-semibold shadow-xl flex items-center gap-1.5 transition-all hover:bg-[#071d15] hover:border-[#d4a359] hover:scale-105">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4a359]" />
          <span>Developed by AUMA</span>
        </div>
      </div>

      {/* Floating Desktop WhatsApp Button */}
      <aside aria-label="WhatsApp quick chat" className="hidden md:block fixed bottom-6 right-6 z-30">
        <button
          onClick={() => handleOpenWhatsApp('Hello Zamani, I would like to make an enquiry.')}
          className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs shadow-2xl transition-all hover:scale-105"
          title="Direct WhatsApp Chat"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span className="text-[11px] font-medium">WhatsApp</span>
        </button>
      </aside>

      {/* Reservation System Modal */}
      <ReservationModal
        isOpen={reservationModalOpen}
        onClose={() => setReservationModalOpen(false)}
        preSelectedDishIds={preSelectedDishIds}
        onRemovePreSelectedDish={handleRemovePreSelectedDish}
        existingReservations={existingReservations}
        onSaveReservation={handleSaveReservation}
        onCancelReservation={handleCancelReservation}
      />

      {/* Dish Detail Modal */}
      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onTogglePreSelect={handleTogglePreSelect}
        isPreSelected={selectedDish ? preSelectedDishIds.includes(selectedDish.id) : false}
        onOpenWhatsApp={handleOpenWhatsApp}
      />

    </div>
  );
}
