import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#673ab7',
    },
    secondary: {
      main: '#f3e5f5',
    },
    background: {
      default: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 700,
    },
  },
});

function App() {
  const [page, setPage] = useState('register');
  const [user, setUser] = useState(null);

 
 const handleRegisterSuccess = (userData) => {
  console.log("📥 Dados recebidos:", userData); 
  setUser(userData.usuario); 
  setPage('home');
};
  const handleLogout = () => {
    setUser(null);      
    setPage('register'); 
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {page === 'register' && <RegisterPage onRegisterSuccess={handleRegisterSuccess} />}
      
      {page === 'home' && <HomePage user={user} onLogout={handleLogout} />}
    </ThemeProvider>
  );
}

export default App;
