import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#a3a6ff',
      dark: '#6063ee',
      contrastText: '#0f00a4',
    },
    secondary: {
      main: '#69f6b8',
      dark: '#58e7ab',
      contrastText: '#005a3c',
    },
    error: {
      main: '#ff6e84',
    },
    background: {
      default: '#060e20',
      paper: '#0f1930',
    },
    text: {
      primary: '#dee5ff',
      secondary: '#a3aac4',
    },
    divider: 'rgba(99, 108, 140, 0.25)',
  },
  shape: {
    borderRadius: 2,
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontFamily: "'Space Grotesk', sans-serif" },
    h2: { fontFamily: "'Space Grotesk', sans-serif" },
    h3: { fontFamily: "'Space Grotesk', sans-serif" },
    h4: { fontFamily: "'Space Grotesk', sans-serif" },
    h5: { fontFamily: "'Space Grotesk', sans-serif" },
    h6: { fontFamily: "'Space Grotesk', sans-serif" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#060e20',
          color: '#dee5ff',
        },
        '::-webkit-scrollbar': { width: '4px' },
        '::-webkit-scrollbar-track': { background: 'transparent' },
        '::-webkit-scrollbar-thumb': {
          background: '#40485d',
          borderRadius: '10px',
        },
      },
    },
  },
});
