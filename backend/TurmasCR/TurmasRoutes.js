const express = require("express");
const router = express.Router();
const turmasController = require("./TurmasController");

router.get("/turmas", turmasController.listarTurmas);
router.get("/turmas/:id", turmasController.buscarTurmaPorId);
router.post("/turmas", turmasController.criarTurma);
router.put("/turmas/:id", turmasController.atualizarTurma);
router.delete("/turmas/:id", turmasController.deletarTurma);

module.exports = router;
