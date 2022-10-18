import '../styles/globals.css';
import {createMuiTheme, ThemeProvider} from "@mui/material";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#222220"
    },
    secondary: {
      main: '#ffffff'
    }
  },
  typography: {
    fontFamily: [
      'Exo 2',
      'sans-serif'
    ].join(',')
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
