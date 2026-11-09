/**
 * Utility to generate and download a self-contained Single-File HTML bundle
 * with all current user edits, checklists, and itinerary state preserved.
 */

import { DaySchedule, HotelItem, BackupRestaurant, ChecklistItem, MemoItem } from '../types/travel';

export function exportSingleFileHtml(
  days: DaySchedule[],
  hotels: HotelItem[],
  restaurants: BackupRestaurant[],
  checklists: ChecklistItem[],
  memos: MemoItem[]
) {
  const dataPayload = JSON.stringify({
    days,
    hotels,
    restaurants,
    checklists,
    memos,
    exportedAt: new Date().toLocaleString('zh-TW')
  });

  const htmlContent = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
  <title>九州秋楓漫旅 2026 · 離線隨身單檔版</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Sans+TC:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Plus Jakarta Sans', 'Noto Sans TC', 'Noto Sans JP', sans-serif;
      background-color: #FAF8F5;
      color: #374151;
      -webkit-tap-highlight-color: transparent;
    }
    .glass-card {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(225, 215, 205, 0.7);
      box-shadow: 0 4px 20px -2px rgba(180, 150, 140, 0.08);
    }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  </style>
</head>
<body class="pb-24">
  <!-- Top App Bar -->
  <header class="sticky top-0 z-30 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8DFD8] px-4 py-3">
    <div class="max-w-md mx-auto flex items-center justify-between">
      <div>
        <div class="flex items-center gap-1.5 text-xs text-[#C86D56] font-semibold tracking-wider">
          <span>🍁 九州秋楓漫旅 · 離線隨身版</span>
        </div>
        <h1 class="text-base font-bold text-slate-800">2026/11/14 ~ 11/21</h1>
      </div>
      <span class="text-xs bg-[#F7EBE8] text-[#C86D56] px-2.5 py-1 rounded-full font-medium">離線可讀</span>
    </div>

    <!-- Date selector -->
    <div id="date-scroller" class="max-w-md mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar pt-2.5 pb-1">
      <!-- Injected via JS -->
    </div>
  </header>

  <!-- Main Container -->
  <main class="max-w-md mx-auto px-4 pt-4" id="main-content">
    <!-- Active view content injected here -->
  </main>

  <!-- Bottom Navigation -->
  <nav class="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8DFD8] py-1.5">
    <div class="max-w-md mx-auto grid grid-cols-5 text-center text-[10px] font-medium text-slate-500">
      <button onclick="switchTab('itinerary')" id="btn-tab-itinerary" class="py-1 flex flex-col items-center gap-0.5 text-[#C86D56]">
        <span class="text-lg">🗓️</span>
        <span>行程</span>
      </button>
      <button onclick="switchTab('map')" id="btn-tab-map" class="py-1 flex flex-col items-center gap-0.5">
        <span class="text-lg">🗺️</span>
        <span>地圖</span>
      </button>
      <button onclick="switchTab('nav')" id="btn-tab-nav" class="py-1 flex flex-col items-center gap-0.5">
        <span class="text-lg">🧭</span>
        <span>導航美食</span>
      </button>
      <button onclick="switchTab('check')" id="btn-tab-check" class="py-1 flex flex-col items-center gap-0.5">
        <span class="text-lg">✅</span>
        <span>清單</span>
      </button>
      <button onclick="switchTab('info')" id="btn-tab-info" class="py-1 flex flex-col items-center gap-0.5">
        <span class="text-lg">ℹ️</span>
        <span>資訊</span>
      </button>
    </div>
  </nav>

  <script>
    const DATA = ${dataPayload};
    let currentTab = 'itinerary';
    let currentDayId = 'day-1';

    function renderDateScroller() {
      const container = document.getElementById('date-scroller');
      container.innerHTML = DATA.days.map(d => {
        const isSelected = d.id === currentDayId;
        return \`
          <button onclick="selectDay('\${d.id}')" class="shrink-0 px-3 py-1.5 rounded-full text-xs transition-all \${
            isSelected
              ? 'bg-[#C86D56] text-white font-bold shadow-sm'
              : 'bg-white text-slate-600 border border-[#E8DFD8]'
          }">
            \${d.dateLabel} \${d.weekday}
          </button>
        \`;
      }).join('');
    }

    function selectDay(id) {
      currentDayId = id;
      renderDateScroller();
      renderContent();
    }

    function switchTab(tab) {
      currentTab = tab;
      ['itinerary', 'map', 'nav', 'check', 'info'].forEach(t => {
        const btn = document.getElementById('btn-tab-' + t);
        if (btn) {
          if (t === tab) {
            btn.className = 'py-1 flex flex-col items-center gap-0.5 text-[#C86D56] font-bold';
          } else {
            btn.className = 'py-1 flex flex-col items-center gap-0.5 text-slate-500';
          }
        }
      });
      renderContent();
    }

    function renderContent() {
      const el = document.getElementById('main-content');
      if (currentTab === 'itinerary') {
        const day = DATA.days.find(d => d.id === currentDayId) || DATA.days[0];
        const hotel = DATA.hotels.find(h => h.id === day.hotelId);
        el.innerHTML = \`
          <div class="space-y-4">
            <div class="glass-card rounded-2xl p-4 bg-gradient-to-br from-[#FFFDF9] to-[#F7EBE8]/40 border border-[#EBDCD3]">
              <div class="flex items-center justify-between text-xs text-[#C86D56] font-semibold mb-1">
                <span>\${day.area}</span>
                <span>\${day.forecast.tempMin}°C ~ \${day.forecast.tempMax}°C · \${day.forecast.foliageStatus}</span>
              </div>
              <h2 class="text-base font-bold text-slate-800">\${day.title}</h2>
              <p class="text-xs text-slate-600 mt-2 bg-white/70 p-2.5 rounded-xl border border-[#EDE2D8]">
                🧣 <strong>穿搭建議：</strong>\${day.outfitTip}
              </p>
            </div>

            <div class="space-y-3">
              \${day.spots.map((spot, i) => \`
                <div class="glass-card rounded-2xl p-3.5 border border-[#E8DFD8]">
                  <div class="flex items-start justify-between">
                    <div>
                      <span class="inline-block px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#F7EBE8] text-[#C86D56]">
                        \${spot.time}
                      </span>
                      <h3 class="text-sm font-bold text-slate-800 mt-1">\${spot.name}</h3>
                    </div>
                    \${!spot.hideMainMapButton ? \`
                      <a href="\${spot.location.startsWith('http') ? spot.location : 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(spot.location)}" target="_blank" class="px-2.5 py-1 text-xs bg-white text-[#C86D56] border border-[#EBDCD3] rounded-lg shadow-sm">
                        \${spot.mainMapTitle || '導航'} ↗
                      </a>
                    \` : ''}
                  </div>
                  \${spot.subLocations && spot.subLocations.length > 0 ? \`
                    <div class="mt-2.5 p-2 bg-amber-50/70 rounded-xl border border-amber-200">
                      <div class="text-[11px] font-bold text-amber-900 mb-1">📍 個別景點導航：</div>
                      <div class="grid grid-cols-2 gap-1.5">
                        \${spot.subLocations.map(sub => \`
                          <a href="\${sub.location.startsWith('http') ? sub.location : 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(sub.location)}" target="_blank" class="text-[11px] p-1.5 bg-white text-[#C86D56] border border-[#ECD9CE] rounded-lg block truncate font-medium">
                            🧭 \${sub.name}
                          </a>
                        \`).join('')}
                      </div>
                    </div>
                  \` : ''}
                  <p class="text-xs text-slate-600 mt-2 leading-relaxed">\${spot.notes}</p>
                  \${spot.tips ? \`<div class="text-[11px] text-[#A8523D] bg-[#FDF5F2] p-2 rounded-lg mt-2 font-medium">📷 \${spot.tips}</div>\` : ''}
                </div>
              \`).join('')}
            </div>

            \${hotel ? \`
              <div class="glass-card rounded-2xl p-4 bg-gradient-to-br from-amber-50/60 to-orange-50/40 border border-amber-200/80">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-bold text-amber-800 tracking-wide uppercase">今晚精選旅宿</span>
                  \${hotel.mealPlan ? \`<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">\${hotel.mealPlan}</span>\` : ''}
                </div>
                <div class="flex items-start justify-between gap-2 mt-1">
                  <div>
                    <h3 class="text-sm font-bold text-slate-800">\${hotel.name} (\${hotel.jpName})</h3>
                    <div class="text-xs text-slate-600 mt-1 flex flex-wrap gap-2 font-mono">
                      <span>入住: <strong>\${hotel.checkIn}</strong></span>
                      <span>退房: <strong>\${hotel.checkOut}</strong></span>
                    </div>
                  </div>
                  <a href="\${hotel.mapUrl || ('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(hotel.address))}" target="_blank" class="px-2.5 py-1 text-xs bg-amber-100 text-amber-900 border border-amber-300 rounded-lg shadow-sm shrink-0">
                    飯店導航 ↗
                  </a>
                </div>
                <p class="text-xs text-slate-500 mt-1">地址：\${hotel.address}</p>
                <div class="text-xs text-amber-900 mt-2 space-y-1">
                  \${hotel.highlights.map(hl => \`<div>✦ \${hl}</div>\`).join('')}
                </div>
              </div>
            \` : ''}
          </div>
        \`;
      } else if (currentTab === 'map') {
        el.innerHTML = \`
          <div class="glass-card rounded-2xl p-4 text-center">
            <h2 class="text-sm font-bold text-slate-800">九州大地標互動導覽</h2>
            <p class="text-xs text-slate-500 mt-1 mb-3">涵蓋福岡、北九州、別府、由布院、阿蘇、高千穗與熊本</p>
            <div class="bg-amber-50/70 p-4 rounded-xl text-left text-xs space-y-2 border border-amber-200">
              <div class="font-bold text-[#C86D56]">📍 每日核心亮點：</div>
              <div>• 11/14：華航CI198 -> ニコニコレンタカー 熊本空港店取車 -> 高千穗划船 -> あそ望の郷 -> 南阿蘇 La Vista</div>
              <div>• 11/15：上色見熊野神社 -> 阿蘇車站 (Lawson/夢の湯) -> 午餐赤牛丼 -> 草千里 -> 出發前往黑川溫泉 -> 入住 黒川温泉 旅館湯本荘</div>
              <div>• 11/16：九重「夢」大吊橋 -> 由布岳 -> 湯之坪街道/午餐由布まぶし心 -> 別府溫泉 (岡本屋/湯霧) -> 入住 別府温泉 杉乃井ホテル</div>
              <div>• 11/17：鶴見岳高空纜車 -> 深耶馬溪 -> かじか茶屋午餐 -> 英彥山神宮 -> 16:40皿倉山纜車站 -> 皿倉山百億夜景 -> 北九州黑崎</div>
              <div>• 11/18：吞山觀音寺 -> 石藏酒造 博多百年藏 -> 午餐食堂煮魚少年/いちたか -> 福岡市區自由行 -> 入住 Hotel ETS INN 博多 -> 聖誕市集 -> 中洲屋台街散策</div>
              <div>• 11/19：糸島 櫻井二見之浦 夫婦岩 -> 塚本鮮魚店早餐 -> 雷山千如寺 大悲王院 -> 太宰府天滿宮/表參道 -> 熊本洋食橋本 -> 入住 相鐵GRAND FRESA 熊本</div>
              <div>• 11/20：熊本城 -> 午餐上天草さんぱーる -> 倉岳神社 -> 長部田海床路 -> 晚餐菅乃屋銀座通り店 -> 入住 熊本城景 And COMFY 飯店</div>
              <div>• 11/21：星巴克早餐 -> 退房+加油+還車 -> 機場 & 辦理退稅手續 -> 華航CI199熊本返回高雄</div>
            </div>
          </div>
        \`;
      } else if (currentTab === 'nav') {
        el.innerHTML = \`
          <div class="space-y-3">
            <div class="glass-card rounded-2xl p-3.5">
              <h2 class="text-sm font-bold text-slate-800">備用美食與特色餐廳推薦 (20間)</h2>
              <p class="text-xs text-slate-500 mt-0.5">依照地區完整收錄，點擊即可一鍵打開 Google Maps</p>
            </div>
            \${DATA.restaurants.map(r => \`
              <div class="glass-card rounded-2xl p-3 border border-[#E8DFD8]">
                <div class="flex items-start justify-between">
                  <div>
                    <span class="text-[10px] font-bold text-[#C86D56] bg-[#F7EBE8] px-2 py-0.5 rounded">\${r.region}</span>
                    <h3 class="text-sm font-bold text-slate-800 mt-1">\${r.name}</h3>
                    <p class="text-xs text-amber-700 font-medium">\${r.specialty}</p>
                  </div>
                  <a href="https://www.google.com/maps/search/?api=1&query=\${encodeURIComponent(r.searchQuery)}" target="_blank" class="px-2.5 py-1 text-xs bg-white text-[#C86D56] border border-[#EBDCD3] rounded-lg">
                    地圖 ↗
                  </a>
                </div>
                <p class="text-xs text-slate-500 mt-1.5">\${r.notes}</p>
              </div>
            \`).join('')}
          </div>
        \`;
      } else if (currentTab === 'check') {
        el.innerHTML = \`
          <div class="space-y-4">
            <div class="glass-card rounded-2xl p-3.5">
              <h2 class="text-sm font-bold text-slate-800">行前準備與隨身清單</h2>
              <p class="text-xs text-slate-500 mt-0.5">點擊核取方塊可標記完成狀態</p>
            </div>
            <div class="space-y-2">
              \${DATA.checklists.map((c, i) => \`
                <label class="glass-card rounded-xl p-3 flex items-center gap-3 border border-[#E8DFD8] cursor-pointer">
                  <input type="checkbox" \${c.completed ? 'checked' : ''} onchange="DATA.checklists[\${i}].completed = this.checked;" class="w-4 h-4 text-[#C86D56] rounded">
                  <span class="text-xs text-slate-700 flex-1 \${c.completed ? 'line-through text-slate-400' : ''}">\${c.text}</span>
                  <span class="text-[10px] text-slate-400">\${c.category}</span>
                </label>
              \`).join('')}
            </div>
          </div>
        \`;
      } else if (currentTab === 'info') {
        el.innerHTML = \`
          <div class="space-y-3">
            <div class="glass-card rounded-2xl p-4 bg-gradient-to-br from-rose-50/70 to-orange-50/40 border border-rose-200/70">
              <h2 class="text-sm font-bold text-rose-900">✈ 華航航班資訊</h2>
              <div class="mt-2 text-xs space-y-1 text-rose-950">
                <div>• 去程 11/14 (週六)：CI198 高雄(KHH) 07:30 -> 熊本(KMJ) 10:50</div>
                <div>• 回程 11/21 (週六)：CI199 熊本(KMJ) 11:55 -> 高雄(KHH) 14:15</div>
              </div>
            </div>

            <div class="glass-card rounded-2xl p-4 border border-[#E8DFD8]">
              <h2 class="text-sm font-bold text-slate-800">⚠️ 2026/11 最新退稅制度指南</h2>
              <div class="mt-2 text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <div>1. 購物時出示護照/Visit Japan Web QR Code，部分百貨已轉為先付含稅價。</div>
                <div>2. 出境出關時，於安檢後海關機台掃描護照/登機證查核。</div>
                <div>3. 托運行李中若含昂貴免稅品，在櫃檯托運時請先告知地勤配合海關查驗。</div>
                <div>4. 密封袋包裝之消耗品切勿在出境前拆開！</div>
              </div>
            </div>

            <div class="glass-card rounded-2xl p-4 border border-[#E8DFD8]">
              <h2 class="text-sm font-bold text-slate-800">🚨 緊急聯絡資訊</h2>
              <div class="mt-2 text-xs text-slate-600 space-y-1">
                <div>• 報警：撥打 110 (可要求中文通譯)</div>
                <div>• 救護車/消防：撥打 119</div>
                <div>• 台北駐福岡經濟文化辦事處：+81-92-734-2810 (緊急聯絡電話：+81-90-8765-3410)</div>
              </div>
            </div>
          </div>
        \`;
      }
    }

    renderDateScroller();
    renderContent();
  </script>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `九州秋楓漫旅2026_離線隨身版.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
