import React from 'react';
import { CalendarDays, ArrowRight, Flame } from 'lucide-react';
import { RESTAURANT_INFO, DISH_IMAGES } from '../data/restaurantData';

interface HeroSectionProps {
  onOpenReservation: () => void;
  onExploreMenu: () => void;
  onSelectFeaturedDish: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenReservation,
  onExploreMenu,
  onSelectFeaturedDish,
}) => {
  return (
    <section id="story" className="relative bg-[#071d15] text-[#e6ece8] overflow-hidden py-12 lg:py-20">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-900/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Clean Minimalist Editorial Intro */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs tracking-[0.25em] font-semibold text-[#d4a359] uppercase block">
              African Hearth & Gastronomy
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#fbf8f2] leading-[1.1] text-balance">
              Centuries of African Culinary Soul
            </h1>

            <p className="text-base sm:text-lg text-[#a9c2b4] max-w-xl font-light leading-relaxed">
              Ancestral firewood cooking, slow reductions, and single-origin savannah spices in an intimate emerald dining sanctuary.
            </p>

            {/* Chef Minimalist Byline */}
            <div className="flex items-center gap-4 py-2 border-y border-[#143d2e] max-w-lg">
              <span className="font-serif text-base font-semibold text-[#f5ebd9]">
                {RESTAURANT_INFO.chef.name}
              </span>
              <span className="text-xs text-[#8ea89c]">·</span>
              <span className="text-xs text-[#d4a359] font-medium">
                {RESTAURANT_INFO.chef.accolades}
              </span>
            </div>

            {/* Minimal Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenReservation}
                className="px-6 py-3 rounded-lg bg-[#d4a359] hover:bg-[#e6b567] text-[#071d15] font-semibold text-sm transition-all shadow-md flex items-center gap-2 group whitespace-nowrap"
              >
                <CalendarDays className="w-4 h-4 text-[#071d15]" />
                <span>Reserve a Table</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreMenu}
                className="px-6 py-3 rounded-lg bg-[#0e3326] hover:bg-[#154635] text-[#f4eee4] border border-[#235843] font-medium text-sm transition-all whitespace-nowrap"
              >
                View Menu
              </button>
            </div>
          </div>

          {/* Right Column: Real Food Photo - Firewood Smoked Jollof Rice */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square">
              <div className="w-full h-full rounded-3xl overflow-hidden border border-[#1b4b39] shadow-2xl relative group bg-[#0a271c]">
                
                {/* Real Jollof Rice Photo */}
                <img
                  src={DISH_IMAGES.jollof}
                  alt="Firewood Smoked Jollof Rice with Caramelized Plantain"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                  onClick={onSelectFeaturedDish}
                  title="Click to view details"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#071d15]/85 via-transparent to-transparent pointer-events-none" />

                {/* Minimalist Floating Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#09251c]/90 backdrop-blur-md border border-[#1d4c3a]">
                  <div className="flex items-center justify-between text-xs text-[#d4a359] font-medium mb-1">
                    <span className="flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-[#c85a32]" />
                      <span>Signature Hearth</span>
                    </span>
                    <span className="tabular-nums font-semibold text-white">£24.50</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white">
                    Firewood Smoked Jollof Rice
                  </h3>
                  <p className="text-xs text-[#a0b8ab] mt-1 font-light">
                    Aged rice, roasted pepper broth, caramelized plantain dodo.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
