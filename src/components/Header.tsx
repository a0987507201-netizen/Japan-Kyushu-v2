import React, { useRef, useEffect } from 'react';
import { Calendar, Compass, CloudSun, MapPin, Sparkles } from 'lucide-react';
import { DaySchedule } from '../types/travel';

interface HeaderProps {
  days: DaySchedule[];
  selectedDayId: string;
  onSelectDay: (dayId: string) => void;
  activeTab: string;
  onSwitchToPrep: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  days,
  selectedDayId,
  onSelectDay,
  activeTab,
  onSwitchToPrep,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the active date pill into view
  useEffect(() => {
    if (scrollRef.current) {
      const activeEl = scrollRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeEl) {
        const container = scrollRef.current;
        const scrollLeft = activeEl.offsetLeft - container.offsetWidth / 2 + activeEl.offsetWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [selectedDayId, activeTab]);

  const selectedDay = days.find((d) => d.id === selectedDayId) || days[0];

  return (
    <header className="sticky top-0 z-30 glass-header px-4 pt-3 pb-2 transition-all duration-300">
      <div className="max-w-md mx-auto">
        {/* Top Destination & Date Banner */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#E28872] to-[#C86D56] flex items-center justify-center text-white shadow-sm shadow-[#C86D56]/20">
              <span className="text-base select-none">🍁</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-semibold tracking-wider text-[#C86D56] uppercase">
                  Kyushu Autumn
                </span>
                <span className="text-[10px] bg-[#F7EBE8] text-[#C86D56] px-1.5 py-0.2 rounded-md font-medium">
                  賞楓自駕
                </span>
              </div>
              <h1 className="text-base font-bold text-slate-800 leading-tight">
                2026 九州秋楓漫旅
              </h1>
            </div>
          </div>

          <div className="text-right">
            <div className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-slate-500 bg-white/80 px-2 py-0.5 rounded-full border border-[#E8DFD8]">
              <Calendar className="w-3 h-3 text-[#C86D56]" />
              <span>11/14 - 11/21</span>
            </div>
          </div>
        </div>

        {/* Horizontal Date Scroller (Inspired by User Screenshot) */}
        <div
          ref={scrollRef}
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 -mx-1 px-1"
        >
          {/* Prep button (行前) */}
          <button
            onClick={onSwitchToPrep}
            data-active={activeTab === 'checklist'}
            className={`shrink-0 flex flex-col items-center justify-center min-w-[56px] h-[52px] rounded-2xl transition-all duration-200 text-xs ${
              activeTab === 'checklist'
                ? 'bg-gradient-to-b from-[#D9826D] to-[#C86D56] text-white shadow-md shadow-[#C86D56]/25 scale-[1.03] font-bold'
                : 'bg-white/80 text-slate-600 border border-[#EADBCE] hover:bg-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 mb-0.5" />
            <span className="text-[11px] font-medium leading-none">行前</span>
          </button>

          {/* Days buttons */}
          {days.map((day) => {
            const isSelected = activeTab === 'itinerary' && day.id === selectedDayId;
            return (
              <button
                key={day.id}
                onClick={() => onSelectDay(day.id)}
                data-active={isSelected}
                className={`shrink-0 flex flex-col items-center justify-center min-w-[58px] h-[52px] rounded-2xl transition-all duration-200 ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#D9826D] to-[#C86D56] text-white shadow-md shadow-[#C86D56]/25 scale-[1.03] font-bold'
                    : 'bg-white/80 text-slate-600 border border-[#EADBCE] hover:bg-white'
                }`}
              >
                <span className={`text-[10px] tracking-tight ${isSelected ? 'text-white/90' : 'text-slate-400 font-medium'}`}>
                  {day.weekday}
                </span>
                <span className="text-xs font-mono font-bold leading-tight mt-0.5">
                  {day.dateLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
