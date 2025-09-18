import React, { useState, useEffect } from "react";
import { TextField, Button, Stack, Paper } from "@mui/material";

const AlunoForm = ({ onSubmit, alunoEdit }) => {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");

  useEffect(() => {
    if (alunoEdit) {
      setId(alunoEdit.id || "");
      setNome(alunoEdit.nome || "");
      setIdade(alunoEdit.idade || "");
    } else {
      setId("");
      setNome("");
      setIdade("");
    }
  }, [alunoEdit]);

  const somenteId = id && !nome && !idade;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id, nome, idade });
    setId("");
    setNome("");
    setIdade("");
  };

  return (
    <Paper elevation={4} className="aluno-form">
      <form onSubmit={handleSubmit}>
        <Stack
          direction="row"
          spacing={2}
          className="form-stack"
          sx={{ flexWrap: "wrap", justifyContent: "space-between" }}
        >
          <TextField
            label="ID"
            variant="outlined"
            size="small"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="input-field"
          />
          <TextField
            label="Nome"
            variant="outlined"
            size="small"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required={!somenteId}
            disabled={somenteId}
            className="input-field"
          />
          <TextField
            label="Idade"
            variant="outlined"
            size="small"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            required={!somenteId}
            disabled={somenteId}
            className="input-field"
          />
          <Button
            variant="contained"
            type="submit"
            className="submit-btn"
            size="small"
            sx={{ height: "38px", whiteSpace: "nowrap" }}
          >
            {somenteId ? "Buscar" : alunoEdit ? "Atualizar" : "Adicionar"}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default AlunoForm;
