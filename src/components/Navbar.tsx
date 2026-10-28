import React, { useState } from 'react';
import { Utensils, MessageCircle, CalendarDays, Menu as MenuIcon, X, BookmarkCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  onOpenReservation: () => void;
  onOpenWhatsApp: (presetText?: string) => void;
  hasActiveBooking: boolean;
  preSelectedCount: number;
  onViewBookings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReservation,
  onOpenWhatsApp,
  hasActiveBooking,
  preSelectedCount,
  onViewBookings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#071d15]/95 backdrop-blur-md border-b border-[#143d2f]">
      {/* Main Top Bar Contract: Zone 1 (Brand) - Zone 2 (4 Nav Links) - Zone 3 (1 Primary Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a href="#" className="flex items-center gap-3 shrink-0 group">
          <div className="w-9 h-9 rounded-full border border-[#d4a359]/60 bg-[#0d3326] flex items-center justify-center text-[#d4a359] group-hover:border-[#d4a359] transition-colors shadow-sm">
            <span className="font-serif text-lg font-bold tracking-widest text-[#f5db9e]">Z</span>
          </div>
          <span className="font-serif text-2xl font-bold tracking-wider text-[#f4efe6] group-hover:text-[#f3d89d] transition-colors leading-none">
            ZAMANI
          </span>
        </a>

        {/* Zone 2: Concise Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#c0d4ca]">
          <a
            href="#specials"
            className="hover:text-[#f3d89d] transition-colors whitespace-nowrap shrink-0"
          >
            Daily Hearth
          </a>
          <a
            href="#craftsmanship"
            className="hover:text-[#f3d89d] transition-colors whitespace-nowrap shrink-0"
          >
            Pairings
          </a>
          <a
            href="#menu"
            className="hover:text-[#f3d89d] transition-colors whitespace-nowrap shrink-0"
          >
            Menu
          </a>
          <a
            href="#whatsapp-section"
            className="hover:text-[#f3d89d] transition-colors whitespace-nowrap shrink-0"
          >
            WhatsApp
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {hasActiveBooking && (
            <button
              onClick={onViewBookings}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-300 bg-[#123e2f] border border-emerald-500/30 rounded-lg hover:bg-[#164a38] transition-colors whitespace-nowrap shrink-0"
              title="View your confirmed table reservation"
            >
              <BookmarkCheck className="w-3.5 h-3.5 text-[#d4a359]" />
              <span>Table Booked</span>
            </button>
          )}

          {preSelectedCount > 0 && (
            <a
              href="#menu"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[#d4a359] bg-[#123628] rounded-lg border border-[#235843]"
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>{preSelectedCount} Tasting Course{preSelectedCount > 1 ? 's' : ''}</span>
            </a>
          )}

          <button
            onClick={onOpenReservation}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#0a2318] bg-[#d4a359] hover:bg-[#eec170] rounded-lg transition-all shadow-md hover:shadow-[#d4a359]/20 whitespace-nowrap shrink-0"
          >
            <CalendarDays className="w-4 h-4 text-[#0a2318]" />
            <span>Book a Table</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#c0d4ca] hover:text-white hover:bg-[#143e30] rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a271d] border-b border-[#1b4b39] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-[#c0d4ca]">
            <a
              href="#story"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#12382a] hover:text-[#f3d89d] transition-colors"
            >
              The Heritage & Chef
            </a>
            <a
              href="#specials"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#12382a] hover:text-[#f3d89d] transition-colors"
            >
              Daily Hearth Courses
            </a>
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#12382a] hover:text-[#f3d89d] transition-colors"
            >
              Interactive Full Menu
            </a>
            <a
              href="#craftsmanship"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#12382a] hover:text-[#f3d89d] transition-colors"
            >
              Artisanal Ingredients
            </a>
            <a
              href="#whatsapp-section"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#12382a] hover:text-[#f3d89d] transition-colors"
            >
              Direct WhatsApp Enquiries
            </a>
          </nav>

          <div className="pt-3 border-t border-[#184233] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-[#0a2318] bg-[#d4a359] hover:bg-[#eec170] rounded-lg transition-colors"
            >
              <CalendarDays className="w-4 h-4" />
              <span>Reserve Table Online</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWhatsApp('Hi Zamani, I would like to inquire about table availability.');
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-emerald-300 bg-[#123f30] border border-emerald-500/30 rounded-lg hover:bg-[#184e3c] transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Direct WhatsApp Chat</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
