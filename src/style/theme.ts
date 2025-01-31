import { createTheme } from "@mui/material";
import { createGlobalStyle } from 'styled-components';

export const lightTheme = createTheme({
    typography: {
      fontFamily: ['Helvetica, Arial, sans-serif'].join(','),
      body1: {
        color: '#000000', // black
      },
      body2: {
        color: '#000000', // black
      },
      // ...rest of the typography styles
    },
    palette: {
      mode: 'light',
      background: {
        paper: '#FFFFFF', // white
        default: '#F5F5F5', // light gray
      },
      primary: {
        main: '#2E3192', // primary color EB4B98
        contrastText: '#FFFFFF', // white
      },
      secondary: {
        main: '#EB4B98', // secondary color
        contrastText: '#000000', // black
      },
      success: {
        main: '#4CAF50',
        dark: '#388E3C',
        contrastText: '#FFFFFF',
        light: '#81C784',
      },
    },
  });
  
  export const darkTheme = createTheme({
    typography: {
      fontFamily: ['Helvetica, Arial, sans-serif'].join(','),
      body1: {
        color: '#FFFFFF', // white
      },
      body2: {
        color: '#FFFFFF', // white
      },
      // ...rest of the typography styles
    },
    palette: {
      mode: 'dark',
      background: {
        paper: '#212121', // dark gray
        default: '#303030', // slightly lighter dark gray
      },
      primary: {
        main: '#EB4B98', // primary color
        contrastText: '#FFFFFF', // white
      },
      secondary: {
        main: '#2E3192', // secondary color
        contrastText: '#FFFFFF', // white
      },
      success: {
        main: '#4CAF50',
        dark: '#388E3C',
        contrastText: '#FFFFFF', // white
        light: '#81C784',
      },
    },
  });


export const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif; /* Use your desired font-family here */
    /* Add other body styles here */
  }
`;


  