import { DaySchedule, HotelItem, BackupRestaurant, ChecklistItem, MemoItem } from '../types/travel';

export const INITIAL_HOTELS: HotelItem[] = [
  {
    id: 'hotel-1114',
    name: '南阿蘇 La Vista 溫泉飯店',
    jpName: 'ラビスタ南阿蘇',
    date: '2026-11-14',
    dateLabel: '11/14 (週六)',
    address: '4411-9 Hisaishi, Minamiaso, Aso District, Kumamoto 869-1412 日本',
    checkIn: '15:00',
    checkOut: '11:00',
    services: [
      '24小時櫃台接待與行李寄存',
      '客房私人景觀陽台與全館免費高速 Wi-Fi',
      '天然弱鹼性溫泉大浴場、桑拿與露天冷熱池',
      '4間免費獨立個人湯屋 (空著即可入內鎖門使用，免預約)',
      '夜間限定免費「夜鳴きそば」道地醬油拉麵服務 (22:00~23:00)',
      '專屬免費停車場、投幣式自動洗衣機與自動販賣機'
    ],
    highlights: [
      '必體驗：客房私人露天風呂眺望阿蘇外輪山與滿天繁星',
      '必吃：消夜時段免費熱騰騰的現煮「夜鳴きそば」拉麵',
      '必享：極致奢華的阿蘇產地直送料理朝食百匯 (阿蘇高菜飯、香濃阿蘇鮮乳與鄉土魚料理)'
    ],
    notes: '抵達當晚請先去預約大浴場旁免費湯屋，享受山林舒壓。',
    mapCoord: { x: 44, y: 55 }
  },
  {
    id: 'hotel-1115',
    name: '黑川溫泉 旅館湯本莊',
    jpName: '黒川温泉　旅館湯本荘',
    date: '2026-11-15',
    dateLabel: '11/15 (週日)',
    address: '6700番地 Manganji, Minamioguni, Aso District, Kumamoto 869-2402 日本',
    checkIn: '15:00',
    checkOut: '10:00',
    services: [
      '百年傳統日式溫泉旅館女將迎賓與行李專人搬運',
      '筑後川溪流畔男女大浴場與野趣露天風呂',
      '3間風格各異的免費貸切私人家族風呂',
      '繽紛日式浴衣挑選與提籃出借服務 (可漫步黑川溫泉街入湯手形巡禮)',
      '專屬免費停車場、和室榻榻米客房與客房茶點品嚐'
    ],
    highlights: [
      '必體驗：躺在露天風呂中聆聽田之原川溪流潺潺水聲，享受秋日楓紅倒影',
      '必吃：主廚特選熊本頂級「肥後牛會席料理」與在地清甜山菜旬味',
      '必玩：換上日式浴衣踩著木屐漫步黑川溫泉街，品嚐「パティスリー 麓」酥脆泡芙與「どらどら」銅鑼燒'
    ],
    notes: '黑川溫泉街小徑較窄，可先開至門口卸行李再由服務人員指引停車。',
    mapCoord: { x: 49, y: 48 }
  },
  {
    id: 'hotel-1116',
    name: '別府溫泉 杉乃井大飯店',
    jpName: '別府温泉 杉乃井ホテル',
    date: '2026-11-16',
    dateLabel: '11/16 (週一)',
    address: '1 Kankaijicho, Beppu, Oita 874-0822 日本',
    checkIn: '15:00',
    checkOut: '11:00',
    services: [
      'JR別府站免費來回穿梭接駁車服務',
      '超大型溫泉渡假園區、紀念品物產街與休閒遊樂中心',
      '室內外巨型溫水水療育樂館「AQUA BEAT」與戶外泳池',
      '大型免費多層立體停車場、全館 Wi-Fi、無障礙設施完善'
    ],
    highlights: [
      '必體驗：名聞遐邇的「大空之湯 / 棚湯」五層梯田式露天無邊際溫泉，居高臨下將別府灣海天一色與市區夜景盡收眼底',
      '必看：夜間戶外露天溫泉「THE AQUA GARDEN」震撼雷射光影與音樂噴泉水舞秀',
      '必吃：豪華多國料理自助百匯晚餐，現切黑毛和牛、生魚片海鮮丼、大分名物唐揚雞與精緻甜點吃到飽'
    ],
    notes: '棚湯清晨日出視野絕美，建議早起 06:00 邊泡湯邊看別府灣晨曦破曉！',
    mapCoord: { x: 62, y: 41 }
  },
  {
    id: 'hotel-1117',
    name: '由布院金鱗湖畔獨棟民宿 David No Yakata',
    jpName: 'David No Yakata (ダビデの館)',
    date: '2026-11-17',
    dateLabel: '11/17 (週二)',
    address: '大分縣, 湯布院, Kawakami 1761-18, 日本',
    checkIn: '15:00~18:00',
    checkOut: '10:00',
    services: [
      '金鱗湖畔整棟私人別墅獨棟獨享，隱密性極高',
      '完整日式現代化廚房 (IH爐、電鍋、雙層大冰箱、微波爐、平底鍋、壽喜燒深鍋、全套碗筷調味料)',
      '室內專屬天然溫泉私人浴池 (24小時隨時享受由布院純淨泉水)',
      '私人庭院免費停車位、高速光纖 Wi-Fi、洗脫烘一體洗衣機'
    ],
    highlights: [
      '必體驗：傍晚遊客散去後，漫步至金鱗湖畔享受專屬靜謐湖光秋色',
      '必吃：下午先在由布院在地超商 (A-Coop / MaxValu) 採買頂級大分豐後牛霜降肉片、大蔥、香菇自煮熱騰騰「壽喜燒 Sukiyaki」',
      '必玩：翌日清晨 06:30 推開民宿大門，步行 2 分鐘即達金鱗湖第一排捕捉仙境晨霧與鳥居紅葉'
    ],
    notes: '入住時間最晚為 18:00，請留意於湯布院散策後準時辦理入住。晚餐食材於超商備妥即可享受溫馨家庭時光。',
    mapCoord: { x: 58, y: 44 }
  },
  {
    id: 'hotel-1118',
    name: '北九州小倉皇冠宮飯店',
    jpName: 'HOTEL CROWN PALAIS KOKURA ホテルクラウンパレス小倉',
    date: '2026-11-18',
    dateLabel: '11/18 (週三)',
    address: '802-0077 福岡県北九州市小倉北区馬借1-2-1 日本',
    checkIn: '14:00',
    checkOut: '12:00',
    services: [
      '紫川水岸綠意景觀、24小時接待櫃台、快速退房服務',
      '客房寬敞舒適、高速 Wi-Fi、加濕空氣清淨機',
      '專屬地下收費停車場、投幣式洗衣機、自行車免費出借',
      '優雅法式西餐廳與豐富精緻和洋朝食'
    ],
    highlights: [
      '必體驗：傍晚前往「皿倉山纜車」俯瞰新日本三大夜景百億全景後悠閒入住',
      '必吃：步行可達小倉旦過市場周邊、在地知名炭火燒烤居酒屋或門司港風烤咖哩',
      '必散步：晚間沿著紫川水岸河畔步道漫步至小倉城賞夜間護城河倒影'
    ],
    notes: '退房時間為寬裕的 12:00，早晨可睡飽後再輕鬆出發前往博多。',
    mapCoord: { x: 53, y: 17 }
  },
  {
    id: 'hotel-1119',
    name: '博多克里歐庭酒店',
    jpName: 'Hotel Clio Court Hakata (ホテルクリオコート博多)',
    date: '2026-11-19',
    dateLabel: '11/19 (週四)',
    address: '5-3 Hakataekichūōgai, Hakata Ward, Fukuoka, 812-0012 日本',
    checkIn: '14:00',
    checkOut: '11:00',
    services: [
      'JR博多站筑紫口步行「1分鐘」無敵交通地段！',
      '24小時櫃台、行李全天候寄放、外語服務人員',
      '附設精緻餐廳、咖啡廳、吸菸室、自動販賣機、投幣洗衣機',
      '全客房免費 Wi-Fi、齊全衛浴備品與舒適羽絨被'
    ],
    highlights: [
      '必體驗：下樓就是博多車站地下街、阪急百貨、AMU PLAZA 與地鐵站',
      '必吃：隔壁就是「星乃咖啡店」，可悠閒享用招牌現烤舒芙蕾厚鬆餅與炭火手沖咖啡',
      '必逛：博多運河城 Bandai Namco Cross Store 與天神 PARCO 盡情抽一番賞、扭蛋與夾娃娃'
    ],
    notes: '位於博多站前樞紐，若有購買藥妝與一番賞戰利品可隨時拿回房間放下再繼續逛街！',
    mapCoord: { x: 38, y: 24 }
  },
  {
    id: 'hotel-1120',
    name: '熊本城景 And COMFY 飯店',
    jpName: 'And COMFY HOTEL Kumamoto Jo View',
    date: '2026-11-20',
    dateLabel: '11/20 (週五)',
    address: '5-3 Jotomachi, Chuo Ward, Kumamoto, 860-0846 日本',
    checkIn: '15:00',
    checkOut: '10:00',
    services: [
      '熊本城第一排景觀位置、現代文青簡約設計質感',
      '1樓 24小時休憩大廳提供免費手沖現磨咖啡與熊本在地名茶',
      '客房席夢思頂級名床、加濕空氣清淨機、乾濕分離衛浴',
      '投幣式洗衣機、全館高速 Wi-Fi、立體停車場 (附設充電樁)'
    ],
    highlights: [
      '必體驗：入住「熊本城景觀房 (Castle View)」或前往頂樓觀景台，直接正對宏偉熊本城天守閣！夜晚點燈後天守閣在夜色中如金碧輝煌的浮世繪',
      '必逛：步行 5 分鐘抵達熱鬧的上通、下通商店街與鶴屋百貨',
      '必吃：晚餐造訪百年老舖「菅乃屋 銀座通り店」品嚐頂級霜降馬肉刺身與熊本黑亭拉麵'
    ],
    notes: '隔天 09:00 退房前往機場前，可於早晨 08:30 先至加藤神社拍攝晨光下的熊本城全貌。',
    mapCoord: { x: 36, y: 53 }
  }
];

