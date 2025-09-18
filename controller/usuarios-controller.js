import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listarTodosOsUsuarios(req, res) {
  try {
    const usuarios = await prisma.users.findMany();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao listar usuários" });
  }
}

export async function buscarPeloId(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ mensagem: "ID inválido" });
  }

  try {
    const usuario = await prisma.users.findUnique({ where: { id } });

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao buscar usuário" });
  }
}

export async function criarUsuario(req, res) {
  const { nome, email, idade } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ mensagem: "Nome e email são obrigatórios" });
  }

  try {
    const novoUsuario = await prisma.users.create({
      data: {
        nome,
        email,
        idade: idade ?? null, // idade opcional
      },
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao criar usuário" });
  }
}

export async function alterarUsuario(req, res) {
  const id = parseInt(req.params.id);
  const { nome, email, idade } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ mensagem: "ID inválido" });
  }

  try {
    const usuarioAtualizado = await prisma.users.update({
      where: { id },
      data: {
        ...(nome && { nome }),
        ...(email && { email }),
        ...(idade !== undefined && { idade }),
      },
    });

    res.status(200).json(usuarioAtualizado);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao atualizar usuário" });
  }
}

export async function deletarUsuario(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ mensagem: "ID inválido" });
  }

  try {
    await prisma.users.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao deletar usuário" });
  }
}
