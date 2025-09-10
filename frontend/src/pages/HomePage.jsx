import React from 'react';
import { Box, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh', 
        width: '100vw',    
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',     
        justifyContent: 'center',  
        textAlign: 'center',
        padding: 2, 
        backgroundColor: 'primary.main',
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: { xs: '2.5rem', sm: '3.5rem' }, 
        }}
      >
        Bem-vindo(a)!
      </Typography>
      <Typography
        variant="h5"
        sx={{
          mt: 2,
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: { xs: '1.1rem', sm: '1.5rem' }, 
        }}
      >
        Gerenciamento da Tridimensional Instituição
      </Typography>
    </Box>
  );
};

export default HomePage;