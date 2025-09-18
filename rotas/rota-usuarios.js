import { Router } from "express";
import {
  listarTodosOsUsuarios,
  buscarPeloId,
  criarUsuario,
  alterarUsuario,
  deletarUsuario,
} from "../controller/usuarios-controller.js";

const roteador = Router();

roteador.get("/", listarTodosOsUsuarios);
roteador.get("/:id", buscarPeloId);
roteador.post("/", criarUsuario);
roteador.patch("/:id", alterarUsuario);
roteador.delete("/:id", deletarUsuario);

export default roteador;