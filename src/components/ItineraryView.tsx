import React, { useState } from 'react';
import {
  Clock,
  MapPin,
  ExternalLink,
  Camera,
  Plus,
  Edit3,
  Building,
  Navigation,
  Utensils,
  Car,
  Plane,
  Sparkles,
  Thermometer,
  CloudSun,
  Leaf,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { DaySchedule, HotelItem, SpotItem } from '../types/travel';
import { SpotEditModal } from './SpotEditModal';

interface ItineraryViewProps {
  day: DaySchedule;
  hotel?: HotelItem;
  onUpdateSpot: (dayId: string, spot: SpotItem) => void;
  onAddSpot: (dayId: string, spot: SpotItem) => void;
  onDeleteSpot: (dayId: string, spotId: string) => void;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({
  day,
  hotel,
  onUpdateSpot,
  onAddSpot,
  onDeleteSpot,
}) => {
  const [editingSpot, setEditingSpot] = useState<SpotItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getCategoryIcon = (category: SpotItem['category']) => {
    switch (category) {
      case 'flight':
        return <Plane className="w-3.5 h-3.5 text-sky-600" />;
      case 'car':
        return <Car className="w-3.5 h-3.5 text-emerald-600" />;
      case 'food':
        return <Utensils className="w-3.5 h-3.5 text-amber-600" />;
      case 'hotel':
        return <Building className="w-3.5 h-3.5 text-indigo-600" />;
      case 'shopping':
        return <Sparkles className="w-3.5 h-3.5 text-pink-600" />;
      case 'culture':
        return <Leaf className="w-3.5 h-3.5 text-red-600" />;
      default:
        return <MapPin className="w-3.5 h-3.5 text-[#C86D56]" />;
    }
  };

  const handleEdit = (spot: SpotItem) => {
    setEditingSpot(spot);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingSpot(null);
    setIsModalOpen(true);
  };

  const handleSaveSpot = (spot: SpotItem) => {
    if (editingSpot) {
      onUpdateSpot(day.id, spot);
    } else {
      onAddSpot(day.id, spot);
    }
  };

  const openGoogleMaps = (query: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openReviews = (query: string) => {
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-4 pb-20 animate-in fade-in duration-300">
      {/* Day Overview Banner Card */}
      <div className="glass-card rounded-3xl p-4.5 bg-gradient-to-br from-[#FFFDFB] via-[#FAF4F0] to-[#F7EBE8]/50 border border-[#EADBCE] shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-[#C86D56] bg-[#F7EBE8] px-2.5 py-0.5 rounded-full">
              {day.dateLabel} {day.weekday}
            </span>
            <span className="text-xs text-slate-500 font-medium">{day.area}</span>
          </div>

          {/* Foliage Badge */}
          <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#A8523D] bg-orange-100/70 px-2 py-0.5 rounded-full border border-orange-200">
            <span>🍁</span>
            <span>{day.forecast.foliageStatus}</span>
          </div>
        </div>

        <h2 className="text-base font-bold text-slate-800 tracking-tight leading-snug">
          {day.title}
        </h2>

        {/* Weather & Outfit Tips Bar */}
        <div className="mt-3 grid grid-cols-1 gap-2 pt-2.5 border-t border-[#E8DFD8]">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <CloudSun className="w-4 h-4 text-[#D9A05B]" />
              <span className="font-medium">{day.forecast.condition}</span>
            </div>
            <div className="flex items-center gap-1 font-mono tabular-nums font-semibold text-slate-700">
              <Thermometer className="w-3.5 h-3.5 text-[#C86D56]" />
              <span>{day.forecast.tempMin}°C ~ {day.forecast.tempMax}°C</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-600 bg-white/70 p-2.5 rounded-2xl border border-[#EDE2D8] leading-relaxed">
            <span className="font-bold text-[#A8523D]">🧣 穿搭與行李提醒：</span>
            <span>{day.outfitTip}</span>
          </div>
        </div>
      </div>

      {/* Spots Timeline Section Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-4 rounded-full bg-[#C86D56]" />
          <h3 className="text-sm font-bold text-slate-800">當日行程時間軸</h3>
          <span className="text-xs font-mono text-slate-400">({day.spots.length} 個地點)</span>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-[#D9826D] to-[#C86D56] rounded-xl shadow-sm shadow-[#C86D56]/20 hover:brightness-105 active:scale-95 transition-all"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>新增地點</span>
        </button>
      </div>

      {/* Timeline List */}
      <div className="relative pl-3 space-y-3.5">
        {/* Continuous Timeline Vertical Line */}
        <div className="absolute left-[23px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#E28872] via-[#E8DFD8] to-[#E28872]/40 -z-10" />

        {day.spots.map((spot, index) => (
          <div key={spot.id} className="relative flex items-start gap-3 group">
            {/* Timeline Dot Node */}
            <div className="shrink-0 w-6 h-6 rounded-full bg-white border-2 border-[#C86D56] flex items-center justify-center shadow-sm mt-3 z-10">
              {getCategoryIcon(spot.category)}
            </div>

            {/* Spot Card */}
            <div className="flex-1 glass-card rounded-2xl p-3.5 border border-[#EADBCE] hover:border-[#D9826D]/50 transition-all shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[#F7EBE8] text-[#C86D56] text-[11px] font-mono font-bold">
                    <Clock className="w-3 h-3" />
                    <span>{spot.time}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 mt-1 leading-snug">
                    {spot.name}
                  </h4>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => handleEdit(spot)}
                  className="p-1.5 text-slate-400 hover:text-[#C86D56] rounded-lg hover:bg-slate-100 transition-colors"
                  title="編輯景點"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Notes */}
              {spot.notes && (
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {spot.notes}
                </p>
              )}

              {/* Photography tips & precautions */}
              {spot.tips && (
                <div className="mt-2.5 p-2.5 rounded-xl bg-gradient-to-r from-[#FAF2EE] to-[#FDF5F2] border border-[#F2DFD5] text-xs">
                  <div className="flex items-start gap-1.5 text-[#A8523D]">
                    <Camera className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#C86D56]" />
                    <span className="font-medium leading-relaxed">{spot.tips}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons: Google Maps & Food Reviews */}
              <div className="mt-3 pt-2.5 border-t border-[#F0E6DE] flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 truncate max-w-[170px]">
                  <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
                  <span className="truncate">{spot.location}</span>
                </div>

                <div className="flex items-center gap-2">
                  {spot.reviewQuery && (
                    <button
                      onClick={() => openReviews(spot.reviewQuery!)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-amber-800 bg-amber-50 hover:bg-amber-100/80 rounded-lg border border-amber-200 transition-colors"
                    >
                      <Utensils className="w-3 h-3 text-amber-600" />
                      <span>查看食記</span>
                    </button>
                  )}

                  <button
                    onClick={() => openGoogleMaps(spot.location)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-[#C86D56] bg-white hover:bg-[#F7EBE8] rounded-lg border border-[#EBDCD3] transition-colors shadow-2xs"
                  >
                    <Navigation className="w-3 h-3 text-[#C86D56]" />
                    <span>Google Maps</span>
                    <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tonight's Selected Hotel Accommodation Card */}
      {hotel && (
        <div className="mt-6 pt-2">
          <div className="flex items-center gap-1.5 mb-2.5 px-1">
            <span className="w-1.5 h-4 rounded-full bg-amber-600" />
            <h3 className="text-sm font-bold text-slate-800">今晚精選旅宿</h3>
            {hotel.mealPlan ? (
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                hotel.mealPlan.includes('二食')
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : hotel.mealPlan.startsWith('純住宿') || hotel.mealPlan.includes('不含早餐')
                  ? 'bg-slate-100 text-slate-800 border border-slate-300'
                  : hotel.mealPlan.includes('含早餐') || hotel.mealPlan.includes('早餐')
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : 'bg-slate-100 text-slate-800 border border-slate-300'
              }`}>
                {hotel.mealPlan.includes('二食')
                  ? '一泊二食 (早晚餐)'
                  : hotel.mealPlan.startsWith('純住宿') || hotel.mealPlan.includes('不含早餐')
                  ? '純住宿'
                  : hotel.mealPlan.includes('含早餐') || hotel.mealPlan.includes('早餐')
                  ? '含早餐'
                  : '純住宿'}
              </span>
            ) : (
              <span className="text-xs bg-amber-100 text-amber-800 font-medium px-2 py-0.5 rounded-md">
                一泊享受
              </span>
            )}
          </div>

          <div className="glass-card rounded-3xl p-4 bg-gradient-to-br from-[#FFFDF9] via-[#FAF6F0] to-[#F5ECE4] border border-[#E5DACF] shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold text-amber-800 tracking-wider uppercase">
                  Accomodation
                </span>
                <h4 className="text-sm font-bold text-slate-800 mt-0.5 leading-snug">
                  {hotel.name}
                </h4>
                <p className="text-xs text-slate-500 font-mono mt-0.5">{hotel.jpName}</p>
              </div>

              <button
                onClick={() => openGoogleMaps(hotel.address)}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-amber-900 bg-amber-100/80 hover:bg-amber-200 rounded-xl border border-amber-300/80 transition-colors shrink-0 shadow-2xs"
              >
                <Navigation className="w-3 h-3 text-amber-700" />
                <span>飯店導航</span>
              </button>
            </div>

            {/* Check-in / Out Time Badges */}
            <div className="mt-2.5 flex items-center flex-wrap gap-2 text-xs font-mono">
              <span className="bg-white/80 px-2 py-0.5 rounded-lg border border-[#E8DFD8] text-slate-600">
                入住: <strong className="text-slate-800">{hotel.checkIn}</strong>
              </span>
              <span className="bg-white/80 px-2 py-0.5 rounded-lg border border-[#E8DFD8] text-slate-600">
                退房: <strong className="text-slate-800">{hotel.checkOut}</strong>
              </span>
            </div>

            {/* Meal Plan Remarks */}
            {hotel.mealPlan && (
              <div className="mt-2.5 flex items-center gap-2 p-2 rounded-xl bg-amber-50/90 border border-amber-200/90 text-xs">
                <span className="font-bold text-amber-900 flex items-center gap-1 shrink-0">
                  <Utensils className="w-3.5 h-3.5 text-amber-700" />
                  餐食專案：
                </span>
                <span className="font-medium text-amber-950 font-sans">
                  {hotel.mealPlan}
                </span>
              </div>
            )}

            <div className="text-xs text-slate-500 mt-2 flex items-start gap-1">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400 mt-0.5" />
              <span>{hotel.address}</span>
            </div>

            {/* Hotel Services */}
            <div className="mt-3 pt-2.5 border-t border-[#EDE2D8]">
              <span className="text-[11px] font-bold text-slate-700">🏨 飯店提供服務：</span>
              <ul className="mt-1 space-y-1 text-xs text-slate-600">
                {hotel.services.map((service, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hotel Highlights (必玩、必吃、必體驗) */}
            <div className="mt-3 pt-2.5 border-t border-[#EDE2D8]">
              <span className="text-[11px] font-bold text-[#A8523D]">✨ 必玩、必吃、必體驗項目：</span>
              <ul className="mt-1.5 space-y-1.5 text-xs">
                {hotel.highlights.map((hl, idx) => (
                  <li key={idx} className="p-2 rounded-xl bg-white/70 border border-[#EDE2D8] text-slate-700 leading-relaxed font-medium">
                    {hl}
                  </li>
                ))}
              </ul>
            </div>

            {hotel.notes && (
              <div className="mt-2.5 p-2 rounded-xl bg-amber-50/80 border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                <span className="font-bold">💡 貼心提醒：</span>
                {hotel.notes}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Spot Add / Edit Modal */}
      <SpotEditModal
        isOpen={isModalOpen}
        spot={editingSpot}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveSpot}
        onDelete={(spotId) => onDeleteSpot(day.id, spotId)}
      />
    </div>
  );
};
