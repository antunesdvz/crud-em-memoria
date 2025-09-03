import express from "express";
import Router from "express";

//criou uma instancia
const roteador = Router();

//agr eu vou passsar as rotas pra ele

roteador.get("/usuarios", (req, res) => {
    res.status(200).json(usuarios);
});

roteador.post("/usuarios", (req, res) => {
    const dados = req.body

    const { nome, email } = dados;

    if (!nome || !email) {
        return res.status(400).json({ Mensagem: "Nome e email são obrigatórios" });
    }

    ultimoId += 1;
    const novoUsuario = { id: ultimoId, nome, email };
    usuarios.push(novoUsuario);

    res.status(201).json(novoUsuario.id);
});

roteador.delete('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const idNumerico = parseInt(id);

    //se n for um numero vai retornar essa msg
    if(isNaN(idNumerico)) {
        return  res.status(400).json({mensagem: "ID invalido"})
    }

    //esse treecho tá perguntando se achou alguém com o id requerido na url no postman
    let posicao_do_usuario = usuarios.findIndex(
        (usuario) => usuario.id === idNumerico
    );


    if (posicao_do_usuario === -1){
        return  res.status(404).json({mensagem:"Usuario não existe"});
    }

    //vai pegar o array 'posicao_do_usuario e deleta-lo
    //o 1 tá falando quanto é pra apagar se fosse 2 apagaria o escolhido e o proximo
    usuarios.splice(posicao_do_usuario, 1); 
    res.status(204).send();

});

roteador.patch('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);

    //transformar o id de string pra numero
    //se o id for invalido, retornar 400
    if(isNaN(id)) {
        return res.status(400).json({ menagem: "ID inválido, prescisa ser um numero"});
    }

    //procurar o usuario dentro do array =>find
    //se nao encontrar, 404
    const usuario = usuarios.find((usuario) => usuario.id === id);
    if(!usuario) {
        return res.status(404).json({mensagem: "usuario não encontrado"});
    }

    //precisa dos dados para atualizar (nome ou email)
    //pegar os dados do body (igual o create)
    //ss nao tiver nenhum dos dados que precisamos, retornar 400
    const  { nome, email } = req.body;

    if(!nome && !email) {
        return res.status(400).json({mensagem: "manda pelo menos um dos dados"});        
    }


    //caso tenha email, verificar se ja nao existe outro suario com esse email -> some
    //caso exista, retorna r409 - conflito
    if(email){
        //preciso ver se esse email já existe paraa algum usuario no sistema
        let email_existe = usuarios.findIndex((usuario) => usuario.email === email);

        if(email_existe !== -1) {
            return res.status(409).json({mensagem: "Email já cadastrado"});
        }
        usuario.email = email;
    }
    if (nome) {
        usuario.nome = nome;
    }

    res.status(200).json(usuario)
});


export default roteador;