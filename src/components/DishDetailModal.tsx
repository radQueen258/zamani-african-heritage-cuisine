import React from 'react';
import {
  X,
  Flame,
  Wine,
  Clock,
  MessageCircle,
  Plus,
  Check,
  MapPin,
} from 'lucide-react';
import { MenuItem } from '../data/restaurantData';

interface DishDetailModalProps {
  dish: MenuItem | null;
  onClose: () => void;
  onTogglePreSelect: (dishId: string) => void;
  isPreSelected: boolean;
  onOpenWhatsApp: (presetText?: string) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  onTogglePreSelect,
  isPreSelected,
  onOpenWhatsApp,
}) => {
  if (!dish) return null;

  const handleAskOnWhatsApp = () => {
    const text = `Hi Chef Folake! I am exploring your menu and have a question regarding "${dish.name}" (${dish.nativeName}). Could you share more about the spice level and preparation?`;
    onOpenWhatsApp(text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0a291f] border border-[#1b4b39] rounded-3xl shadow-2xl overflow-hidden my-8 text-[#e6ece8]">
        
        {/* Header Cover Bar */}
        <div className="relative h-44 bg-gradient-to-tr from-[#071c14] to-[#124231] p-6 flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4a359]/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between relative z-10">
            <span className="text-[11px] uppercase tracking-widest font-semibold text-[#d4a359] bg-[#071c14]/80 px-2.5 py-1 rounded-full border border-[#d4a359]/30 flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              <span>{dish.region}</span>
            </span>

            <button
              onClick={onClose}
              className="p-1.5 text-[#a1bcaf] hover:text-white rounded-full bg-[#071c14]/80 hover:bg-[#12382b] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative z-10">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
              {dish.name}
            </h3>
            <p className="text-xs text-[#d4a359] font-medium italic mt-0.5">
              {dish.nativeName}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          
          {/* Price & Spice Strip */}
          <div className="flex items-center justify-between pb-4 border-b border-[#164132]">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-serif font-bold text-white tabular-nums">
                £{dish.price.toFixed(2)}
              </span>
              <span className="text-xs text-[#8ca89b]">/ course</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs text-[#c85a32]">
                <Flame className="w-4 h-4" />
                <span className="font-medium">
                  {dish.spiceLevel === 0 ? 'Mild' : `Heat: ${'🌶️'.repeat(dish.spiceLevel)}`}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#8ca89b]">
                <Clock className="w-3.5 h-3.5" />
                <span>{dish.prepTime}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#d4a359]">
              Ancestral Recipe Story
            </h4>
            <p className="text-xs sm:text-sm text-[#b8cdbf] leading-relaxed font-light">
              {dish.description}
            </p>
          </div>

          {/* Ingredients list */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#d4a359]">
              Ethically Sourced Ingredients
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {dish.ingredients.map((ing, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-[#071c14] border border-[#164132] text-xs text-[#cad8d0]"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Wine / Beverage Pairing (if available) */}
          {dish.winePairing && (
            <div className="p-3.5 rounded-xl bg-[#0e3527] border border-[#1d4c3a] flex items-center gap-3">
              <Wine className="w-5 h-5 text-[#d4a359] shrink-0" />
              <div className="text-xs">
                <span className="font-semibold text-[#f5ebd8] block">
                  Sommelier Pairing:
                </span>
                <span className="text-[#a0baa9]">{dish.winePairing}</span>
              </div>
            </div>
          )}

          {/* Dietary Compliance */}
          <div className="flex items-center gap-2 text-xs text-[#8ca89b]">
            <span>
              Tags: {dish.dietary.join(' • ')}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-[#164132] flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => onTogglePreSelect(dish.id)}
              className={`w-full sm:flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                isPreSelected
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#d4a359] hover:bg-[#e6b66b] text-[#071d15] shadow-md'
              }`}
            >
              {isPreSelected ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Reservation</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Pre-order Course</span>
                </>
              )}
            </button>

            <button
              onClick={handleAskOnWhatsApp}
              className="w-full sm:w-auto py-2.5 px-4 rounded-xl text-xs font-medium text-emerald-300 bg-[#071c14] border border-emerald-500/40 hover:bg-[#12382b] transition-colors flex items-center justify-center gap-2 shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Ask on WhatsApp</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
