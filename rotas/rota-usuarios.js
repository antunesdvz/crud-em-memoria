import Router from "express";
import {
  listarTodosOsUsuarios,
  criarUsuario,
  deletarUsuario,
  alterarUsuario,
  buscarPeloId,
} from "../controller/usuarios-controller.js";

const roteador = Router();

//agora eu vou passar as rotas pra ele
roteador.get("/", (req, res) => {
  console.log(req.headers);
  listarTodosOsUsuarios(req, res);
});

roteador.post("/", (req, res) => {
  console.log(req.headers);
  criarUsuario(req, res);
});

roteador.delete("/:id", (req, res) => {
  deletarUsuario(req, res);
});

roteador.patch("/:id", (req, res) => {
  alterarUsuario(req, res);
});

roteador.get("/:id", (req, res) => {
  buscarPeloId(req, res);
});

export default roteador;