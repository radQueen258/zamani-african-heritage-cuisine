import React from 'react';
import { Utensils, CalendarDays, MessageCircle, BookmarkCheck } from 'lucide-react';

interface MobileQuickBarProps {
  onOpenReservation: () => void;
  onOpenWhatsApp: () => void;
  hasActiveBooking: boolean;
  onViewBookings: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({
  onOpenReservation,
  onOpenWhatsApp,
  hasActiveBooking,
  onViewBookings,
}) => {
  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-14 bg-[#071d15]/95 backdrop-blur-lg border-t border-[#164132] px-3 flex items-center justify-around shadow-2xl"
    >
      <a
        href="#menu"
        className="flex flex-col items-center justify-center text-[#a1bcaf] hover:text-[#d4a359] transition-colors py-1 px-3 text-center"
      >
        <Utensils className="w-4 h-4" />
        <span className="text-[10px] font-medium mt-0.5">Menu</span>
      </a>

      <button
        onClick={onOpenReservation}
        className="flex flex-col items-center justify-center text-[#d4a359] hover:text-[#eec170] transition-colors py-1 px-3 text-center"
      >
        <CalendarDays className="w-4 h-4 text-[#d4a359]" />
        <span className="text-[10px] font-bold mt-0.5">Book Table</span>
      </button>

      <button
        onClick={onOpenWhatsApp}
        className="flex flex-col items-center justify-center text-emerald-400 hover:text-emerald-300 transition-colors py-1 px-3 text-center"
      >
        <MessageCircle className="w-4 h-4 text-emerald-400" />
        <span className="text-[10px] font-bold mt-0.5">WhatsApp</span>
      </button>

      {hasActiveBooking ? (
        <button
          onClick={onViewBookings}
          className="flex flex-col items-center justify-center text-emerald-300 hover:text-white transition-colors py-1 px-2 text-center"
        >
          <BookmarkCheck className="w-4 h-4 text-[#d4a359]" />
          <span className="text-[10px] font-medium mt-0.5">Booked</span>
        </button>
      ) : (
        <a
          href="#specials"
          className="flex flex-col items-center justify-center text-[#a1bcaf] hover:text-[#d4a359] transition-colors py-1 px-3 text-center"
        >
          <span className="w-4 h-4 rounded-full border border-[#d4a359]/60 text-[10px] flex items-center justify-center text-[#d4a359] font-bold">
            ★
          </span>
          <span className="text-[10px] font-medium mt-0.5">Specials</span>
        </a>
      )}
    </nav>
  );
};
