import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import '../styles/globals.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#242424'
    },
    secondary: {
      main: '#ffffff'
    }
  }
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;