const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

exports.listarAlunos = async (req, res) => {
  try {
    const alunosBancoDados = await prisma.aluno.findMany({
      include: {
        usuario: true,
        turma: true
      }
    });
    console.log(alunosBancoDados);
    res.status(200).json(alunosBancoDados);
  } catch (error) {
    console.error("Erro ao listar alunos:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

exports.criarAluno = async (req, res) => {
  try {
    const { nome, idade, email, turma_id } = req.body;
    
    if (!nome || !idade || !turma_id) {
      return res.status(400).json({ 
        error: "Nome, idade e turma_id são obrigatórios" 
      });
    }

    const emailUsuario = email || `${nome.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}@temp.com`;

    const novoAluno = await prisma.aluno.create({
      data: {
        nome: nome,
        idade: parseInt(idade),
        turma_id: parseInt(turma_id),
        usuario: {
          create: {
            email: emailUsuario,
            senha: "123456",
            tipo: "ALUNO"
          }
        }
      },
      include: {
        usuario: true,
        turma: true
      }
    });

    let msg = `Aluno ${nome} foi criado com sucesso`;
    console.log(msg);
    res.status(201).json(novoAluno);
  } catch (error) {
    console.error("Erro ao criar aluno:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

exports.buscarAlunoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const alunoDoBanco = await prisma.aluno.findFirst({
      where: {
        id: parseInt(id),
      },
      include: {
        usuario: true,
        turma: true
      }
    });
    
    if (!alunoDoBanco) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }

    let msg = `Aluno ID: ${id}, foi achado com sucesso!`;
    console.log(msg);
    res.status(200).send(alunoDoBanco);
  } catch (error) {
    console.error("Erro ao buscar aluno:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

exports.atualizarAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, idade, email } = req.body;
    
    const alunoAtualizado = await prisma.aluno.update({
      where: {
        id: parseInt(id),
      },
      data: {
        nome: nome,
        idade: parseInt(idade),
        ...(email && { email: email })
      },
      include: {
        usuario: true,
        turma: true
      }
    });
    
    let msg = `Aluno com ID: ${id}, atualizado com sucesso!`;
    console.log(msg);
    res.status(200).send(alunoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar aluno:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

exports.deletarAluno = async (req, res) => {
  try {
    const { id } = req.params;
    
    const alunoDeletado = await prisma.aluno.delete({
      where: {
        id: parseInt(id),
      },
    });
    
    let msg = `O aluno ${alunoDeletado.nome}, foi deletado com sucesso`;
    console.log(msg);
    res.status(200).json(alunoDeletado);
  } catch (error) {
    console.error("Erro ao deletar aluno:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

