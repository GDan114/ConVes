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

// async function SelectRankQtdPostsProf (req, resp) { // FUNÇÃO PRA ACHAR O TOTAL DE VIEWS QUE CADA PROF TEM
//     try {
//         const rank = await ModelProfessorPerfil.findAll({
//             include: [{
//                 model: ModelPostagem,
//                 attributes: [],
//                 required: true
//             }],
//             group:['tb_professorPerfil.id_professor'],
//             order: [[sequelize.fn('COUNT', sequelize.col('id_postagem')), 'DESC']]
//         })

//         console.log(`
//         ================================================================
        
//                                 INICIO

//         ================================================================

//         ${rank}

//         ================================================================
        
//                                 FIM

//         ================================================================
//             `)

//         const topTres = rank.slice(0, 3);

//         // return resp.status(200).json({topTres})
//         return resp.status(200).json({topTres})
//     } catch (error) {
//         console.error(error)
//         return resp.status(500).json({ message: 'Erro interno.' })
//     }
// } 

async function SelectRankViews(req, resp) {
    try {
        const Rank = ModelViewPostagem.findAll({
            attributes: [ 
                [sequelize.fn('count', sequelize.col('tb_viewPost.id_viewPost')), 'Total'],
                [sequelize.col('tb_postagem.tb_professorPerfil.id_professor'), 'id_professor']
                // 'tb_postagem.tb_professorPerfil.id_professor'
            ],
            include: [{
                model: ModelPostagem,
                attributes: [],
                required: true,
                include: [{
                    model: ModelProfessorPerfil,
                    required: true,
                    attributes: []
                }]
            }],
            where: {
                en_visto: 'S'
            },
            group: ['id_professor'],
            order: [[sequelize.literal('Total'), 'DESC']]
        }). then(async results => {
        
            let idTopUm = null, idTopDois = null, idTopTres = null;
            let qtdViewsTopUm = null, qtdViewsTopDois = null, qtdViewsTopTres = null;
            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                if (i == 0) {
                    idTopUm = result.dataValues['id_professor']
                    qtdViewsTopUm = result.get('Total')
                }
                if (i == 1) {
                    idTopDois = result.dataValues['id_professor']
                    qtdViewsTopDois = result.get('Total')
                }
                if (i == 2) {
                    idTopTres = result.dataValues['id_professor']
                    qtdViewsTopTres = result.get('Total')
                }

                console.log(results[i])
                
                const idProfessor = result.dataValues['id_professor']
                const totalViews = result.get('Total')

                console.log(`
                    ============================================================
                    ID Professor: ${idProfessor}
                    Total Views: ${totalViews}
                    ============================================================
                  `);
            }
            const RankData = {
                idTopUm,
                idTopDois,
                idTopTres,
                qtdViewsTopUm,
                qtdViewsTopDois,
                qtdViewsTopTres
            }
            
            return resp.status(200).json(RankData)
        })
        
    } catch(error) {
        console.error(error)
        return resp.status(500).json({ message: 'Erro ao buscar postagens' })
    }
}

async function PuxarPostagensProf(req, resp) { // Puxa todas as postagens
    try {
        const idProf = req.params.idProf;

        const AllPostagens = await ModelPostagem.findAll({
            include: {
                model: ModelProfessorPerfil,
                required: true
            },
            where: {
                fk_professorAutor: idProf
            }
        })
        console.log(AllPostagens);
        return resp.status(200).json(AllPostagens)
    } catch (error) {
        console.error(error);
        return resp.status(500).json({ message: 'Erro ao buscar postagens' });
    }
}

async function PuxarNumViewsPost(req, resp) {
    try {
        const idPost = req.params.idPost

        const { count, rows } = await ModelViewPostagem.findAndCountAll({
            include: {
                model: ModelPostagem,
                required: true,
                where: {
                    id_postagem: idPost
                }
            }
        })
        console.log(`
         ====================================
                    ID PARAM ${idPost}
                   QTD: ${count}   
                   a: ${rows}
        ====================================
            `)

        return resp.status(200).json(count)
    } catch (error) {
        console.error(error)
        return resp.status(500).json({ message: 'Erro na busca' })
    }
}

module.exports= {
    Logout,
    PuxarPostagem,
    AuthEstaLogado,
    PuxarPostagemUnica,
    SelectRankViews,
    // SelectRankQtdPostsProf,
    PuxarPostagensProf,
    PuxarNumViewsPost
}