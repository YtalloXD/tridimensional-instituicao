import React, { useState } from "react";
import api from "../../services/api";

const LoginAluno = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login-aluno", { email, senha });
      console.log("Login aluno:", response.data);
      alert("Login realizado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro no login do aluno");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "300px" }}>
        <h2>Login Aluno</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{ marginBottom: "10px", padding: "8px" }}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginAluno;
