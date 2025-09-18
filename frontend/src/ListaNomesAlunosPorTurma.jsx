import React, { useState, useEffect } from "react";
import { getNomesAlunosPorTurma } from "./services/api";

const ListaNomesAlunosPorTurma = ({ turmaId }) => {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    const carregarNomesAlunos = async () => {
      try {
        const data = await getNomesAlunosPorTurma(turmaId);
        setAlunos(data);
      } catch (error) {
        console.error("Erro ao carregar nomes dos alunos:", error);
      }
    };
    carregarNomesAlunos();
  }, [turmaId]);

  return (
    <div>
      <h2>Alunos da Turma {turmaId}</h2>
      <ul>
        {alunos.map((aluno, index) => (
          <li key={index}>{aluno.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListaNomesAlunosPorTurma;
