import React from 'react';
import { Eye, Plus, Check } from 'lucide-react';
import { MENU_ITEMS, MenuItem, DISH_IMAGES } from '../data/restaurantData';

interface SignaturePairingsSectionProps {
  onSelectDish: (dish: MenuItem) => void;
  onTogglePreSelect: (dishId: string) => void;
  preSelectedDishIds: string[];
}

export const SignaturePairingsSection: React.FC<SignaturePairingsSectionProps> = ({
  onSelectDish,
  onTogglePreSelect,
  preSelectedDishIds,
}) => {
  const suyaDish = MENU_ITEMS.find((d) => d.id === 'kallaba-beef-suya') || MENU_ITEMS[6];
  const egusiDish = MENU_ITEMS.find((d) => d.id === 'royal-egusi-pounded-yam') || MENU_ITEMS[4];

  return (
    <section id="craftsmanship" className="py-16 bg-[#071e16] text-[#e6ece8] relative border-t border-[#133c2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs tracking-[0.25em] font-semibold text-[#d4a359] uppercase block">
            Signature Hearth Pairings
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#fbf7f0]">
            Charcoal Hearth & Clay Pot
          </h2>
          <p className="text-xs sm:text-sm text-[#9eb6a8] font-light">
            Real woodfire suya skewers and slow-simmered egusi with hand-pounded yam.
          </p>
        </div>

        {/* Two Featured Real Plates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Plate 1: Real Beef Suya Skewers */}
          <div className="bg-[#0b291f] border border-[#1b4b39] rounded-2xl p-6 shadow-xl flex flex-col items-center text-center group">
            <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-2 border-[#d4a359]/40 shadow-xl bg-[#071c14] mb-5">
              <img
                src={DISH_IMAGES.suya}
                alt="Real Charcoal-Grilled Beef Suya Skewers"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                onClick={() => onSelectDish(suyaDish)}
              />
            </div>

            <div className="space-y-1 max-w-xs">
              <h3 className="font-serif text-xl font-bold text-[#f8f5ee]">
                {suyaDish.name}
              </h3>
              <p className="text-xs text-[#d4a359] font-medium">
                {suyaDish.nativeName} • £{suyaDish.price.toFixed(2)}
              </p>
              <p className="text-xs text-[#9eb6a8] font-light line-clamp-2 mt-1">
                {suyaDish.description}
              </p>
            </div>

            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#164132] w-full justify-center">
              <button
                onClick={() => onSelectDish(suyaDish)}
                className="px-3 py-1.5 text-xs text-[#c0d8cc] hover:text-white bg-[#0e3527] rounded-lg border border-[#1c4b3a]"
              >
                Details
              </button>
              <button
                onClick={() => onTogglePreSelect(suyaDish.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  preSelectedDishIds.includes(suyaDish.id)
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#d4a359] text-[#071d15] hover:bg-[#eac074]'
                }`}
              >
                {preSelectedDishIds.includes(suyaDish.id) ? 'Added' : 'Pre-order'}
              </button>
            </div>
          </div>

          {/* Plate 2: Real Clay Pot Egusi & Pounded Yam */}
          <div className="bg-[#0b291f] border border-[#1b4b39] rounded-2xl p-6 shadow-xl flex flex-col items-center text-center group">
            <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-2 border-[#d4a359]/40 shadow-xl bg-[#071c14] mb-5">
              <img
                src={DISH_IMAGES.egusi}
                alt="Real Clay Pot Egusi Soup with Pounded Yam"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                onClick={() => onSelectDish(egusiDish)}
              />
            </div>

            <div className="space-y-1 max-w-xs">
              <h3 className="font-serif text-xl font-bold text-[#f8f5ee]">
                {egusiDish.name}
              </h3>
              <p className="text-xs text-[#d4a359] font-medium">
                {egusiDish.nativeName} • £{egusiDish.price.toFixed(2)}
              </p>
              <p className="text-xs text-[#9eb6a8] font-light line-clamp-2 mt-1">
                {egusiDish.description}
              </p>
            </div>

            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#164132] w-full justify-center">
              <button
                onClick={() => onSelectDish(egusiDish)}
                className="px-3 py-1.5 text-xs text-[#c0d8cc] hover:text-white bg-[#0e3527] rounded-lg border border-[#1c4b3a]"
              >
                Details
              </button>
              <button
                onClick={() => onTogglePreSelect(egusiDish.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  preSelectedDishIds.includes(egusiDish.id)
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#d4a359] text-[#071d15] hover:bg-[#eac074]'
                }`}
              >
                {preSelectedDishIds.includes(egusiDish.id) ? 'Added' : 'Pre-order'}
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
