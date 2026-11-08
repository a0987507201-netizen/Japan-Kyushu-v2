import React, { useState, useEffect } from 'react';
import { TabType, DaySchedule, HotelItem, BackupRestaurant, ChecklistItem, MemoItem, SpotItem } from './types/travel';
import {
  INITIAL_DAYS,
  INITIAL_HOTELS,
  BACKUP_RESTAURANTS,
  INITIAL_CHECKLISTS,
  INITIAL_MEMOS
} from './data/travelData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ItineraryView } from './components/ItineraryView';
import { KyushuMapView } from './components/KyushuMapView';
import { NavigationDirectoryView } from './components/NavigationDirectoryView';
import { ChecklistsView } from './components/ChecklistsView';
import { TravelInfoView } from './components/TravelInfoView';

export default function App() {
  // Storage key versioned to force sync of Saturday 11/14 and updated 11/17-11/19 hotels
  const DAYS_STORAGE_KEY = 'kyushu_2026_days_v20261117_hotels';
  const HOTELS_STORAGE_KEY = 'kyushu_2026_hotels_v20261117_hotels';

  // Load state from localStorage or initialize with master seed data
  const [days, setDays] = useState<DaySchedule[]>(() => {
    try {
      const saved = localStorage.getItem(DAYS_STORAGE_KEY);
      if (saved) {
        const parsed: DaySchedule[] = JSON.parse(saved);
        if (
          Array.isArray(parsed) &&
          parsed[0]?.weekday === '週六' &&
          parsed[0]?.spots?.[0]?.time === '07:30' &&
          parsed[3]?.spots?.some(s => s.name.includes('黒崎'))
        ) {
          return parsed;
        }
      }
      return INITIAL_DAYS;
    } catch {
      return INITIAL_DAYS;
    }
  });

  const [hotels, setHotels] = useState<HotelItem[]>(() => {
    try {
      const saved = localStorage.getItem(HOTELS_STORAGE_KEY);
      if (saved) {
        const parsed: HotelItem[] = JSON.parse(saved);
        if (
          Array.isArray(parsed) &&
          parsed.some(h => h.name.includes('黒崎')) &&
          parsed.some(h => h.name.includes('相鉄グランドフレッサ'))
        ) {
          return parsed;
        }
      }
      return INITIAL_HOTELS;
    } catch {
      return INITIAL_HOTELS;
    }
  });

  const [restaurants, setRestaurants] = useState<BackupRestaurant[]>(() => {
    try {
      const saved = localStorage.getItem('kyushu_2026_restaurants');
      return saved ? JSON.parse(saved) : BACKUP_RESTAURANTS;
    } catch {
      return BACKUP_RESTAURANTS;
    }
  });

  const [checklists, setChecklists] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem('kyushu_2026_checklists');
      return saved ? JSON.parse(saved) : INITIAL_CHECKLISTS;
    } catch {
      return INITIAL_CHECKLISTS;
    }
  });

  const [memos, setMemos] = useState<MemoItem[]>(() => {
    try {
      const saved = localStorage.getItem('kyushu_2026_memos');
      return saved ? JSON.parse(saved) : INITIAL_MEMOS;
    } catch {
      return INITIAL_MEMOS;
    }
  });

  // Current active navigation tab & selected day
  const [activeTab, setActiveTab] = useState<TabType>('itinerary');
  const [selectedDayId, setSelectedDayId] = useState<string>('day-1');

  // Purge obsolete localStorage keys & enforce latest schedule integrity on mount
  useEffect(() => {
    try {
      localStorage.removeItem('kyushu_2026_days');
      localStorage.removeItem('kyushu_2026_days_v2');
      localStorage.removeItem('kyushu_2026_days_v3');
      localStorage.removeItem('kyushu_2026_days_v4');
      localStorage.removeItem('kyushu_2026_days_v20261114_sat');
      localStorage.removeItem('kyushu_2026_hotels');
      localStorage.removeItem('kyushu_2026_hotels_v2');
      localStorage.removeItem('kyushu_2026_hotels_v3');
      localStorage.removeItem('kyushu_2026_hotels_v20261114_sat');
    } catch {}

    // Check if days or hotels currently loaded on client need updating to the latest 11/17-11/19 hotels
    if (days[0]?.weekday !== '週六' || !days[3]?.spots?.some(s => s.name.includes('黒崎'))) {
      setDays(INITIAL_DAYS);
    }
    if (!hotels.some(h => h.name.includes('黒崎')) || !hotels.some(h => h.name.includes('相鉄グランドフレッサ'))) {
      setHotels(INITIAL_HOTELS);
    }
  }, []);

  // Sync to LocalStorage on updates
  useEffect(() => {
    try {
      localStorage.setItem(DAYS_STORAGE_KEY, JSON.stringify(days));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [days]);

  useEffect(() => {
    try {
      localStorage.setItem(HOTELS_STORAGE_KEY, JSON.stringify(hotels));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [hotels]);

  useEffect(() => {
    try {
      localStorage.setItem('kyushu_2026_checklists', JSON.stringify(checklists));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [checklists]);

  useEffect(() => {
    try {
      localStorage.setItem('kyushu_2026_memos', JSON.stringify(memos));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [memos]);

  // Spot CRUD handlers
  const handleUpdateSpot = (dayId: string, updatedSpot: SpotItem) => {
    setDays((prev) =>
      prev.map((d) =>
        d.id === dayId
          ? {
              ...d,
              spots: d.spots.map((s) => (s.id === updatedSpot.id ? updatedSpot : s)),
            }
          : d
      )
    );
  };

  const handleAddSpot = (dayId: string, newSpot: SpotItem) => {
    setDays((prev) =>
      prev.map((d) =>
        d.id === dayId
          ? {
              ...d,
              spots: [...d.spots, newSpot].sort((a, b) => a.time.localeCompare(b.time)),
            }
          : d
      )
    );
  };

  const handleDeleteSpot = (dayId: string, spotId: string) => {
    setDays((prev) =>
      prev.map((d) =>
        d.id === dayId
          ? {
              ...d,
              spots: d.spots.filter((s) => s.id !== spotId),
            }
          : d
      )
    );
  };

  // Checklist handlers
  const handleToggleChecklist = (id: string) => {
    setChecklists((prev) =>
      prev.map((c) => (c.id === id ? { ...c, completed: !c.completed } : c))
    );
  };

  const handleAddChecklist = (category: string, text: string) => {
    const newItem: ChecklistItem = {
      id: `check-${Date.now()}`,
      category,
      text,
      completed: false,
    };
    setChecklists((prev) => [newItem, ...prev]);
  };

  const handleDeleteChecklist = (id: string) => {
    setChecklists((prev) => prev.filter((c) => c.id !== id));
  };

  // Memo handlers
  const handleAddMemo = (title: string, content: string) => {
    const newMemo: MemoItem = {
      id: `memo-${Date.now()}`,
      title,
      content,
      updatedAt: new Date().toLocaleDateString('zh-TW', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setMemos((prev) => [newMemo, ...prev]);
  };

  const handleDeleteMemo = (id: string) => {
    setMemos((prev) => prev.filter((m) => m.id !== id));
  };

  const handleUpdateMemo = (id: string, title: string, content: string) => {
    setMemos((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              title,
              content,
              updatedAt: new Date().toLocaleDateString('zh-TW', {
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              }),
            }
          : m
      )
    );
  };

  // Switch to prep/checklist tab
  const handleSwitchToPrep = () => {
    setActiveTab('checklist');
  };

  const selectedDay = days.find((d) => d.id === selectedDayId) || days[0];
  const tonightHotel = hotels.find((h) => h.id === selectedDay?.hotelId);

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center">
      {/* Container structured for comfortable mobile-first experience & desktop presence */}
      <div className="w-full max-w-md min-h-screen flex flex-col bg-[#FAF8F5] shadow-xl shadow-stone-300/30 border-x border-[#EFE8E1] relative">
        {/* Top App Bar Header */}
        <Header
          days={days}
          selectedDayId={selectedDayId}
          onSelectDay={(dayId) => {
            setSelectedDayId(dayId);
            setActiveTab('itinerary');
          }}
          activeTab={activeTab}
          onSwitchToPrep={handleSwitchToPrep}
        />

        {/* Dynamic Main Body */}
        <main className="flex-1 px-4 pt-3">
          {activeTab === 'itinerary' && (
            <ItineraryView
              day={selectedDay}
              hotel={tonightHotel}
              onUpdateSpot={handleUpdateSpot}
              onAddSpot={handleAddSpot}
              onDeleteSpot={handleDeleteSpot}
            />
          )}

          {activeTab === 'map' && (
            <KyushuMapView
              days={days}
              selectedDayId={selectedDayId}
              onSelectDay={(dayId) => {
                setSelectedDayId(dayId);
                setActiveTab('itinerary');
              }}
            />
          )}

          {activeTab === 'navigation' && (
            <NavigationDirectoryView restaurants={restaurants} />
          )}

          {activeTab === 'checklist' && (
            <ChecklistsView
              checklists={checklists}
              memos={memos}
              onToggleChecklist={handleToggleChecklist}
              onAddChecklist={handleAddChecklist}
              onDeleteChecklist={handleDeleteChecklist}
              onAddMemo={handleAddMemo}
              onDeleteMemo={handleDeleteMemo}
              onUpdateMemo={handleUpdateMemo}
            />
          )}

          {activeTab === 'info' && (
            <TravelInfoView
              days={days}
              hotels={hotels}
              restaurants={restaurants}
              checklists={checklists}
              memos={memos}
            />
          )}
        </main>

        {/* Fixed Mobile Bottom Tab Bar */}
        <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />
      </div>
    </div>
  );
}