export const INITIAL_DAYS: DaySchedule[] = [
  {
    id: 'day-1',
    date: '2026-11-14',
    dateLabel: '11/14',
    weekday: '週六',
    title: '高雄 ✈ 熊本 (10:50抵達) · 走訪阿蘇大草原與大觀峰',
    area: '熊本機場 / 阿蘇 / 南阿蘇',
    forecast: {
      tempMin: 8,
      tempMax: 18,
      condition: '秋高氣爽',
      foliageStatus: '色づき見頃 (紅黃交織)'
    },
    outfitTip: '白天舒適宜人約 17~18°C，但傍晚阿蘇高原氣溫驟降至 8~10°C，建議洋蔥式穿搭，必備輕量防風外套或大衣。',
    hotelId: 'hotel-1114',
    spots: [
      {
        id: 's-1114-1',
        time: '07:30',
        name: '高雄小港機場 (KHH) ✈ 熊本機場 (KMJ)',
        category: 'flight',
        notes: '搭乘華航 CI198 晨間班機直飛熊本（07:30 起飛 -> 10:50 抵達日本時間）。請於早晨 05:30 提早抵達高雄小港機場辦理登機報到與行李托運。',
        tips: '【早班機提醒】建議提早 2 小時抵達機場。航程約 2 小時 20 分，航機下降前右側靠窗可俯瞰九州有明海與阿蘇火山群。',
        location: 'Kaohsiung International Airport',
        mapCoord: { x: 32, y: 56 }
      },
      {
        id: 's-1114-2',
        time: '10:50',
        name: '熊本機場抵達出關 & NICONICO 租車免費接駁',
        category: 'car',
        notes: '10:50 班機準時降落，辦理入境查驗與提領行李。出關後前往租車專用接駁候車區，搭乘 NICONICO 免費專車前往租車站點。',
        tips: '【出關秘訣】事先填妥 Visit Japan Web 入境與海關申報 QR Code；接駁車車程約 5~7 分鐘。',
        location: '阿蘇くまもと空港 国際線ターミナル',
        mapCoord: { x: 37, y: 54 }
      },
      {
        id: 's-1114-3',
        time: '11:45',
        name: 'NICONICO 租車取車 (熊本機場店)',
        category: 'car',
        notes: '辦理租車簽約手續。出示台灣駕照正本、日文譯本與護照，檢查車體外觀並拍照存證，確認裝載 ETC 卡與車載 GPS 導航設定。',
        tips: '【租車注意】確認已加購或租用 KEP (Kyushu Expressway Pass)；取車後隨即出發開往阿蘇。',
        location: 'ニコニコレンタカー 熊本空港店',
        mapCoord: { x: 37, y: 54 }
      },
      {
        id: 's-1114-4',
        time: '12:45',
        name: '阿蘇赤牛丼午餐：いまきん食堂 或 內牧溫泉街',
        category: 'food',
        notes: '開車抵達阿蘇內牧溫泉街，造訪百年老店「お食事処 いまきん食堂」或「あか牛丼いわさき」享用招牌多汁的阿蘇赤牛丼 (あか牛丼)。',
        tips: '【美食必嚐】特選阿蘇和牛炙燒後搭配半熟溫泉蛋與特調醬汁，肉質鮮嫩無比，為自駕首日注入滿滿元氣！',
        location: 'お食事処 いまきん食堂 熊本県阿蘇市内牧290',
        reviewQuery: 'いまきん食堂 阿蘇 あか牛丼',
        mapCoord: { x: 44, y: 50 }
      },
      {
        id: 's-1114-5',
        time: '14:20',
        name: '大觀峰 (Daikanbo) 俯瞰阿蘇五岳涅槃像',
        category: 'scenic',
        notes: '阿蘇北外輪山的最高峰 (標高936m)。能 360 度無死角俯瞰阿蘇五岳與九重連山。',
        tips: '【拍照建議】午後順光！面向南方拍攝阿蘇五岳酷似釋迦牟尼佛仰臥的「涅槃像」，秋芒漫山遍野隨風搖曳。',
        location: '大観峰 熊本県阿蘇市山田',
        reviewQuery: '大觀峰 景點推薦',
        mapCoord: { x: 45, y: 49 }
      },
      {
        id: 's-1114-6',
        time: '15:50',
        name: '草千里之濱 (草千里珈琲焙煎所 / 騎馬俱樂部 / 山之驛)',
        category: 'scenic',
        notes: '烏帽子岳與杵島岳之間的巨型火山口草原。周邊有ニュー草千里、草千里珈琲焙煎所、阿蘇草千里騎馬俱樂部與山之驛物產館。',
        tips: '【拍照建議】午後斜射陽光灑在雙重雨水池倒影與金黃草坡上，手捧手沖咖啡遠眺中岳火山口冉冉升起的白色火山蒸氣。',
        location: '草千里ヶ浜 熊本県阿蘇市赤水',
        reviewQuery: '草千里珈琲焙煎所 食記',
        mapCoord: { x: 42, y: 53 }
      },
      {
        id: 's-1114-7',
        time: '17:40',
        name: 'あそ望の郷 くぎの (南阿蘇道之驛觀景採買)',
        category: 'shopping',
        notes: '擁有眺望阿蘇南麓壯麗景觀的超人氣道路休息站，販售在地新鮮水果、特產高菜與阿蘇濃醇牛奶點心。',
        tips: '【購物建議】可買當晚的阿蘇優酪乳與在地草莓/蜜柑，作為回飯店泡湯後的宵夜點心。',
        location: 'あそ望の郷くぎの 熊本県阿蘇郡南阿蘇村久石2807',
        reviewQuery: 'あそ望の郷くぎの',
        mapCoord: { x: 43, y: 56 }
      },
      {
        id: 's-1114-8',
        time: '18:40',
        name: '入住 ラビスタ南阿蘇 (La Vista 溫泉飯店)',
        category: 'hotel',
        notes: '辦理入住，享受客房私人露天風呂眺望阿蘇夜空星光。飯店 22:00~23:00 免費提供現煮「夜鳴きそば」醬油拉麵！',
        tips: '【飯店提醒】4 間私人個人湯屋免預約，走廊燈滅即可入內鎖門泡湯。',
        location: 'ラビスタ南阿蘇',
        reviewQuery: 'ラビスタ南阿蘇 住宿評價',
        mapCoord: { x: 44, y: 55 }
      }
    ]
  },
  {
    id: 'day-2',
    date: '2026-11-15',
    dateLabel: '11/15',
    weekday: '週日',
    title: '神域鳥居、高千穗靈峽與黑川秘湯散策',
    area: '高森 / 宮崎高千穗 / 黑川溫泉',
    forecast: {
      tempMin: 6,
      tempMax: 16,
      condition: '清晨微寒轉晴',
      foliageStatus: '見頃最盛期 (鮮紅亮麗)'
    },
    outfitTip: '高千穗峽谷清晨溫差大，走步道需穿止滑好走鞋；黑川溫泉晚上會穿浴衣在街上漫步，外層套上羽織或厚外套保暖。',
    hotelId: 'hotel-1115',
    spots: [
      {
        id: 's-1115-1',
        time: '08:30',
        name: '上色見熊野座神社',
        category: 'culture',
        notes: '動漫《螢火之森》取景原型地！近百座青苔覆蓋的石燈籠沿著參道直通神秘穿戶岩。',
        tips: '【拍照秘訣】建議 08:30~09:30 抵達！晨間斜射光穿過百年巨杉林灑在參道石階上最夢幻。手機開啟人像模式由下往上仰拍，層次感極佳。',
        location: '上色見熊野座神社 熊本県阿蘇郡高森町上色見2619',
        reviewQuery: '上色見熊野座神社 參拜拍照攻略',
        mapCoord: { x: 47, y: 57 }
      },
      {
        id: 's-1115-2',
        time: '10:15',
        name: '高千穗峽谷 & 真名井瀑布 (划船體驗)',
        category: 'scenic',
        notes: '阿蘇火山熔岩形成的柱狀節理玄武岩斷崖與 17 米落差的真名井瀑布。備註：若未搶到划船票，可改走峽谷步道俯瞰瀑布，或改遊阿蘇站附近景點。',
        tips: '【拍照位置】若有划船，將船靠近瀑布噴霧旁拍攝「划船與飛瀑」特寫；步道上的「御鹽井橋」則是拍攝峽谷全景與小船穿梭的明信片級經典角度。',
        location: '高千穂峡 宮崎県西臼杵郡高千穂町三田井',
        reviewQuery: '高千穗峽谷 划船 預約攻略',
        mapCoord: { x: 50, y: 62 }
      },
      {
        id: 's-1115-3',
        time: '12:30',
        name: '高千穗午餐：高千穗牛餐廳「和」或 流水麵',
        category: 'food',
        notes: '品嚐獲得日本和牛奧運金獎評鑑的頂級高千穗牛牛排定食，或在千木良品嚐涼爽清甜的流水素麵。',
        tips: '【美食推薦】高千穗牛肉質細緻油脂甘甜，鐵板香煎搭配芥末與在地醬油回味無窮。',
        location: '高千穂牛レストラン 和 宮崎県西臼杵郡高千穂町三田井1099-1',
        reviewQuery: '高千穂牛レストラン 和 食記',
        mapCoord: { x: 51, y: 61 }
      },
      {
        id: 's-1115-4',
        time: '15:30',
        name: '黑川溫泉街深度散策',
        category: 'food',
        notes: '保留江戶古色古香風貌的秘湯之里。必訪名物：パティスリー 麓 (脆皮泡芙)、どらどら (銅鑼燒)、丸鈴橋俯瞰川景、湯音 (生牛奶)、新明館黑色木造橋。',
        tips: '【拍照推薦】站在「丸鈴橋」上俯拍溪流兩岸層層疊疊的木造日式旅館與楓樹；新明館入口的黑色木橋配上日式燈籠更是必拍景致。',
        location: '黒川温泉 熊本県阿蘇郡南小国町満願寺6594-3',
        reviewQuery: '黑川溫泉 美食散策 パティスリー麓 どらどら',
        mapCoord: { x: 49, y: 48 }
      },
      {
        id: 's-1115-5',
        time: '17:30',
        name: '入住 黑川溫泉 旅館湯本莊',
        category: 'hotel',
        notes: '辦理入住手續，享受溪流旁的天然露天溫泉與貸切風呂，享用精緻豐富的和牛會席料理。',
        tips: '【泡湯提示】湯本莊的露天風呂緊鄰清澈田之原川，晚間溪水聲伴隨星光，疲勞盡消。',
        location: '黒川温泉 旅館湯本荘',
        reviewQuery: '黒川温泉 旅館湯本荘 一泊二食',
        mapCoord: { x: 49, y: 48 }
      }
    ]
  },
  {
    id: 'day-3',
    date: '2026-11-16',
    dateLabel: '11/16',
    weekday: '週一',
    title: '九重紅葉吊橋、小京都與別府地獄溫泉',
    area: '九重 / 杵築 / 別府',
    forecast: {
      tempMin: 9,
      tempMax: 17,
      condition: '秋高氣爽',
      foliageStatus: '見頃 (最盛期)'
    },
    outfitTip: '走吊橋風勢較大，建議攜帶保暖圍巾或毛帽；下午抵達別府溫泉市區氣候宜人。',
    hotelId: 'hotel-1116',
    spots: [
      {
        id: 's-1116-1',
        time: '09:00',
        name: '九重「夢」大吊橋',
        category: 'scenic',
        notes: '標高777m、長390m、距谷底173m的日本頂級高空人行吊橋！可將「震動之瀑」與鳴子川溪谷滿山楓紅一覽無遺。備註：若深耶馬溪楓葉提早見頃可機動調整。',
        tips: '【拍照最佳時間】上午 09:00~10:30 為順光，站在橋中央往北方眺望，滿山五彩斑斕楓葉峭壁最為透亮！注意橋面風大請拿好手機。',
        location: '九重夢大吊橋 大分県玖珠郡九重町田野1208',
        reviewQuery: '九重夢大吊橋 紅葉 賞楓攻略',
        mapCoord: { x: 53, y: 45 }
      },
      {
        id: 's-1116-2',
        time: '11:45',
        name: '杵築城下町 (小京都)',
        category: 'culture',
        notes: '日本唯一的「凹字形」城下町，武士宅邸分布於兩側高台，街道保留江戶時代的泥土城牆與石板坂道。',
        tips: '【拍照亮點】在「酢屋之坂」與「鹽屋之坂」對望的石板斜坡上取景，古色古香的石階延展極富歷史深邃感。午餐可在若榮屋品嚐名物鯛茶漬け。',
        location: '杵築城下町 大分県杵築市杵築',
        reviewQuery: '杵築城下町 散策 若榮屋',
        mapCoord: { x: 63, y: 35 }
      },
      {
        id: 's-1116-3',
        time: '14:00',
        name: '湯霧展望台 (Yukemuri Observatory)',
        category: 'scenic',
        notes: '入選「日本夜景百選」與「想要保留至21世紀的日本風景」。可俯瞰別府鐵輪溫泉蒸氣從民宅街道間升起的壯觀場景。',
        tips: '【拍照建議】使用望遠鏡頭或 3x 變焦，壓縮白煙蒸騰與遠方別府灣高樓的景深層次。',
        location: '湯けむり展望台 大分県別府市鉄輪東8組',
        reviewQuery: '湯けむり展望台 別府',
        mapCoord: { x: 61, y: 40 }
      },
      {
        id: 's-1116-4',
        time: '15:15',
        name: '別府地獄巡禮 & 岡本屋溫泉布丁',
        category: 'scenic',
        notes: '參觀呈現夢幻鈷藍色的海地獄與血紅色血池地獄。順道前往明礬溫泉岡本屋品嚐地獄蒸布丁、別府百貨或星巴克別府店喝咖啡。',
        tips: '【美食必嚐】岡本屋地獄蒸布丁口感綿密帶微苦焦糖；海地獄極樂饅頭也是人氣小吃。',
        location: '海地獄 大分県別府市鉄輪559-1',
        reviewQuery: '岡本屋賣店 地獄蒸布丁 海地獄',
        mapCoord: { x: 62, y: 39 }
      },
      {
        id: 's-1116-5',
        time: '17:30',
        name: '入住 別府溫泉 杉乃井大飯店',
        category: 'hotel',
        notes: '辦理入住，體驗五層梯田式露天棚湯、夜間水舞雷射音樂秀與超豪華百匯晚餐。',
        tips: '【設施必玩】晚餐後 20:00 前往戶外露天泳池區觀看「THE AQUA GARDEN」噴泉水舞秀，燈光雷射非常華麗！',
        location: '別府温泉 杉乃井ホテル',
        reviewQuery: '杉乃井ホテル 棚湯 水舞秀 自助餐評價',
        mapCoord: { x: 62, y: 41 }
      }
    ]
  },
  {
    id: 'day-4',
    date: '2026-11-17',
    dateLabel: '11/17',
    weekday: '週二',
    title: '別府高空纜車、由布岳與湯布院壽喜燒之夜',
    area: '鶴見岳 / 由布岳 / 湯布院',
    forecast: {
      tempMin: 7,
      tempMax: 15,
      condition: '晴時多雲',
      foliageStatus: '見頃 (山腰至湖畔盛開)'
    },
    outfitTip: '別府纜車山頂標高 1375m，山頂體感比地面低 7~8 度且有風，請穿著防風保暖厚外套。',
    hotelId: 'hotel-1117',
    spots: [
      {
        id: 's-1117-1',
        time: '09:00',
        name: '別府纜車 (Beppu Ropeway)',
        category: 'scenic',
        notes: '搭乘九州最大級 101 人大型纜車登上鶴見岳。備註：出發前務必確認是否因強風而暫停行駛。山頂站有七福神巡禮，走一圈招來滿滿福氣！',
        tips: '【拍照重點】纜車爬升時俯瞰整座別府灣與色彩斑斕的楓林地毯；山頂展望台更可遠眺由布岳雄偉全貌。',
        location: '別府ロープウェイ 大分県別府市大字南立石字寒原10-7',
        reviewQuery: '別府纜車 鶴見岳 七福神巡禮',
        mapCoord: { x: 60, y: 42 }
      },
      {
        id: 's-1117-2',
        time: '11:00',
        name: '志高湖 (Lake Shidaka)',
        category: 'scenic',
        notes: '海拔600m的高原火口湖，湖畔天鵝與野鴨游弋，群山環抱，秋天倒映滿岸金黃與紅葉。',
        tips: '【拍照景點】沿湖畔木棧道拍攝由布岳雙峰倒映在如鏡湖面的景象，氛圍寧靜清澈。',
        location: '志高湖 大分県別府市志高4380-1',
        reviewQuery: '志高湖 別府 散策',
        mapCoord: { x: 59, y: 43 }
      },
      {
        id: 's-1117-3',
        time: '12:30',
        name: '由布岳登山口高原展望',
        category: 'scenic',
        notes: '由布岳（豐後富士）標高1584m，秋季整座山坡被金黃芒草覆蓋，與筆直開闊的公路構成絕美公路電影畫面。',
        tips: '【拍照手法】安全停靠公路停車格，以低角度捕捉風吹芒草如金色浪花，背後聳立由布岳雙尖山峰。',
        location: '由布岳正面登山口 大分県由布市湯布院町川上',
        reviewQuery: '由布岳 芒草 公路拍照',
        mapCoord: { x: 58, y: 42 }
      },
      {
        id: 's-1117-4',
        time: '13:45',
        name: '由布院散策 & 人氣名物排隊必吃',
        category: 'food',
        notes: '漫步湯之坪街道。必吃名單：B-speak 經典生乳捲、由布院 Milch 半熟熱起司蛋糕、金賞可樂餅、今泉堂生蕨餅、Yufuin Floral Village 英國柯茲窩童話村。',
        tips: '【採買提醒】B-speak 蛋糕捲小條尺寸通常在下午前售完，抵達時可先搶購！',
        location: '湯の坪街道 大分県由布市湯布院町川上',
        reviewQuery: '湯布院 美食 B-speak 由布院ミルヒ 金賞コロッケ',
        mapCoord: { x: 57, y: 44 }
      },
      {
        id: 's-1117-5',
        time: '16:30',
        name: '由布院在地生鮮超市採買食材',
        category: 'shopping',
        notes: '前往 A-Coop Yufuin 或 MaxValu 超市，選購頂級大分豐後牛霜降肉片、大蔥、豆腐、蒟蒻絲、讚岐烏龍麵與壽喜燒醬汁。',
        tips: '【備註亮點】今晚入住金鱗湖旁獨棟民宿 David No Yakata，親自料理美味壽喜燒！',
        location: 'Aコープ ゆふいん店 大分県由布市湯布院町川上3028',
        reviewQuery: 'Aコープ ゆふいん店',
        mapCoord: { x: 57, y: 45 }
      },
      {
        id: 's-1117-6',
        time: '17:45',
        name: '入住 金鱗湖畔獨棟民宿 David No Yakata',
        category: 'hotel',
        notes: '辦理入住，整棟別墅完全獨享！享受私房溫泉浴池，開火烹煮熱氣騰騰的壽喜燒，度過最溫馨難忘的由布院之夜。',
        tips: '【獨棟民宿】房內廚房設備齊全，飯後可沿金鱗湖散步吹吹晚風。',
        location: 'David No Yakata Kawakami 1761-18, Yufuin, Oita',
        reviewQuery: 'David No Yakata 由布院民宿',
        mapCoord: { x: 58, y: 44 }
      }
    ]
  },
  {
    id: 'day-5',
    date: '2026-11-18',
    dateLabel: '11/18',
    weekday: '週三',
    title: '金鱗湖仙境晨霧、深耶馬溪奇勝與皿倉山百億夜景',
    area: '湯布院 / 耶馬溪 / 英彥山 / 北九州小倉',
    forecast: {
      tempMin: 7,
      tempMax: 16,
      condition: '晨霧轉晴朗',
      foliageStatus: '見頃最盛期 (深耶馬溪紅葉燦爛)'
    },
    outfitTip: '早晨 06:30 看金鱗湖晨霧非常冷（約 6~7°C），請穿發熱衣與毛帽；傍晚皿倉山頂風大，請備防風大衣。',
    hotelId: 'hotel-1118',
    spots: [
      {
        id: 's-1118-1',
        time: '06:30',
        name: '金鱗湖 清晨絕美晨霧 (Morning Mist)',
        category: 'scenic',
        notes: '因為湖底同時湧出清水與溫泉，秋冬清晨湖面溫差會蒸騰出籠罩整座湖泊的夢幻白霧！從民宿步行 2 分鐘即可抵達。',
        tips: '【拍照黃金時段】06:30~07:30 日出前後！陽光斜穿過白霧在水面形成道道金色「丁達爾光芒」，水上天祖神社鳥居與紅葉倒影宛若仙境。',
        location: '金鱗湖 大分県由布市湯布院町川上1561-1',
        reviewQuery: '金鱗湖 晨霧 拍照時間 技巧',
        mapCoord: { x: 58, y: 44 }
      },
      {
        id: 's-1118-2',
        time: '09:00',
        name: '深耶馬溪「一目八景」賞楓 & 茶屋早餐',
        category: 'food',
        notes: '日本新三景之一！在一處展望台就能一眼同時飽覽群猿山、鳶之巢山等八座奇岩險峰與滿山層疊紅葉。早餐在山下茶屋品嚐手打野生山藥蕎麥麵與現烤香魚。',
        tips: '【美食必嚐】熱騰騰山藥泥蕎麥麵與酥烤山女魚定食是耶馬溪最具代表性的鄉土滋味。',
        location: '一目八景 大分県中津市耶馬溪町大字深耶馬',
        reviewQuery: '深耶馬溪 一目八景 賞楓 手打蕎麥麵',
        mapCoord: { x: 54, y: 34 }
      },
      {
        id: 's-1118-3',
        time: '12:30',
        name: '英彥山神宮 (Hikosan Jingu)',
        category: 'culture',
        notes: '日本三大修驗道靈山之一！神聖幽深，可搭乘斜坡單軌電車直達奉幣殿，參道長階梯兩旁古杉巨木與秋楓石階交織。',
        tips: '【拍照取景】奉幣殿前的石燈籠與朱紅鳥居，襯托後方英彥山蒼翠山色，氣勢莊嚴肅穆。',
        location: '英彦山神宮 福岡県田川郡添田町英彦山1',
        reviewQuery: '英彦山神宮 添田町 參拜 纜車',
        mapCoord: { x: 48, y: 30 }
      },
      {
        id: 's-1118-4',
        time: '16:00',
        name: '皿倉山纜車 & 新日本三大夜景',
        category: 'scenic',
        notes: '【重要預定】預計 16:00 準時抵達皿倉山纜車山麓站！轉乘斜坡纜車與單軌爬坡車直登 622m 山頂展望台。',
        tips: '【拍照光線轉換】16:30~17:15 拍攝夕陽餘暉灑在洞海灣與若戶大橋；17:30~18:15 藍調 Magic Hour 捕捉獲選新日本三大夜景的「百億夜景」，視野開闊極致震撼！',
        location: '皿倉山ケーブルカー 福岡県北九州市八幡東区大字尾倉1481-1',
        reviewQuery: '皿倉山夜景 纜車站 拍照攻略',
        mapCoord: { x: 50, y: 19 }
      },
      {
        id: 's-1118-5',
        time: '19:15',
        name: '入住 HOTEL CROWN PALAIS KOKURA (小倉皇冠宮)',
        category: 'hotel',
        notes: '辦理入住，退房時間為 12:00。晚間可在小倉市區品嚐名物烤咖哩，或至黑崎站附近居酒屋小酌。',
        tips: '【周邊漫步】飯店緊鄰紫川水岸，步行 10 分鐘即可遠眺夜間點燈的小倉城天守。',
        location: 'ホテルクラウンパレス小倉 福岡県北九州市小倉北区馬借1-2-1',
        reviewQuery: 'ホテルクラウンパレス小倉 住宿評價',
        mapCoord: { x: 53, y: 17 }
      }
    ]
  },
  {
    id: 'day-6',
    date: '2026-11-19',
    dateLabel: '11/19',
    weekday: '週四',
    title: '幽靜古剎吞山觀音寺、百年酒藏與博多動漫扭蛋狂歡',
    area: '糟屋 / 博多 / 天神市區',
    forecast: {
      tempMin: 10,
      tempMax: 19,
      condition: '秋陽普照',
      foliageStatus: '見頃 (寺院紅葉地毯)'
    },
    outfitTip: '市區逛街步行步數多，建議穿著極致舒適球鞋；進出百貨室內有暖氣，內搭薄長袖搭配夾克即可。',
    hotelId: 'hotel-1119',
    spots: [
      {
        id: 's-1119-1',
        time: '08:30',
        name: '早餐：星乃咖啡廳 (小倉/博多站前)',
        category: 'food',
        notes: '品嚐經典現點現烘厚鬆餅 (Souffle Pancake) 與手沖炭火烘焙咖啡，開啟悠閒早晨。',
        tips: '【推薦餐點】淋上楓糖漿的窯燒舒芙蕾厚鬆餅外酥內軟，搭配熱黑咖啡極度享受。',
        location: '星乃珈琲店 福岡県',
        reviewQuery: '星乃珈琲店 舒芙蕾厚鬆餅 早餐',
        mapCoord: { x: 53, y: 18 }
      },
      {
        id: 's-1119-2',
        time: '10:30',
        name: '吞山觀音寺 (Nomiyama Kannonji)',
        category: 'culture',
        notes: '標高450m的秘密紅葉聖地！百觀音堂與滿山紅葉地毯、水子觀音石像交相輝映，幽靜深遠。',
        tips: '【拍照構圖】大師堂階梯兩側的楓樹在深秋落葉時鋪成整片紅葉絨毯，廣角低角度仰拍效果驚豔。',
        location: '呑山観音寺 福岡県糟屋郡篠栗町萩尾227-4',
        reviewQuery: '呑山観音寺 紅葉 賞楓秘境',
        mapCoord: { x: 42, y: 22 }
      },
      {
        id: 's-1119-3',
        time: '12:30',
        name: '石藏酒造 博多百年藏 (Ishikura Shuzo)',
        category: 'food',
        notes: '博多唯一留存的百年造酒廠，登錄為國家有形文化財。現場可試飲多款純米大吟釀、初榨生酒與果香梅酒 (可現場或 Klook 購買試飲體驗)。',
        tips: '【伴手禮推薦】限定款「博多白壁」純米大吟釀與「百年藏梅酒」，口感清甜圓潤，瓶身精美適合收藏。',
        location: '石蔵酒造 博多百年蔵 福岡県福岡市博多区堅粕1-30-1',
        reviewQuery: '石蔵酒造 博多百年蔵 試飲 Klook',
        mapCoord: { x: 39, y: 23 }
      },
      {
        id: 's-1119-4',
        time: '14:30',
        name: '福岡動漫扭蛋一番賞自由行特輯',
        category: 'shopping',
        notes: '【專屬推薦動漫尋寶路線】：1. Bandai Namco Cross Store 博多運河城 (日本超大扭蛋機海、萬代官方一番賞專門店) 2. 天神 PARCO 本館 7F/8F (航海王、寶可夢、Jump Shop、一番賞專區) 3. 駿河屋 天神店 (公仔挖寶) 4. Bic Camera 天神店。',
        tips: '【抽獎秘訣】一番賞記得看店內牆上的「剩餘配率表」，若 A 賞/最後賞還在且只剩少抽即可果斷全包！',
        location: 'キャナルシティ博多 福岡市博多区住吉1-2',
        reviewQuery: '博多運河城 Bandai 一番賞 扭蛋 天神PARCO',
        mapCoord: { x: 37, y: 25 }
      },
      {
        id: 's-1119-5',
        time: '19:00',
        name: '入住 Hotel Clio Court Hakata & 博多美食',
        category: 'hotel',
        notes: '飯店位於博多站筑紫口步行 1 分鐘！買完戰利品直接放房間。晚餐推薦品嚐一蘭拉麵總本店、博多もつ鍋 いちたか 牛腸鍋或居酒屋。',
        tips: '【飯店亮點】博多站前地段頂級便利，深夜隨時能去車站地下街與超商補貨。',
        location: 'Hotel Clio Court Hakata 博多駅中央街5-3',
        reviewQuery: 'Hotel Clio Court Hakata 住宿評價',
        mapCoord: { x: 38, y: 24 }
      }
    ]
  },
  {
    id: 'day-7',
    date: '2026-11-20',
    dateLabel: '11/20',
    weekday: '週五',
    title: '白金茶房鬆餅、糸島夫婦岩、大悲王院楓王與熊本之夜',
    area: '福岡市區 / 糸島 / 太宰府 / 熊本',
    forecast: {
      tempMin: 9,
      tempMax: 18,
      condition: '多雲時晴',
      foliageStatus: '見頃 (雷山千如寺大楓盛開)'
    },
    outfitTip: '糸島海邊海風稍大，需備薄外套；太宰府參道散策與熊本下通逛街節奏輕鬆。',
    hotelId: 'hotel-1120',
    spots: [
      {
        id: 's-1120-1',
        time: '08:00',
        name: '早餐預約：白金茶房 (Sirogane Sabo)',
        category: 'food',
        notes: '已預約！福岡知名文青名店，以整面書牆與烙印上店名的經典圓形厚燒鬆餅著稱，使用純淨水沖煮甘醇手沖咖啡。',
        tips: '【品味推薦】經典鬆餅淋上優質蜂蜜與特選奶油，質地蓬鬆細緻，拍照極具文藝氣息。',
        location: '白金茶房 福岡県福岡市中央区白金1-11-7',
        reviewQuery: '白金茶房 福岡 鬆餅 預約',
        mapCoord: { x: 36, y: 25 }
      },
      {
        id: 's-1120-2',
        time: '10:00',
        name: '糸島 櫻井二見之浦 夫婦岩 (Meoto Iwa)',
        category: 'scenic',
        notes: '系島代表性地標！海上矗立神聖純白鳥居，背後以粗大注連繩相連的兩塊岩石象徵夫妻良緣圓滿。',
        tips: '【拍照取景】退潮時可走至海灘沙洲，由沙灘正面拍攝白色鳥居框住夫婦岩的對稱構圖。',
        location: '桜井二見ヶ浦 夫婦岩 福岡県糸島市志摩桜井4433-1',
        reviewQuery: '糸島 夫婦岩 櫻井二見之浦 拍照',
        mapCoord: { x: 31, y: 22 }
      },
      {
        id: 's-1120-3',
        time: '11:45',
        name: '雷山千如寺大悲王院 (Sennyoji)',
        category: 'culture',
        notes: '福岡首屈一指的楓葉名所！寺內庭園擁有樹齡超過 400 年的國家指定天然紀念物「大楓樹」，滿樹烈火如紅雲遮天。',
        tips: '【拍照經典視角】坐在本堂木造緣廊上，由內往外拍攝巨大楓樹枝葉如傘蓋鋪展、落滿青苔庭園的紅色地毯。',
        location: '雷山千如寺大悲王院 福岡県糸島市雷山626',
        reviewQuery: '雷山千如寺大悲王院 400年大楓 賞楓',
        mapCoord: { x: 33, y: 26 }
      },
      {
        id: 's-1120-4',
        time: '13:45',
        name: '太宰府天滿宮 & 參道人氣散策',
        category: 'culture',
        notes: '供奉學問之神菅原道真的全國總本社。參道必吃：天山 本店 (草莓大福最中)、やす武 (現烤酥香梅枝餅)、おかき処 寺子屋本舗 (手工仙貝)、coba cafe 與隈研吾星巴克。',
        tips: '【美食必嚐】剛烤好的梅枝餅外皮酥脆帶有糯米焦香，內餡紅豆泥微甜不膩，熱呼呼咬下最過癮！',
        location: '太宰府天満宮 福岡県太宰府市宰府4-7-1',
        reviewQuery: '太宰府天滿宮 參道美食 梅枝餅 天山本店 coba cafe',
        mapCoord: { x: 40, y: 29 }
      },
      {
        id: 's-1120-5',
        time: '18:15',
        name: '前往熊本 & 入住 And COMFY HOTEL Kumamoto Jo View',
        category: 'hotel',
        notes: '車程約 1.5 小時抵達熊本市區辦理入住。特別注意：城景房直接正對夜晚點燈的熊本城天守閣！',
        tips: '【夜間漫步】步行 5 分鐘即抵上通、下通拱廊商店街，晚餐前往「菅乃屋 銀座通り店」品嚐百年名門馬肉料理。',
        location: 'And COMFY HOTEL Kumamoto Jo View 熊本市中央区城東町5-3',
        reviewQuery: 'And COMFY HOTEL Kumamoto Jo View 熊本城景 評價',
        mapCoord: { x: 36, y: 53 }
      }
    ]
  },
  {
    id: 'day-8',
    date: '2026-11-21',
    dateLabel: '11/21',
    weekday: '週六',
    title: '熊本城外圍晨散、還車退稅與華航返抵高雄',
    area: '熊本市區 / 熊本機場 / 高雄',
    forecast: {
      tempMin: 10,
      tempMax: 19,
      condition: '晴天',
      foliageStatus: '城郭銀杏金黃'
    },
    outfitTip: '搭機舒適服裝，隨身攜帶外套以備機上空調與高雄高溫。',
    hotelId: 'hotel-1120',
    spots: [
      {
        id: 's-1121-1',
        time: '07:30',
        name: '早餐：星巴克 (熊本市區/城下店)',
        category: 'food',
        notes: '早晨在熊本市區星巴克享用熱拿鐵與可頌麵包，為整趟旅程畫下悠閒句點。',
        tips: '【時間掌控】今日 09:00 需準時退房出發，請抓緊晨間時光。',
        location: 'スターバックス コーヒー 熊本',
        mapCoord: { x: 36, y: 53 }
      },
      {
        id: 's-1121-2',
        time: '08:15',
        name: '熊本城 外圍晨間巡禮與拍照',
        category: 'scenic',
        notes: '【重要備註】退房前在外圍漫步（因時間有限無法購票進城登天守，在城郭外圍巡禮）。可前往加藤神社，這裡是遠眺天守閣全貌、大小天守交錯與宇土櫓的最佳攝影點！',
        tips: '【拍照推薦】晨光由東側灑在黑色外壁天守閣與秋季金黃大銀杏樹上，氣勢雄渾恢弘。',
        location: '加藤神社 熊本市中央区本丸2-1',
        reviewQuery: '熊本城 加藤神社 拍照 天守閣 角度',
        mapCoord: { x: 36, y: 52 }
      },
      {
        id: 's-1121-3',
        time: '09:00',
        name: '飯店退房 & 加油還車 (NICONICO 租車)',
        category: 'car',
        notes: '【重要時間表】09:00~09:45 退房並開車前往熊本機場附近加油站「加滿油 (滿油還車證)」，抵達 NICONICO 租車熊本機場店辦理還車手續。',
        tips: '【還車提醒】出示加油發票，檢查隨身行李、ETC 卡、車充與手機。搭乘租車行免費專車前往機場航廈。',
        location: 'ニコニコレンタカー 熊本空港店',
        mapCoord: { x: 37, y: 54 }
      },
      {
        id: 's-1121-4',
        time: '10:00',
        name: '抵達熊本機場 & 辦理退稅手續',
        category: 'shopping',
        notes: '【退稅與出境手續排程】：10:00 抵達航廈，華航 CI199 櫃檯報到與托運行李。若托運行李中有高額免稅品，在櫃檯先向地勤告知並依指示於海關機台掃描護照；過安檢後在海關電子查驗閘門再次掃描護照/登機證，完成 11/1 最新退稅查核！',
        tips: '【免稅品規則】密封袋包裝之消耗品切勿在出境前拆封。預留 45 分鐘在出境免稅店採買熊本熊伴手禮與伴手禮名產。',
        location: '熊本空港 (阿蘇くまもと空港)',
        reviewQuery: '熊本機場 退稅 流程 免稅店',
        mapCoord: { x: 37, y: 54 }
      },
      {
        id: 's-1121-5',
        time: '11:55',
        name: '華航 CI199 熊本(KMJ) ✈ 高雄(KHH)',
        category: 'flight',
        notes: '搭乘中華航空 CI199 航班起飛，預計 14:15 抵達高雄小港國際機場，帶著滿滿的秋楓回憶平安歸國！',
        tips: '【回程提醒】起飛前 30 分鐘登機門關閉，請於 11:25 前在登機門就座。',
        location: '熊本空港 国際線ターミナル',
        mapCoord: { x: 37, y: 54 }
      }
    ]
  }
];

