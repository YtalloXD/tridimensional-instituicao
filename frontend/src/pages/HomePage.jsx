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
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import SchoolIcon from '@mui/icons-material/School';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'; 
import logoIcone from './../assets/logo-icone.png';

const HomePage = ({ user, onLogout, onGoToProfessores }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isAluno = user?.tipo === 'ALUNO';

  const getNome = () => {
    if (user?.nome) return user.nome;
    if (user?.aluno?.nome) return user.aluno.nome;
    if (user?.professor?.nome) return user.professor.nome;
    if (user?.email) return user.email;
    return 'Usuário';
  };

  const cardStyle = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  };

  if (!user) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">
          ❌ Erro: Dados do usuário não encontrados. Faça login novamente.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        backgroundColor: '#f4f6f8',
      }}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <img 
            src={logoIcone} 
            alt="Ícone Tridimensional" 
            style={{ height: '32px', marginRight: '16px' }} 
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tridimensional Instituição
          </Typography>
          {isMobile ? (
            <IconButton color="inherit" onClick={onLogout} aria-label="Sair">
              <LogoutIcon />
            </IconButton>
          ) : (
            <Button color="inherit" startIcon={<LogoutIcon />} onClick={onLogout}>
              Sair
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Olá, {getNome()}!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Bem-vindo(a) ao seu painel.
        </Typography>

        <Grid container spacing={4}>
          {isAluno ? (
            <>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={cardStyle} elevation={2}>
                    <CardContent>
                        <SchoolIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                        <Typography gutterBottom variant="h5" component="h2">Minha Turma</Typography>
                        <Typography color="text.secondary">Acesse suas turma, materiais e avisos.</Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" variant="contained">Ver Turma</Button>
                    </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={cardStyle} elevation={2}>
                    <CardContent>
                        <AssessmentIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
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
                <Card sx={cardStyle} elevation={2}>
                    <CardContent>
                        <PeopleIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                        <Typography gutterBottom variant="h5" component="h2">Gerenciar Turmas</Typography>
                        <Typography color="text.secondary">Visualize alunos, envie avisos e materiais.</Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" variant="contained">Acessar Turmas</Button>
                    </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={cardStyle} elevation={2}>
                    <CardContent>
                        <AssessmentIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                        <Typography gutterBottom variant="h5" component="h2">Lançar Notas</Typography>
                        <Typography color="text.secondary">Acesse o diário de classe para registrar notas e faltas.</Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" variant="contained">Abrir Diário</Button>
                    </CardActions>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card sx={cardStyle} elevation={2}>
                  <CardContent>
                    <ManageAccountsIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                    <Typography gutterBottom variant="h5" component="h2">
                      Gerenciar Professores
                    </Typography>
                    <Typography color="text.secondary">
                      Adicione, edite ou remova professores do sistema.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained" onClick={onGoToProfessores}>
                      Gerenciar
                    </Button>
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