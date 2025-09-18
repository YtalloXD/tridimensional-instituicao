import React, { useState, useEffect } from 'react';
import {
  getProfessor,
  criarProfessor,
  atualizarProfessor,
  deletarProfessor,
  buscarProfessorId,
} from '../../api';
import ProfessorList from './ProfessorList';
import ProfessorForm from './ProfessorForm';
import './ProfessorPage.css';

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
} from '@mui/material';

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
      
        const professor = await buscarProfessorId(id);
        setProfessorEdit(professor);
      } else if (professorEdit) {
       
        await atualizarProfessor(professorEdit.id, { nome, email, especialidade });
        setProfessorEdit(null);
        fetchProfessores();
      } else {
      
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
    <>
      <AppBar position="static" sx={{ backgroundColor: '#6a0dad' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Gerenciamento de Professores
          </Typography>
          <Box>
          
            {/* imagem da logo aqui */}

          </Box>
        </Toolbar>
      </AppBar>

      <div className="container-gerenciamento">
        <ProfessorForm onSubmit={handleFormSubmit} professorEdit={professorEdit} />
        <hr />
        <ProfessorList
          professores={professores}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
}

export default ProfessorPage;