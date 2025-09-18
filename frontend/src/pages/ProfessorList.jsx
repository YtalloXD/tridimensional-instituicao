import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProfessorList = ({ professores, onEdit, onDelete }) => {
  return (
    <Box className="lista-professores">
      <Typography variant="h5" gutterBottom>
        Lista de Professores
      </Typography>

      <Grid container spacing={3}>
        {professores.map((professor) => (
          <Grid item xs={12} sm={6} key={professor.id}>
            <Paper elevation={3} className="card-professor">
              <Box className="card-conteudo">
                <Typography variant="body1"><strong>ID:</strong> {professor.id}</Typography>
                <Typography variant="body1"><strong>Nome:</strong> {professor.nome}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {professor.email}</Typography>
                <Typography variant="body1"><strong>Especialidade:</strong> {professor.especialidade}</Typography>
              </Box>

              <Box className="card-icons">
                <IconButton onClick={() => onEdit(professor)} color="secondary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(professor.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProfessorList;