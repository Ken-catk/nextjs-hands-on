import getConfig from 'next/config';

const gourmetOriginal = async (req, res) => {
  // const {
  //   query: { largeArea = 'Z011' },
  // } = req;
  const {
    query: { genre = 'G001' },
  } = req;

  const { serverRuntimeConfig } = getConfig();
  const { HOTPEPPER_API_KEY } = serverRuntimeConfig;

  // 取得店舗数
  const count = 50;
  // ジャンル検索
  const gourmetUrl = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${HOTPEPPER_API_KEY}&genre=${genre}&count=${count}&format=json`;

  const result = await fetch(gourmetUrl);
  const data = await result.json();
  return res.json(data);
};

export default gourmetOriginal;

// value: {"results":{"api_version":"1.20","genre":[{"code":"G001","name":"居酒屋"},{"code":"G002","name":"ダイニングバー・バル"},{"code":"G003","name":"創作料理"},{"code":"G004","name":"和食"},{"code":"G005","name":"洋食"},{"code":"G006","name":"イタリアン・フレンチ"},{"code":"G007","name":"中華"},{"code":"G008","name":"焼肉・ホルモン"},{"code":"G017","name":"韓国料理"},{"code":"G009","name":"アジア・エスニック料理"},{"code":"G010","name":"各国料理"},{"code":"G011","name":"カラオケ・パーティ"},{"code":"G012","name":"バー・カクテル"},{"code":"G013","name":"ラーメン"},{"code":"G016","name":"お好み焼き・もんじゃ"},{"code":"G014","name":"カフェ・スイーツ"},{"code":"G015","name":"その他グルメ"}],"results_available":17,"results_returned":"17","results_start":1}}
