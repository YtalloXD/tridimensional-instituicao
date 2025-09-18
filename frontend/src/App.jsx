import React, { useState } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProfessorPage from "./pages/Professores/ProfessorPage";
import AlunoPage from "./pages/Alunos/AlunoPage";
import AlunosTurma from "./pages/Turmas/AlunosTurma";
import ListaAlunosPorTurma from "./pages/ListaNomesAlunosPorTurma"; 
import TurmaPage from "./pages/Turmas/TurmaPage"; 

const theme = createTheme({
  palette: {
    primary: {
      main: "#673ab7",
    },
    secondary: {
      main: "#f3e5f5",
    },
    background: {
      default: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h4: {
      fontWeight: 700,
    },
  },
});

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    console.log("📥 Login bem-sucedido:", userData);
    setUser(userData.usuario);
    setPage("home");
  };

  const handleRegisterSuccess = (userData) => {
    console.log("📥 Registro bem-sucedido:", userData);
    setUser(userData.usuario);
    setPage("home");
  };

  const handleLogout = () => {
    setUser(null);
    setPage("login");
  };

  const goToRegister = () => {
    setPage("register");
  };

  const goToLogin = () => {
    setPage("login");
  };

  const goToProfessores = () => {
    setPage("professores");
  };

  const goToAlunos = () => {
    setPage("alunos");
  };

  const goToAlunosTurma = () => {
    setPage("alunosturma");
  };

  const goToTurmaPage = () => {
    setPage("turmas");
  };

  const goToListaAlunosPorTurma = () => {
    setPage("listaalunosporturma");
  };

  const goToHome = () => {
    setPage("home");
  };

  const getTurmaId = () => {
    if (user?.aluno?.turmaId) return user.aluno.turmaId;
    if (user?.turmaId) return user.turmaId;
    if (user?.aluno?.turma?.id) return user.aluno.turma.id;
    return null;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {page === "login" && (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onGoToRegister={goToRegister}
        />
      )}
      {page === "register" && (
        <RegisterPage
          onRegisterSuccess={handleRegisterSuccess}
          onGoToLogin={goToLogin}
        />
      )}
      {page === "home" && (
        <HomePage
          user={user}
          onLogout={handleLogout}
          onGoToProfessores={goToProfessores}
          onGoToAlunos={goToAlunos}
          onGoToAlunosTurma={goToListaAlunosPorTurma} 
          onGoToHome={goToHome}
          onGoToTurmas={goToTurmaPage}
        />
      )}
      {page === "professores" && <ProfessorPage onGoBack={goToHome} />}
      {page === "alunos" && <AlunoPage onGoBack={goToHome} />}
      {page === "turmas" && <TurmaPage onGoBack={goToHome} />}
      {page === "alunosturma" && <AlunosTurma onGoBack={goToHome} />}
      {page === "listaalunosporturma" && (
        <ListaAlunosPorTurma
          turmaId={getTurmaId()}
          user={user}
          onGoToHome={goToHome}
        />
        
      )}
    </ThemeProvider>
  );
}

export default App;