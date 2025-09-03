import express from "express";
import {imprime} from "./middleware.js"

const app = express();
app.use(express.json());
app.use(imprime);

let ultimoId = 0;

// criar uma rota para pegar todos os usuarios
const usuario_admin = {
    id: ultimoId,
    nome: "admin",
    email: "@email.com"
};

let usuarios = [usuario_admin];

app.get("/usuarios", (req, res) => {
    res.status(200).json(usuarios);
});

app.listen(3000);
console.log("Servidor rodando na porta 3000");