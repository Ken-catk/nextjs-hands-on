import { createTheme } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import red from '@material-ui/core/colors/red';

const theme = createTheme({
  palette: {
    primary: deepPurple,
    secondary: red,
  },
});

export default theme;
