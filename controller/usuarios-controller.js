import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


let ultimoId = 1;

const usuario_admin = {
  id: ultimoId,
  nome: "admin",
  email: "admin@admin",
};

let usuarios = [usuario_admin];
//async diz que a funcao eh assincrona e pode demorar um pouco
async function listarTodosOsUsuarios(req, res) {
  console.log("CHEGUEI NO CONTROLLER");
  
  let usuarios_do_banco = [];

  try {
    usuarios_do_banco = await prisma.users.findMany();
  } catch (error) {
    console.log(error);
  }

  res.status(200).json(usuarios);
}

async function criarUsuario(req, res) {
  const { nome, email } = req.body;
      if ( !nome || !email) {
        return res.status(400).json({mensagem: "error"});
      }
      res.status(201).json({mensagem: "usuario criado com sucesso"});
};

async function deletarUsuario(req, res) {
  const id = parseInt (req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({mensagem: "ID invalido, precisa ser um numero"});
  }

  try { 
    await prisma.users.delete({where: {id: id}});
  } catch (error) {
    console.log(error.message);
  }

  res.status(204).send();
}

async function alterarUsuario(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res
      .status(400)
      .json({ mensagem: "ID inválido, precisa ser um numero" });
  }


  const { nome , email, idade } = req.body;

  try {
    await prisma.users.update({
    where: {id: id}, 
    data: {
     nome: nome,
     email: email,
    },
  });
  } catch (error) {
    console.log(error.message);
  }
  
  res.status(204).send();
}

async function buscarPeloId(req, res) {
    const id = parseInt(req.params.id);
    try {
    const usuario = await prisma.users.findUnique({where: { id: id}});
    } catch (error) {
      console.log(error.message);
    }

    res.status(200).json(usuario);
}

export {
  listarTodosOsUsuarios,
  criarUsuario,
  deletarUsuario,
  alterarUsuario,
  buscarPeloId,
};

//npx prisma migrate dev aplica as mudanças no banco de dados
//npx prisma studio abre o banco de dados em uma interface grafica