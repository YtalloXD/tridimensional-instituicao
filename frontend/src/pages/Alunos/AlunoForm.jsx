import React, { useState, useEffect } from "react";
import { TextField, Button, Stack, Paper, Typography } from "@mui/material";

const AlunoForm = ({ onSubmit, alunoEdit }) => {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [turmaId, setTurmaId] = useState("");

  useEffect(() => {
    if (alunoEdit) {
      setId(alunoEdit.id || "");
      setNome(alunoEdit.nome || "");
      setIdade(alunoEdit.idade || "");
      setTurmaId(alunoEdit.turma_id || "");
    } else {
      setId("");
      setNome("");
      setIdade("");
      setTurmaId("");
    }
  }, [alunoEdit]);

  const somenteId = id && !nome && !idade;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id, nome, idade, turma_id: turmaId });
    if (!somenteId) {
      setId("");
      setNome("");
      setIdade("");
      setTurmaId("");
    }
  };

  return (
    <Paper elevation={4} className="aluno-form" sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ color: "#673ab7", mb: 2 }}>
        Gerenciar Alunos
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          className="form-stack"
          sx={{ flexWrap: "wrap", mb: 2 }}
        >
          <TextField
            label="ID (para buscar/editar)"
            variant="outlined"
            size="small"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="input-field"
            sx={{ minWidth: { xs: "100%", sm: "120px" } }}
            placeholder="Deixe vazio para criar novo"
          />
          
          <TextField
            label="Nome Completo"
            variant="outlined"
            size="small"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required={!somenteId}
            disabled={somenteId}
            className="input-field"
            sx={{ minWidth: { xs: "100%", sm: "200px" } }}
          />
          
          <TextField
            label="Idade"
            variant="outlined"
            size="small"
            type="number"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            required={!somenteId}
            disabled={somenteId}
            className="input-field"
            sx={{ minWidth: { xs: "100%", sm: "100px" } }}
            inputProps={{ min: 1, max: 120 }}
          />
        
          <TextField
            label="ID da Turma"
            variant="outlined"
            size="small"
            type="number"
            value={turmaId}
            onChange={(e) => setTurmaId(e.target.value)}
            required={!somenteId}
            disabled={somenteId}
            className="input-field"
            sx={{ minWidth: { xs: "100%", sm: "120px" } }}
          />
        </Stack>
        
        <Button
          variant="contained"
          type="submit"
          className="submit-btn"
          size="medium"
          sx={{ 
            bgcolor: "#673ab7",
            "&:hover": { bgcolor: "#563098" },
            px: 3,
            py: 1
          }}
        >
          {somenteId ? "Buscar" : alunoEdit ? "Atualizar" : "Pesquisar"}
        </Button>
      </form>
    </Paper>
  );
};

export default AlunoForm;