export type HistorySpot = {
  name: string;
  era: string;
  description: string;
};

export type Mountain = {
  id: string;
  name: string;
  reading: string;
  prefectures: string;
  elevation: string;
  region: string;
  summary: string;
  beliefs: string;
  trail: string;
  trailNote: string;
  history: string;
  spots: HistorySpot[];
  sources: string[];
};

export const mountains: Mountain[] = [
  {
    id: 'fuji',
    name: '富士山',
    reading: 'ふじさん',
    prefectures: '山梨県・静岡県',
    elevation: '3,776m',
    region: '中部地方',
    summary: '日本一高く、古くから祈りの対象となってきた山。',
    beliefs: '火を鎮め、恵みをもたらす山として、浅間の神をまつる信仰が育まれました。江戸時代には富士講が広まり、多くの人々が山頂を目指しました。',
    trail: '吉田口登山道',
    trailNote: '北口本宮冨士浅間神社から五合目を経て山頂へ続く、信仰登山の道。',
    history: '富士山は火山としての畏れと、その秀麗な姿への憧れを同時に集めてきました。古代には山そのものを神聖な存在として仰ぎ、平安時代には修験者が山中に分け入りました。2013年には「信仰の対象と芸術の源泉」として世界文化遺産に登録されています。',
    spots: [
      {
        name: '北口本宮冨士浅間神社',
        era: '1900年前から',
        description: '富士山の北口に鎮座する、吉田口登山道の起点。杉並木の奥に拝殿が佇みます。',
      },
      {
        name: '御師住宅（旧外川家住宅）',
        era: '江戸時代',
        description: '富士講の人々を迎え、登拝の準備を支えた御師の暮らしを伝える住宅。',
      },
      {
        name: '山頂・浅間大社奥宮',
        era: '山頂の祈り',
        description: '火口をめぐるお鉢巡りの先にある、山頂の浅間信仰の中心地。',
      },
    ],
    sources: [
      '文化庁「富士山—信仰の対象と芸術の源泉」',
      '環境省「富士山登山オフィシャルサイト」',
      '富士吉田市歴史民俗博物館 展示資料',
    ],
  },
];

export const getMountain = (id: string) => mountains.find((mountain) => mountain.id === id);