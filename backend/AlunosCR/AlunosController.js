const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// Listar alunos METHOD GET
exports.listarAlunos = async (req, res) => {
  const alunosDoBancoDeDados = await prisma.aluno.findMany();
  console.log(alunosDoBancoDeDados);
  res.status(200).json(alunosDoBancoDeDados);
};

// Criar aluno METHOD POST
exports.criarAluno = async (req, res) => {
  const { nome, email, idade, turma_id } = req.body;

  const novoAlunoCriado = await prisma.aluno.create({
    data: {
      nome: nome,
      email: email,
      idade: idade,
      turma_id: turma_id,
    },
  });
  let msg = `Cadastro de ${novoAlunoCriado.nome} ID: ${novoAlunoCriado.id} criado com sucesso!`;
  console.log(msg);
  res.status(201).json(novoAlunoCriado);
};

// Buscar aluno por ID METHOD GET-ID
exports.buscarAlunoPorId = async (req, res) => {
  const { id } = req.params;

  const alunoDoBanco = await prisma.aluno.findFirst({
    where: {
      id: parseInt(id),
    },
  });
  let msg = `Encontrado aluno com o ID: ${id}, nome: ${alunoDoBanco.nome}`;
  console.log(msg);
  res.status(200).send(alunoDoBanco);
};

// Atualizar aluno METHOD PUT-ID
exports.atualizarAluno = async (req, res) => {
  const { id } = req.params;
  const { nome, email, idade, turma_id } = req.body;

  const alunoDoBanco = await prisma.aluno.update({
    where: {
      id: parseInt(id),
    },
    data: {
      nome: nome,
      email: email,
      idade: idade,
      turma_id: turma_id,
    },
  });
  let msg = `Aluno ID: ${id} atualizado com sucesso!`;
  console.log(msg);
  res.status(200).send(alunoDoBanco);
};

// Deletar aluno por ID METHOD DELETE-ID
exports.deletarAluno = async (req, res) => {
  const { id } = req.params;

  const alunoDoBanco = await prisma.aluno.delete({
    where: {
      id: parseInt(id),
    },
  });
  let msg = `Estudante: ${alunoDoBanco.nome} com ID: ${id} foi deletado com sucesso!`;
  console.log(msg);
  res.status(200).send(alunoDoBanco);
};
