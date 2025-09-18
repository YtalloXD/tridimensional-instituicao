const express = require("express");
const router = express.Router();
const turmasController = require("./TurmasController");

router.get("/", turmasController.listarTurmas);
router.get("/:id", turmasController.buscarTurmaPorId);
router.post("/", turmasController.criarTurma);
router.put("/:id", turmasController.atualizarTurma);
router.delete("/:id", turmasController.deletarTurma);
router.get('/:id/alunos', turmasController.listarAlunosPorTurma);

module.exports = router;
