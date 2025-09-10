import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';

const mockUser = {
  nome: 'Maria Souza',
  tipo: 'PROFESSOR' 
};

const HomePage = ({ user = mockUser, onLogout }) => {
  const isAluno = user.tipo === 'ALUNO';

  const cardStyle = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: 6,
    }
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: 'white', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
        <Toolbar>
          <SchoolIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tridimensional Instituição
          </Typography>
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={onLogout}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Olá, {user.nome}!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Bem-vindo(a) ao seu painel.
        </Typography>
        <Grid container spacing={4}>
          {isAluno ? (
            <>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={cardStyle}>
                  <CardContent>
                    <SchoolIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography gutterBottom variant="h5" component="h2">Minhas Turmas</Typography>
                    <Typography color="text.secondary">Acesse suas turmas, materiais e avisos.</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained">Ver Turmas</Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={cardStyle}>
                  <CardContent>
                    <AssessmentIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography gutterBottom variant="h5" component="h2">Minhas Notas</Typography>
                    <Typography color="text.secondary">Consulte seu boletim e o desempenho nas matérias.</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained">Ver Boletim</Button>
                  </CardActions>
                </Card>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={cardStyle}>
                  <CardContent>
                    <PeopleIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography gutterBottom variant="h5" component="h2">Gerenciar Turmas</Typography>
                    <Typography color="text.secondary">Visualize alunos, envie avisos e materiais.</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained">Acessar Turmas</Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={cardStyle}>
                  <CardContent>
                    <AssessmentIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography gutterBottom variant="h5" component="h2">Lançar Notas</Typography>
                    <Typography color="text.secondary">Acesse o diário de classe para registrar notas e faltas.</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained">Abrir Diário</Button>
                  </CardActions>
                </Card>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;

