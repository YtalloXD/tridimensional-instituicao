import React from "react";
import { Grid, Paper, Typography, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AlunoList = ({ alunos }) => {
  return (
    <Box className="lista-alunos">
      <Typography variant="h5" gutterBottom>
        Gerenciar Alunos
      </Typography>

      <Grid container spacing={3}>
        {alunos.map((aluno) => (
          <Grid item xs={12} sm={6} key={aluno.id}>
            <Paper elevation={3} className="card-aluno">
              <Box className="card-conteudo">
                <Typography variant="body1">
                  <strong>ID:</strong> {aluno.id}
                </Typography>
                <Typography variant="body1">
                  <strong>Nome:</strong> {aluno.nome}
                </Typography>
                <Typography variant="body1">
                  <strong>Idade:</strong> {aluno.idade}
                </Typography>
              </Box>

              <Box className="card-icons">
                <IconButton color="secondary">
                  <EditIcon />
                </IconButton>
                <IconButton color="error">
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

export default AlunoList;
