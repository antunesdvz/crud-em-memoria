import express from "express";

const app = express();
app.use(express.json());

let ultimoId = 0;

// criar uma rota para pegar todos os usuarios
const usuario_admin = {
    id: ultimoId,
    nome: "admin",
    email: "@email.com"
};

let usuarios = [usuario_admin];



app.listen(3000);