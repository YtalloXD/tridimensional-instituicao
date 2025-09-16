let prisma;
try {
  const { PrismaClient } = require("./../generated/prisma");
  prisma = new PrismaClient();
} catch (error) {
  console.error("❌ Erro ao importar Prisma Client:", error.message);
  console.error("💡 Execute: npx prisma generate");
}

const bcrypt = require("bcryptjs");

const addNameToUser = (usuario) => {
  const nome =
    usuario.tipo === "ALUNO"
      ? usuario.aluno?.nome
      : usuario.professor?.nome || "Usuário";
  return { ...usuario, nome };
};

exports.register = async (req, res) => {
  const { email, senha, tipo, nome, ...profileData } = req.body;

  if (!email || !senha || !tipo || !nome) {
    return res.status(400).json({
      error: "Dados incompletos. Email, senha, tipo e nome são obrigatórios.",
    });
  }

  try {
    // Verifica se usuário já existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      return res.status(409).json({ error: "Este email já está em uso." });
    }

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    let novoUsuario;
    const dataUsuario = { email, senha: senhaHash, tipo };

    if (tipo === "ALUNO") {
      const { idade, turma_id } = profileData;

      if (!idade || !turma_id) {
        return res.status(400).json({
          error: "Para alunos, idade e turma_id são obrigatórios.",
        });
      }

      // Verifica se turma existe
      const turmaExiste = await prisma.turma.findUnique({
        where: { id: Number(turma_id) },
      });

      if (!turmaExiste) {
        return res.status(400).json({ error: "Turma não encontrada." });
      }

      novoUsuario = await prisma.usuario.create({
        data: {
          ...dataUsuario,
          aluno: {
            create: { nome, idade: Number(idade), turma_id: Number(turma_id) },
          },
        },
        include: {
          aluno: { include: { turma: true } },
        },
      });
    } else if (tipo === "PROFESSOR") {
      const { especialidade } = profileData;

      if (!especialidade) {
        return res.status(400).json({
          error: "Para professores, especialidade é obrigatória.",
        });
      }

      novoUsuario = await prisma.usuario.create({
        data: {
          ...dataUsuario,
          professor: {
            create: { nome, especialidade },
          },
        },
        include: { professor: true },
      });
    } else {
      return res.status(400).json({
        error: "O 'tipo' de usuário deve ser ALUNO ou PROFESSOR.",
      });
    }

    delete novoUsuario.senha;
    const usuarioComNome = addNameToUser(novoUsuario);

    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      usuario: usuarioComNome,
    });
  } catch (error) {
    console.error("Erro no registro:", error);

    if (error.code === "P2002") {
      return res.status(409).json({ error: "Este email já está em uso." });
    }
    if (error.code === "P2003") {
      return res
        .status(400)
        .json({ error: "Referência inválida - verifique o ID da turma." });
    }

    res.status(500).json({
      error: "Erro interno ao registrar usuário.",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios." });
  }

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
      include: {
        aluno: { include: { turma: true } },
        professor: true,
      },
    });

    if (!usuario) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    delete usuario.senha;
    const usuarioComNome = addNameToUser(usuario);

    res.status(200).json({
      message: "Login bem-sucedido!",
      usuario: usuarioComNome,
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({
      error: "Erro interno ao fazer login.",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
