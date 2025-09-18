import React, { useState, useEffect } from "react";
import { TextField, Button, Stack, Paper } from "@mui/material";

const TurmaForm = ({ onSubmit, turmaEdit }) => {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [professor_id, setProfessorId] = useState("");
  const [ano, setAno] = useState("");

  useEffect(() => {
    if (turmaEdit) {
      setId(turmaEdit.id || "");
      setNome(turmaEdit.nome || "");
      setProfessorId(turmaEdit.professor_id || "");
      setAno(turmaEdit.ano || "");
    } else {
      setId("");
      setNome("");
      setProfessorId("");
      setAno("");
    }
  }, [turmaEdit]);

  const somenteId = id && !nome && !professor_id && !ano;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ 
      id, 
      nome, 
      professor_id: Number(professor_id), 
      ano: Number(ano) 
    });
    setId("");
    setNome("");
    setProfessorId("");
    setAno("");
  };

  return (
    <Paper elevation={4} sx={{ p: 3, mb: 4 }}>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", gap: 2 }} alignItems="center">
          <TextField
            label="ID (para buscar)"
            variant="outlined"
            size="small"
            value={id}
            onChange={(e) => setId(e.target.value)}
            sx={{ minWidth: '100px', flex: 1 }}
          />
          <TextField
            label="Nome da Turma"
            variant="outlined"
            size="small"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required={!somenteId}
            disabled={somenteId}
            sx={{ minWidth: '150px', flex: 2 }}
          />
          <TextField
            label="ID do Professor"
            variant="outlined"
            type="number"
            size="small"
            value={professor_id}
            onChange={(e) => setProfessorId(e.target.value)}
            required={!somenteId}
            disabled={somenteId}
            sx={{ minWidth: '150px', flex: 2 }}
          />
          <TextField
            label="Ano"
            variant="outlined"
            type="number"
            size="small"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            required={!somenteId}
            disabled={somenteId}
            sx={{ minWidth: '120px', flex: 1 }}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ height: "40px" }}
          >
            {somenteId ? "Buscar" : turmaEdit ? "Atualizar" : "Adicionar"}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default TurmaForm;