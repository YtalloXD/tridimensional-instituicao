const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();


exports.listarAlunos = async (req, res) => {
    const alunosBancoDados = await prisma.aluno.findMany();
    console.log(alunosBancoDados);
    res.status(200).json(alunosBancoDados);
};

exports.criarAlunos = async (req, res) => {
    const {nome, idade, email} = req.body;
    
    const novoAluno = await prisma.aluno.create({
        data: {
            nome: nome,
            idade: idade,
            email: email
        }
    });

    let msg = 'O aluno ${nome} foi criado com sucesso'; 
    console.log(msg)
    res.status(201).json(novoAluno);
};

exports.atualizarAluno = async (req, res) => {
    const {id} = req.params;
    const {nome, idade, email} = req.body;

    const alunoAtualizado = await prisma.aluno.update ({
        where:{
            id: parseInt(id)
        },
        data:{
            nome:nome,
            idade: idade,
            email: email
        }
    });

    msg = 'Aluno com id ${id} atualizado com sucesso'
    console.log(msg);
    res.status(200).send(alunoAtualizado);
};

exports.deletarAluno = async (req, res) => {
    const {id} = req.params;

    const alunoDeletado = await prisma.aluno.delete({
        where:{
            id: parseInt(id)
        }
    });

    let msg = 'O aluno ${nome} foi deletado com sucesso'; 
    console.log(msg)
    res.status(200).json(alunoDeletado);
};