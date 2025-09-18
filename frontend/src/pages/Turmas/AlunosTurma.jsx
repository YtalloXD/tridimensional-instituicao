import React from "react";
import ListaNomesAlunosPorTurma from "../ListaNomesAlunosPorTurma";
import LogoIcone from "./../../assets/logo-icone.png";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

const AlunosTurma = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflowY: "auto",
        backgroundColor: "#f4f6f8",
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: "#6a0dad" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <img
              src={LogoIcone}
              alt="Ícone Tridimensional"
              style={{ height: "32px", marginRight: "16px" }}
            />
          </Box>
          <Typography variant="h5" component="div">
            Buscador de Alunos
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <ListaNomesAlunosPorTurma />
      </Container>
    </Box>
  );
};

export default AlunosTurma;
