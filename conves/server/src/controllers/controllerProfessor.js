const { ModelPostagem } = require('../models/modelPostagem')
const { ModelProfessorPerfil } = require('../models/modelProfessorPerfil')
const { ModelProfessorRegistro } = require('../models/modelProfessorRegistro')
const bcrypt = require('bcrypt')
const { ModelViewPostagem } = require('../models/modelViewPost')

async function CriarProfessor (req, res) {
    // console.log('Tá rodando')
    try {
        console.log(req.body)
        console.log(ModelProfessorRegistro)
        const {
            profNome,
            profCpf,
            profEmail,
            profSenha, 
            profMatricula
        } = req.body

        const ProfProposto = await ModelProfessorRegistro.findOne({
            where: {ds_emailProfessor: profEmail}
        })
        
    
        if (ProfProposto) {
            return res.redirect('/registrar?erro=Erro no registro, email já registrado no sistema!')
        } else {
            const ProfessorCriado = await ModelProfessorPerfil.create({
                rm_professor: profMatricula,
                nm_professor: profNome,
                cpf_prof: profCpf,
                fk_plano: 1,
                img_fotoPerfil: '/Imagens/perfil.png'
            })
        
            const idCriado = ProfessorCriado.id_professor
            
            const hashedPassword = await bcrypt.hash(profSenha, 10)

            const RegistroProfessorCriado = await ModelProfessorRegistro.create({
                fk_professor: idCriado,
                id_senhaProfessor: hashedPassword,
                ds_emailProfessor: profEmail
            }) // cria registro

            if (!RegistroProfessorCriado) {
                res.redirect('/registrar?erro=Erro no registro, verifique se todos os campos estão preenchidos corretamente.')
            } else {
                res.redirect('/login')
            }

            return {ProfessorCriado, RegistroProfessorCriado}
        }
        
    } catch(erro) {
        console.error('Erro na inserção: ', erro)
        return res.status(400).json({ message: 'Erro na inserção'})
    }
}
 
async function LogarProfessor (req, resp) {
    const {
        profEmail,
        profSenha
    } = req.body

    try {
        const dadosProfAuth = await ModelProfessorPerfil.findOne({
            include: {
                model: ModelProfessorRegistro,
                required: true,
                where: {
                    ds_emailProfessor: profEmail
                }
            }
        })

        if (!dadosProfAuth) {
            return resp.status(404).json({
                message: 'Usuário com esse email não encontrado'
            })
        }

        console.log(dadosProfAuth)

        const hashSenha = dadosProfAuth.tb_professorRegistro.id_senhaProfessor

        const comparandoSenhas = await bcrypt.compare(
            profSenha, hashSenha
        )

        if(!comparandoSenhas) {
            return resp.redirect('/login?erro=Senha ou email Inválido.')
        }

        const hora = 3600000 // milissegundos que equivale a uma hora
        const dtQuandoIraExpirar = new Date(Date.now() + hora)

        resp.cookie(
            'cookie_usuario',
                dadosProfAuth.id_professor, {
                    httpOnly: true,
                    expires: dtQuandoIraExpirar
                }
        )

        resp.cookie(
            'cookie_tipoUsuario', 'Prof', {
                httpOnly: true,
                expires: dtQuandoIraExpirar
        })

        return resp.redirect('/home')

    } catch (erro) {
        console.error(erro)
        console.log(req.body)
        return resp.status(500).json({
            message: 'Erro no servidor ao logar'
        })
    }
}

async function CriarPostagem (req, resp) {
    const {
        postTitulo,
        postImg,
        postText
    } = req.body

    console.log(postImg)

    const idProf = req.cookies.cookie_usuario

    
    try {
        const Post = await ModelPostagem.create({
            nm_tituloPostagem: postTitulo,
            fk_professorAutor: idProf,
            ds_conteudoPost: postText,
            img_capaPost: postImg
        })
        //return resp.redirect('/home/postagens/criar?msg=Postagem criada com sucesso.')
        return resp.status(200).json({ message: 'Postagem criada com sucesso' });

    } catch(erro) {
        console.error(erro)
        console.log(req.body)
        return resp.status(500).json({ message: 'Erro ao criar postagem' });

    }
}

async function PuxarPerfilProfessor(req, resp) {
    try {
        // console.log(`
        // ===================================================================
        //             ${req.params.idProf}
        // ===================================================================
        // `)
        const idProf = req.params.idProf
        const Prof = await ModelProfessorPerfil.findOne({
            include: {
                model: ModelProfessorRegistro,
                required: true,
                where: {
                    id_professorRegistro: idProf
                }
            },
            where: {
                id_professor: idProf
            }
        })
        console.log(Prof)
        return resp.status(200).json(Prof)
    } catch (error) {
        console.error(error)
        return resp.status(500).json({ message: 'Erro ao buscar perfil' })
    }
}

