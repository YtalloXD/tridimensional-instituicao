const express = require("express");
const router = express.Router();
const professoresController = require("./ProfessoresController");

router.get("/", professoresController.listarProfessores);
router.get("/:id", professoresController.buscarProfessorPorId);
router.post("/", professoresController.criarProfessor);
router.put("/:id", professoresController.atualizarProfessor);
router.delete("/:id", professoresController.deletarProfessor);

module.exports = router;
