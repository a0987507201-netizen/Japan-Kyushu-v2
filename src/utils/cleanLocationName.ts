/**
 * Helper to get clean, pure spot/location names for map pins.
 * Strips away promotional adjectives, activity descriptions, and introductory words.
 */

const SPOT_CLEAN_MAP: Record<string, string> = {
  // Day 1
  '華航CI198 高雄小港機場 (KHH) ✈ 熊本機場 (KMJ)': '高雄機場 ✈ 熊本機場',
  '高雄小港機場 (KHH) ✈ 熊本機場 (KMJ)': '高雄機場 ✈ 熊本機場',
  '熊本機場抵達出關 & 機場附近租車': '熊本機場 (租車)',
  '熊本機場抵達出關 & NICONICO 租車免費接駁': '熊本機場 (租車接駁)',
  'NICONICO 租車取車 (熊本機場店)': 'NICONICO 租車熊本機場店',
  '午餐：機場或路上超商買上車吃': '超商買上車吃',
  '抵達高千穗峽谷': '高千穗峽谷',
  '14:00 高千穗划船 (真名井瀑布)': '高千穗峽谷 (真名井瀑布)',
  'あそ望の郷 くぎの (南阿蘇道之驛觀景採買)': 'あそ望の郷 くぎの',
  '入住 南阿蘇 La Vista 溫泉飯店 (ラビスタ南阿蘇)': 'ラビスタ南阿蘇',
  '入住 ラビスタ南阿蘇 (La Vista 溫泉飯店)': 'ラビスタ南阿蘇',

  // Day 2
  '8:00 出發上色見熊野神社 (上色見熊野座神社)': '上色見熊野座神社',
  '上色見熊野座神社': '上色見熊野座神社',
  '阿蘇車站 (坊中温泉 / 夢の湯 / Lawson阿蘇站前店 遠眺阿蘇五岳拍照推薦)': '阿蘇車站 (坊中温泉/Lawson)',
  '午餐：いまきん食堂 或 あか牛丼いわさき 或 阿蘇はなびし / ニュー草千里': 'いまきん食堂 (赤牛丼)',
  '草千里 (草千里珈琲焙煎所 / 草千里騎馬俱樂部 / 山之驛物產館)': '草千里之濱',
  '草千里之濱 (草千里珈琲焙煎所 / 騎馬俱樂部 / 山之驛)': '草千里之濱',
  '出發前往黑川溫泉 (預計14:30~15:00之間啟程)': '山並公路',
  '黑川溫泉 (パティスリー 麓 / どらどら / 丸鈴橋 / 湯音 / 新明館的黑色橋)': '黑川溫泉街',
  '黑川溫泉街深度散策': '黑川溫泉街',
  '住宿旅館黑川溫泉 湯本莊 (黒川温泉 旅館湯本荘)': '黑川溫泉 旅館湯本莊',
  '入住 黑川溫泉 旅館湯本莊': '黑川溫泉 旅館湯本莊',

  // Day 3
  '九重「夢」大吊橋 (9:00出發)': '九重「夢」大吊橋',
  '九重「夢」大吊橋': '九重「夢」大吊橋',
  '由布岳 (正面登山口高原展望公路)': '由布岳',
  '由布岳登山口高原展望': '由布岳登山口',
  '湯之坪街道 (B-speak / ミルヒ / 花卉村 / 金賞可樂餅 / 今泉堂)': '湯之坪街道',
  '由布院散策 & 人氣名物排隊必吃': '由布院溫泉街',
  '午餐：由布まぶし「心」金鱗湖本店 / 山家料理 湯の岳庵': '由布まぶし「心」',
  '別府溫泉 (岡本屋賣店 / 湯霧展望台 / 別府百貨)': '別府溫泉 (岡本屋/湯霧)',
  '湯霧展望台 (Yukemuri Observatory)': '湯霧展望台',
  '別府地獄巡禮 & 岡本屋溫泉布丁': '別府地獄 (海地獄/岡本屋)',
  '住別府杉乃井大飯店 (別府温泉 杉乃井ホテル)': '別府溫泉 杉乃井飯店',
  '入住 別府溫泉 杉乃井大飯店': '別府溫泉 杉乃井飯店',

  // Day 4
  '別府纜車 (8:30出發，鶴見岳高空纜車)': '別府纜車',
  '別府纜車 (Beppu Ropeway)': '別府纜車',
  '深耶馬溪 (一目八景賞楓)': '深耶馬溪 (一目八景)',
  '午餐：かじか茶屋 (Kajika Chaya)': 'かじか茶屋',
  '英彥山神宮 (Hikosan Jingu)': '英彥山神宮',
  '英彥山神宮': '英彥山神宮',
  '16:40 皿倉山纜車站 (搭乘斜坡纜車登頂)': '皿倉山纜車站',
  '皿倉山夜景 (新日本三大夜景「百億夜景」)': '皿倉山夜景',
  '晚餐：一蘭拉麵 / 黑崎站附近居酒屋': '一蘭拉麵 (黑崎)',
  '住北九州 コンフォートホテル 黒崎飯店': 'コンフォートホテル 黒崎',
  '入住 コンフォートホテル 黒崎 (Comfort Hotel Kurosaki)': 'コンフォートホテル 黒崎',

  // Day 5 (11/18)
  '吞山觀音寺 (8:30出發)': '呑山観音寺',
  '吞山觀音寺 (Nomiyama Kannonji)': '呑山観音寺',
  '石藏酒造 (博多百年藏，可Klook試飲/現場試飲)': '石藏酒造 (博多百年藏)',
  '石藏酒造 博多百年藏 (Ishikura Shuzo)': '石藏酒造 (博多百年藏)',
  '午餐推薦：食堂煮魚少年 或 博多もつ鍋 いちたか 博多本店': '食堂煮魚少年 / もつ鍋いちたか',
  '福岡市區自由行 (天神 / 博多運河城 / 動漫購物)': '福岡市區自由行',
  '住福岡ETS INN 飯店 博多 (Hotel ETS INN Hakata)': 'ETS INN 博多',
  '入住 福岡 ETS INN 飯店 博多': 'ETS INN 博多',
  '博多聖誕市集 (Christmas Market in 光之街・博多)': '博多聖誕市集',
  '宵夜：中洲屋台 (中洲屋台街散策)': '中洲屋台街',
  '金鱗湖 清晨絕美晨霧 (Morning Mist)': '金鱗湖',
  '皿倉山纜車 & 新日本三大夜景': '皿倉山纜車 (皿倉山展望台)',
  '入住 ホテルサードプレイス博多 (Hotel 3rd Place Hakata)': 'ホテルサードプレイス博多',
  '入住 HOTEL CROWN PALAIS KOKURA (小倉皇冠宮)': 'HOTEL CROWN PALAIS KOKURA',

  // Day 6 (11/19)
  '夫婦岩 (8:00出發，糸島 櫻井二見之浦)': '糸島 夫婦岩',
  '早餐：にぎり塚本鮮魚店': 'にぎり塚本鮮魚店',
  '大悲王院 (雷山千如寺大悲王院)': '雷山千如寺大悲王院',
  '太宰府天滿宮': '太宰府天滿宮',
  '太宰府前表参道 (吃午餐 & 名物散策)': '太宰府表參道',
  '前往熊本 (中途休一站，預計傍晚抵達)': '高速公路 (廣川/玉名)',
  '晚餐：洋食の店 橋本 (已預約 19:00)': '洋食の店 橋本',
  '住熊本相鐵GRAND FRESA 熊本 (相鉄グランドフレッサ 熊本)': '相鉄グランドフレッサ 熊本',
  '早餐：星乃咖啡廳 (小倉/博多站前)': '星乃咖啡廳',
  '福岡動漫扭蛋一番賞自由行特輯': '博多運河城 / 天神動漫商場',
  '入住 相鉄グランドフレッサ 熊本 (Sotetsu Grand Fressa Kumamoto)': '相鉄グランドフレッサ 熊本',
  '入住 Hotel Clio Court Hakata & 博多美食': 'Hotel Clio Court Hakata',

  // Day 7 (11/20)
  '熊本城 (天守閣與本丸御殿巡禮)': '熊本城',
  '熊本城': '熊本城',
  '午餐：道の駅 上天草さんぱーる': '道の駅 上天草さんぱーる',
  '道の駅 上天草さんぱーる': '道の駅 上天草さんぱーる',
  '倉岳神社 (天草最高峰「天空之鳥居」)': '倉岳神社 (天空之鳥居)',
  '倉岳神社': '倉岳神社',
  '長部田海床路 (海中電線桿奇蹟絕景)': '長部田海床路',
  '長部田海床路': '長部田海床路',
  '住熊本 (熊本城景 And COMFY 飯店辦理入住)': 'And COMFY HOTEL',
  '晚餐：菅乃屋 銀座通り店 (已預約 19:00)': '菅乃屋 銀座通り店',
  '菅乃屋 銀座通り店': '菅乃屋 銀座通り店',

  // Day 8 (11/21)
  '早餐：星巴克解決': '星巴克',
  '早餐：星巴克 (熊本市區/城下店)': '星巴克',
  '9:00-09:45退房+加油+還車': '退房加油還車',
  '飯店退房 & 加油還車 (NICONICO 租車)': 'NICONICO 租車 (還車)',
  '預計10:00到機場 & 辦理退稅手續': '熊本機場 (退稅免稅)',
  '預計10:00到機場': '熊本機場',
  '華航CI199熊本飛高雄 (KMJ ✈ KHH)': '熊本機場 ✈ 高雄機場',
  '華航CI199熊本飛高雄': '熊本機場 ✈ 高雄機場',
  '華航 CI199 熊本(KMJ) ✈ 高雄(KHH)': '熊本機場 ✈ 高雄機場',

  // Hotels
  '南阿蘇 La Vista 溫泉飯店': 'ラビスタ南阿蘇',
  '黑川溫泉 旅館湯本莊': '黑川溫泉 旅館湯本莊',
  '別府溫泉 杉乃井大飯店': '別府溫泉 杉乃井飯店',
  'コンフォートホテル 黒崎 (Comfort Hotel Kurosaki)': 'コンフォートホテル 黒崎',
  '福岡 ETS INN 飯店 博多 (Hotel ETS INN Hakata)': 'ETS INN 博多',
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
