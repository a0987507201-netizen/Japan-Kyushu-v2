import React, { useState, useEffect } from 'react';
import { X, Clock, MapPin, Camera, FileText, Tag, Trash2 } from 'lucide-react';
import { SpotItem } from '../types/travel';

interface SpotEditModalProps {
  isOpen: boolean;
  spot: SpotItem | null; // null means adding a new spot
  onClose: () => void;
  onSave: (spot: SpotItem) => void;
  onDelete?: (spotId: string) => void;
}

export const SpotEditModal: React.FC<SpotEditModalProps> = ({
  isOpen,
  spot,
  onClose,
  onSave,
  onDelete,
}) => {
  const [time, setTime] = useState('10:00');
  const [name, setName] = useState('');
  const [category, setCategory] = useState<SpotItem['category']>('scenic');
  const [notes, setNotes] = useState('');
  const [tips, setTips] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (spot) {
      setTime(spot.time);
      setName(spot.name);
      setCategory(spot.category);
      setNotes(spot.notes);
      setTips(spot.tips);
      setLocation(spot.location);
    } else {
      setTime('10:00');
      setName('');
      setCategory('scenic');
      setNotes('');
      setTips('');
      setLocation('');
    }
  }, [spot, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const updatedSpot: SpotItem = {
      id: spot ? spot.id : `spot-${Date.now()}`,
      time: time.trim() || '10:00',
      name: name.trim(),
      category,
      notes: notes.trim(),
      tips: tips.trim(),
      location: location.trim() || name.trim(),
      reviewQuery: `${name.trim()} 食記 評價`,
      mapCoord: spot ? spot.mapCoord : { x: 45, y: 50 },
    };

    onSave(updatedSpot);
    onClose();
  };

  const categories: { key: SpotItem['category']; label: string }[] = [
    { key: 'scenic', label: '自然景觀' },
    { key: 'culture', label: '神社人文' },
    { key: 'food', label: '特色美食' },
    { key: 'shopping', label: '購物逛街' },
    { key: 'hotel', label: '溫泉旅宿' },
    { key: 'flight', label: '航班飛機' },
    { key: 'car', label: '自駕交通' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#FAF8F5] rounded-3xl p-5 shadow-2xl border border-[#E8DFD8] max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD8]">
          <h2 className="text-base font-bold text-slate-800">
            {spot ? '編輯景點行程' : '新增自訂景點'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          {/* Time & Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#C86D56]" />
                建議時間
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="例如 09:30 或 14:00"
                className="w-full text-xs font-mono px-3 py-2 bg-white rounded-xl border border-[#E5DACF] focus:outline-none focus:ring-2 focus:ring-[#C86D56]/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-[#C86D56]" />
                類型分類
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as SpotItem['category'])}
                className="w-full text-xs px-3 py-2 bg-white rounded-xl border border-[#E5DACF] focus:outline-none focus:ring-2 focus:ring-[#C86D56]/40"
              >
                {categories.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Spot Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#C86D56]" />
              地點名稱 *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如 大觀峰 或 湯布院金賞可樂餅"
              className="w-full text-xs px-3 py-2 bg-white rounded-xl border border-[#E5DACF] focus:outline-none focus:ring-2 focus:ring-[#C86D56]/40"
            />
          </div>

          {/* Location / Google Maps query */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              地址或導航關鍵字
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="用於開啟 Google Maps 導航"
              className="w-full text-xs px-3 py-2 bg-white rounded-xl border border-[#E5DACF] focus:outline-none focus:ring-2 focus:ring-[#C86D56]/40"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              行程規劃與注意事項
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="記錄必玩項目、營業時間或備案注意事項..."
              className="w-full text-xs px-3 py-2 bg-white rounded-xl border border-[#E5DACF] focus:outline-none focus:ring-2 focus:ring-[#C86D56]/40 leading-relaxed"
            />
          </div>

          {/* Photo Tips */}
          <div>
            <label className="block text-xs font-semibold text-[#A8523D] mb-1 flex items-center gap-1">
              <Camera className="w-3.5 h-3.5 text-[#C86D56]" />
              拍照建議時間與手法
            </label>
            <input
              type="text"
              value={tips}
              onChange={(e) => setTips(e.target.value)}
              placeholder="例如：09:00 晨曦斜射光最佳、建議人像低角度仰拍"
              className="w-full text-xs px-3 py-2 bg-white rounded-xl border border-[#E5DACF] focus:outline-none focus:ring-2 focus:ring-[#C86D56]/40"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-[#E8DFD8]">
            {spot && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm('確定要從行程中刪除這個景點嗎？')) {
                    onDelete(spot.id);
                    onClose();
                  }
                }}
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>刪除景點</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 bg-white border border-[#E5DACF] rounded-xl hover:bg-slate-50 transition-colors"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#D9826D] to-[#C86D56] rounded-xl shadow-md shadow-[#C86D56]/20 hover:brightness-105 transition-all"
              >
                {spot ? '儲存變更' : '新增至行程'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
