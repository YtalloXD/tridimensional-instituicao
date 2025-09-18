import React, { useState, useEffect } from "react";
import {
  getAluno,
  criarAluno,
  atualizarAluno,
  deletarAluno,
  buscarAlunoId,
} from "../../services/api";
import AlunoList from "./AlunoList";
import AlunoForm from "./AlunoForm";
import "./AlunoPage.css";
import LogoIcone from "./../../assets/logo-icone.png";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function AlunoPage({ onGoBack }) {
  const [alunos, setAlunos] = useState([]);
  const [alunoEdit, setAlunoEdit] = useState(null);

  useEffect(() => {
    fetchAlunos();
  }, []);

  const fetchAlunos = async () => {
    try {
      const data = await getAluno();
      setAlunos(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleFormSubmit = async ({ id, nome, idade, email, turma_id }) => {
    try {
      if (id && !nome && !idade) {
        const aluno = await buscarAlunoId(id);
        setAlunoEdit(aluno);
      } else if (alunoEdit) {
        await atualizarAluno(alunoEdit.id, {
          nome,
          idade,
          email,
        });
        setAlunoEdit(null);
        fetchAlunos();
      } else {
        await criarAluno({ nome, idade, email, turma_id });
        fetchAlunos();
      }
    } catch (e) {
      console.error(e);
      alert("Erro na operação");
    }
  };

  const handleEdit = (aluno) => {
    setAlunoEdit(aluno);
  };

  const handleDelete = async (id) => {
    try {
      await deletarAluno(id);
      fetchAlunos();
    } catch (e) {
      console.error(e);
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
        backgroundColor: "#f8f9fa", 
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: "#6a0dad" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={LogoIcone}
              alt="Ícone Tridimensional"
              style={{ height: "32px", marginRight: "16px" }}
            />
            <Typography variant="h6" component="div">
              Gerenciar Alunos
            </Typography>
          </Box>
          <Button
            color="inherit"
            startIcon={<ArrowBackIcon />}
            onClick={onGoBack}
          >
            Voltar
          </Button>
        </Toolbar>
      </AppBar>
      
      <div className="container-gerenciamento">
        <Box className="aluno-form">
          <AlunoForm onSubmit={handleFormSubmit} alunoEdit={alunoEdit} />
        </Box>
        <Box className="lista-alunos">
          <AlunoList
            alunos={alunos}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Box>
      </div>
    </Box>
  );
}

export default AlunoPage;