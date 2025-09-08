const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// Listar professores METHOD GET
exports.listarProfessores = async (req, res) => {
  const professoresDoBancoDeDados = await prisma.professor.findMany();
  console.log(professoresDoBancoDeDados);
  res.status(200).json(professoresDoBancoDeDados);
};

// Criar professor METHOD POST
exports.criarProfessor = async (req, res) => {
  const { nome, email, especialidade } = req.body;
  const novoProfessorCriado = await prisma.professor.create({
    data: {
      nome: nome,
      email: email,
      especialidade: especialidade,
    },
  });

  let msg = `Professor ${novoProfessorCriado.id} criado com sucesso!`;
  console.log(msg);
  res.status(201).json(novoProfessorCriado);
};

// Buscar professor por ID METHOD GET-ID
exports.buscarProfessorPorId = async (req, res) => {
  const { id } = req.params;

  const professorDoBanco = await prisma.professor.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  let msg = `Professor ID: ${id}`;
  console.log(msg);
  res.status(200).send(alunoDoBanco);
};

// Atualizar professor METHOD PUT-ID
exports.atualizarProfessor = async (req, res) => {
  const { id } = req.params;
  const { nome, email, especialidade } = req.body;

  const professorDoBanco = await prisma.professor.update({
    where: {
      id: parseInt(id),
    },
    data: {
      nome: nome,
      email: email,
      especialidade: especialidade,
    },
  });

  let msg = `Professor com ID: ${id}, atualizado com sucesso!`;
  console.log(msg);
  res.status(200).send(professorDoBanco);
};

// Deletar professor por ID METHOD DELETE-ID
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
