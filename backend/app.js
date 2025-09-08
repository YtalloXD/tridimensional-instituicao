const PORT = process.env.PORT || 3000;
const HOSTNAME = "localhost";
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rota de inicio
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Rotas
const alunosRoutes = require("./AlunosCR/AlunosRoutes");
app.use(alunosRoutes);

const professoresRoutes = require("./ProfessoresCR/ProfessoresRoutes");
app.use(professoresRoutes);

const turmasRoutes = require("./TurmasCR/TurmasRoutes");
app.use(turmasRoutes);

app.listen(PORT, () => {
  console.log(`Server: http://${HOSTNAME}:${PORT}`);
});
