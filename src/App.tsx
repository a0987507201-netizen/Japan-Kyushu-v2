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
  // Storage key versioned to force sync of parking info, attachments, PDF links, refined main/sub-locations Google Maps, and updated foliage status
  const DAYS_STORAGE_KEY = 'kyushu_2026_days_v20261121_foliage_status_updated';
  const HOTELS_STORAGE_KEY = 'kyushu_2026_hotels_v20261121_kurosaki_comfort_hotel';

  // Load state from localStorage or initialize with master seed data
  const [days, setDays] = useState<DaySchedule[]>(() => {
    try {
      const saved = localStorage.getItem(DAYS_STORAGE_KEY);
      if (saved) {
        const parsed: DaySchedule[] = JSON.parse(saved);
        if (
          Array.isArray(parsed) &&
          parsed[0]?.weekday === '週六' &&
          parsed[0]?.title === '華航CI198 高雄直飛熊本、高千穗划船與南阿蘇' &&
          parsed[0]?.spots?.some(s => s.name.includes('ニコニコレンタカー 熊本空港店') && s.attachmentImageUrl) &&
          parsed[1]?.spots?.some(s => s.name === '上色見熊野神社') &&
          parsed[1]?.spots?.some(s => s.subLocations && s.subLocations.length === 4 && s.hideMainMapButton) &&
          parsed[1]?.spots?.some(s => s.name.includes('草千里') && s.subLocations && s.subLocations.length === 3 && s.mainMapTitle) &&
          parsed[1]?.spots?.some(s => s.name.includes('黑川溫泉') && s.subLocations?.some(sub => sub.location.includes('maps.app.goo.gl')) && s.subLocations.length === 5) &&
          parsed[2]?.spots?.some(s => s.name.includes('湯之坪街道') && s.subLocations && s.subLocations.length === 5) &&
          parsed[2]?.spots?.some(s => s.name.includes('由布まぶし') && s.subLocations && s.subLocations.length === 2 && s.hideMainMapButton) &&
          parsed[2]?.spots?.some(s => s.name.includes('別府溫泉') && s.subLocations && s.subLocations.length === 3 && s.mainMapTitle) &&
          parsed[2]?.spots?.some(s => s.notes?.includes('金麟湖入口停車場') && s.name.includes('杉乃井') && s.attachmentImageUrl) &&
          parsed[3]?.spots?.some(s => s.name.includes('一蘭拉麵') && s.subLocations?.some(sub => sub.location.includes('p2Uwh7mSzd2kqB8a8'))) &&
          parsed[3]?.spots?.some(s => s.name.includes('コンフォートホテル') && s.location.includes('mzTgSaQeYKswmgTW8')) &&
          parsed[4]?.spots?.some(s => s.name.includes('食堂煮魚少年') && s.subLocations && s.subLocations.length === 2 && s.hideMainMapButton) &&
          parsed[4]?.spots?.some(s => s.name.includes('Hotel ETS INN') && s.location.includes('Zw7D1sNDMeEy9qJ39')) &&
          parsed[5]?.spots?.some(s => s.name.includes('にぎり塚本鮮魚店') && s.location.includes('g1Rjgkao9LeseXoaA')) &&
          parsed[5]?.spots?.some(s => s.name.includes('太宰府前表参道') && s.subLocations && s.subLocations.length === 7) &&
          parsed[5]?.spots?.some(s => s.name.includes('橋本') && s.attachmentImageUrl) &&
          parsed[5]?.spots?.some(s => s.name.includes('相鉄') && s.location.includes('taKU8FzEVAuxSLkM7')) &&
          parsed[6]?.spots?.some(s => s.name.includes('COMFY') && s.attachmentImageUrl) &&
          parsed[7]?.spots?.some(s => s.name === '早餐：星巴克' && s.location.includes('kDxZ5t1qZ5k1Ug1SA')) &&
          parsed[7]?.spots?.some(s => s.name.includes('退房+加油+還車') && s.location.includes('ニコニコレンタカー 熊本空港店')) &&
          parsed[7]?.title === '星巴克早餐、華航CI199熊本返回高雄'
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
          parsed.some(h => h.name.includes('ETS INN')) &&
          parsed.find(h => h.id === 'hotel-1117')?.mapUrl === 'https://maps.app.goo.gl/mzTgSaQeYKswmgTW8' &&
          parsed.find(h => h.id === 'hotel-1118')?.mapUrl === 'https://maps.app.goo.gl/Zw7D1sNDMeEy9qJ39' &&
          parsed.find(h => h.id === 'hotel-1119')?.mapUrl === 'https://maps.app.goo.gl/taKU8FzEVAuxSLkM7' &&
          parsed.find(h => h.id === 'hotel-1120')?.mealPlan === '純住宿' &&
          parsed.find(h => h.id === 'hotel-1120')?.attachmentImageUrl &&
          parsed.find(h => h.id === 'hotel-1119')?.externalLinkUrl &&
          parsed.find(h => h.id === 'hotel-1116')?.attachmentImageUrl
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
      const saved = localStorage.getItem('kyushu_2026_memos_v2');
      if (saved) {
        const parsed: MemoItem[] = JSON.parse(saved);
        if (Array.isArray(parsed) && !parsed.some(m => m.title.includes('金鱗湖民宿'))) {
          return parsed;
        }
      }
      return INITIAL_MEMOS;
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
      localStorage.removeItem('kyushu_2026_days_v20261117_hotels');
      localStorage.removeItem('kyushu_2026_days_v20261114_takachiho_aso');
      localStorage.removeItem('kyushu_2026_days_v20261116_beppu_kurosaki');
      localStorage.removeItem('kyushu_2026_days_v20261118_ets_hashimoto');
      localStorage.removeItem('kyushu_2026_days_v20261120_amakusa_kuradake');
      localStorage.removeItem('kyushu_2026_days_v20261115_title_updates');
      localStorage.removeItem('kyushu_2026_days_v20261118_to_21_titles');
      localStorage.removeItem('kyushu_2026_days_v20261121_ci199_return');
      localStorage.removeItem('kyushu_2026_days_v20261114_niconico_title');
      localStorage.removeItem('kyushu_2026_days_v20261114_niconico_title');
      localStorage.removeItem('kyushu_2026_days_v20261118_parking_notes');
      localStorage.removeItem('kyushu_2026_days_v20261114_klook_image');
      localStorage.removeItem('kyushu_2026_days_v20261116_suginoi_res_image');
      localStorage.removeItem('kyushu_2026_days_v20261119_hashimoto_res_image');
      localStorage.removeItem('kyushu_2026_days_v20261120_parking_assets');
      localStorage.removeItem('kyushu_2026_days_v20261115_lunch_4maps');
      localStorage.removeItem('kyushu_2026_days_v20261115_kurokawa_kusasenri_maps');
      localStorage.removeItem('kyushu_2026_days_v20261116_yufuin_beppu_maps');
      localStorage.removeItem('kyushu_2026_hotels');
      localStorage.removeItem('kyushu_2026_hotels_v2');
      localStorage.removeItem('kyushu_2026_hotels_v3');
      localStorage.removeItem('kyushu_2026_hotels_v20261114_sat');
      localStorage.removeItem('kyushu_2026_hotels_v20261117_hotels');
      localStorage.removeItem('kyushu_2026_hotels_v20261116_suginoi_booking');
      localStorage.removeItem('kyushu_2026_hotels_v20261118_ets_inn');
      localStorage.removeItem('kyushu_2026_hotels_v20261120_amakusa');
      localStorage.removeItem('kyushu_2026_hotels_v20261115_title_updates');
      localStorage.removeItem('kyushu_2026_hotels_v20261118_to_21_titles');
      localStorage.removeItem('kyushu_2026_hotels_v20261120_room_only');
      localStorage.removeItem('kyushu_2026_hotels_v20261114_niconico_title');
      localStorage.removeItem('kyushu_2026_hotels_v20261118_parking_notes');
      localStorage.removeItem('kyushu_2026_hotels_v20261114_klook_image');
      localStorage.removeItem('kyushu_2026_hotels_v20261116_suginoi_res_image');
      localStorage.removeItem('kyushu_2026_hotels_v20261119_hashimoto_res_image');
      localStorage.removeItem('kyushu_2026_hotels_v20261120_parking_assets');
      localStorage.removeItem('kyushu_2026_hotels_v20261115_lunch_4maps');
      localStorage.removeItem('kyushu_2026_hotels_v20261115_kurokawa_kusasenri_maps');
      localStorage.removeItem('kyushu_2026_hotels_v20261116_yufuin_beppu_maps');
      localStorage.removeItem('kyushu_2026_days_v20261116_refined_maps_nav');
      localStorage.removeItem('kyushu_2026_hotels_v20261116_refined_maps_nav');
      localStorage.removeItem('kyushu_2026_days_v20261117_hakata_dazaifu_maps');
      localStorage.removeItem('kyushu_2026_hotels_v20261117_hakata_kumamoto_maps');
      localStorage.removeItem('kyushu_2026_memos');
    } catch {}

    if (memos.some(m => m.title.includes('金鱗湖民宿'))) {
      setMemos(INITIAL_MEMOS);
    }

    // Check if days currently loaded on client need updating to the latest spot titles and Day 1/8 title
    if (
      days[0]?.title !== '華航CI198 高雄直飛熊本、高千穗划船與南阿蘇' ||
      !days[0]?.spots?.some(s => s.name.includes('ニコニコレンタカー 熊本空港店') && s.attachmentImageUrl) ||
      !days[1]?.spots?.some(s => s.name === '上色見熊野神社') ||
      !days[1]?.spots?.some(s => s.subLocations && s.subLocations.length === 4 && s.hideMainMapButton) ||
      !days[1]?.spots?.some(s => s.name.includes('草千里') && s.subLocations && s.subLocations.length === 3 && s.mainMapTitle) ||
      !days[1]?.spots?.some(s => s.name.includes('黑川溫泉') && s.subLocations?.some(sub => sub.location.includes('maps.app.goo.gl')) && s.subLocations.length === 5) ||
      !days[2]?.spots?.some(s => s.name.includes('湯之坪街道') && s.subLocations && s.subLocations.length === 5) ||
      !days[2]?.spots?.some(s => s.name.includes('由布まぶし') && s.subLocations && s.subLocations.length === 2 && s.hideMainMapButton) ||
      !days[2]?.spots?.some(s => s.name.includes('別府溫泉') && s.subLocations && s.subLocations.length === 3 && s.mainMapTitle) ||
      !days[2]?.spots?.some(s => s.notes?.includes('金麟湖入口停車場') && s.name.includes('杉乃井') && s.attachmentImageUrl) ||
      !days[3]?.spots?.some(s => s.name.includes('一蘭拉麵') && s.subLocations?.some(sub => sub.location.includes('p2Uwh7mSzd2kqB8a8'))) ||
      !days[3]?.spots?.some(s => s.name.includes('コンフォートホテル') && s.location.includes('mzTgSaQeYKswmgTW8')) ||
      !days[4]?.spots?.some(s => s.name.includes('食堂煮魚少年') && s.subLocations && s.subLocations.length === 2 && s.hideMainMapButton) ||
      !days[4]?.spots?.some(s => s.name.includes('Hotel ETS INN') && s.location.includes('Zw7D1sNDMeEy9qJ39')) ||
      !days[5]?.spots?.some(s => s.name.includes('にぎり塚本鮮魚店') && s.location.includes('g1Rjgkao9LeseXoaA')) ||
      !days[5]?.spots?.some(s => s.name.includes('太宰府前表参道') && s.subLocations && s.subLocations.length === 7) ||
      !days[5]?.spots?.some(s => s.name.includes('橋本') && s.attachmentImageUrl) ||
      !days[5]?.spots?.some(s => s.name.includes('相鉄') && s.location.includes('taKU8FzEVAuxSLkM7')) ||
      !days[6]?.spots?.some(s => s.name.includes('COMFY') && s.attachmentImageUrl) ||
      !days[7]?.spots?.some(s => s.name === '早餐：星巴克' && s.location.includes('kDxZ5t1qZ5k1Ug1SA')) ||
      !days[7]?.spots?.some(s => s.name.includes('退房+加油+還車') && s.location.includes('ニコニコレンタカー 熊本空港店')) ||
      days[7]?.title !== '星巴克早餐、華航CI199熊本返回高雄'
    ) {
      setDays(INITIAL_DAYS);
    }
    if (
      hotels.find(h => h.id === 'hotel-1117')?.mapUrl !== 'https://maps.app.goo.gl/mzTgSaQeYKswmgTW8' ||
      hotels.find(h => h.id === 'hotel-1118')?.mapUrl !== 'https://maps.app.goo.gl/Zw7D1sNDMeEy9qJ39' ||
      hotels.find(h => h.id === 'hotel-1119')?.mapUrl !== 'https://maps.app.goo.gl/taKU8FzEVAuxSLkM7' ||
      hotels.find(h => h.id === 'hotel-1120')?.mealPlan !== '純住宿' ||
      !hotels.find(h => h.id === 'hotel-1120')?.attachmentImageUrl ||
      !hotels.find(h => h.id === 'hotel-1119')?.externalLinkUrl ||
      !hotels.find(h => h.id === 'hotel-1118')?.notes?.includes('エコロパーク 博多区堅粕第１') ||
      !hotels.find(h => h.id === 'hotel-1116')?.attachmentImageUrl
    ) {
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
      localStorage.setItem('kyushu_2026_memos_v2', JSON.stringify(memos));
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
