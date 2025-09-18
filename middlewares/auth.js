export function verifyUser(req, res, next) {
    console.log("Passei no middleware")

    const auth = req.headers.authorization;
    console.log(auth);  

    //verificar o tipo do token
    //verificar que ser basic
    if (!auth.startsWith('Basic')) {
        return res.status(401).json({mensagem: "Token precisa ser basic"});
    }
    //pegar conteudo encriptado

    const conteudo_do_token = auth.split(' ')
    console.log(conteudo_do_token);

    //desemcriptar o conteudo 

    //tendo usuario e senha
    //preciso verificar se o usuario existe no banco

    //se nao existir, nao pode acessar
}