/**
 * Helper to get clean, pure spot/location names for map pins.
 * Strips away promotional adjectives, activity descriptions, and introductory words.
 */

const SPOT_CLEAN_MAP: Record<string, string> = {
  // Day 1
  '高雄小港機場 (KHH) ✈ 熊本機場 (KMJ)': '高雄機場 ✈ 熊本機場',
  '熊本機場抵達出關 & NICONICO 租車免費接駁': '熊本機場 (租車接駁)',
  'NICONICO 租車取車 (熊本機場店)': 'NICONICO 租車熊本機場店',
  '阿蘇赤牛丼午餐：いまきん食堂 或 內牧溫泉街': 'いまきん食堂 (內牧溫泉)',
  '大觀峰 (Daikanbo) 俯瞰阿蘇五岳涅槃像': '大觀峰',
  '草千里之濱 (草千里珈琲焙煎所 / 騎馬俱樂部 / 山之驛)': '草千里之濱',
  'あそ望の郷 くぎの (南阿蘇道之驛觀景採買)': 'あそ望の郷 くぎの',
  '入住 ラビスタ南阿蘇 (La Vista 溫泉飯店)': 'ラビスタ南阿蘇',

  // Day 2
  '上色見熊野座神社': '上色見熊野座神社',
  '高千穗峽谷 & 真名井瀑布 (划船體驗)': '高千穗峽谷 (真名井瀑布)',
  '高千穗午餐：高千穗牛餐廳「和」或 流水麵': '高千穗牛餐廳「和」',
  '黑川溫泉街深度散策': '黑川溫泉街',
  '入住 黑川溫泉 旅館湯本莊': '黑川溫泉 旅館湯本莊',

  // Day 3
  '九重「夢」大吊橋': '九重「夢」大吊橋',
  '杵築城下町 (小京都)': '杵築城下町',
  '湯霧展望台 (Yukemuri Observatory)': '湯霧展望台',
  '別府地獄巡禮 & 岡本屋溫泉布丁': '別府地獄 (海地獄/岡本屋)',
  '入住 別府溫泉 杉乃井大飯店': '別府溫泉 杉乃井飯店',

  // Day 4
  '別府纜車 (Beppu Ropeway)': '別府纜車',
  '志高湖 (Lake Shidaka)': '志高湖',
  '由布岳登山口高原展望': '由布岳登山口',
  '由布院散策 & 人氣名物排隊必吃': '由布院溫泉街',
  '由布院午後散策與湖畔風光': '由布院散策',
  '由布院在地生鮮超市採買食材': '由布院生鮮超市',
  '入住 コンフォートホテル 黒崎 (Comfort Hotel Kurosaki)': 'コンフォートホテル 黒崎',
  '入住 金鱗湖畔獨棟民宿 David No Yakata': 'David No Yakata 民宿',

  // Day 5
  '金鱗湖 清晨絕美晨霧 (Morning Mist)': '金鱗湖',
  '深耶馬溪「一目八景」賞楓 & 茶屋早餐': '深耶馬溪 (一目八景)',
  '英彥山神宮 (Hikosan Jingu)': '英彥山神宮',
  '皿倉山纜車 & 新日本三大夜景': '皿倉山纜車 (皿倉山展望台)',
  '入住 ホテルサードプレイス博多 (Hotel 3rd Place Hakata)': 'ホテルサードプレイス博多',
  '入住 HOTEL CROWN PALAIS KOKURA (小倉皇冠宮)': 'HOTEL CROWN PALAIS KOKURA',

  // Day 6
  '早餐：星乃咖啡廳 (小倉/博多站前)': '星乃咖啡廳',
  '吞山觀音寺 (Nomiyama Kannonji)': '吞山觀音寺',
  '石藏酒造 博多百年藏 (Ishikura Shuzo)': '石藏酒造 (博多百年藏)',
  '福岡動漫扭蛋一番賞自由行特輯': '博多運河城 / 天神動漫商場',
  '入住 相鉄グランドフレッサ 熊本 (Sotetsu Grand Fressa Kumamoto)': '相鉄グランドフレッサ 熊本',
  '入住 Hotel Clio Court Hakata & 博多美食': 'Hotel Clio Court Hakata',

  // Day 7
  '早餐預約：白金茶房 (Sirogane Sabo)': '白金茶房',
  '糸島 櫻井二見之浦 夫婦岩 (Meoto Iwa)': '糸島 夫婦岩',
  '雷山千如寺大悲王院 (Sennyoji)': '雷山千如寺大悲王院',
  '太宰府天滿宮 & 參道人氣散策': '太宰府天滿宮',
  '前往熊本 & 入住 And COMFY HOTEL Kumamoto Jo View': 'And COMFY HOTEL Kumamoto Jo View',

  // Day 8
  '早餐：星巴克 (熊本市區/城下店)': '星巴克 (熊本城下店)',
  '熊本城 外圍晨間巡禮與拍照': '熊本城 (加藤神社)',
  '飯店退房 & 加油還車 (NICONICO 租車)': 'NICONICO 租車熊本機場店',
  '抵達熊本機場 & 辦理退稅手續': '熊本機場',
  '華航 CI199 熊本(KMJ) ✈ 高雄(KHH)': '熊本機場 ✈ 高雄機場',

  // Hotels
  '南阿蘇 La Vista 溫泉飯店': 'ラビスタ南阿蘇',
  '黑川溫泉 旅館湯本莊': '黑川溫泉 旅館湯本莊',
  '別府溫泉 杉乃井大飯店': '別府溫泉 杉乃井飯店',
  'コンフォートホテル 黒崎 (Comfort Hotel Kurosaki)': 'コンフォートホテル 黒崎',
  'ホテルサードプレイス博多 (Hotel 3rd Place Hakata)': 'ホテルサードプレイス博多',
  '相鉄グランドフレッサ 熊本 (Sotetsu Grand Fressa Kumamoto)': '相鉄グランドフレッサ 熊本',
  '由布院金鱗湖畔獨棟民宿 David No Yakata': 'David No Yakata 民宿',
  '北九州小倉皇冠宮飯店': 'HOTEL CROWN PALAIS KOKURA',
  '博多克里歐庭酒店': 'Hotel Clio Court Hakata',
  '熊本城景 And COMFY 飯店': 'And COMFY HOTEL Kumamoto Jo View'
};

export function getCleanLocationName(rawName: string): string {
  if (!rawName) return '';
  const trimmed = rawName.trim();
  if (SPOT_CLEAN_MAP[trimmed]) {
    return SPOT_CLEAN_MAP[trimmed];
  }

  // Fallback stripping for any user-added or modified custom spots:
  let clean = trimmed;

  // Remove common prefixes: "入住 ", "早餐：", "抵達", "前往"
  clean = clean.replace(/^(入住\s*|早餐[：:]\s*|飯店退房\s*&\s*|前往)/, '');

  // If there's an English/Japanese name in brackets at start or specific spot, extract the spot name
  // Remove trailing descriptive phrases after space or colon
  if (clean.includes('：')) {
    const parts = clean.split('：');
    clean = parts[1] || parts[0];
  }

  // Remove trailing descriptive text after space if it looks like an activity
  clean = clean.replace(/\s+(俯瞰.*|散策.*|深度.*|巡禮.*|特輯.*|自由行.*|買食材.*|排隊.*|晨散.*)$/, '');

  return clean.trim() || trimmed;
}