export const BACKUP_RESTAURANTS: BackupRestaurant[] = [
  // 阿蘇
  {
    id: 'res-1',
    name: 'お食事処 いまきん食堂',
    region: '阿蘇',
    specialty: '元祖あか牛丼 (阿蘇赤牛丼)',
    notes: '阿蘇內牧百年超人氣排隊名店！嚴選半熟溫泉蛋搭配炙燒特選赤牛肉片，肉質細嫩多汁。',
    searchQuery: 'お食事処 いまきん食堂 阿蘇'
  },
  {
    id: 'res-2',
    name: 'あか牛丼いわさき',
    region: '阿蘇',
    specialty: '阿蘇あか牛重・炭火燒',
    notes: '阿蘇當地評價極高和牛名店，炭火直烤香氣濃郁，附贈高菜漬物與赤味噌湯。',
    searchQuery: 'あか牛丼いわさき 阿蘇'
  },
  {
    id: 'res-3',
    name: 'あか牛専門 阿蘇はなびし',
    region: '阿蘇',
    specialty: '阿蘇牛排・牛丼御膳',
    notes: '座落阿蘇神社一之宮門前町，和風老宅內品嚐香烤和牛，氛圍雅緻。',
    searchQuery: 'あか牛専門 阿蘇はなびし'
  },

  // 高千穗
  {
    id: 'res-4',
    name: '高千穂牛レストラン 和',
    region: '高千穗',
    specialty: 'JA直營高千穗牛排・燒肉',
    notes: '宮崎縣農協 JA 直營，曾榮獲日本內閣總理大臣獎金牌的高千穗牛，油花細密入口即化。',
    searchQuery: '高千穂牛レストラン 和 高千穂'
  },
  {
    id: 'res-5',
    name: 'お食事処 千木良',
    region: '高千穗',
    specialty: '元祖流水麵・山女魚鹽烤',
    notes: '高千穗峽谷御鹽井步道旁，竹筒引清冽泉水流放冰涼流水麵，深受遊客喜愛。',
    searchQuery: 'お食事処 千木良 高千穂'
  },
  {
    id: 'res-6',
    name: 'おわたり',
    region: '高千穗',
    specialty: '高千穗鄉土定食・手打烏龍',
    notes: '地道宮崎家庭料理，食材來自高千穗深山產地，樸實溫暖。',
    searchQuery: 'おわたり 高千穂'
  },

  // 別府 / 大分
  {
    id: 'res-7',
    name: '岡本屋賣店',
    region: '別府/大分',
    specialty: '地獄蒸布丁・地獄溫泉蛋',
    notes: '明礬溫泉旁歷史名店，利用高溫溫泉地熱天然蒸熟的苦甜焦糖布丁，全日本饕客慕名而來。',
    searchQuery: '岡本屋賣店 別府 地獄蒸しプリン'
  },
  {
    id: 'res-8',
    name: '若榮屋 (若栄屋)',
    region: '別府/大分',
    specialty: '鯛茶漬け「うれしの」',
    notes: '杵築城下町超過300年老舖，江戶時代藩主喜愛的鯛魚胡麻醬茶泡飯，儀式感十足。',
    searchQuery: '若栄屋 杵築 鯛茶漬け'
  },
  {
    id: 'res-9',
    name: 'グリルみつば (Grill Mitsuba)',
    region: '別府/大分',
    specialty: '老牌昭和洋食・炸牛排',
    notes: '別府市區開業逾半世紀的洋食名門，招牌炸牛排外酥裡嫩，特製多蜜醬汁深沉馥郁。',
    searchQuery: 'グリルみつば 別府'
  },
  {
    id: 'res-10',
    name: '佐賀関食堂',
    region: '別府/大分',
    specialty: '關鯖魚・關竹莢魚海鮮丼',
    notes: '大分佐賀關產地直送，品嚐豐後水道激流孕育出的頂級彈牙關鯖 (Seki-Saba)。',
    searchQuery: '佐賀関食堂 大分'
  },

  // 由布院
  {
    id: 'res-11',
    name: '由布まぶし「心」金鱗湖本店',
    region: '由布院',
    specialty: '豐後牛・地雞釜飯三吃',
    notes: '由布院最負盛名的石鍋釜飯！一吃原味、二吃加柚子胡椒配菜、三吃注入高湯做茶泡飯。',
    searchQuery: '由布まぶし心 金鱗湖本店'
  },
  {
    id: 'res-12',
    name: '山家料理 湯の岳庵',
    region: '由布院',
    specialty: '四季山家料理・炭火旬味',
    notes: '由布院御三家頂級名宿「龜之井別莊」附設餐廳，坐落金鱗湖畔古老樹林中，氣氛極致靜謐雅致。',
    searchQuery: '山家料理 湯の岳庵 由布院'
  },

  // 添田 / 英彥山 / 中津
  {
    id: 'res-13',
    name: '道の駅 歓遊舎ひこさん',
    region: '添田/英彥山',
    specialty: '英彥山名水手打蕎麥・豆腐定食',
    notes: '英彥山靈山腳下的道之驛，汲取名水製成的清甜蕎麥麵與在地農作野菜天婦羅。',
    searchQuery: '道の駅 歓遊舎ひこさん'
  },

  // 北九州
  {
    id: 'res-14',
    name: '黑崎站附近居酒屋群 (炭火燒鳥/水炊)',
    region: '北九州',
    specialty: '炭火串燒・博多地雞水炊鍋',
    notes: '北九州黑崎車站商圈散發濃厚昭和庶民風情，烤雞肉串炭香撲鼻，是皿倉山夜景後放鬆首選。',
    searchQuery: '黒崎駅 居酒屋 焼き鳥'
  },

  // 福岡 / 博多
  {
    id: 'res-15',
    name: '一蘭拉麵總本店 (中洲川端)',
    region: '福岡/博多',
    specialty: '天然豚骨拉麵・味集中座位',
    notes: '一蘭發源地全球總部大樓，整棟外牆掛滿紅燈籠蔚為壯觀，24小時營業隨時可享用。',
    searchQuery: '一蘭 本社総本店 福岡'
  },
  {
    id: 'res-16',
    name: '食堂煮魚少年',
    region: '福岡/博多',
    specialty: '博多老派鮮魚煮付定食',
    notes: '博多在地人排隊名店，每日特選長濱魚市鮮魚，用秘傳甜醬油燉煮到晶亮入味。',
    searchQuery: '食堂煮魚少年 博多'
  },
  {
    id: 'res-17',
    name: '博多もつ鍋 いちたか 博多本店',
    region: '福岡/博多',
    specialty: '極品牛腸鍋 (味噌/醬油味)',
    notes: '特選國產牛小腸肥美鮮嫩，以獨門高湯熬煮韭菜與高麗菜，湯頭濃醇回甘。',
    searchQuery: '博多もつ鍋 いちたか 博多本店'
  },
  {
    id: 'res-18',
    name: 'にぎり塚本鮮魚店',
    region: '福岡/博多',
    specialty: '極上海鮮丼・壽司盛合',
    notes: '滿到溢出來的豪邁厚切生魚片海鮮丼，新鮮度極高且性價比破表。',
    searchQuery: 'にぎり塚本鮮魚店 福岡'
  },
  {
    id: 'res-19',
    name: '洋食の店 橋本',
    region: '福岡/博多',
    specialty: '米其林經典洋食・燉牛舌・漢堡排',
    notes: '福岡米其林一星老牌洋食，醬汁熬煮數十日，牛舌軟嫩如絲，是洋食界的殿堂級之作。',
    searchQuery: '洋食の店 橋本 福岡'
  },

  // 熊本
  {
    id: 'res-20',
    name: '菅乃屋 銀座通り店',
    region: '熊本',
    specialty: '熊本名物・頂級霜降生馬肉刺身',
    notes: '熊本百年正統馬肉料理名門！霜降馬肉油花如雪，入口甘甜無腥味，櫻肉涮涮鍋亦極受好評。',
    searchQuery: '菅乃屋 銀座通り店 熊本'
  }
];

export const INITIAL_CHECKLISTS: ChecklistItem[] = [
  // 行前檢查
  { id: 'c-1', category: '行前檢查', text: '申請並開通日本漫遊或安裝好 eSIM 卡', completed: true },
  { id: 'c-2', category: '行前檢查', text: '填寫 Visit Japan Web (入境手續與免稅 QR Code)', completed: true },
  { id: 'c-3', category: '行前檢查', text: '兌換日幣現鈔 (阿蘇高千穗老店與投幣機需現金)', completed: false },
  { id: 'c-4', category: '行前檢查', text: '開通雙幣信用卡 / 海外刷卡回饋卡之海外交易功能', completed: false },

  // 重要文件
  { id: 'c-5', category: '重要文件', text: '護照正本 (有效期限 6 個月以上)', completed: true },
  { id: 'c-6', category: '重要文件', text: '台灣汽車駕照正本 (租車必備！)', completed: true },
  { id: 'c-7', category: '重要文件', text: '日文譯本駕照正本 (監理所申辦)', completed: true },
  { id: 'c-8', category: '重要文件', text: '海外旅遊平安險與不便險保單紙本/電子檔', completed: false },
  { id: 'c-9', category: '重要文件', text: '機票與飯店預約確認憑證', completed: false },

  // 3C產品
  { id: 'c-10', category: '3C產品', text: '智慧型手機與充電線', completed: true },
  { id: 'c-11', category: '3C產品', text: '大容量行動電源 (隨身行李攜帶，不可托運)', completed: true },
  { id: 'c-12', category: '3C產品', text: '車用手機導航磁吸支架 / 雙孔車充 (自駕必備)', completed: false },
  { id: 'c-13', category: '3C產品', text: '相機、備用電池、充電器與高速記憶卡', completed: false },
  { id: 'c-14', category: '3C產品', text: '藍芽降噪耳機', completed: false },

  // 衣物穿搭
  { id: 'c-15', category: '衣物穿搭', text: '防風保暖連帽外套 / 羽絨外套 (高原阿蘇山頂抗風)', completed: false },
  { id: 'c-16', category: '衣物穿搭', text: '洋蔥式穿搭衛衣 / 針織發熱衣 4~5 件', completed: false },
  { id: 'c-17', category: '衣物穿搭', text: '好走防滑健走鞋 (高千穗與城下町石梯健行)', completed: false },
  { id: 'c-18', category: '衣物穿搭', text: '保暖圍巾、毛帽或遮陽帽', completed: false },
  { id: 'c-19', category: '衣物穿搭', text: '折疊晴雨兩用傘', completed: false },

  // 常用藥品與雜物
  { id: 'c-20', category: '常用藥品與雜物', text: '個人常備藥物 (感冒藥、腸胃藥、止痛藥、暈車藥)', completed: false },
  { id: 'c-21', category: '常用藥品與雜物', text: '休足時間 / 痠痛貼布 (每日自駕健行舒緩必備)', completed: false },
  { id: 'c-22', category: '常用藥品與雜物', text: '保濕乳液、護唇膏 (日本秋冬氣候乾燥)', completed: false },
  { id: 'c-23', category: '常用藥品與雜物', text: '大容量購物環保袋 (超市採買壽喜燒與一番賞戰利品)', completed: false }
];

