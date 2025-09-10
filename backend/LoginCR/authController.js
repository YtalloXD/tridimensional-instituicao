
let prisma;
try {
  console.log("🔍 Tentando importar Prisma Client...");
  const { PrismaClient } = require("./../generated/prisma");
  prisma = new PrismaClient({
    log: ['query', 'error', 'warn'],
  });
  console.log("✅ Prisma Client importado com sucesso!");
} catch (error) {
  console.error("❌ Erro ao importar Prisma Client:", error.message);
  console.error("💡 Execute: npx prisma generate");
}

const bcrypt = require('bcryptjs');


exports.register = async (req, res) => {
  console.log("Dados recebidos:", JSON.stringify(req.body, null, 2));

 

  const { email, senha, tipo, nome, ...profileData } = req.body;

  if (!email || !senha || !tipo || !nome) {
    console.log("❌ Validação falhou - dados incompletos");
    return res.status(400).json({ error: "Dados incompletos. Email, senha, tipo e nome são obrigatórios." });
  }

  console.log(`📧 Email: ${email}, 👤 Nome: ${nome}, 🏷️ Tipo: ${tipo}`);

  try {
    // 1. Verifica se o usuário já existe
    console.log("🔍 Verificando se usuário já existe...");
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email: email },
    });

    if (usuarioExistente) {
      console.log("❌ Usuário já existe com este email");
      return res.status(409).json({ error: "Este email já está em uso." });
    }

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    // 3. Cria o usuário e o perfil correspondente
    let novoUsuario;
    const dataUsuario = {
        email,
        senha: senhaHash,
        tipo,
    };

    console.log({ ...dataUsuario, senha: "[OCULTA]" });

    if (tipo === 'ALUNO') {
      const { idade, turma_id } = profileData;
      console.log(`👨‍🎓 Criando ALUNO - Idade: ${idade}, Turma ID: ${turma_id}`);
      
      if (!idade || !turma_id) {
          console.log("❌ Validação falhou para ALUNO - faltam idade ou turma_id");
          return res.status(400).json({ error: 'Para alunos, idade e turma_id são obrigatórios.' });
      }

      try {
        console.log("🔍 Verificando se turma existe...");
        const turmaExiste = await prisma.turma.findUnique({
          where: { id: Number(turma_id) }
        });
        
        if (!turmaExiste) {
          console.log(`❌ Turma com ID ${turma_id} não encontrada`);
          return res.status(400).json({ error: 'Turma não encontrada.' });
        }
        console.log("✅ Turma encontrada:", turmaExiste.nome);
      } catch (turmaError) {
        console.error("❌ Erro ao verificar turma:", turmaError.message);
        console.log("⚠️ Pulando verificação de turma devido ao erro");
      }

      novoUsuario = await prisma.usuario.create({
          data: {
              ...dataUsuario,
              aluno: {
                  create: { nome, idade: Number(idade), turma_id: Number(turma_id) },
              },
          },
          include: { 
            aluno: {
              include: { turma: true }
            } 
          },
      });
    } else if (tipo === 'PROFESSOR') {
      const { especialidade } = profileData;
      console.log(`👨‍🏫 Criando PROFESSOR - Especialidade: ${especialidade}`);
      
       if (!especialidade) {
          console.log("❌ Validação falhou para PROFESSOR - falta especialidade");
          return res.status(400).json({ error: 'Para professores, especialidade é obrigatória.' });
      }
      
      console.log("💾 Criando usuário PROFESSOR no banco...");
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
      console.log("❌ Tipo de usuário inválido:", tipo);
      return res.status(400).json({ error: "O 'tipo' de usuário deve ser ALUNO ou PROFESSOR." });
    }

    delete novoUsuario.senha;

    let msg = `Usuário ${nome} do tipo ${tipo} foi criado com sucesso`;
    console.log("🎉", msg);
    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      usuario: novoUsuario
    });

  } catch (error) {
    console.error("💥 ERRO DETALHADO:", error);
    console.error("📋 Stack trace:", error.stack);
    
    if (error.code === 'P2002') {
      console.log("🔍 Erro P2002 - Constraint único violado");
      return res.status(409).json({ error: "Este email já está em uso." });
    }
    if (error.code === 'P2003') {
      console.log("🔍 Erro P2003 - Referência inválida");
      return res.status(400).json({ error: "Referência inválida - verifique o ID da turma." });
    }
    if (error.code === 'P2025') {
      console.log("🔍 Erro P2025 - Registro não encontrado");
      return res.status(400).json({ error: "Registro relacionado não encontrado." });
    }
    
    res.status(500).json({ 
      error: "Ocorreu um erro interno ao tentar registrar o usuário.",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


exports.login = async (req, res) => {
    console.log("🔐 Iniciando processo de login...");
    const { email, senha } = req.body;

    if (!email || !senha) {
        console.log("❌ Validação falhou - email ou senha em branco");
        return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }

    console.log(`🔍 Tentando fazer login com email: ${email}`);

    try {
        const isConnected = await testDatabaseConnection();
        if (!isConnected) {
          return res.status(500).json({ error: "Erro de conexão com o banco de dados" });
        }

        console.log("🔍 Buscando usuário no banco...");
        const usuario = await prisma.usuario.findUnique({
            where: { email: email },
            include: {
              aluno: {
                include: { turma: true }
              },
              professor: true
            }
        });

        if (!usuario) {
            console.log("❌ Usuário não encontrado");
            return res.status(401).json({ error: "Credenciais inválidas." });
        }

        console.log("✅ Usuário encontrado:", usuario.email, "Tipo:", usuario.tipo);

        console.log("🔒 Verificando senha...");
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            console.log("❌ Senha incorreta");
            return res.status(401).json({ error: "Credenciais inválidas." });
        }

        console.log("✅ Senha correta!");

        let msg = `Usuário ${usuario.email} logado com sucesso!`;
        console.log("🎉", msg);

        delete usuario.senha;

        res.status(200).json({ 
            message: "Login bem-sucedido!",
            usuario: usuario
        });

    } catch (error) {
        console.error("💥 ERRO no login:", error);
        console.error("📋 Stack trace:", error.stack);
        res.status(500).json({ 
          error: "Ocorreu um erro interno ao tentar fazer login.",
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

process.on('beforeExit', async () => {
  console.log("🔌 Desconectando Prisma Client...");
  await prisma.$disconnect();
});