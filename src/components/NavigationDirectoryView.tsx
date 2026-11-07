import React, { useState } from 'react';
import { Search, MapPin, Navigation, ExternalLink, Utensils, Sparkles } from 'lucide-react';
import { BackupRestaurant } from '../types/travel';

interface NavigationDirectoryViewProps {
  restaurants: BackupRestaurant[];
}

export const NavigationDirectoryView: React.FC<NavigationDirectoryViewProps> = ({
  restaurants,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const regions = [
    'all',
    '阿蘇',
    '高千穗',
    '別府/大分',
    '由布院',
    '添田/英彥山',
    '北九州',
    '福岡/博多',
    '熊本',
  ];

  const filteredRestaurants = restaurants.filter((r) => {
    const matchesRegion = selectedRegion === 'all' || r.region === selectedRegion;
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const openGoogleMaps = (search: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(search)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openReviews = (name: string) => {
    const url = `https://www.google.com/search?q=${encodeURIComponent(name + ' 食記 必吃 推薦')}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-3.5 pb-20 animate-in fade-in duration-300">
      {/* Directory Introduction Card */}
      <div className="glass-card rounded-3xl p-4 bg-gradient-to-br from-[#FFFDF9] to-[#FAF2EC] border border-[#EADBCE]">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-7 h-7 rounded-lg bg-[#F7EBE8] text-[#C86D56] flex items-center justify-center font-bold">
            🍽️
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">
              分區導航與精選備用餐廳庫
            </h2>
            <p className="text-[11px] text-slate-500">
              共收錄 {restaurants.length} 間九州頂級和牛、鄉土料理與米其林名店
            </p>
          </div>
        </div>

        {/* Search input */}
        <div className="relative mt-2.5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜尋餐廳名稱、料理（如：赤牛丼、地獄蒸布丁、牛腸鍋）..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-white rounded-xl border border-[#E5DACF] focus:outline-none focus:ring-2 focus:ring-[#C86D56]/30 shadow-2xs"
          />
        </div>

        {/* Region Filter Tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-3 -mx-1 px-1">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`shrink-0 px-2.5 py-1 rounded-xl text-xs transition-all ${
                selectedRegion === region
                  ? 'bg-[#C86D56] text-white font-bold shadow-sm'
                  : 'bg-white/80 text-slate-600 border border-[#E5DACF] hover:bg-white'
              }`}
            >
              {region === 'all' ? '全部地區' : region}
            </button>
          ))}
        </div>
      </div>

      {/* Restaurant List Count */}
      <div className="flex items-center justify-between px-1 text-xs text-slate-500 font-medium">
        <span>
          顯示 {filteredRestaurants.length} 間餐廳
          {selectedRegion !== 'all' && ` · ${selectedRegion}`}
        </span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-[#C86D56] hover:underline"
          >
            清除搜尋
          </button>
        )}
      </div>

      {/* Restaurant Cards */}
      <div className="space-y-3">
        {filteredRestaurants.map((res) => (
          <div
            key={res.id}
            className="glass-card rounded-2xl p-3.5 border border-[#EADBCE] hover:border-[#C86D56]/40 transition-all shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-[#C86D56] bg-[#F7EBE8] px-2 py-0.5 rounded-md">
                    {res.region}
                  </span>
                  <span className="text-xs font-bold text-amber-800">
                    {res.specialty}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-800 mt-1 leading-snug">
                  {res.name}
                </h3>
              </div>

              {/* Fast Map Button */}
              <button
                onClick={() => openGoogleMaps(res.searchQuery)}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#C86D56] bg-white hover:bg-[#F7EBE8] rounded-xl border border-[#EBDCD3] transition-colors shrink-0 shadow-2xs"
              >
                <Navigation className="w-3 h-3 text-[#C86D56]" />
                <span>地圖導航</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {res.notes}
            </p>

            {/* Bottom Actions */}
            <div className="mt-3 pt-2 border-t border-[#F0E6DE] flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono truncate max-w-[180px]">
                {res.searchQuery}
              </span>

              <button
                onClick={() => openReviews(res.name)}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-800 hover:text-amber-900 hover:underline"
              >
                <Utensils className="w-3 h-3 text-amber-600" />
                <span>食記與招牌必點</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        ))}

        {filteredRestaurants.length === 0 && (
          <div className="glass-card rounded-2xl p-8 text-center text-slate-400">
            <Utensils className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-400" />
            <p className="text-xs">找不到符合條件的餐廳，請嘗試切換地區或關鍵字</p>
          </div>
        )}
      </div>
    </div>
  );
};
