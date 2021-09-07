import React from 'react';
import getConfig from 'next/config';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/styles';
import { red } from '@material-ui/core/colors';
import { CustomButton } from '/components/uiParts/CustomButton';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();
const { VERCEL_URL } = publicRuntimeConfig;
const { HOTPEPPER_API_KEY } = serverRuntimeConfig;

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

const fetchGourmetApi = async props => {
  const query = new URLSearchParams();
  // query.set('largeArea', 'Z011');
  const genre = props || 'G001';
  query.set('genre', genre);
  const res = await fetch(`${VERCEL_URL}/api/gourmetOriginal?${query.toString()}`);
  const result = await res.json();

  return result;
};

const fetchAllGenreApi = async username => {
  const uri = `https://webservice.recruit.co.jp/hotpepper/genre/v1/?key=${HOTPEPPER_API_KEY}&format=json`;
  const res = await fetch(uri);
  const result = await res.json();

  if (!res.ok) {
    const message = result?.message ?? result;
    throw new Error(message);
  }

  return result;
};

const Example = ({ gourmetData, allGenreData }) => {
  // state用意
  const allGenre = allGenreData;
  const [genre, setGenre] = React.useState('G001');
  const [gourmet, setGourmet] = React.useState(gourmetData ?? '');
  const classes = useStyles();

  // 更新ボタンを押すと実行
  const onClick = async () => {
    try {
      const res = await fetchGourmetApi(genre);
      setGourmet(res);
    } catch (e) {
      setGourmet(e?.message ?? 'error');
    }
  };

  // // ドロップダウンリストを押すと実行
  // const onChange = async (event.target.value) => {
  //   // setGenre();
  //   alert(e.target.value)
  // };

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
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel htmlFor="filled-age-native-simple">Genre</InputLabel>
            <Select
              native
              // value={state.age}
              // onChange={onChange}
              onChange={e => setGenre(e.target.value)}
              inputProps={{
                name: 'age',
                id: 'filled-age-native-simple',
              }}
            >
              {allGenre.results.genre.map(data => (
                <option key={data} value={data.code}>
                  {data.name.toString()}
                </option>
              ))}
            </Select>
          </FormControl>

          <Box component="span" sx={{ padding: '10px' }}>
            <CustomButton onClick={onClick}>更新</CustomButton>
          </Box>

          <Box sx={{ padding: '10px' }}>genre: {JSON.stringify(allGenre)}</Box>
          <Box sx={{ padding: '10px' }}>gourmet: {JSON.stringify(gourmet)}</Box>
        </Box>

        <div>
          <a href="https://nextjs.org/docs/basic-features/data-fetching" target="_blank" rel="noreferrer">
            参考: Basic Features: Data Fetching | Next.js
          </a>
        </div>
      </div>
    </Container>
  );
};

// コンストラクタみたいなもの
export async function getServerSideProps() {
  const resGourmet = await fetchGourmetApi();
  const resAllGenre = await fetchAllGenreApi();
  return {
    props: {
      gourmetData: resGourmet,
      allGenreData: resAllGenre,
    },
  };
}
export default Example;
