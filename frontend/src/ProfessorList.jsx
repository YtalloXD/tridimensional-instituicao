import React from 'react';

const ProfessorList = ({ professores, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Lista de Professores</h2>
      <ul>
        {professores.map((professor) => (
          <li key={professor.id}>
            {professor.id} - {professor.nome} - {professor.email} - {professor.especialidade}
            <button onClick={() => onEdit(professor)}>Editar</button>
            <button onClick={() => onDelete(professor.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfessorList;