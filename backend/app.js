const PORT = process.env.PORT || 3000;
const HOSTNAME = "localhost";

const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rotas

// Rota de inicio
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server: http://${HOSTNAME}:${PORT}`);
});
