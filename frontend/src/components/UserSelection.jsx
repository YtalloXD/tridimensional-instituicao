import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserSelection.css";

export default function UserSelection() {
  const navigate = useNavigate();

  return (
    <div className="selection-container">
      <h1>Bem-vindo</h1>
      <p>Escolha como deseja entrar:</p>
      <div className="buttons">
        <button onClick={() => navigate("/login/aluno")}>Entrar como Aluno</button>
        <button onClick={() => navigate("/login/professor")}>Entrar como Professor</button>
      </div>
    </div>
  );
}
