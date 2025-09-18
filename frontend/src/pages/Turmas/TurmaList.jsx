import React, { useState, useEffect } from "react";
import { 
  Grid, 
  Paper, 
  Typography, 
  IconButton, 
  Box, 
  Collapse,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  CircularProgress,
  Avatar
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import { getNomesAlunosPorTurma } from "../../services/api";

const TurmaList = ({ turmas, onEdit, onDelete }) => {
  const [expandedTurmas, setExpandedTurmas] = useState({});
  const [alunosByTurma, setAlunosByTurma] = useState({});
  const [loadingAlunos, setLoadingAlunos] = useState({});

  const getInitials = (nome) => {
    if (!nome) return "?";
    const names = nome.split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return nome[0].toUpperCase();
  };

  const handleExpandClick = async (turmaId) => {
    const isExpanded = expandedTurmas[turmaId];
    
    setExpandedTurmas(prev => ({
      ...prev,
      [turmaId]: !isExpanded
    }));

    if (!isExpanded && !alunosByTurma[turmaId]) {
      setLoadingAlunos(prev => ({ ...prev, [turmaId]: true }));
      try {
        const alunos = await getNomesAlunosPorTurma(turmaId);
        setAlunosByTurma(prev => ({
          ...prev,
          [turmaId]: alunos || []
        }));
      } catch (error) {
        console.error('Erro ao carregar alunos da turma:', error);
        setAlunosByTurma(prev => ({
          ...prev,
          [turmaId]: []
        }));
      }
      setLoadingAlunos(prev => ({ ...prev, [turmaId]: false }));
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Turmas Cadastradas
      </Typography>
      <Grid container spacing={3}>
        {turmas.map((turma) => (
          <Grid item xs={12} sm={6} md={6} key={turma.id}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>
                    {turma.nome}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>ID:</strong> {turma.id} | <strong>Ano:</strong> {turma.ano} | <strong>Prof. ID:</strong> {turma.professor_id}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton onClick={() => onEdit(turma)} color="secondary" size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => onDelete(turma.id)}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Box>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: 'action.hover' },
                    borderRadius: 1,
                    p: 1,
                    mt: 1
                  }}
                  onClick={() => handleExpandClick(turma.id)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PeopleIcon color="action" />
                    <Typography variant="body2">
                      Alunos da turma
                    </Typography>
                    {alunosByTurma[turma.id] && (
                      <Chip 
                        label={alunosByTurma[turma.id].length} 
                        size="small" 
                        color="primary" 
                      />
                    )}
                  </Box>
                  {expandedTurmas[turma.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </Box>

                <Collapse in={expandedTurmas[turma.id]} timeout="auto" unmountOnExit>
                  <Box sx={{ mt: 1, pl: 2 }}>
                    {loadingAlunos[turma.id] ? (
                      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                        <CircularProgress size={24} />
                      </Box>
                    ) : alunosByTurma[turma.id] && alunosByTurma[turma.id].length > 0 ? (
                      <List dense>
                        {alunosByTurma[turma.id].map((aluno, index) => (
                          <ListItem key={aluno.id || index} sx={{ py: 1, pl: 0 }}>
                            <Avatar
                              sx={{
                                bgcolor: 'primary.light',
                                width: 32,
                                height: 32,
                                fontSize: '0.875rem',
                                mr: 2
                              }}
                            >
                              {getInitials(aluno.nome)}
                            </Avatar>
                            <ListItemText
                              primary={
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {aluno.nome}
                                </Typography>
                              }
                              secondary={
                                <Box component="div">
                                  <Typography variant="caption" color="text.secondary" display="block">
                                    ID: {aluno.id}
                                  </Typography>
                                  {aluno.email && (
                                    <Typography variant="caption" color="text.secondary" display="block">
                                      {aluno.email}
                                    </Typography>
                                  )}
                                  {aluno.matricula && (
                                    <Typography variant="caption" color="text.secondary" display="block">
                                      Matrícula: {aluno.matricula}
                                    </Typography>
                                  )}
                                </Box>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Typography variant="body2" color="text.secondary" sx={{ py: 1, fontStyle: 'italic' }}>
                        Nenhum aluno cadastrado nesta turma
                      </Typography>
                    )}
                  </Box>
                </Collapse>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TurmaList;