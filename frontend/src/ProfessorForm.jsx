import React, { useState, useEffect } from 'react';
import { TextField, Button, Stack, Paper } from '@mui/material';

const ProfessorForm = ({ onSubmit, professorEdit }) => {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [especialidade, setEspecialidade] = useState('');

  useEffect(() => {
    if (professorEdit) {
      setId(professorEdit.id || '');
      setNome(professorEdit.nome || '');
      setEmail(professorEdit.email || '');
      setEspecialidade(professorEdit.especialidade || '');
    } else {
      setId('');
      setNome('');
      setEmail('');
      setEspecialidade('');
    }
  }, [professorEdit]);

  const somenteId = id && !nome && !email && !especialidade;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id, nome, email, especialidade });
    setId('');
    setNome('');
    setEmail('');
    setEspecialidade('');
  };

  return (
    <Paper elevation={4} className="professor-form">
      <form onSubmit={handleSubmit}>
<Stack
  direction="row"
  spacing={2}
  className="form-stack"
  sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}
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
    label="Email"
    variant="outlined"
    size="small"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required={!somenteId}
    disabled={somenteId}
    className="input-field"
  />
  <TextField
    label="Especialidade"
    variant="outlined"
    size="small" 
    value={especialidade}
    onChange={(e) => setEspecialidade(e.target.value)}
    required={!somenteId}
    disabled={somenteId}
    className="input-field"
  />
  <Button
    variant="contained"
    type="submit"
    className="submit-btn"
    size="small"
    sx={{ height: '38px', whiteSpace: 'nowrap' }}
  >
    {somenteId ? 'Buscar' : professorEdit ? 'Atualizar' : 'Adicionar'}
  </Button>
</Stack>

      </form>
    </Paper>
  );
};

export default ProfessorForm;
