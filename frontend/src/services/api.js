import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

const API_URL = "http://localhost:3000"; // Substitua pelo URL da sua API

export const getProfessor = async () => {
  const response = await axios.get(`${API_URL}/professores`);
  return response.data;
};

export const criarProfessor = async (professor) => {
  const response = await axios.post(`${API_URL}/professores`, professor);
  return response.data;
};

export const buscarProfessorId = async (id) => {
  const response = await axios.get(`${API_URL}/professores/${id}`);
  return response.data;
};

export const atualizarProfessor = async (id, professor) => {
  const response = await axios.put(`${API_URL}/professores/${id}`, professor);
  console.log(response);
  return response.data;
};

export const deletarProfessor = async (id) => {
  const response = await axios.delete(`${API_URL}/professores/${id}`);
  return response.data;
};

export const getAluno = async () => {
  const response = await axios.get(`${API_URL}/alunos`);
  return response.data;
};

export const criarAluno = async (aluno) => {
  const response = await axios.post(`${API_URL}/alunos`, aluno);
  return response.data;
};

export const buscarAlunoId = async (id) => {
  const response = await axios.get(`${API_URL}/alunos/${id}`);
  return response.data;
};

export const atualizarAluno = async (id, aluno) => {
  const response = await axios.put(`${API_URL}/alunos/${id}`, aluno);
  console.log(response);
  return response.data;
};

export const deletarAluno = async (id) => {
  const response = await axios.delete(`${API_URL}/alunos/${id}`);
  return response.data;
};

export const getNomesAlunosPorTurma = async (id) => {
  const response = await axios.get(`${API_URL}/turmas/${id}/alunos`);
  return response.data;
};

export default api;
