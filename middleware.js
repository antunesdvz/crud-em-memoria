export function imprime(req, res, next){
    let qt = 1;
    console.log(`Passei por aqui: ${qt}`);
    qt++;
    next();
}