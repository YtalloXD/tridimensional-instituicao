import React, { useState, useEffect } from "react";
import {
  getTurmas,
  criarTurma,
  atualizarTurma,
  deletarTurma,
  buscarTurmaId,
} from "../../services/api";
import TurmaList from "./TurmaList";
import TurmaForm from "./TurmaForm";
import LogoIcone from "./../../assets/logo-icone.png";
import { AppBar, Toolbar, Typography, Box, Button, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


function TurmaPage({ onGoBack }) {
  const [turmas, setTurmas] = useState([]);
  const [turmaEdit, setTurmaEdit] = useState(null);

  useEffect(() => {
    fetchTurmas();
  }, []);

  const fetchTurmas = async () => {
    try {
      const data = await getTurmas();
      setTurmas(data);
    } catch (e) {
      console.error("Erro ao buscar turmas:", e);
    }
  };

  const handleFormSubmit = async ({ id, nome, professor_id, ano }) => {
    try {
      if (id && !nome && !professor_id && !ano) {
        const turma = await buscarTurmaId(id);
        setTurmaEdit(turma);
      } else if (turmaEdit) {
        await atualizarTurma(turmaEdit.id, { nome, professor_id, ano });
        setTurmaEdit(null);
        fetchTurmas();
      } else {
        await criarTurma({ nome, professor_id, ano });
        fetchTurmas();
      }
    } catch (e) {
      console.error("Erro na operação com turma:", e);
      alert("Erro na operação com a turma.");
    }
  };

  const handleEdit = (turma) => {
    setTurmaEdit(turma);
  };

  const handleDelete = async (id) => {
    try {
      await deletarTurma(id);
      fetchTurmas();
    } catch (e) {
      console.error("Erro ao deletar turma:", e);
    }
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
      <AppBar position="static" sx={{ backgroundColor: "#6a0dad" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={LogoIcone}
              alt="Ícone"
              style={{ height: "32px", marginRight: "16px" }}
            />
            <Typography variant="h6">Gerenciar Turmas</Typography>
          </Box>
          <Button color="inherit" startIcon={<ArrowBackIcon />} onClick={onGoBack}>
            Voltar
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <TurmaForm onSubmit={handleFormSubmit} turmaEdit={turmaEdit} />
        <TurmaList turmas={turmas} onEdit={handleEdit} onDelete={handleDelete} />
      </Container>
    </Box>
  );
}

export default TurmaPage;