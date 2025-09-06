const express = require('express');
const router = express.router();
const alunosController = require('/alunosController');

router.get('/alunos', alunosController.listarAlunos);
router.post('/alunos', alunosController.criarAlunos);
router.put('/alunos/:id', alunosController.atualizarAlunos);
router.delete('/alunos/:id', alunosController.deletarAlunos);

module.exports = router;
