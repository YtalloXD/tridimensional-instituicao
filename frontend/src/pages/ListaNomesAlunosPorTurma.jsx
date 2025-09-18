import React, { useState, useEffect } from "react";
import { getNomesAlunosPorTurma } from "../services/api";
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
  Avatar,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Groups2Icon from "@mui/icons-material/Groups2";
import PersonIcon from "@mui/icons-material/Person";
import LogoIcone from "../assets/logo-icone.png";

const ListaAlunosPorTurma = ({ turmaId, user, onGoToHome }) => {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const carregarNomesAlunos = async () => {
      try {
        setLoading(true);
        const data = await getNomesAlunosPorTurma(turmaId);
        setAlunos(data);
      } catch (error) {
        console.error("Erro ao carregar nomes dos alunos:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (turmaId) {
      carregarNomesAlunos();
    }
  }, [turmaId]);

  const cardStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: theme.shadows[4],
    },
    borderLeft: `4px solid ${theme.palette.primary.main}`,
  };

  const getInitials = (nome) => {
    if (!nome) return "?";
    const names = nome.split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return nome[0].toUpperCase();
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflowY: "auto",
        backgroundColor: "#f4f6f8",
      }}
    >
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={onGoToHome}
            sx={{ mr: 2 }}
            aria-label="Voltar"
          >
            <ArrowBackIcon />
          </IconButton>
          <img
            src={LogoIcone}
            alt="Ícone Tridimensional"
            style={{ height: "32px", marginRight: "16px" }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Alunos da Turma
          </Typography>
          {!isMobile && (
            <Button
              color="inherit"
              startIcon={<ArrowBackIcon />}
              onClick={onGoToHome}
            >
              Voltar ao Início
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Groups2Icon color="primary" sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h4" component="h1">
                Alunos da sua Turma
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {turmaId ? `Turma ID: ${turmaId}` : "Carregando informações da turma..."}
              </Typography>
            </Box>
          </Box>
          
          <Chip
            icon={<PersonIcon />}
            label={`${alunos.length} aluno${alunos.length !== 1 ? 's' : ''} encontrado${alunos.length !== 1 ? 's' : ''}`}
            color="primary"
            variant="outlined"
          />
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Typography variant="h6" color="text.secondary">
              Carregando alunos...
            </Typography>
          </Box>
        ) : alunos.length === 0 ? (
          <Card elevation={2} sx={{ p: 4, textAlign: "center" }}>
            <Groups2Icon color="disabled" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Nenhum aluno encontrado
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Não há outros alunos cadastrados na sua turma no momento.
            </Typography>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {alunos.map((aluno, index) => (
              <Grid item xs={12} sm={6} md={4} key={aluno.id || index}>
                <Card sx={cardStyle} elevation={2}>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: theme.palette.primary.main,
                          mr: 2,
                          width: 50,
                          height: 50,
                          fontSize: "1.2rem",
                        }}
                      >
                        {getInitials(aluno.nome)}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom>
                          {aluno.nome || `Aluno ${index + 1}`}
                        </Typography>
                        {aluno.matricula && (
                          <Typography variant="body2" color="text.secondary">
                            Matrícula: {aluno.matricula}
                          </Typography>
                        )}
                        {aluno.email && (
                          <Typography variant="body2" color="text.secondary">
                            {aluno.email}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    
                    {aluno.curso && (
                      <Chip
                        label={aluno.curso}
                        size="small"
                        color="secondary"
                        variant="outlined"
                        sx={{ mt: 1 }}
                      />
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default ListaAlunosPorTurma;