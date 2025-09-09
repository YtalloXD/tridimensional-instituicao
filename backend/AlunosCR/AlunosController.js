const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

exports.listarAlunos = async (req, res) => {
  const alunosBancoDados = await prisma.aluno.findMany();
  console.log(alunosBancoDados);
  res.status(200).json(alunosBancoDados);
};

exports.criarAluno = async (req, res) => {
  const { nome, idade, email, turma_id } = req.body;

  const novoAluno = await prisma.aluno.create({
    data: {
      nome: nome,
      idade: idade,
      email: email,
      turma_id: turma_id,
    },
  });

  let msg = `Aluno ${nome} foi criado com sucesso`;
  console.log(msg);
  res.status(201).json(novoAluno);
};

exports.buscarAlunoPorId = async (req, res) => {
  const { id } = req.params;

  const alunoDoBanco = await prisma.aluno.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  let msg = `Aluno ID: ${id}, foi achado com sucesso!`;
  console.log(msg);
  res.status(200).send(alunoDoBanco);
};

exports.atualizarAluno = async (req, res) => {
  const { id } = req.params;
  const { nome, idade, email } = req.body;

  const alunoAtualizado = await prisma.aluno.update({
    where: {
      id: parseInt(id),
    },
    data: {
      nome: nome,
      idade: idade,
      email: email,
    },
  });

  let msg = `Aluno com ID: ${id}, atualizado com sucesso!`;
  console.log(msg);
  res.status(200).send(alunoAtualizado);
};

exports.deletarAluno = async (req, res) => {
  const { id } = req.params;

  const alunoDeletado = await prisma.aluno.delete({
    where: {
      id: parseInt(id),
    },
  });

  let msg = `O aluno ${alunoDeletado}, foi deletado com sucesso`;
  console.log(msg);
  res.status(200).json(alunoDeletado);
};
