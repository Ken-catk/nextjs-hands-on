import React from 'react';
import getConfig from 'next/config';

// 環境変数を呼び出し
const { publicRuntimeConfig } = getConfig();
const { HOTPEPPER_API_KEY } = publicRuntimeConfig;

// 呼び出すURL
const gourmetUrl = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${HOTPEPPER_API_KEY}&large_area=Z011&format=json`;

const Example = ({ gourmet }) => {
  return <div>data: {JSON.stringify(gourmet)}</div>;
  // return <div>url: {gourmetUrl}</div>;
};

// データ取得準備
export async function getStaticProps() {
  const res = await fetch(gourmetUrl);
  const data = await res.json();

  return {
    props: {
      gourmet: data,
    },
  };
}

export default Example;
