import express from "express";
import rotaUsuario from "./rotas/rota-usuarios.js";

const app = express();

app.use(express.json()); // Middleware para interpretar JSON
app.use("/usuarios", rotaUsuario);

app.listen(3000, () => {
    console.log("API rodando na porta 3000");
});
