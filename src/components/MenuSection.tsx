import React, { useState, useMemo } from 'react';
import { Search, Filter, Check, Plus, Eye, MessageCircle, X } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS, MenuItem } from '../data/restaurantData';

interface MenuSectionProps {
  onSelectDish: (dish: MenuItem) => void;
  onTogglePreSelect: (dishId: string) => void;
  preSelectedDishIds: string[];
  onOpenWhatsAppForDish: (dish: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectDish,
  onTogglePreSelect,
  preSelectedDishIds,
  onOpenWhatsAppForDish,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [currency, setCurrency] = useState<'GBP' | 'USD' | 'NGN'>('GBP');

  const currencyRate = {
    GBP: { symbol: '£', rate: 1.0 },
    USD: { symbol: '$', rate: 1.28 },
    NGN: { symbol: '₦', rate: 1950 },
  };

  const formatPrice = (priceGbp: number) => {
    const { symbol, rate } = currencyRate[currency];
    const converted = priceGbp * rate;
    if (currency === 'NGN') {
      return `${symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${symbol}${converted.toFixed(2)}`;
  };

  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((dish) => {
      if (selectedCategory !== 'all' && dish.category !== selectedCategory) {
        return false;
      }
      if (selectedDietary !== 'all') {
        if (selectedDietary === 'Spicy' && dish.spiceLevel === 0) return false;
        if (selectedDietary !== 'Spicy' && !dish.dietary.includes(selectedDietary as any)) {
          return false;
        }
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = dish.name.toLowerCase().includes(query);
        const matchesNative = dish.nativeName.toLowerCase().includes(query);
        const matchesRegion = dish.region.toLowerCase().includes(query);
        const matchesDesc = dish.description.toLowerCase().includes(query);
        return matchesName || matchesNative || matchesRegion || matchesDesc;
      }
      return true;
    });
  }, [selectedCategory, selectedDietary, searchQuery]);

  return (
    <section id="menu" className="py-16 bg-[#082218] text-[#e6ece8] relative border-t border-[#133c2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <span className="text-xs tracking-[0.25em] font-semibold text-[#d4a359] uppercase block">
            Menu
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#fbf7f0]">
            The Kitchen Collection
          </h2>
        </div>

        {/* Search & Minimal Filters Bar */}
        <div className="bg-[#0b2b20] border border-[#1b4b39] rounded-2xl p-4 shadow-xl mb-6 space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8ea89b] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search jollof, egusi, suya, plantain..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-[#071c14] border border-[#194634] focus:border-[#d4a359] focus:outline-none rounded-xl text-white placeholder-[#789688]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8ea89b] hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Currency */}
            <div className="flex items-center justify-end gap-1.5 bg-[#071c14] p-1 rounded-xl border border-[#194634] shrink-0">
              {(['GBP', 'USD', 'NGN'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                    currency === curr
                      ? 'bg-[#d4a359] text-[#071d15]'
                      : 'text-[#8ea89b] hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          {/* Clean Dietary Filters (No Halal pill) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {[
              { id: 'all', label: 'All' },
              { id: 'Vegan', label: 'Vegan' },
              { id: 'Gluten-Free', label: 'Gluten-Free' },
              { id: 'Spicy', label: 'Spicy 🌶️' },
              { id: 'Chef Signature', label: 'Signatures' },
            ].map((diet) => (
              <button
                key={diet.id}
                onClick={() => setSelectedDietary(diet.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium shrink-0 ${
                  selectedDietary === diet.id
                    ? 'bg-[#c85a32] text-white'
                    : 'bg-[#0e3527] text-[#a4c0b2] hover:text-white'
                }`}
              >
                {diet.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Category Bar */}
        <div className="sticky top-18 z-30 bg-[#082218]/95 backdrop-blur-md py-2.5 -mx-4 px-4 sm:mx-0 sm:px-0 mb-6 border-b border-[#143e30]">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all shrink-0 flex items-center gap-1.5 border ${
                    isActive
                      ? 'bg-[#d4a359] text-[#071d15] border-[#d4a359] font-semibold shadow-sm'
                      : 'bg-[#0c2c20] text-[#a9c5b7] border-[#184534] hover:bg-[#123d2e] hover:text-white'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean Menu Grid with real photo thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDishes.map((dish) => {
            const isPreSelected = preSelectedDishIds.includes(dish.id);

            return (
              <div
                key={dish.id}
                className="group bg-[#0b2b20] border border-[#184434] hover:border-[#d4a359]/60 rounded-2xl p-4 shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#8fa89b] mb-1.5">
                    <span className="font-medium text-[#d4a359] text-[11px] uppercase">
                      {dish.region}
                    </span>
                    {dish.spiceLevel > 0 && (
                      <span className="text-xs text-[#c85a32]">
                        {'🌶️'.repeat(dish.spiceLevel)}
                      </span>
                    )}
                  </div>

                  <div
                    onClick={() => onSelectDish(dish)}
                    className="cursor-pointer space-y-0.5 mb-2"
                  >
                    <h3 className="font-serif text-lg font-bold text-[#fbf7f0] group-hover:text-[#f3d89d] transition-colors leading-snug">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-[#c0a26d] font-light italic">
                      {dish.nativeName}
                    </p>
                  </div>

                  <p className="text-xs text-[#9eb6a9] font-light leading-relaxed line-clamp-2 mb-3">
                    {dish.description}
                  </p>
                </div>

                {/* Footer Strip */}
                <div className="pt-3 border-t border-[#153f30] flex items-center justify-between gap-2">
                  <span className="text-base font-serif font-bold text-white tabular-nums">
                    {formatPrice(dish.price)}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onSelectDish(dish)}
                      className="p-1.5 text-[#9bb8ab] hover:text-white bg-[#071d15] rounded-lg border border-[#194634]"
                      title="View details"
                      aria-label={`View details for ${dish.name}`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onOpenWhatsAppForDish(dish)}
                      className="p-1.5 text-emerald-400 hover:text-emerald-300 bg-[#071c14] rounded-lg border border-[#194634]"
                      title="Ask on WhatsApp"
                      aria-label={`Ask about ${dish.name} on WhatsApp`}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onTogglePreSelect(dish.id)}
                      className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1 ${
                        isPreSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#d4a359] text-[#071d15] hover:bg-[#eac074]'
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

      </div>
    </section>
  );
};
