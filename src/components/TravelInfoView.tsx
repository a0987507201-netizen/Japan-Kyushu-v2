import React from 'react';
import {
  Plane,
  Building,
  ShieldAlert,
  PhoneCall,
  ExternalLink,
  Download,
  Receipt,
  CloudSun,
  Leaf,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { DaySchedule, HotelItem, BackupRestaurant, ChecklistItem, MemoItem } from '../types/travel';
import { exportSingleFileHtml } from '../utils/htmlExporter';

interface TravelInfoViewProps {
  days: DaySchedule[];
  hotels: HotelItem[];
  restaurants: BackupRestaurant[];
  checklists: ChecklistItem[];
  memos: MemoItem[];
}

export const TravelInfoView: React.FC<TravelInfoViewProps> = ({
  days,
  hotels,
  restaurants,
  checklists,
  memos,
}) => {
  const handleExport = () => {
    exportSingleFileHtml(days, hotels, restaurants, checklists, memos);
  };

  const openGoogleMaps = (address: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-4 pb-20 animate-in fade-in duration-300">
      {/* 1. Offline Single-File HTML Export Card (User Feature Requirement) */}
      <div className="glass-card rounded-3xl p-4.5 bg-gradient-to-br from-[#FFFDF9] via-[#FAF1EC] to-[#F7EBE8] border border-[#E8D4C8] shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#C86D56] font-bold">
              <span>💾 離線備份與單檔分享</span>
            </div>
            <h2 className="text-base font-bold text-slate-800 mt-0.5">
              匯出單檔 HTML 隨身帶著走
            </h2>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              將您目前已勾選的清單、自訂備忘錄與修改後的行程，打包成一個獨立的 <code className="bg-white/80 px-1 py-0.5 rounded text-[#C86D56] font-mono">.html</code> 檔案，可直接傳給旅伴或在無網路環境下透過手機瀏覽器隨時開啟！
            </p>
          </div>
        </div>

        <button
          onClick={handleExport}
          className="w-full mt-3.5 py-2.5 px-4 rounded-2xl bg-gradient-to-r from-[#D9826D] to-[#C86D56] text-white font-bold text-xs shadow-md shadow-[#C86D56]/20 flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.99] transition-all"
        >
          <Download className="w-4 h-4" />
          <span>下載最新單檔 HTML (離線版)</span>
        </button>
      </div>

      {/* 2. Flights Card (華航 CI198 / CI199) */}
      <div className="glass-card rounded-3xl p-4 bg-gradient-to-br from-sky-50/70 to-indigo-50/40 border border-sky-200/80 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center">
              <Plane className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-sky-800 tracking-wider uppercase">
                China Airlines
              </span>
              <h3 className="text-sm font-bold text-slate-800">
                中華航空 航班資訊
              </h3>
            </div>
          </div>
          <span className="text-xs font-mono font-bold bg-white text-sky-700 px-2 py-0.5 rounded-full border border-sky-200">
            高雄 ⇄ 熊本
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2.5 text-xs text-slate-700">
          {/* Flight 1: Outbound */}
          <div className="bg-white/85 p-3 rounded-2xl border border-sky-100/90 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sky-900 flex items-center gap-1">
                <span>🛫 去程：華航 CI198</span>
              </span>
              <span className="font-mono text-slate-500 font-medium">2026/11/14 (週六)</span>
            </div>
            <div className="text-xs text-slate-600 flex items-center justify-between pt-1">
              <div>
                <strong className="text-slate-800 font-mono text-sm">07:30</strong> 高雄小港 (KHH)
              </div>
              <span className="text-slate-400 font-mono">約 2h 20m</span>
              <div>
                <strong className="text-slate-800 font-mono text-sm">10:50</strong> 熊本阿蘇 (KMJ)
              </div>
            </div>
          </div>

          {/* Flight 2: Inbound */}
          <div className="bg-white/85 p-3 rounded-2xl border border-sky-100/90 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sky-900 flex items-center gap-1">
                <span>🛬 回程：華航 CI199</span>
              </span>
              <span className="font-mono text-slate-500 font-medium">2026/11/21 (週六)</span>
            </div>
            <div className="text-xs text-slate-600 flex items-center justify-between pt-1">
              <div>
                <strong className="text-slate-800 font-mono text-sm">11:55</strong> 熊本阿蘇 (KMJ)
              </div>
              <span className="text-slate-400 font-mono">約 2h 20m</span>
              <div>
                <strong className="text-slate-800 font-mono text-sm">14:15</strong> 高雄小港 (KHH)
              </div>
            </div>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 bg-sky-100/40 p-2 rounded-xl">
          💡 <strong>登機提醒：</strong>CI198 為早班機 07:30 起飛，請於早晨 05:30 提早抵達高雄小港機場辦理報到手續與行李托運。
        </div>
      </div>

      {/* 3. Japan Latest Tax-Free System Effective 11/1 */}
      <div className="glass-card rounded-3xl p-4 bg-gradient-to-br from-amber-50/70 to-orange-50/40 border border-amber-200/80 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
            <Receipt className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-amber-800 uppercase">
                Tax Refund Guide
              </span>
              <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.2 rounded font-bold">
                重要必看
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-800">
              日本最新退稅制度、流程與注意事項
            </h3>
          </div>
        </div>

        <div className="text-xs text-slate-700 space-y-2 bg-white/85 p-3 rounded-2xl border border-amber-100 leading-relaxed">
          <div className="flex items-start gap-1.5">
            <span className="w-4 h-4 rounded-full bg-amber-600 text-white font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <div>
              <strong className="text-slate-800">購物當下：</strong>
              出示外國護照（可搭配 Visit Japan Web 免稅二維碼）。部分大型連鎖商場或百貨已推動「先付含稅價、後續出境查驗退回」或現場免稅櫃台直扣機制。
            </div>
          </div>

          <div className="flex items-start gap-1.5">
            <span className="w-4 h-4 rounded-full bg-amber-600 text-white font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <div>
              <strong className="text-slate-800">機場出境海關掃描（關鍵變革）：</strong>
              日本全面落實免稅紀錄電子化（免稅單不再釘在護照內）。在通過安檢後，請於海關查驗閘門將護照置於電子機台感應掃描，即時比對消費紀錄。
            </div>
          </div>

          <div className="flex items-start gap-1.5">
            <span className="w-4 h-4 rounded-full bg-amber-600 text-white font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <div>
              <strong className="text-slate-800">若托運行李含免稅品：</strong>
              若高額免稅品（如手錶、相機、多瓶化妝品）需放行李箱托運，在航空公司櫃檯辦理報到時，請先主動告知地勤「行李箱內含有需海關查核之免稅品」，地勤會通知海關人員先到櫃檯或專用檢查點過目確認，避免出境安檢後海關要求抽驗卻拿不出來被補徵 10% 消費稅！
            </div>
          </div>

          <div className="flex items-start gap-1.5">
            <span className="w-4 h-4 rounded-full bg-amber-600 text-white font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
              4
            </span>
            <div>
              <strong className="text-slate-800">消耗品密封袋規定：</strong>
              藥妝、保養品、食品、酒類等消耗品，店家包裝之特製封袋在「離開日本境內前絕對不可拆封」。拆封視同境內已使用，依法必須補繳稅款。
            </div>
          </div>

          <div className="flex items-start gap-1.5">
            <span className="w-4 h-4 rounded-full bg-amber-600 text-white font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
              5
            </span>
            <div>
              <strong className="text-slate-800">11/21 熊本機場 (KMJ) 回程動線：</strong>
              熊本阿蘇機場國際線航廈較精巧，尖峰時段海關與安檢排隊較長。當天預計 10:00 抵達機場，留妥充足 45 分鐘辦理手續最穩當。
            </div>
          </div>
        </div>
      </div>

      {/* 4. Live Weather & Maple Foliage Forecast Quick Links */}
      <div className="glass-card rounded-3xl p-4 bg-gradient-to-br from-[#FFFDF9] to-[#F5EFE9] border border-[#EADBCE] shadow-sm space-y-2.5">
        <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <CloudSun className="w-4 h-4 text-[#D9A05B]" />
          <span>日本當地氣象與即時楓葉預報連結</span>
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <a
            href="https://tenki.jp/forecast/9/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/80 border border-[#E5DACF] flex items-center justify-between text-slate-700 hover:text-[#C86D56] transition-colors"
          >
            <div>
              <div className="font-bold">tenki.jp 九州氣象</div>
              <div className="text-[10px] text-slate-400">日本氣象協會實況</div>
            </div>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://weathernews.jp/koyo/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/80 border border-[#E5DACF] flex items-center justify-between text-slate-700 hover:text-[#C86D56] transition-colors"
          >
            <div>
              <div className="font-bold">Weathernews 紅葉</div>
              <div className="text-[10px] text-slate-400">全國楓葉見頃預報</div>
            </div>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://koyo.walkerplus.com/list/ar1000/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/80 border border-[#E5DACF] flex items-center justify-between text-slate-700 hover:text-[#C86D56] transition-colors"
          >
            <div>
              <div className="font-bold">Walkerplus 九州賞楓</div>
              <div className="text-[10px] text-slate-400">景點即時紅葉情報</div>
            </div>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://www.beppu-ropeway.info/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-white/80 border border-[#E5DACF] flex items-center justify-between text-slate-700 hover:text-[#C86D56] transition-colors"
          >
            <div>
              <div className="font-bold">別府纜車官方網站</div>
              <div className="text-[10px] text-slate-400">當日強風運行確認</div>
            </div>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 6. Emergency Contacts & Embassy */}
      <div className="glass-card rounded-3xl p-4 bg-gradient-to-br from-rose-50/60 to-[#FFFDF9] border border-rose-200/70 shadow-sm space-y-2.5">
        <h3 className="text-xs font-bold text-rose-950 flex items-center gap-1.5">
          <PhoneCall className="w-4 h-4 text-rose-700" />
          <span>緊急聯絡電話與在日救助管道</span>
        </h3>

        <div className="space-y-2 text-xs text-slate-700 bg-white/85 p-3 rounded-2xl border border-rose-100 leading-relaxed">
          <div className="flex items-center justify-between">
            <span className="font-bold text-rose-900">🚨 報警 (警察局)：</span>
            <span className="font-mono font-bold text-sm text-slate-900">撥打 110</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-rose-900">🚑 救護車 / 火警救援：</span>
            <span className="font-mono font-bold text-sm text-slate-900">撥打 119</span>
          </div>

          <div className="pt-2 border-t border-rose-100">
            <div className="font-bold text-slate-800">
              🇹🇼 台北駐福岡經濟文化辦事處 (領事急難救助)
            </div>
            <div className="text-slate-500 text-[11px] mt-0.5">
              地址：福岡市中央區櫻坂3-12-42
            </div>
            <div className="font-mono text-slate-700 mt-1">
              總機電話：+81-92-734-2810
            </div>
            <div className="font-mono font-bold text-rose-700">
              24小時緊急聯絡電話：+81-90-8765-3410
            </div>
          </div>

          <div className="pt-2 border-t border-rose-100">
            <div className="font-bold text-slate-800">
              🚗 NICONICO 租車 熊本機場店
            </div>
            <div className="font-mono text-slate-700">
              電話：096-232-2525 (導航 MapCode 亦可輸入此電話)
            </div>
          </div>
        </div>
      </div>

      {/* 7. Travel Taboos & Customs Prohibitions */}
      <div className="glass-card rounded-3xl p-4 border border-[#EADBCE] shadow-sm space-y-2">
        <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>出入境違禁品與日本旅遊禮儀注意事項</span>
        </h3>

        <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed bg-white/70 p-3 rounded-2xl border border-[#EDE2D8]">
          <div>
            🚫 <strong>嚴格肉製品禁令：</strong>任何豬肉、牛肉、雞肉加工品（包含肉乾、香腸、真空包裝肉類、肉鬆蛋捲、含肉快煮麵）皆嚴禁攜帶入境台灣或日本，違者罰款高達新台幣 20 萬元至 100 萬元！
          </div>
          <div>
            🚫 <strong>新鮮蔬果管制：</strong>日本生鮮水果（水蜜桃、草莓、蘋果等）不可攜帶入境台灣，請在旅日期間享用完畢。
          </div>
          <div>
            ♨ <strong>日本溫泉文化禮儀：</strong>進入浴池前必須先在淋浴區將身體與頭髮徹底清洗乾淨；毛巾不可浸入溫泉池中（可摺好放在頭頂或池畔）；長髮需盤起。
          </div>
          <div>
            🚗 <strong>日本右駕自駕準則：</strong>行人優先是絕對原則！遇到沒有紅綠燈的斑馬線有行人等候務必停下禮讓；日本超速照相機多，請遵照速限行駛。
          </div>
        </div>
      </div>
    </div>
  );
};
