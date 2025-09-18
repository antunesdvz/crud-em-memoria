import express from "express";
import rotaUsuarios from "./rotas/rota-usuarios.js";
import { verifyUser } from "./middlewares/auth.js";

const app = express();
app.use(express.json());

app.use(verifyUser);

app.use("/usuarios", rotaUsuarios);

app.listen(3000);