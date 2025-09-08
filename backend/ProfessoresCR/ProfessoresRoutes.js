const express = require("express");
const router = express.Router();
const professoresController = require("./ProfessoresController");

router.get("/professores", professoresController.listarProfessores);
router.get("/professores/:id", professoresController.buscarProfessorPorId);
router.post("/professores", professoresController.criarProfessor);
router.put("/professores/:id", professoresController.atualizarProfessor);
router.delete("/professores/:id", professoresController.deletarProfessor);

module.exports = router;
