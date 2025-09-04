let ultimoId = 1;

export const usuarios = [
    { id: ultimoId, nome: "admin", email: "admin@gmail.com" }
];

export function todosUsuarios(req, res) {
    res.status(200).json(usuarios);
}

export function incrementarId() {
    ultimoId += 1;
    return ultimoId;
}
