import React, { useState, useRef, useMemo } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, MapPin, Navigation, X, Filter } from 'lucide-react';
import { DaySchedule, SpotItem } from '../types/travel';
import { getCleanLocationName } from '../utils/cleanLocationName';

interface KyushuMapViewProps {
  days: DaySchedule[];
  selectedDayId: string;
  onSelectDay: (dayId: string) => void;
}

export type RegionKey = 'all' | 'kumamoto' | 'oita' | 'fukuoka' | 'miyazaki';

interface MapMarker {
  id: string;
  name: string;
  dayId: string;
  dayLabel: string;
  time: string;
  category: string;
  notes: string;
  tips?: string;
  location: string;
  region: 'kumamoto' | 'oita' | 'fukuoka' | 'miyazaki';
  regionLabel: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
}

// Helper to determine prefecture region of any spot
export function getSpotRegion(name: string, location: string): 'kumamoto' | 'oita' | 'fukuoka' | 'miyazaki' {
  const text = (name + ' ' + location);
  if (text.includes('高千穂') || text.includes('高千穗') || text.includes('宮崎')) {
    return 'miyazaki';
  }
  if (
    text.includes('別府') ||
    text.includes('由布') ||
    text.includes('湯布院') ||
    text.includes('金鱗湖') ||
    text.includes('大分') ||
    text.includes('九重') ||
    text.includes('杵築') ||
    text.includes('志高湖') ||
    text.includes('耶馬溪') ||
    text.includes('耶馬渓')
  ) {
    return 'oita';
  }
  if (
    text.includes('福岡') ||
    text.includes('博多') ||
    text.includes('小倉') ||
    text.includes('黒崎') ||
    text.includes('北九州') ||
    text.includes('八幡') ||
    text.includes('堅粕') ||
    text.includes('皿倉山') ||
    text.includes('天神') ||
    text.includes('糸島') ||
    text.includes('太宰府') ||
    text.includes('英彦山') ||
    text.includes('英彥山') ||
    text.includes('吞山') ||
    text.includes('呑山') ||
    text.includes('篠栗')
  ) {
    return 'fukuoka';
  }
  return 'kumamoto';
}

const REGION_NAMES: Record<RegionKey, string> = {
  all: '全部區域',
  kumamoto: '熊本縣',
  oita: '大分縣',
  fukuoka: '福岡縣',
  miyazaki: '宮崎縣',
};

