import React, { useState } from 'react';
import { Plus, Check, Eye } from 'lucide-react';
import { MENU_ITEMS, MenuItem, DISH_IMAGES } from '../data/restaurantData';

interface DailySpecialsSectionProps {
  onSelectDish: (dish: MenuItem) => void;
  onTogglePreSelect: (dishId: string) => void;
  preSelectedDishIds: string[];
  onOpenReservation: () => void;
}

export const DailySpecialsSection: React.FC<DailySpecialsSectionProps> = ({
  onSelectDish,
  onTogglePreSelect,
  preSelectedDishIds,
  onOpenReservation,
}) => {
  const [activeTab, setActiveTab] = useState<'tasting' | 'claypot' | 'grill'>('tasting');

  const filteredItems = MENU_ITEMS.filter((item) => {
    if (activeTab === 'tasting') return item.isDailySpecial;
    if (activeTab === 'claypot') return item.category === 'soups-swallows';
    if (activeTab === 'grill') return item.category === 'hearth-grill';
    return true;
  });

  return (
    <section id="specials" className="py-16 bg-[#09241b] text-[#e6ece8] relative border-t border-[#133c2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs tracking-[0.25em] font-semibold text-[#d4a359] uppercase block mb-1">
              Daily Board
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#fcf9f2]">
              Hearth Selections
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-[#071c14] p-1 rounded-lg border border-[#153f30]">
            <button
              onClick={() => setActiveTab('tasting')}
              className={`px-3 py-1.5 text-xs rounded-md transition-all ${
                activeTab === 'tasting'
                  ? 'bg-[#d4a359] text-[#071d15] font-semibold'
                  : 'text-[#96b3a5] hover:text-white'
              }`}
            >
              Signatures
            </button>
            <button
              onClick={() => setActiveTab('claypot')}
              className={`px-3 py-1.5 text-xs rounded-md transition-all ${
                activeTab === 'claypot'
                  ? 'bg-[#d4a359] text-[#071d15] font-semibold'
                  : 'text-[#96b3a5] hover:text-white'
              }`}
            >
              Clay Pots
            </button>
            <button
              onClick={() => setActiveTab('grill')}
              className={`px-3 py-1.5 text-xs rounded-md transition-all ${
                activeTab === 'grill'
                  ? 'bg-[#d4a359] text-[#071d15] font-semibold'
                  : 'text-[#96b3a5] hover:text-white'
              }`}
            >
              Suya Grill
            </button>
          </div>
        </div>

        {/* 2-Column Split: Real Food Photo + Minimal Menu Slate */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Real Food Photo */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden border border-[#1b4937] shadow-xl group bg-[#071c14]">
              <img
                src={
                  activeTab === 'claypot'
                    ? DISH_IMAGES.egusi
                    : activeTab === 'grill'
                    ? DISH_IMAGES.suya
                    : DISH_IMAGES.jollof
                }
                alt="Real African Dish"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071d15]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="text-xs font-serif font-bold text-white block">
                  {activeTab === 'claypot'
                    ? 'Clay Pot Egusi & Pounded Yam'
                    : activeTab === 'grill'
                    ? 'Woodfire Beef Sirloin Suya'
                    : 'Firewood Smoked Jollof Rice'}
                </span>
                <span className="text-[11px] text-[#d4a359] font-medium">
                  Fresh Daily Preparation
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Slate List */}
          <div className="lg:col-span-7 bg-[#0b2b20]/90 border border-[#1b4937] rounded-2xl p-6 shadow-xl">
            <div className="space-y-4">
              {filteredItems.slice(0, 3).map((dish) => {
                const isPreSelected = preSelectedDishIds.includes(dish.id);

                return (
                  <div
                    key={dish.id}
                    className="group p-3.5 rounded-xl bg-[#0e3527]/60 hover:bg-[#124231] border border-[#1a4736] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onSelectDish(dish)}>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-base font-semibold text-[#f5ecd8] group-hover:text-[#f3d89d] transition-colors truncate">
                          {dish.name}
                        </h4>
                        {dish.spiceLevel > 0 && (
                          <span className="text-xs text-[#c85a32]">
                            {'🌶️'.repeat(dish.spiceLevel)}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#a0baad] font-light line-clamp-1 mt-0.5">
                        {dish.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1a4534]">
                      <span className="text-sm font-serif font-bold text-[#f5ecd8] tabular-nums">
                        £{dish.price.toFixed(2)}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onSelectDish(dish)}
                          className="p-1.5 text-xs text-[#a3c0b2] hover:text-white bg-[#071d15] rounded-lg border border-[#1a4736]"
                          aria-label={`View details for ${dish.name}`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onTogglePreSelect(dish.id)}
                          className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1 ${
                            isPreSelected
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#184434] text-[#d4a359] hover:bg-[#d4a359] hover:text-[#071d15]'
                          }`}
                        >
                          {isPreSelected ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3 h-3" />
                              <span>Pre-order</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-[#174131] flex items-center justify-between">
              <span className="text-xs text-[#90aca0]">Ready to book?</span>
              <button
                onClick={onOpenReservation}
                className="px-4 py-2 text-xs font-semibold text-[#071d15] bg-[#d4a359] hover:bg-[#ebbe73] rounded-lg transition-colors"
              >
                Reserve Table
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
