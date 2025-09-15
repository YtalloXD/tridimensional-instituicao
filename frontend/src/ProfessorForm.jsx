import React, { useState, useEffect } from 'react';

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
    if (somenteId) {
      setNome('');
      setEmail('');
      setEspecialidade('');
    } else {
      setId('');
      setNome('');
      setEmail('');
      setEspecialidade('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required={!somenteId}
        disabled={somenteId} // desabilita os campos se só o id está preenchido
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required={!somenteId}
        disabled={somenteId}
      />
      <input
        type="text"
        placeholder="Especialidade"
        value={especialidade}
        onChange={(e) => setEspecialidade(e.target.value)}
        required={!somenteId}
        disabled={somenteId}
      />
      <button type="submit">
        {somenteId ? 'Buscar' : professorEdit ? 'Atualizar' : 'Adicionar'}
      </button>
    </form>
  );
};

export default ProfessorForm;
