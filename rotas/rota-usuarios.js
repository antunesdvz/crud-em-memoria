import express from "express";
import { usuarios, incrementarId, todosUsuarios } from "../controller/usuarios-controller.js";

const roteador = express.Router();

// 🟢 GET /usuarios — lista todos os usuários
roteador.get("/", todosUsuarios);

// 🟡 POST /usuarios — cria um novo usuário
roteador.post("/", (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ mensagem: "Nome e email são obrigatórios" });
    }

    const novoId = incrementarId();
    const novoUsuario = { id: novoId, nome, email };
    usuarios.push(novoUsuario);

    res.status(201).json(novoUsuario);
});

// 🔴 DELETE /usuarios/:id — remove um usuário pelo ID
roteador.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ mensagem: "ID inválido" });
    }

    const index = usuarios.findIndex((usuario) => usuario.id === id);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    usuarios.splice(index, 1);
    res.status(204).send();
});

// 🟣 PATCH /usuarios/:id — atualiza nome ou email de um usuário
roteador.patch("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ mensagem: "ID inválido, precisa ser um número" });
    }

    const usuario = usuarios.find((u) => u.id === id);

    if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    const { nome, email } = req.body;

    if (!nome && !email) {
        return res.status(400).json({ mensagem: "Envie pelo menos um dos dados para atualizar" });
    }

    if (email) {
        const emailExiste = usuarios.some((u) => u.email === email && u.id !== id);
        if (emailExiste) {
            return res.status(409).json({ mensagem: "Email já cadastrado" });
        }
        usuario.email = email;
    }

    if (nome) {
        usuario.nome = nome;
    }

    res.status(200).json(usuario);
});

export default roteador;
