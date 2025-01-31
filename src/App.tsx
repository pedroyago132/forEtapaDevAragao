import { createTheme, ThemeProvider } from '@mui/material';
// import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { useContext } from 'react';
import { AppContext, AppProvider } from './state';
import Login from './pages/Login';
import ResponsiveDrawer from './components/employee-list';
import { ProtectedRoute } from './pages/Login/outlet';
import RegisterClient from './pages/RegisterClient';

function App() {

  const { state } = useContext(AppContext)
  const { theme } = state

  const lightTheme = createTheme({
    typography: {
      fontFamily: 'Acherus',
      body1: {
        color: '#000000', // black
        fontWeight:'400'
      },
      body2: {
        color: '#000000',
        fontWeight:'600'
      },
      // ...rest of the typography styles
    },
    palette: {
      mode: 'light',
      background: {
        paper: '#FFFFFF', // white
        default: '#ECEBE4', // light gray
      },
      primary: {
        main: '#231F1E', // primary color EB4B98
        contrastText: '#ECEBE4', // white
      },
      secondary: {
        main: '#C7B898', // secondary color
        contrastText: '#ECEBE4', // black
      },
      success: {
        main: '#4CAF50',
        dark: '#388E3C',
        contrastText: '#FFFFFF',
        light: '#81C784',
      },
    },
  });

  const darkTheme = createTheme({
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



  const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  background: ${theme === 'dark' ? '#000000' : '#FBD916'};
  width: 100%
}
`;

  return (
    <>
      <GlobalStyle />
      <AppProvider>
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/criarconta" element={<RegisterClient />} />
              <Route path="/drawer" element={
               
                  <ResponsiveDrawer />
              
              } />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AppProvider>
    </>
  );

}

export default App;