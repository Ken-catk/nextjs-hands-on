// React.useStateとtextField
import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/styles';
import { red } from '@material-ui/core/colors';
import { CustomButton } from '/components/uiParts/CustomButton';
import getConfig from 'next/config';

// const initUsername = 'jey3dayo';
const genreChoice = 'G009';
const genreKeyword = '料理';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    paddingTop: 20,
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: red[800],
    paddingBottom: 20,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const fetchApi = async dataGenre => {
  // const uri = `https://api.github.com/users/${username}`;
  const uri = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${HOTPEPPER_API_KEY}&large_area=Z011&genre=${genreChoice}&format=json`;
  const res = await fetch(uri);
  const result = await res.json();

  if (!res.ok) {
    const message = result?.message ?? result;
    throw new Error(message);
  }

  return result;
};

// 環境変数を呼び出し
const { serverRuntimeConfig } = getConfig();
const { HOTPEPPER_API_KEY } = serverRuntimeConfig;
// 呼び出すURL
// const gourmetUrl = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${HOTPEPPER_API_KEY}&large_area=Z011&format=json`;
const gourmetUrlGenre = encodeURI(
  `https://webservice.recruit.co.jp/hotpepper/genre/v1/?key=${HOTPEPPER_API_KEY}&keyword=${genreKeyword}&format=json`,
);
const gourmetUrl = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${HOTPEPPER_API_KEY}&large_area=Z011&genre=${genreChoice}&format=json`;

const Example = ({ userInfo, gourmet, genre }) => {
  // state用意
  // const [username, setUsername] = React.useState(genreKeyword);
  const [value, setValue] = React.useState(userInfo ?? '');
  const [data, setData] = React.useState(gourmet ?? '');
  const [dataGenre, setDataGenre] = React.useState(genreKeyword ?? '');
  const classes = useStyles();

  // ユーザ名の反映
  const handleChange = event => {
    setDataGenre(event.target.value);
  };

  // 更新ボタンを押すと実行
  const onClick = async () => {
    try {
      const res = await fetchApi(dataGenre);
      setValue(res);
    } catch (e) {
      setValue(e?.message ?? 'error');
    }
  };

  const avatarUrl = value?.avatar_url ?? null;

  return (
    <Container>
      <div className={classes.root}>
        <div className={classes.title}>Githubのプロフィールを取得するサンプル</div>
        <Box
          component="form"
          noValidate
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
        >
          <TextField
            id="outlined-basic"
            label="dataGenre"
            variant="outlined"
            value={dataGenre}
            onChange={handleChange}
          />

          <Box component="span" sx={{ padding: '10px' }}>
            <CustomButton onClick={onClick}>更新</CustomButton>
          </Box>

          {avatarUrl ? <Avatar alt="avatar" src={avatarUrl} className={classes.large} /> : null}

          {/* <Box sx={{ padding: '10px' }}>value: {JSON.stringify(value)}</Box> */}
        </Box>
        <div>
          <a href="https://nextjs.org/docs/basic-features/data-fetching" target="_blank" rel="noreferrer">
            参考: Basic Features: Data Fetching | Next.js
          </a>
        </div>
        <div>{gourmetUrl}</div>
        {/* <div>data_hotpepper: {JSON.stringify(gourmet.result)}</div> */}
        {/* <div>genre: {JSON.stringify(genre)}</div> */}
        <div>genre: {JSON.stringify(dataGenre)}</div>
        <div>〜〜〜〜〜〜〜</div>
        {/* <div>data: {JSON.stringify(gourmet.results.shop[0].name)}</div> */}
        {/* <div>data: {JSON.stringify(gourmet.results.shop[0])}</div> */}
        <div>〜〜〜〜〜〜〜</div>
        <div>ジャンルは「{JSON.stringify(dataGenre)}」です</div>
        {/* {gourmet.results.shop.map(data => (
          <div key={data}>{JSON.stringify(data.name)}</div>
        ))} */}
        {gourmet.results.shop.map(data => (
          <Box key={data} color="secondary" bgcolor="text.secondary" margin="10px">
            {data.access.toString()}にある「{data.name.toString()}」
          </Box>
        ))}
      </div>
    </Container>
  );
};

// コンストラクタみたいなもの
// export async function getStaticProps() {
export async function getServerSideProps() {
  const res = await fetchApi(genreKeyword);
  const res_hotpepper = await fetch(gourmetUrl);
  const data_hotpepper = await res_hotpepper.json();
  const res_hotpepper_genre = await fetch(gourmetUrlGenre);
  const data_hotpepper_genre = await res_hotpepper_genre.json();
  return {
    props: {
      userInfo: res,
      gourmet: data_hotpepper,
      genre: data_hotpepper_genre,
    },
  };
}
export default Example;
