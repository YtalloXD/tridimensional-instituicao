  import React, { useState, useEffect } from "react";
  import {
    getProfessor,
    criarProfessor,
    atualizarProfessor,
    deletarProfessor,
    buscarProfessorId,
  } from "../../services/api";
  import ProfessorList from "./ProfessorList";
  import ProfessorForm from "./ProfessorForm";
  import "./ProfessorPage.css";
  import LogoIcone from "./../../assets/logo-icone.png";

  import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
  import ArrowBackIcon from "@mui/icons-material/ArrowBack";

  function ProfessorPage({ onGoBack }) {
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

    const handleFormSubmit = async ({ id, nome, especialidade }) => {
      try {
        if (id && !nome && !especialidade) {
          const professor = await buscarProfessorId(id);
          setProfessorEdit(professor);
        } else if (professorEdit) {
          await atualizarProfessor(professorEdit.id, {
            nome,
            especialidade,
          });
          setProfessorEdit(null);
          fetchProfessores();
        } else {
          await criarProfessor({ nome, especialidade });
          fetchProfessores();
        }
      } catch (e) {
        console.error(e);
        alert("Erro na operação");
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
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflowY: "auto", 
          backgroundColor: "#f8f9fa", 
        }}
      >
        <AppBar position="static" sx={{ backgroundColor: "#6a0dad" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={LogoIcone}
                alt="Ícone Tridimensional"
                style={{ height: "32px", marginRight: "16px" }}
              />
              <Typography variant="h6" component="div">
                Gerenciar Professores
              </Typography>
            </Box>
            <Button
              color="inherit"
              startIcon={<ArrowBackIcon />}
              onClick={onGoBack}
            >
              Voltar
            </Button>
          </Toolbar>
        </AppBar>

        <div className="container-gerenciamento">
          <Box className="professor-form">
            <ProfessorForm
              onSubmit={handleFormSubmit}
              professorEdit={professorEdit}
            />
          </Box>
          <Box className="lista-professores">
            <ProfessorList
              professores={professores}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Box>
        </div>
      </Box>
    );
  }

  export default ProfessorPage;