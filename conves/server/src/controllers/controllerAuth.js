const { ModelPostagem } = require("../models/modelPostagem")
const { ModelProfessorPerfil } = require('../models/modelProfessorPerfil')
const { connSequelize } = require('../../config/conexaoBD')

async function Logout(req, resp) {
    resp.clearCookie('cookie_usuario')
    resp.clearCookie('cookie_tipoUsuario')
    return resp.redirect('/')
}

async function PuxarPostagem(req, resp) {
    try {
        //const AllPostagens = await ModelPostagem.findAll({raw: true});
        const AllPostagens = await ModelPostagem.findAll({
            include: {
                model: ModelProfessorPerfil,
                required: true
            },
            raw: true
        })
        console.log(AllPostagens);
        return resp.status(200).json(AllPostagens);
    } catch (error) {
        console.error(error);
        return resp.status(500).json({ message: 'Erro ao buscar postagens' });
    }
}

async function AuthEstaLogado(req, resp, next) {
    try{
         if (req.cookies.cookie_usuario) {
            next();
         } else {
            resp.redirect('/login');
         }
    } catch (error) {
        console.error(error);
        return resp.status(500).json({ message: 'Erro interno.' })
    }
}


module.exports= {
    Logout,
    PuxarPostagem,
    AuthEstaLogado
}