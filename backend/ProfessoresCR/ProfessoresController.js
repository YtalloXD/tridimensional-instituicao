const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

exports.listarProfessores = async (req, res) => {
  const professoresDoBancoDeDados = await prisma.professor.findMany();
  console.log(professoresDoBancoDeDados);
  res.status(200).json(professoresDoBancoDeDados);
};

exports.criarProfessor = async (req, res) => {
  const { nome, especialidade } = req.body;
  const novoProfessorCriado = await prisma.professor.create({
    data: {
      nome: nome,
      especialidade: especialidade,
    },
  });

  let msg = `Professor ID: ${novoProfessorCriado.id}, criado com sucesso!`;
  console.log(msg);
  res.status(201).json(novoProfessorCriado);
};

exports.buscarProfessorPorId = async (req, res) => {
  const { id } = req.params;

  const professorDoBanco = await prisma.professor.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  let msg = `Professor ID: ${id}, foi achado com sucesso!`;
  console.log(msg);
  res.status(200).send(professorDoBanco);
};

exports.atualizarProfessor = async (req, res) => {
  const { id } = req.params;
  const { nome, especialidade } = req.body;

  const professorDoBanco = await prisma.professor.update({
    where: {
      id: parseInt(id),
    },
    data: {
      nome: nome,
      especialidade: especialidade,
    },
  });

  let msg = `Professor com ID: ${id}, atualizado com sucesso!`;
  console.log(msg);
  res.status(200).send(professorDoBanco);
};

exports.deletarProfessor = async (req, res) => {
  const { id } = req.params;

  const professorDoBanco = await prisma.professor.delete({
    where: {
      id: parseInt(id),
    },
  });

  let msg = `Professor com ID: ${id}, deletado com sucesso!`;
  console.log(msg);
  res.status(200).send(professorDoBanco);
};