import React, { useState, useEffect } from "react";
import {
  getAluno,
  criarAluno,
  atualizarAluno,
  deletarAluno,
  buscarAlunoId,
} from "../services/api";
import AlunoList from "../AlunoList";
import AlunoForm from "../AlunoForm";
import "../AlunoPage.css";
import LogoIcone from "../assets/logo-icone.png";

import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
// import ListaNomesAlunosPorTurma from "../ListaNomesAlunosPorTurma";
function AlunoPage() {
  const [alunos, setAlunos] = useState([]);
  const [alunoEdit, setAlunoEdit] = useState(null);
  // const isAluno = user?.tipo === "ALUNO";

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

  const handleFormSubmit = async ({ id, nome, idade }) => {
    try {
      if (id && !nome && !idade) {
        const aluno = await buscarAlunoId(id);
        setAlunoEdit(aluno);
      } else if (alunoEdit) {
        await atualizarAluno(alunoEdit.id, {
          nome,
          idade,
        });
        setAlunoEdit(null);
        fetchAlunos();
      } else {
        await criarAluno({ nome, idade });
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
    <>
      <AppBar position="static" sx={{ backgroundColor: "#6a0dad" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <img
              src={LogoIcone}
              alt="Ícone Tridimensional"
              style={{ height: "32px", marginRight: "16px" }}
            />
          </Box>
          <Typography variant="h6" component="div">
            Buscador de Alunos
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="container-gerenciamento">
        <AlunoForm onSubmit={handleFormSubmit} alunoEdit={alunoEdit} />
        <hr />
        <AlunoList
          alunos={alunos}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      <ListaNomesAlunosPorTurma />
    </>
  );
}

export default AlunoPage;
