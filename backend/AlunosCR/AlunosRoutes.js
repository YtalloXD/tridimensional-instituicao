const express = require("express");
const router = express.Router();
const alunosController = require("./AlunosController");

router.get("/", alunosController.listarAlunos);
router.get("/:id", alunosController.buscarAlunoPorId);
router.post("/", alunosController.criarAluno);
router.put("/:id", alunosController.atualizarAluno);
router.delete("/:id", alunosController.deletarAluno);

module.exports = router;
