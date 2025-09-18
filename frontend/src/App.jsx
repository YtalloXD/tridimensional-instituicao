import React, { useState } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProfessorPage from "./pages/ProfessorPage";
import AlunoPage from "./pages/AlunoPage";
import AlunosTurma from "./pages/AlunosTurma";

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

  const goToHome = () => {
    setPage("home");
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
          onGoToAlunosTurma={goToAlunosTurma}
          onGoToHome={goToHome}
        />
      )}

      {page === "professores" && <ProfessorPage onGoBack={goToHome} />}
      {page === "alunos" && <AlunoPage onGoBack={goToHome} />}
      {page === "alunosturma" && <AlunosTurma onGoBack={goToHome} />}
    </ThemeProvider>
  );
}

export default App;
