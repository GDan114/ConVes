const { ModelPostagem } = require("../models/modelPostagem")
const { ModelProfessorPerfil } = require('../models/modelProfessorPerfil')
const { connSequelize } = require('../../config/conexaoBD')

async function Logout(req, resp) {
    resp.clearCookie('cookie_usuario')
    resp.clearCookie('cookie_tipoUsuario')
    return resp.redirect('/')
}

async function PuxarPostagem(req, resp) { // Puxa todas as postagens
    try {
        //const AllPostagens = await ModelPostagem.findAll({raw: true});
        const AllPostagens = await ModelPostagem.findAll({
            include: {
                model: ModelProfessorPerfil,
                required: true
            }
        })
        console.log(AllPostagens);
        return resp.status(200).json(AllPostagens)
    } catch (error) {
        console.error(error);
        return resp.status(500).json({ message: 'Erro ao buscar postagens' });
    }
}

// async function PuxarPostagemUnica(req, resp) { // Puxa uma única postagem pelo id dela
//     try {
//         const idPost = req.params.id

//         if (!idPost) {
//             return res.status(400).json({ message: 'ID da postagem não fornecido' });
//         }

//         const Postagem = await ModelPostagem.findOne({
//             where:{ id_postagem: idPost },
//             include: {
//                 model: ModelProfessorPerfil,
//                 required: true
//             }
//         })
//         console.log(Postagem)
//         return resp.status(200).json(Postagem)
//     } catch (error) {
//         console.error(error)
//         return resp.status(500).json({ message: 'Erro ao buscar postagens' })
//     }
// }
async function PuxarPostagemUnica(req, res) { // Puxa uma única postagem pelo id dela
    try {
        const idPost = req.params.id;

        if (!idPost) {
            return res.status(400).json({ message: 'ID da postagem não fornecido' });
        }

        const Postagem = await ModelPostagem.findOne({
            where: { id_postagem: idPost },
            include: {
                model: ModelProfessorPerfil,
                required: true
            }
        });

        if (!Postagem) {
            return res.status(404).json({ message: 'Postagem não encontrada' });
        }

        console.log(Postagem);
        return res.status(200).json(Postagem);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar postagens' });
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
    AuthEstaLogado,
    PuxarPostagemUnica
}