export const INITIAL_MEMOS: MemoItem[] = [
  {
    id: 'memo-1',
    title: '自駕重要提醒與 ETC 使用',
    content: '1. 日本為右駕靠左行駛，轉彎謹記「右大轉、左小轉」。\n2. 租車有加購 KEP (Kyushu Expressway Pass 九州高速公路 Pass)，過收費站走 ETC 專用道時速低於 20km。\n3. NICONICO 租車電話：096-232-2525，導航可直接輸入電話或 MapCode。',
    updatedAt: '2026-11-05 14:00'
  },
  {
    id: 'memo-2',
    title: '動漫扭蛋一番賞地圖連結備忘',
    content: '天神 PARCO 官方樓層資訊：https://fukuoka.parco.jp/\n萬代 Namco Cross Store 博多運河城：https://bandainamco-am.co.jp/crossstore/\n駿河屋天神店位置備忘：https://www.suruga-ya.jp/',
    updatedAt: '2026-11-05 14:30'
  },
  {
    id: 'memo-3',
    title: '金鱗湖民宿壽喜燒料理備忘清單',
    content: '11/17 下午在由布院 A-Coop 超市要買：\n- 大分豐後牛霜降牛肉片 2 盒\n- 日本在地大蔥、茼蒿、鮮香菇、金針菇\n- 烤豆腐 1 塊、蒟蒻絲 1 包\n- エバラ (Ebara) 壽喜燒黃金醬汁 1 瓶\n- 雞蛋 1 盒 (蘸熱牛肉吃超讚)\n- 讚岐烏龍麵 (最後收尾精華湯汁)',
    updatedAt: '2026-11-05 15:10'
  }
];
