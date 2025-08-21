import express from 'express';

const app = express();

const usuario_admin = {
    nome: "admin",
    email: "admin@admin"
};

let usuarios = [
    usuario_admin
];

app.get('/usuarios', (req, res) => {
    res.json(usuarios).status(200);
});

app.post('/usuarios', (req,res) => {

    const {nome, email} = req.body;

    if(!nome || !email) {
        return res.status(400).json({Mensagem: "Nome e email são obrigatórios"});
    }
    res.send(body);
});

app.listen(3000);

console.log('Servidor rodando na porta 3000');