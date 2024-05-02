const { ModelPostagem } = require("../models/modelPostagem")

async function Logout(req, resp) {
    resp.clearCookie('cookie_usuario')
    return resp.redirect('/')
}

async function PuxarPostagem(req, resp) {
    try {
        const AllPostagens = await ModelPostagem.findAll({raw: true});
        console.log(AllPostagens);
        return resp.status(200).json(AllPostagens);
    } catch (error) {
        console.error(error);
        return resp.status(500).json({ message: 'Erro ao buscar postagens' });
    }
}


module.exports= {
    Logout,
    PuxarPostagem
}