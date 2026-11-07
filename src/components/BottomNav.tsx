import React from 'react';
import { CalendarDays, Map, Compass, CheckSquare, Info } from 'lucide-react';
import { TabType } from '../types/travel';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  const tabs: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'itinerary', label: '行程', icon: CalendarDays },
    { id: 'map', label: '地圖', icon: Map },
    { id: 'navigation', label: '導航美食', icon: Compass },
    { id: 'checklist', label: '清單', icon: CheckSquare },
    { id: 'info', label: '資訊', icon: Info },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-nav shadow-lg shadow-black/5 pb-safe">
      <div className="max-w-md mx-auto grid grid-cols-5 items-center h-16 px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-all duration-200 select-none ${
                isActive ? 'text-[#C86D56]' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div
                className={`relative p-1 rounded-xl transition-all duration-200 ${
                  isActive ? 'bg-[#F7EBE8] transform scale-110' : ''
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C86D56]" />
                )}
              </div>
              <span
                className={`text-[10px] tracking-tight mt-0.5 ${
                  isActive ? 'font-bold text-[#C86D56]' : 'font-medium'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
