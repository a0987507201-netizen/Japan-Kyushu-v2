/**
 * Type definitions for Kyushu Autumn Travel Web App
 */

export type TabType = 'itinerary' | 'map' | 'navigation' | 'checklist' | 'info';

export interface SpotItem {
  id: string;
  time: string;
  name: string;
  category: 'flight' | 'car' | 'scenic' | 'food' | 'shopping' | 'hotel' | 'culture';
  notes: string;
  tips: string;
  location: string;
  reviewQuery?: string;
  attachmentImageUrl?: string;
  attachmentTitle?: string;
  externalLinkUrl?: string;
  externalLinkTitle?: string;
  subLocations?: Array<{
    name: string;
    location: string;
    mapQuery?: string;
  }>;
  hideMainMapButton?: boolean;
  mainMapTitle?: string;
  mapCoord: { x: number; y: number }; // percentage 0-100 on Kyushu map
}

export interface HotelItem {
  id: string;
  name: string;
  jpName: string;
  date: string;
  dateLabel: string;
  address: string;
  checkIn: string;
  checkOut: string;
  mealPlan?: string;
  services: string[];
  highlights: string[];
  notes?: string;
  attachmentImageUrl?: string;
  attachmentTitle?: string;
  externalLinkUrl?: string;
  externalLinkTitle?: string;
  mapUrl?: string;
  mapCoord: { x: number; y: number };
}

export interface DaySchedule {
  id: string;
  date: string;
  dateLabel: string;
  weekday: string;
  title: string;
  area: string;
  forecast: {
    tempMin: number;
    tempMax: number;
    condition: string;
    rainProb?: string; // e.g. "降雨機率 10% (晴朗無雨)"
    foliageStatus: string; // e.g. "見頃 (最盛期)", "色づき始め"
  };
  outfitTip: string;
  spots: SpotItem[];
  hotelId: string;
}

export interface BackupRestaurant {
  id: string;
  name: string;
  region: '阿蘇' | '高千穗' | '別府/大分' | '由布院' | '添田/英彥山' | '北九州' | '福岡/博多' | '熊本';
  specialty: string;
  notes: string;
  searchQuery: string;
}

export interface ChecklistItem {
  id: string;
  category: string;
  text: string;
  completed: boolean;
}

export interface MemoItem {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}
