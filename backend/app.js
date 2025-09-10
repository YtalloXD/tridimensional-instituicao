const PORT = process.env.PORT || 3000;
const HOSTNAME = "localhost";
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const authRoutes = require("./LoginCR/authRoutes");

app.use("/auth", authRoutes); 

const alunosRoutes = require("./AlunosCR/AlunosRoutes");
app.use("/alunos", alunosRoutes);

const professoresRoutes = require("./ProfessoresCR/ProfessoresRoutes");
app.use("/professores", professoresRoutes); 

const turmasRoutes = require("./TurmasCR/TurmasRoutes");
app.use("/turmas", turmasRoutes); 


app.listen(PORT, () => {
  console.log(`Server: http://${HOSTNAME}:${PORT}`);
});
