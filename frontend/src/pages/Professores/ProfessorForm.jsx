import React, { useState, useEffect } from "react";
import { TextField, Button, Stack, Paper } from "@mui/material";

const ProfessorForm = ({ onSubmit, professorEdit }) => {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [especialidade, setEspecialidade] = useState("");

  useEffect(() => {
    if (professorEdit) {
      setId(professorEdit.id || "");
      setNome(professorEdit.nome || "");
      setEspecialidade(professorEdit.especialidade || "");
    } else {
      setId("");
      setNome("");
      setEspecialidade("");
    }
  }, [professorEdit]);

  const somenteId = id && !nome && !especialidade;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id, nome, especialidade });
  };

  return (
    <Paper elevation={0} sx={{ p: 2, backgroundColor: 'transparent' }}>
      <form onSubmit={handleSubmit}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ flexWrap: "wrap", gap: 2 }}
        >
          <TextField
            label="ID para busca"
            variant="outlined"
            size="small"
            value={id}
            onChange={(e) => setId(e.target.value)}
            sx={{ flex: 1, minWidth: '100px' }}
          />
          <TextField
            label="Nome"
            variant="outlined"
            size="small"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required={!somenteId}
            disabled={somenteId}
            sx={{ flex: 2, minWidth: '150px' }}
          />
          <TextField
            label="Especialidade"
            variant="outlined"
            size="small"
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
            required={!somenteId}
            disabled={somenteId}
            sx={{ flex: 2, minWidth: '150px' }}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ height: "40px" }}
          >
           { somenteId ? "Buscar" : professorEdit ? "Atualizar" : "Pesquisar" }
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default ProfessorForm;