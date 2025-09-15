import React, { useState, useEffect } from 'react';
import {
  getProfessor,
  criarProfessor,
  atualizarProfessor,
  deletarProfessor,
  buscarProfessorId,
} from './api';
import ProfessorList from './ProfessorList';
import ProfessorForm from './ProfessorForm';

function ProfessorPage() {
  const [professores, setProfessores] = useState([]);
  const [professorEdit, setProfessorEdit] = useState(null);

  useEffect(() => {
    fetchProfessores();
  }, []);

  const fetchProfessores = async () => {
    try {
      const data = await getProfessor();
      setProfessores(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleFormSubmit = async ({ id, nome, email, especialidade }) => {
    try {
      if (id && !nome && !email && !especialidade) {
        // Só ID preenchido -> buscar professor
        const professor = await buscarProfessorId(id);
        setProfessorEdit(professor);
      } else if (professorEdit) {
        // Atualizar professor existente
        await atualizarProfessor(professorEdit.id, { nome, email, especialidade });
        setProfessorEdit(null);
        fetchProfessores();
      } else {
        // Criar novo professor
        await criarProfessor({ nome, email, especialidade });
        fetchProfessores();
      }
    } catch (e) {
      console.error(e);
      alert('Erro na operação');
    }
  };

  const handleEdit = (professor) => {
    setProfessorEdit(professor);
  };

  const handleDelete = async (id) => {
    try {
      await deletarProfessor(id);
      fetchProfessores();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1>Gerenciamento de Professores</h1>
      <ProfessorForm onSubmit={handleFormSubmit} professorEdit={professorEdit} />
      <hr />
      <ProfessorList
        professores={professores}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default ProfessorPage;
