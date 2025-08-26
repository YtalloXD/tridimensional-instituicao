const express = require("express");
const router = express.Router();
const PedidosController = require("./PedidosController");

router.get("/pedidos", PedidosController.listarPedidos);
router.get("/pedidos/:id", PedidosController.buscarPedido);
router.post("/pedidos", PedidosController.criarPedido);
router.put("/pedidos/:id", PedidosController.atualizarPedido);
router.delete("/pedidos/:id", PedidosController.deletarPedido);

module.exports = router;
