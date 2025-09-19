export function verifyUser(req, res, next) {
    console.log("Passei no middleware")

    const headers =req.headers;
    console.log(headers);


    const auth = req.headers.authorization;
    console.log(auth);  

    //verificar o tipo do token
    //verificar que ser basic
    if (!auth.startsWith('Basic')) {
        return res.status(401).json({mensagem: "Token precisa ser basic"});
    }
    //pegar conteudo encriptado

    const conteudo_do_token = auth.split(' ')[1];
    console.log(conteudo_do_token);

    //desemcriptar o conteudo 
    const token_descriptografado = Buffer .from(
        conteudo_do_token,
        'base64' //tipo de encriptacao
    ).toString('utf-8');

    console.log(token_descriptografado);

    //tendo usuario e senha

    const usuario = token_descriptografado.split(':')[0];


    //preciso verificar se o usuario existe no banco
    //chamem o findUnique do prisma, passansdo o nome

    //const usuario = await prisma.users.findUnique({where: { id: id}});

    //se nao existir, nao pode acessar
}