export const KyushuMapView: React.FC<KyushuMapViewProps> = ({
  days,
  selectedDayId,
  onSelectDay,
}) => {
  // Region & Date classification tabs
  const [selectedRegion, setSelectedRegion] = useState<RegionKey>('all');
  const [selectedDayFilter, setSelectedDayFilter] = useState<string>('all');
  const [activeMarker, setActiveMarker] = useState<MapMarker | null>(null);

  // Zoom & Pan state
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startPan = useRef({ x: 0, y: 0 });
  const initialDistance = useRef<number | null>(null);
  const initialScale = useRef<number>(1);

  // Collect markers: ONLY SCENIC ATTRACTIONS, EXCLUDE RESTAURANTS/CAFES & FLIGHTS
  const allScenicMarkers: MapMarker[] = useMemo(() => {
    const list: MapMarker[] = [];

    days.forEach((d) => {
      d.spots.forEach((s) => {
        // Exclude flights and pure transit/car logistics (airport pickup, expressway transit, gas/return)
        if (
          s.category === 'flight' ||
          s.name.includes('KHH') ||
          s.name.includes('KMJ') ||
          s.name.includes('退房+加油+還車') ||
          s.name.includes('前往熊本 (中途休一站') ||
          s.name.includes('ニコニコレンタカー 熊本空港店 取車')
        ) {
          return;
        }

        // Specific famous sightseeing streets & cultural attractions that involve street walks / snacks
        const isSightseeingAttraction =
          s.name.includes('黑川溫泉') ||
          s.name.includes('湯之坪街道') ||
          s.name.includes('太宰府前表参道') ||
          s.name.includes('太宰府表參道') ||
          s.name.includes('石藏酒造') ||
          s.name.includes('石蔵酒造') ||
          s.name.includes('中洲屋台街');

        // Pure dining items (breakfast, lunch, dinner, specific restaurants/cafes)
        const isDining =
          !isSightseeingAttraction &&
          (s.category === 'food' ||
            s.name.includes('早餐：') ||
            s.name.includes('早餐預約') ||
            s.name.includes('午餐：') ||
            s.name.includes('晚餐：') ||
            s.name.includes('いまきん食堂') ||
            s.name.includes('高千穗牛餐廳') ||
            s.name.includes('星乃咖啡') ||
            s.name.includes('白金茶房') ||
            s.name.includes('星巴克') ||
            s.name.includes('赤牛丼') ||
            s.name.includes('流水麵') ||
            s.name.includes('塚本鮮魚店') ||
            s.name.includes('かじか茶屋') ||
            s.name.includes('由布まぶし') ||
            s.name.includes('煮魚少年') ||
            s.name.includes('いちたか') ||
            s.name.includes('洋食の店 橋本') ||
            s.name.includes('菅乃屋') ||
            s.name.includes('一蘭拉麵'));

        if (isDining) {
          return;
        }

        const region = getSpotRegion(s.name, s.location);

        list.push({
          id: s.id,
          name: s.name,
          dayId: d.id,
          dayLabel: d.dateLabel,
          time: s.time,
          category: s.category,
          notes: s.notes,
          tips: s.tips,
          location: s.location,
          region,
          regionLabel: REGION_NAMES[region],
          x: s.mapCoord.x,
          y: s.mapCoord.y,
        });
      });
    });

    return list;
  }, [days]);

  // Filter markers based on selected region tab and/or date tab
  const displayedMarkers = useMemo(() => {
    return allScenicMarkers.filter((m) => {
      const matchRegion = selectedRegion === 'all' || m.region === selectedRegion;
      const matchDay = selectedDayFilter === 'all' || m.dayId === selectedDayFilter;
      return matchRegion && matchDay;
    });
  }, [allScenicMarkers, selectedRegion, selectedDayFilter]);

  // Counts per region
  const regionCounts = useMemo(() => {
    const counts = { all: allScenicMarkers.length, kumamoto: 0, oita: 0, fukuoka: 0, miyazaki: 0 };
    allScenicMarkers.forEach((m) => {
      counts[m.region] = (counts[m.region] || 0) + 1;
    });
    return counts;
  }, [allScenicMarkers]);

  // Touch handlers for mobile pinch-to-zoom and pan
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      initialDistance.current = dist;
      initialScale.current = scale;
    } else if (e.touches.length === 1) {
      isDragging.current = true;
      startPan.current = {
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialDistance.current !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const newScale = Math.min(
        Math.max(initialScale.current * (dist / initialDistance.current), 0.9),
        3.5
      );
      setScale(newScale);
    } else if (e.touches.length === 1 && isDragging.current) {
      setPan({
        x: e.touches[0].clientX - startPan.current.x,
        y: e.touches[0].clientY - startPan.current.y,
      });
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    initialDistance.current = null;
  };

  // Mouse handlers for desktop/trackpad
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startPan.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      setPan({
        x: e.clientX - startPan.current.x,
        y: e.clientY - startPan.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleZoom = (delta: number) => {
    setScale((prev) => Math.min(Math.max(prev + delta, 0.9), 3.5));
  };

  const handleReset = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
    setActiveMarker(null);
  };

  const openGoogleMaps = (location: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-3 pb-20 animate-in fade-in duration-300">
      {/* Title & Classification Filter Card */}
      <div className="glass-card rounded-2xl p-3 border border-[#EADBCE] space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-base select-none">🗺️</span>
            <div>
              <h2 className="text-sm font-bold text-slate-800 font-handwritten tracking-wide">
                日系手繪風 · 九州景點地圖
              </h2>
              <p className="text-[11px] text-slate-500 font-handwritten">
                僅標示景點與名所，可依大區域或出遊日期分類檢視
              </p>
            </div>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-white/90 p-1 rounded-xl border border-[#E5DACF] shadow-2xs">
            <button
              onClick={() => handleZoom(0.3)}
              className="p-1.5 text-slate-600 hover:text-[#C86D56] rounded-lg active:bg-slate-100"
              title="放大"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleZoom(-0.3)}
              className="p-1.5 text-slate-600 hover:text-[#C86D56] rounded-lg active:bg-slate-100"
              title="縮小"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg active:bg-slate-100"
              title="重設視角"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 1. 大區域分類頁籤 (Region Tabs) */}
        <div className="pt-0.5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1 font-handwritten">
            <span>🏯 大區域分類：</span>
            <span className="text-[10px] text-[#C86D56]">點擊快速切換區域</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar font-handwritten py-0.5">
            <button
              onClick={() => {
                setSelectedRegion('all');
                setSelectedDayFilter('all');
              }}
              className={`shrink-0 px-2.5 py-1 rounded-xl text-xs transition-all flex items-center gap-1 ${
                selectedRegion === 'all' && selectedDayFilter === 'all'
                  ? 'bg-[#C86D56] text-white font-bold shadow-sm'
                  : 'bg-white/80 text-slate-600 border border-[#E5DACF] hover:bg-white'
              }`}
            >
              <span>全部景點</span>
              <span className="text-[10px] opacity-80 font-mono">({regionCounts.all})</span>
            </button>

            <button
              onClick={() => {
                setSelectedRegion('kumamoto');
                setSelectedDayFilter('all');
              }}
              className={`shrink-0 px-2.5 py-1 rounded-xl text-xs transition-all flex items-center gap-1 ${
                selectedRegion === 'kumamoto'
                  ? 'bg-[#627A58] text-white font-bold shadow-sm'
                  : 'bg-white/80 text-slate-600 border border-[#E5DACF] hover:bg-white'
              }`}
            >
              <span>🌋 熊本縣</span>
              <span className="text-[10px] opacity-80 font-mono">({regionCounts.kumamoto})</span>
            </button>

            <button
              onClick={() => {
                setSelectedRegion('oita');
                setSelectedDayFilter('all');
              }}
              className={`shrink-0 px-2.5 py-1 rounded-xl text-xs transition-all flex items-center gap-1 ${
                selectedRegion === 'oita'
                  ? 'bg-[#B05C42] text-white font-bold shadow-sm'
                  : 'bg-white/80 text-slate-600 border border-[#E5DACF] hover:bg-white'
              }`}
            >
              <span>♨️ 大分縣</span>
              <span className="text-[10px] opacity-80 font-mono">({regionCounts.oita})</span>
            </button>

            <button
              onClick={() => {
                setSelectedRegion('fukuoka');
                setSelectedDayFilter('all');
              }}
              className={`shrink-0 px-2.5 py-1 rounded-xl text-xs transition-all flex items-center gap-1 ${
                selectedRegion === 'fukuoka'
                  ? 'bg-[#5B6358] text-white font-bold shadow-sm'
                  : 'bg-white/80 text-slate-600 border border-[#E5DACF] hover:bg-white'
              }`}
            >
              <span>⛩️ 福岡縣</span>
              <span className="text-[10px] opacity-80 font-mono">({regionCounts.fukuoka})</span>
            </button>

            <button
              onClick={() => {
                setSelectedRegion('miyazaki');
                setSelectedDayFilter('all');
              }}
              className={`shrink-0 px-2.5 py-1 rounded-xl text-xs transition-all flex items-center gap-1 ${
                selectedRegion === 'miyazaki'
                  ? 'bg-[#40735E] text-white font-bold shadow-sm'
                  : 'bg-white/80 text-slate-600 border border-[#E5DACF] hover:bg-white'
              }`}
            >
              <span>🛶 宮崎縣</span>
              <span className="text-[10px] opacity-80 font-mono">({regionCounts.miyazaki})</span>
            </button>
          </div>
        </div>

        {/* 2. 出遊日期分類頁籤 (Date Tabs) */}
        <div className="pt-1 border-t border-[#EFE7DE]">
          <div className="text-[11px] font-semibold text-slate-500 mb-1 font-handwritten">
            🗓️ 依出遊日程過濾：
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar font-handwritten py-0.5">
            <button
              onClick={() => {
                setSelectedDayFilter('all');
              }}
              className={`shrink-0 px-2.5 py-0.8 rounded-lg text-xs transition-all ${
                selectedDayFilter === 'all'
                  ? 'bg-slate-700 text-white font-bold'
                  : 'bg-white/70 text-slate-500 border border-[#E5DACF]'
              }`}
            >
              全部日程
            </button>
            {days.map((d) => (
              <button
                key={d.id}
                onClick={() => {
                  setSelectedDayFilter(d.id);
                  setSelectedRegion('all');
                }}
                className={`shrink-0 px-2.5 py-0.8 rounded-lg text-xs transition-all ${
                  selectedDayFilter === d.id
                    ? 'bg-[#C86D56] text-white font-bold shadow-xs'
                    : 'bg-white/70 text-slate-600 border border-[#E5DACF]'
                }`}
              >
                {d.dateLabel}
              </button>
            ))}
          </div>
        </div>

        {/* Current Filter Status Tag */}
        <div className="text-[11px] text-slate-500 font-handwritten flex items-center justify-between pt-0.5">
          <span className="text-[#C86D56]">
            📍 目前顯示：
            {selectedRegion !== 'all' ? `【${REGION_NAMES[selectedRegion]}】` : ''}
            {selectedDayFilter !== 'all' ? `【${days.find((d) => d.id === selectedDayFilter)?.dateLabel}】` : ''}
            {selectedRegion === 'all' && selectedDayFilter === 'all' ? '【全九州景點】' : ''}
            {' '}共 {displayedMarkers.length} 處景點 (無餐廳干擾)
          </span>
          {(selectedRegion !== 'all' || selectedDayFilter !== 'all') && (
            <button
              onClick={() => {
                setSelectedRegion('all');
                setSelectedDayFilter('all');
              }}
              className="text-[#C86D56] hover:underline"
            >
              重設顯示全部
            </button>
          )}
        </div>
      </div>

      {/* Map Viewport Container */}
      <div
        ref={containerRef}
        onClick={() => setActiveMarker(null)}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full aspect-[4/5] bg-gradient-to-b from-[#E7F0F2] via-[#EAF2F4] to-[#E2ECEF] rounded-3xl overflow-hidden border border-[#D5E2E6] shadow-inner select-none cursor-grab active:cursor-grabbing touch-none"
      >
        {/* Subtle Water Texture & Waves */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="waves" width="40" height="20" patternUnits="userSpaceOnUse">
                <path d="M 0 10 Q 10 5, 20 10 T 40 10" fill="none" stroke="#BDD6DE" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#waves)" />
          </svg>
        </div>

        {/* Scalable & Pannable Map Layer */}
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            transition: isDragging.current ? 'none' : 'transform 0.15s ease-out',
          }}
          className="relative w-full h-full"
        >
          {/* Hand-Drawn SVG Kyushu Island Geography & Regional Distinctions with Hand-lettered Typography */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-md pointer-events-none"
            style={{ fontFamily: "'LXGW WenKai TC', 'Ma Shan Zheng', cursive, sans-serif" }}
            preserveAspectRatio="none"
          >
            {/* Kyushu Island Base Body (Warm Japanese Washi Tint) */}
            <path
              d="
                M 48 10
                C 56 12, 60 18, 64 24
                C 68 28, 74 34, 73 44
                C 72 50, 68 56, 66 64
                C 64 74, 60 84, 52 92
                C 44 94, 38 88, 36 82
                C 34 78, 30 76, 26 70
                C 24 64, 28 58, 32 54
                C 28 50, 22 46, 24 38
                C 26 30, 32 26, 36 20
                C 40 16, 44 10, 48 10
                Z
              "
              fill="#FAF8F5"
              stroke="#D5C5B5"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />

            {/* 1. Regional Shading: 福岡縣 (Fukuoka Region - Northern Kyushu) */}
            <path
              d="
                M 28 24
                C 34 19, 44 13, 48 10
                C 53 12, 57 15, 60 20
                C 57 24, 52 28, 47 31
                C 40 31, 35 30, 31 29
                C 28 27, 27 25, 28 24
                Z
              "
              fill={selectedRegion === 'fukuoka' ? '#F2EDE2' : '#F6F3EC'}
              fillOpacity={selectedRegion === 'all' || selectedRegion === 'fukuoka' ? 0.95 : 0.3}
              stroke={selectedRegion === 'fukuoka' ? '#A3998C' : '#D1C7BA'}
              strokeWidth={selectedRegion === 'fukuoka' ? 0.7 : 0.4}
            />

            {/* 2. Regional Shading: 大分縣 (Oita Region - Eastern Hot Springs & Fall Foliage) */}
            <path
              d="
                M 60 20
                C 64 24, 74 34, 73 44
                C 70 48, 66 54, 60 54
                C 54 53, 51 48, 50 44
                C 47 38, 53 28, 60 20
                Z
              "
              fill={selectedRegion === 'oita' ? '#F9EAE1' : '#FCF3EE'}
              fillOpacity={selectedRegion === 'all' || selectedRegion === 'oita' ? 0.95 : 0.3}
              stroke={selectedRegion === 'oita' ? '#C29F91' : '#DFC5B8'}
              strokeWidth={selectedRegion === 'oita' ? 0.7 : 0.4}
            />
            {/* Kunisaki Peninsula (國東半島 - Oita/Beppu) */}
            <path
              d="M 64 24 C 70 24, 76 28, 74 34 C 70 38, 64 36, 62 30 Z"
              fill={selectedRegion === 'oita' ? '#F9EAE1' : '#FCF3EE'}
              fillOpacity={selectedRegion === 'all' || selectedRegion === 'oita' ? 0.95 : 0.3}
              stroke="#DFC5B8"
              strokeWidth="0.7"
            />

            {/* 3. Regional Shading: 熊本縣 (Kumamoto Region - Fire & Caldera Country) */}
            <path
              d="
                M 31 29
                C 35 30, 41 31, 47 31
                C 50 36, 51 44, 49 48
                C 47 54, 44 58, 47 62
                C 44 68, 38 72, 34 72
                C 30 68, 26 62, 28 50
                C 31 42, 29 35, 31 29
                Z
              "
              fill={selectedRegion === 'kumamoto' ? '#E7EBDA' : '#EFF2E6'}
              fillOpacity={selectedRegion === 'all' || selectedRegion === 'kumamoto' ? 0.95 : 0.3}
              stroke={selectedRegion === 'kumamoto' ? '#8F9B7E' : '#CFCBAE'}
              strokeWidth={selectedRegion === 'kumamoto' ? 0.7 : 0.4}
            />

            {/* 4. Regional Shading: 宮崎縣 (Miyazaki Region - Myth & Takachiho Gorge) */}
            <path
              d="
                M 60 54
                C 66 54, 68 62, 66 74
                C 62 82, 54 86, 50 86
                C 48 76, 44 68, 47 62
                C 51 60, 56 58, 60 54
                Z
              "
              fill={selectedRegion === 'miyazaki' ? '#DFEBE4' : '#E8F1EC'}
              fillOpacity={selectedRegion === 'all' || selectedRegion === 'miyazaki' ? 0.95 : 0.3}
              stroke={selectedRegion === 'miyazaki' ? '#7DA08F' : '#BDD1C3'}
              strokeWidth={selectedRegion === 'miyazaki' ? 0.7 : 0.4}
            />

            {/* 5. Shimabara Peninsula & Western Kyushu Background */}
            <path
              d="M 28 50 C 24 54, 22 62, 26 66 C 30 64, 32 58, 30 52 Z"
              fill="#EDE8E1"
              stroke="#D5C5B5"
              strokeWidth="0.7"
            />

            {/* Regional Boundary Lines (縣界區分虛線) */}
            <path
              d="M 28 26 C 33 28, 40 31, 47 31 C 52 28, 57 23, 60 20"
              fill="none"
              stroke="#B5A99B"
              strokeWidth="0.65"
              strokeDasharray="1.8,1.8"
            />
            <path
              d="M 47 31 C 50 36, 51 44, 49 48 C 53 50, 57 52, 60 54"
              fill="none"
              stroke="#C29F91"
              strokeWidth="0.65"
              strokeDasharray="1.8,1.8"
            />
            <path
              d="M 49 48 C 46 54, 44 58, 47 62"
              fill="none"
              stroke="#9FB5A2"
              strokeWidth="0.65"
              strokeDasharray="1.8,1.8"
            />
            <path
              d="M 47 62 C 50 64, 55 64, 60 54"
              fill="none"
              stroke="#8EAFA0"
              strokeWidth="0.65"
              strokeDasharray="1.8,1.8"
            />

            {/* Aso Mountain Caldera & Highlands (Soft Moss Green / Ochre) */}
            <ellipse
              cx="45"
              cy="53"
              rx="8.5"
              ry="6.8"
              fill="#E3E6CE"
              stroke="#B8BAA0"
              strokeWidth="0.6"
              strokeDasharray="1,1"
            />

            {/* Hand-Drawn Style Prefecture Region Badges (Authentic Hand-lettered Traditional Chinese) */}
            {/* 福岡縣 */}
            <g transform="translate(37, 14)">
              <rect x="0" y="0" width="13" height="4.4" rx="2" fill="#FFFFFF" fillOpacity="0.92" stroke="#D1C7BA" strokeWidth="0.35" />
              <text x="6.5" y="3.2" fontSize="2.5" fontWeight="bold" fill="#3E3932" textAnchor="middle" style={{ fontFamily: "'LXGW WenKai TC', 'Ma Shan Zheng', cursive, sans-serif" }}>福岡縣</text>
            </g>

            {/* 大分縣 */}
            <g transform="translate(61, 26)">
              <rect x="0" y="0" width="13" height="4.4" rx="2" fill="#FFFFFF" fillOpacity="0.92" stroke="#DFC5B8" strokeWidth="0.35" />
              <text x="6.5" y="3.2" fontSize="2.5" fontWeight="bold" fill="#7E3F2B" textAnchor="middle" style={{ fontFamily: "'LXGW WenKai TC', 'Ma Shan Zheng', cursive, sans-serif" }}>大分縣</text>
            </g>

            {/* 熊本縣 */}
            <g transform="translate(29, 43)">
              <rect x="0" y="0" width="13" height="4.4" rx="2" fill="#FFFFFF" fillOpacity="0.92" stroke="#CFCBAE" strokeWidth="0.35" />
              <text x="6.5" y="3.2" fontSize="2.5" fontWeight="bold" fill="#424E38" textAnchor="middle" style={{ fontFamily: "'LXGW WenKai TC', 'Ma Shan Zheng', cursive, sans-serif" }}>熊本縣</text>
            </g>

            {/* 宮崎縣 */}
            <g transform="translate(55, 66)">
              <rect x="0" y="0" width="13" height="4.4" rx="2" fill="#FFFFFF" fillOpacity="0.92" stroke="#BDD1C3" strokeWidth="0.35" />
              <text x="6.5" y="3.2" fontSize="2.5" fontWeight="bold" fill="#2E5542" textAnchor="middle" style={{ fontFamily: "'LXGW WenKai TC', 'Ma Shan Zheng', cursive, sans-serif" }}>宮崎縣</text>
            </g>

            {/* Hand-lettered reference regions */}
            <text x="25" y="38" fontSize="2.3" fill="#6E685F" textAnchor="middle" opacity="0.9" style={{ fontFamily: "'LXGW WenKai TC', 'Ma Shan Zheng', cursive, sans-serif" }}>佐賀·長崎</text>
            <text x="47" y="85" fontSize="2.3" fill="#6E685F" textAnchor="middle" opacity="0.9" style={{ fontFamily: "'LXGW WenKai TC', 'Ma Shan Zheng', cursive, sans-serif" }}>鹿兒島</text>

            {/* Landmark hand-lettered text accents */}
            <text x="45" y="55" fontSize="2.5" fontWeight="bold" fill="#9A3F2C" textAnchor="middle" opacity="0.95" style={{ fontFamily: "'LXGW WenKai TC', 'Ma Shan Zheng', cursive, sans-serif" }}>🌋 阿蘇五岳</text>
            <text x="64" y="42" fontSize="2.3" fontWeight="bold" fill="#4B6A76" textAnchor="middle" opacity="0.95" style={{ fontFamily: "'LXGW WenKai TC', 'Ma Shan Zheng', cursive, sans-serif" }}>♨ 別府灣</text>
            <text x="58" y="46" fontSize="2.3" fontWeight="bold" fill="#994532" textAnchor="middle" opacity="0.95" style={{ fontFamily: "'LXGW WenKai TC', 'Ma Shan Zheng', cursive, sans-serif" }}>🍁 由布岳</text>
          </svg>

          {/* Interactive Markers Layer with Petite Pins (只標示景點，排除餐廳，小巧好點選) */}
          {displayedMarkers.map((marker) => {
            const isMarkerActive = activeMarker?.id === marker.id;
            const cleanName = getCleanLocationName(marker.name);
            const isNearTop = marker.y < 20;

            return (
              <div
                key={marker.id}
                style={{
                  left: `${marker.x}%`,
                  top: `${marker.y}%`,
                  transform: `translate(-50%, -100%) scale(${1 / scale})`,
                  transformOrigin: 'bottom center',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMarker(marker);
                }}
                className={`absolute cursor-pointer pointer-events-auto ${
                  isMarkerActive ? 'z-50' : 'z-20'
                }`}
              >
                {/* Active Tooltip: Positioned strictly ABOVE the small pin with authentic hand-drawn font */}
                {isMarkerActive && (
                  <div
                    className={`absolute ${
                      isNearTop ? 'top-[4px]' : 'bottom-[23px]'
                    } left-1/2 -translate-x-1/2 pointer-events-auto z-50 select-none animate-in fade-in zoom-in-95 duration-150 font-handwritten`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Top callout arrow when near top */}
                    {isNearTop && (
                      <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[5px] border-b-slate-900/95 mx-auto -mb-[1px]" />
                    )}

                    {/* Speech Bubble Pill */}
                    <div className="bg-slate-900/95 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-xl shadow-xl flex items-center gap-1 border border-[#C86D56]/40 whitespace-nowrap">
                      <span className="text-amber-400 text-xs">📍</span>
                      <span className="tracking-tight">{cleanName}</span>
                      <button
                        onClick={() => setActiveMarker(null)}
                        className="text-white/60 hover:text-white p-0.5 rounded leading-none ml-1 hover:bg-white/10"
                        title="關閉"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Bottom callout arrow pointing down towards the small pin head */}
                    {!isNearTop && (
                      <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-slate-900/95 mx-auto -mt-[1px]" />
                    )}
                  </div>
                )}

                {/* Petite Map Pin (尺寸精巧 13x17px，周圍搭配舒適觸控感應區，不擠在一起) */}
                <div
                  className="relative p-1.5 -m-1.5 flex items-center justify-center"
                  style={{ width: 24, height: 26 }}
                >
                  {/* Active highlight aura */}
                  {isMarkerActive && (
                    <div className="absolute inset-0 rounded-full bg-[#C86D56]/20 animate-ping pointer-events-none" />
                  )}

                  <svg
                    viewBox="0 0 18 24"
                    width="13"
                    height="17"
                    className={`transition-transform duration-150 ${
                      isMarkerActive ? 'drop-shadow-md scale-120' : 'drop-shadow-2xs hover:scale-115'
                    }`}
                  >
                    <path
                      d="M9 0C4.03 0 0 4.03 0 9c0 6.2 7.8 14 8.5 14.6.3.3.7.3 1 0C10.2 23 18 15.2 18 9c0-4.97-4.03-9-9-9z"
                      fill={isMarkerActive ? '#B2442D' : '#C86D56'}
                      stroke="#FFFFFF"
                      strokeWidth="1.2"
                    />
                    <circle cx="9" cy="8.5" r="3.2" fill="#FFFFFF" />
                    <circle cx="9" cy="8.5" r="1.6" fill={isMarkerActive ? '#B2442D' : '#C86D56'} />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend Overlay at bottom-left with hand-drawn font */}
        <div className="absolute bottom-3 left-3 z-10 glass-card-subtle px-2.5 py-1.5 rounded-xl text-[10px] text-slate-600 pointer-events-none space-y-0.5 font-handwritten">
          <div className="flex items-center gap-1 font-bold text-[#C86D56]">
            <span>🍁 九州七縣巡禮</span>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-medium">
            <span className="inline-block w-2 h-2 rounded-sm bg-[#EFF2E6] border border-[#CFCBAE]" /> 熊本
            <span className="inline-block w-2 h-2 rounded-sm bg-[#FCF3EE] border border-[#DFC5B8]" /> 大分
            <span className="inline-block w-2 h-2 rounded-sm bg-[#F6F3EC] border border-[#D1C7BA]" /> 福岡
            <span className="inline-block w-2 h-2 rounded-sm bg-[#E8F1EC] border border-[#BDD1C3]" /> 宮崎
          </div>
        </div>
      </div>

      {/* Active Marker Detail Card (Bottom Sheet Card) */}
      {activeMarker && (
        <div className="glass-card rounded-2xl p-4 border border-[#EADBCE] shadow-lg animate-in slide-in-from-bottom duration-200">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-[#C86D56] font-semibold font-handwritten">
                <span className="bg-[#F7EBE8] px-2 py-0.5 rounded-md font-mono">
                  {activeMarker.dayLabel} · {activeMarker.time}
                </span>
                <span className="text-slate-500 font-medium">【{activeMarker.regionLabel}】景點</span>
              </div>
              <h3 className="text-base font-bold text-slate-800 mt-1 flex items-center gap-1.5 font-handwritten tracking-wide">
                <MapPin className="w-4 h-4 text-[#C86D56] shrink-0" />
                <span>{getCleanLocationName(activeMarker.name)}</span>
              </h3>
            </div>

            <button
              onClick={() => setActiveMarker(null)}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#E8DFD8] flex items-center justify-between font-handwritten">
            <button
              onClick={() => {
                onSelectDay(activeMarker.dayId);
              }}
              className="text-xs font-semibold text-[#C86D56] hover:underline"
            >
              查看該日行程時間表 →
            </button>

            <button
              onClick={() => openGoogleMaps(activeMarker.location)}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-[#D9826D] to-[#C86D56] rounded-xl shadow-sm hover:brightness-105"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Google Maps 導航</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
