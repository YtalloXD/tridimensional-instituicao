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
// import "../alunoPage.css";

import { AppBar, Toolbar, Typography, Box } from "@mui/material";

function AlunoPage() {
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
          <Typography variant="h6" component="div">
            Gerenciamento de alunoes
          </Typography>
          <Box>{/* imagem da logo aqui */}</Box>
        </Toolbar>
      </AppBar>

      <div className="container-gerenciamento">
        <alunoForm onSubmit={handleFormSubmit} alunoEdit={alunoEdit} />
        <hr />
        <alunoList
          alunos={alunos}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
}

export default AlunoPage;