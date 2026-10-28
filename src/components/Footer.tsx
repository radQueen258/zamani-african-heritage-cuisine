import React from 'react';
import { ArrowUp } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  onOpenReservation: () => void;
  onOpenWhatsApp: (presetText?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation, onOpenWhatsApp }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05160f] text-[#cad8d0] border-t border-[#123829] py-12 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#133c2b]">
          
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="font-serif text-xl font-bold text-[#f4efe6]">ZAMANI</span>
              <span className="text-xs text-[#8ca89b]">·</span>
              <span className="text-xs text-[#d4a359]">African Hearth</span>
            </div>
            <p className="text-xs text-[#8ca89b]">
              {RESTAURANT_INFO.address} • {RESTAURANT_INFO.displayPhone}
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#a0baa9]">
            <a href="#specials" className="hover:text-white transition-colors">Daily</a>
            <a href="#menu" className="hover:text-white transition-colors">Menu</a>
            <button onClick={onOpenReservation} className="hover:text-[#d4a359] transition-colors">
              Reserve
            </button>
            <button onClick={() => onOpenWhatsApp()} className="hover:text-emerald-400 transition-colors">
              WhatsApp
            </button>
            <button
              onClick={scrollToTop}
              className="p-1.5 text-[#8ca89b] hover:text-white rounded-lg transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6b8277] gap-2">
          <p>© {new Date().getFullYear()} Zamani African Kitchen.</p>
          <p>Kensington, London</p>
        </div>
      </div>
    </footer>
  );
};
