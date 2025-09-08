const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

exports.listarTurmas = async (req, res) => {
  const turmasDoBancoDeDados = await prisma.turma.findMany();
  console.log(turmasDoBancoDeDados);
  res.status(200).json(turmasDoBancoDeDados);
};

exports.criarTurma = async (req, res) => {
  const { nome, professor_id, ano } = req.body;

  const novaTurmaCriada = await prisma.turma.create({
    data: {
      nome: nome,
      professor_id: professor_id,
      ano: ano,
    },
  });

  let msg = `Turma ${novaTurmaCriada.id} criada com sucesso!`;
  console.log(msg);
  res.status(201).json(novaTurmaCriada);
};

exports.buscarTurmaPorId = async (req, res) => {
  const { id } = req.params;

  const turmaDoBanco = await prisma.turma.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  let msg = `Turma ID: ${id}`;
  console.log(msg);
  res.status(200).send(turmaDoBanco);
};

exports.atualizarTurma = async (req, res) => {
  const { id } = req.params;
  const { nome, professor_id, ano } = req.body;

  const turmaDoBanco = await prisma.turma.update({
    where: {
      id: parseInt(id),
    },
    data: {
      nome: nome,
      professor_id: professor_id,
      ano: ano,
    },
  });
  let msg = `Turma ID: ${id} atualizada com sucesso!`;
  console.log(msg);
  res.status(200).send(turmaDoBanco);
};

exports.deletarTurma = async (req, res) => {
  const { id } = req.params;
  const turmaDoBanco = await prisma.turma.delete({
    where: {
      id: parseInt(id),
    },
  });
  let msg = `Turma ID: ${id} deletada com sucesso!`;
  console.log(msg);
  res.status(200).send(turmaDoBanco);
};
