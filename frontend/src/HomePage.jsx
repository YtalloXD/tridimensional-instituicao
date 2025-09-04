import React, { useState } from "react";
import { Container, Typography, Box, Button, TextField, Card, CardContent } from "@mui/material";

export default function HomePage() {
  const [userType, setUserType] = useState(null); // Aluno ou Professor
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    console.log("Login:", { userType, email, senha });
    // Depois integrar isso com o backend
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
      
      <Typography variant="h3" gutterBottom>
        Tridimensional
      </Typography>
      <Typography variant="h6" gutterBottom>
        Escolha seu perfil
      </Typography>
      
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
        <Button
          variant={userType === "aluno" ? "contained" : "outlined"}
          onClick={() => setUserType("aluno")}
        >
          Sou Aluno
        </Button>
        <Button
          variant={userType === "professor" ? "contained" : "outlined"}
          onClick={() => setUserType("professor")}
        >
          Sou Professor
        </Button>
      </Box>
      
      {userType && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Login - {userType === "aluno" ? "Aluno" : "Professor"}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
              <TextField
                label="Senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                fullWidth
              />
              <Button variant="contained" onClick={handleLogin}>
                Entrar
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
          }