async function PuxarNumPosts(req, resp) {
    try {
        idProf = req.params.idProf

        const { count, rows } = await ModelPostagem.findAndCountAll({
            include: {
                model: ModelProfessorPerfil,
                required: true,
                where: {
                    id_professor: idProf
                }
            }
        })

        return resp.status(200).json(count)
    } catch (error) {
        console.error(error)
        return resp.status(500).json({ message: 'Erro na busca' })
    }
}

async function PuxarNumViews(req, resp) {
    try {
        idProf = req.params.idProf

        const { count, rows } = await ModelViewPostagem.findAndCountAll({
            include: {
                model: ModelPostagem,
                required: true,
                include: {
                    model: ModelProfessorPerfil,
                    required: true,
                    where: {
                        id_professor: idProf
                    }
                }
            }
        })

        return resp.status(200).json(count)
    } catch (error) {
        console.error(error)
        return resp.status(500).json({ message: 'Erro na busca' })
    }
}

async function EditarProfessor(req, resp) {
    try{
        const {
            profNome,
            profMatricula,
            profCpf,
            profEmail,
            profSenha, 
            capaImg
        } = req.body 

        const idProf = req.cookies.cookie_usuario

        const ProfPerfil = await ModelProfessorPerfil.findOne({
            where: {
                id_professor: idProf
            }
        })
        
        const profPlano = ProfPerfil.fk_plano

        // AQUI QUE TEM O EDIT
        ProfPerfil.nm_professor = profNome
        ProfPerfil.rm_professor = profMatricula
        ProfPerfil.cpf_prof = profCpf
        ProfPerfil.fk_plano = profPlano
        
        const ProfRegistro = await ModelProfessorRegistro.findOne({
            where: {
                id_professorRegistro: idProf
            }
        })
        const hashedPassword = await bcrypt.hash(profSenha, 10)

        ProfRegistro.ds_emailProfessor = profEmail
        ProfRegistro.id_senhaProfessor = hashedPassword

        await ProfPerfil.save()
        await ProfRegistro.save()
    } catch (error) {
        console.error(error)
        return resp.status(500).json({ message: 'Erro ao editar perfil' })
    }
}

async function EditarPostagem (req, resp) {
    const {
        postTitulo,
        postImg,
        postText
    } = req.body

    const idProf = req.cookies.cookie_usuario

    try {
        const Post = await ModelPostagem.findOne({
            where: {
                fk_professorAutor: idProf
            }
        })

        Post.nm_tituloPostagem = postTitulo
        Post.img_capaPost = postImg
        Post.ds_conteudoPost = postText

        Post.save()
    } catch(erro) {
        console.error(erro)
        console.log(req.body)
        return resp.status(500).json({ message: 'Erro ao criar postagem' });

    }
}

async function EditarProfessorImg(req, resp) {
    try{
        const {
            capaImg
        } = req.body 

        const idProf = req.cookies.cookie_usuario

        const ProfessorPerfil = await ModelProfessorPerfil.findOne({
            where: {
                id_professor: idProf
            }
        })
        
        // AQUI QUE TEM O EDIT
        ProfessorPerfil.img_fotoPerfil = capaImg

        await ProfessorPerfil.save()

        return resp.status(200).json({ message: 'Foto trocada com sucesso' })
    } catch (error) {
        console.error(error)
        return resp.status(500).json({ message: 'Erro ao editar perfil' })
    }
}

async function DeletarProfessor (req, resp) {
    try {
        const idProf = req.cookies.cookie_usuario

        await ModelProfessorRegistro.destroy({
            where: {
                id_professorRegistro: idProf
            }
        })

        await ModelProfessorPerfil.destroy({
            where: {
                id_professor: idProf
            }
        })
    } catch (error) {
        console.error(error)
        return resp.status(500).json({ message: 'Erro ao deletar conta'})
    }
}

async function ExcluirPostagem(req, resp) {
    try {
        const idPost = req.params.idPost

        await ModelPostagem.destroy({
            where: {
                id_postagem: idPost
            }
        })
        return resp.status(200)
    } catch (error) {
        console.error(error)
        return resp.status(500).json({ message: 'Erro ao deletar post'});
    }
}

async function PuxarProfessores(req, resp) {
    try {
        const AllProfessores = await ModelProfessorPerfil.findAll()
        return resp.status(200).json(AllProfessores)
    } catch (error) {
        console.error(error);
        return resp.status(500).json({ message: 'Erro ao buscar professores' });
    }
}

module.exports = {
    CriarProfessor,
    LogarProfessor,
    CriarPostagem,
    PuxarPerfilProfessor,
    PuxarNumPosts,
    EditarProfessor,
    EditarProfessorImg,
    DeletarProfessor,
    PuxarProfessores,
    PuxarNumViews,
    EditarPostagem,
    ExcluirPostagem
}