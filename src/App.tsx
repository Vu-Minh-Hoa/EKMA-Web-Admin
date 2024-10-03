import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { orange } from '@mui/material/colors';
import './App.css';
import MainRoute from './router/MainRoute';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

function App() {
  const theme = createTheme({
    status: {
      danger: orange[500],
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <MainRoute />
    </ThemeProvider>
  );
}

export default App;
