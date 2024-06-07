const { ModelPostagem } = require("../models/modelPostagem")
const { ModelProfessorPerfil } = require('../models/modelProfessorPerfil')
const { ModelAlunoPerfil } = require('../models/modelAlunoPerfil')
const { connSequelize } = require('../../config/conexaoBD')
const { ModelViewPostagem } = require("../models/modelViewPost")
const sequelize = require('sequelize')

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
        })

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

async function SelectRankQtdPostsProf (req, resp) { // FUNÇÃO PRA ACHAR O TOTAL DE VIEWS QUE CADA PROF TEM
    try {
        const rank = await ModelProfessorPerfil.findAll({
            include: [{
                model: ModelPostagem,
                attributes: [],
                required: true
            }],
            group:['tb_professorPerfil.id_professor'],
            order: [[sequelize.fn('COUNT', sequelize.col('id_postagem')), 'DESC']]
        })

        console.log(`
        ================================================================
        
                                INICIO

        ================================================================

        ${rank}

        ================================================================
        
                                FIM

        ================================================================
            `)

        const topTres = rank.slice(0, 3);

        // return resp.status(200).json({topTres})
        return resp.status(200).json({topTres})
    } catch (error) {
        console.error(error)
        return resp.status(500).json({ message: 'Erro interno.' })
    }
} 



module.exports= {
    Logout,
    PuxarPostagem,
    AuthEstaLogado,
    PuxarPostagemUnica,
    SelectRankQtdPostsProf,
}