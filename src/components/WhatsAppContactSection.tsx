import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { RESTAURANT_INFO, WHATSAPP_PRESETS } from '../data/restaurantData';

interface WhatsAppContactSectionProps {
  onOpenReservation: () => void;
}

export const WhatsAppContactSection: React.FC<WhatsAppContactSectionProps> = ({
  onOpenReservation,
}) => {
  const [customMessage, setCustomMessage] = useState('');

  const handleSendCustomWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMessage.trim()) return;

    const encoded = encodeURIComponent(customMessage.trim());
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encoded}`, '_blank');
  };

  const handleLaunchPreset = (presetText: string) => {
    const encoded = encodeURIComponent(presetText);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encoded}`, '_blank');
  };

  return (
    <section id="whatsapp-section" className="py-16 bg-[#061912] text-[#e6ece8] relative border-t border-[#133c2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs tracking-[0.25em] font-semibold text-emerald-400 uppercase block">
            Direct Concierge
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#fbf7f0]">
            WhatsApp Enquiries
          </h2>
          <p className="text-xs sm:text-sm text-[#9eb6a8] font-light">
            Fast replies for bookings, dietary questions, and events.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* WhatsApp Direct Action Card (7 cols) */}
          <div className="lg:col-span-7 bg-[#0b2b20] border border-[#1b4b39] rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#164132]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center text-white shadow-md">
                  <MessageCircle className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-white">
                    Direct WhatsApp
                  </h3>
                  <p className="text-xs text-[#a0baa9]">
                    {RESTAURANT_INFO.whatsappDisplay}
                  </p>
                </div>
              </div>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shadow-sm"
              >
                Chat Now
              </a>
            </div>

            {/* Quick Presets */}
            <div className="space-y-2">
              <span className="block text-[11px] uppercase tracking-wider font-semibold text-[#d4a359]">
                Quick Enquiry
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {WHATSAPP_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleLaunchPreset(preset.message)}
                    className="p-3 text-left rounded-xl bg-[#071c14] hover:bg-[#0e3527] border border-[#164132] hover:border-[#25D366]/40 transition-all text-xs"
                  >
                    <span className="font-medium text-[#f5ecd8] block">
                      {preset.title}
                    </span>
                    <span className="text-[10px] text-[#7d9b8e]">
                      {preset.badge} →
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Minimal Custom Message Form */}
            <form onSubmit={handleSendCustomWhatsApp} className="pt-2 border-t border-[#164132] space-y-2">
              <label className="block text-[11px] text-[#8ca89b]">Or type a quick message:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Table for 2 at 7:30 tonight?"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-[#071c14] border border-[#164132] rounded-xl text-white focus:outline-none focus:border-[#25D366]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] rounded-xl transition-all shrink-0 flex items-center gap-1.5"
                >
                  <span>Send</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </form>
          </div>

          {/* Minimal Info Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#0b2b20] border border-[#1b4b39] rounded-2xl p-6 shadow-xl space-y-4 text-xs">
            <h3 className="font-serif text-base font-bold text-white pb-2 border-b border-[#164132]">
              Hours & Location
            </h3>

            <div className="space-y-2 text-[#cad8d0]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4a359] shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#d4a359] shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-white">
                  {RESTAURANT_INFO.displayPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#d4a359] shrink-0" />
                <span>Dinner Service: Tue – Sun from 5:30 PM</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenReservation}
                className="w-full py-2.5 text-xs font-semibold text-[#071d15] bg-[#d4a359] hover:bg-[#e6b66b] rounded-xl transition-colors"
              >
                Online Table Reservation
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
