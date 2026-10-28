import React, { useState } from 'react';
import {
  X,
  CalendarDays,
  Clock,
  Users,
  MapPin,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Utensils,
  AlertCircle,
  Trash2,
} from 'lucide-react';
import { RESTAURANT_INFO, MENU_ITEMS, Reservation } from '../data/restaurantData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedDishIds: string[];
  onRemovePreSelectedDish: (dishId: string) => void;
  existingReservations: Reservation[];
  onSaveReservation: (reservation: Reservation) => void;
  onCancelReservation: (id: string) => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  preSelectedDishIds,
  onRemovePreSelectedDish,
  existingReservations,
  onSaveReservation,
  onCancelReservation,
}) => {
  const [activeTab, setActiveTab] = useState<'new' | 'existing'>('new');

  // Form states
  const [guests, setGuests] = useState<number>(2);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('19:30');
  const [seatingArea, setSeatingArea] = useState<'Heritage Hearth' | 'Emerald Courtyard' | "Chef's Tasting Counter">('Heritage Hearth');
  const [guestName, setGuestName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [occasion, setOccasion] = useState<string>('Casual Dining');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  if (!isOpen) return null;

  const preSelectedDishes = MENU_ITEMS.filter((item) => preSelectedDishIds.includes(item.id));

  // Time slots grouped by service
  const timeSlots = [
    { time: '12:30', period: 'Lunch', status: 'Example' },
    { time: '13:15', period: 'Lunch', status: 'Example' },
    { time: '14:00', period: 'Lunch', status: 'Example' },
    { time: '17:30', period: 'Sunset', status: 'Example' },
    { time: '18:15', period: 'Sunset', status: 'Example' },
    { time: '19:00', period: 'Dinner', status: 'Example' },
    { time: '19:30', period: 'Dinner', status: 'Example' },
    { time: '20:15', period: 'Dinner', status: 'Example' },
    { time: '21:00', period: 'Dinner', status: 'Example' },
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !phone || !email) return;

    const newReservation: Reservation = {
      id: `ZAM-${Math.floor(1000 + Math.random() * 9000)}`,
      guestName,
      email,
      phone,
      guests,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      seatingArea,
      occasion,
      specialRequests,
      preSelectedDishes: preSelectedDishIds,
      createdAt: new Date().toISOString(),
    };

    onSaveReservation(newReservation);
    setConfirmedReservation(newReservation);
  };

  const handleSendToWhatsApp = (res: Reservation) => {
    const text = `*Table Reservation Request - Zamani African Heritage Kitchen*
Reference: #${res.id}
Guest: ${res.guestName}
Party: ${res.guests} Guests
Date: ${res.date} at ${res.timeSlot}
Seating: ${res.seatingArea}
Occasion: ${res.occasion || 'Dining'}
${res.specialRequests ? `Special Requests: ${res.specialRequests}\n` : ''}
${res.preSelectedDishes && res.preSelectedDishes.length > 0 ? `Selected Dishes: ${res.preSelectedDishes.length} items` : ''}

Please confirm availability before this booking is considered accepted.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#09251c] border border-[#1c4b3a] rounded-3xl shadow-2xl overflow-hidden my-8 text-[#e6ece8]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#153f30] bg-[#071c14]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#12382b] border border-[#d4a359]/40 flex items-center justify-center text-[#d4a359]">
              <CalendarDays className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                Table Reservation Preview
              </h3>
              <p className="text-[11px] text-[#a1bcaf]">
                Zamani African Heritage Kitchen • London
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {existingReservations.length > 0 && !confirmedReservation && (
              <div className="flex items-center bg-[#0e3527] p-1 rounded-lg border border-[#1b4837] text-xs">
                <button
                  onClick={() => setActiveTab('new')}
                  className={`px-2.5 py-1 rounded font-medium ${
                    activeTab === 'new' ? 'bg-[#d4a359] text-[#071d15]' : 'text-[#a1bcaf]'
                  }`}
                >
                  Book New
                </button>
                <button
                  onClick={() => setActiveTab('existing')}
                  className={`px-2.5 py-1 rounded font-medium ${
                    activeTab === 'existing' ? 'bg-[#d4a359] text-[#071d15]' : 'text-[#a1bcaf]'
                  }`}
                >
                  My Bookings ({existingReservations.length})
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-[#a1bcaf] hover:text-white rounded-lg hover:bg-[#143e30] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          
          {/* View Existing Bookings Tab */}
          {activeTab === 'existing' && !confirmedReservation ? (
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-semibold text-white">Saved Reservation Drafts</h4>
              {existingReservations.map((res) => (
                <div
                  key={res.id}
                  className="p-4 rounded-2xl bg-[#0c2e22] border border-[#1b4b39] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#d4a359]">
                        #{res.id}
                      </span>
                      <span className="text-xs text-[#8ca89b]">·</span>
                      <span className="text-sm font-semibold text-white">
                        {res.guests} Guests
                      </span>
                    </div>
                    <p className="text-xs text-[#cad8d0]">
                      {res.date} at {res.timeSlot} • {res.seatingArea}
                    </p>
                    <p className="text-[11px] text-[#8ca89b]">
                      Booked under {res.guestName} ({res.phone})
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSendToWhatsApp(res)}
                      className="px-3 py-1.5 text-xs font-medium text-emerald-300 bg-[#123e2f] border border-emerald-500/30 rounded-lg hover:bg-[#164e3a] transition-colors flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Send via WhatsApp</span>
                    </button>
                    <button
                      onClick={() => onCancelReservation(res.id)}
                      className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-lg transition-colors"
                      title="Cancel Reservation"
                      aria-label="Cancel reservation"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setActiveTab('new')}
                className="w-full py-2.5 text-xs font-semibold text-[#071d15] bg-[#d4a359] hover:bg-[#e4b568] rounded-xl transition-colors"
              >
                Make Another Reservation
              </button>
            </div>
          ) : confirmedReservation ? (
            /* Confirmation Screen */
            <div className="py-6 text-center space-y-5 animate-in fade-in duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-900/40 border-2 border-emerald-500/80 mx-auto flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-[#d4a359] font-bold">
                  Request Draft Saved
                </span>
                <h4 className="font-serif text-3xl font-bold text-white">
                  Almost There
                </h4>
                <p className="text-xs text-[#a0baa9] max-w-md mx-auto">
                  Your details are saved on this device only. Send the request on WhatsApp and await confirmation from the restaurant. 
                  Draft Reference: <strong className="text-[#f5ecd8] font-mono">#{confirmedReservation.id}</strong>
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-[#0c2e22] border border-[#1b4b39] rounded-2xl p-5 text-left max-w-md mx-auto space-y-3 text-xs">
                <div className="flex justify-between border-b border-[#174131] pb-2">
                  <span className="text-[#8ca89b]">Guest Name:</span>
                  <span className="font-semibold text-white">{confirmedReservation.guestName}</span>
                </div>
                <div className="flex justify-between border-b border-[#174131] pb-2">
                  <span className="text-[#8ca89b]">Date & Time:</span>
                  <span className="font-semibold text-white">
                    {confirmedReservation.date} at {confirmedReservation.timeSlot}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#174131] pb-2">
                  <span className="text-[#8ca89b]">Party Size:</span>
                  <span className="font-semibold text-white">{confirmedReservation.guests} Guests</span>
                </div>
                <div className="flex justify-between border-b border-[#174131] pb-2">
                  <span className="text-[#8ca89b]">Atmosphere:</span>
                  <span className="font-semibold text-white">{confirmedReservation.seatingArea}</span>
                </div>
                {confirmedReservation.preSelectedDishes && confirmedReservation.preSelectedDishes.length > 0 && (
                  <div className="border-b border-[#174131] pb-2">
                    <span className="text-[#8ca89b] block mb-1">Selected Dishes:</span>
                    <span className="font-medium text-[#d4a359]">
                      {confirmedReservation.preSelectedDishes.length} course(s) requested
                    </span>
                  </div>
                )}
                <div className="text-[11px] text-[#8ca89b] italic pt-1">
                  Dress code: Smart Casual • Dietary adjustments can be communicated to your server.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
                <button
                  onClick={() => handleSendToWhatsApp(confirmedReservation)}
                  className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Request via WhatsApp</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-[#071d15] bg-[#d4a359] hover:bg-[#ebbe73] rounded-xl transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              
              {/* Step 1: Party Size & Date */}
              <div className="space-y-3">
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#d4a359]">
                  1. Party Size & Preferred Date
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Party Size Buttons */}
                  <div>
                    <span className="block text-xs text-[#8ca89b] mb-1.5">Number of Guests:</span>
                    <div className="grid grid-cols-6 gap-1 bg-[#071c14] p-1 rounded-xl border border-[#164132]">
                      {[1, 2, 3, 4, 6, 8].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setGuests(num)}
                          className={`py-2 text-xs font-bold rounded-lg transition-all ${
                            guests === num
                              ? 'bg-[#d4a359] text-[#071d15] shadow-sm'
                              : 'text-[#a0baa9] hover:text-white'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date Input */}
                  <div>
                    <span className="block text-xs text-[#8ca89b] mb-1.5">Date:</span>
                    <input
                      type="date"
                      value={selectedDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-xs bg-[#071c14] border border-[#164132] rounded-xl text-white focus:outline-none focus:border-[#d4a359]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Time Slot */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#d4a359]">
                  2. Select Time Slot
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot.time)}
                        className={`p-2 rounded-xl text-center border transition-all ${
                          isSelected
                            ? 'bg-[#d4a359] text-[#071d15] border-[#d4a359] shadow-md font-bold'
                            : 'bg-[#071c14] border-[#164132] text-[#c0d8cc] hover:bg-[#0d3326]'
                        }`}
                      >
                        <span className="block text-xs font-semibold tabular-nums">{slot.time}</span>
                        <span className={`block text-[10px] ${isSelected ? 'text-[#071d15]/80' : 'text-[#7d9b8e]'}`}>
                          {slot.period}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Seating Atmosphere */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#d4a359]">
                  3. Dining Atmosphere & Seating Area
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'Heritage Hearth',
                      title: 'The Heritage Hearth',
                      desc: 'Intimate dining room with soft ambient kora music',
                    },
                    {
                      id: 'Emerald Courtyard',
                      title: 'Emerald Courtyard',
                      desc: 'Heated glasshouse patio surrounded by tropical palms',
                    },
                    {
                      id: "Chef's Tasting Counter",
                      title: "Chef's Kitchen Counter",
                      desc: 'Direct view of the firewood embers & plating station',
                    },
                  ].map((area) => (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => setSeatingArea(area.id as any)}
                      className={`p-3 text-left rounded-xl border transition-all ${
                        seatingArea === area.id
                          ? 'bg-[#0e3a2b] border-[#d4a359] text-white shadow-sm'
                          : 'bg-[#071c14] border-[#164132] text-[#9eb6a9] hover:bg-[#0c2e22]'
                      }`}
                    >
                      <span className="block text-xs font-bold text-[#f5ecd8]">{area.title}</span>
                      <span className="block text-[11px] text-[#8ca89b] mt-0.5">{area.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional: Pre-Selected Courses Badge */}
              {preSelectedDishes.length > 0 && (
                <div className="p-3.5 rounded-xl bg-[#0c2e22] border border-[#1b4b39] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#d4a359] flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5" />
                      <span>Pre-selected Courses ({preSelectedDishes.length})</span>
                    </span>
                    <span className="text-[11px] text-[#8ca89b]">Selection for your request</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {preSelectedDishes.map((dish) => (
                      <span
                        key={dish.id}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#071c14] border border-[#1b4b39] text-xs text-[#c0d8cc]"
                      >
                        <span>{dish.name}</span>
                        <button
                          type="button"
                          onClick={() => onRemovePreSelectedDish(dish.id)}
                          className="text-[#8ca89b] hover:text-red-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Contact Information */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#d4a359]">
                  4. Lead Guest Details
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#8ca89b] mb-1">Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Amara Okafor"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-xs bg-[#071c14] border border-[#164132] rounded-xl text-white focus:outline-none focus:border-[#d4a359]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#8ca89b] mb-1">Phone Number (for SMS & WhatsApp) *</label>
                    <input
                      type="tel"
                      placeholder="e.g. +44 7700 900123"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-xs bg-[#071c14] border border-[#164132] rounded-xl text-white focus:outline-none focus:border-[#d4a359]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#8ca89b] mb-1">Email Address *</label>
                    <input
                      type="email"
                      placeholder="amara@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-xs bg-[#071c14] border border-[#164132] rounded-xl text-white focus:outline-none focus:border-[#d4a359]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#8ca89b] mb-1">Occasion</label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#071c14] border border-[#164132] rounded-xl text-white focus:outline-none focus:border-[#d4a359]"
                    >
                      <option value="Casual Dining">Casual Dining</option>
                      <option value="Birthday Celebration">Birthday Celebration</option>
                      <option value="Anniversary">Romantic Anniversary</option>
                      <option value="Business Dinner">Business Dinner</option>
                      <option value="Family Gathering">Family Gathering</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-[#8ca89b] mb-1">
                    Special Requests or Dietary Restrictions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Nut allergies, mild spice preference for elderly diner, birthday candle..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#071c14] border border-[#164132] rounded-xl text-white focus:outline-none focus:border-[#d4a359]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3 border-t border-[#153f30] flex items-center justify-between gap-4">
                <span className="text-[11px] text-[#7d9b8e]">
                  Demo: no live availability or automatic confirmation
                </span>
                <button
                  type="submit"
                  className="px-6 py-3 text-xs sm:text-sm font-semibold text-[#071d15] bg-[#d4a359] hover:bg-[#e6b66b] rounded-xl transition-all shadow-lg flex items-center gap-2 whitespace-nowrap"
                >
                  <span>Save Reservation Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
