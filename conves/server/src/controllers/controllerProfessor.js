const { ModelPostagem } = require('../models/modelPostagem')
const { ModelProfessorPerfil } = require('../models/modelProfessorPerfil')
const { ModelProfessorRegistro } = require('../models/modelProfessorRegistro')
const bcrypt = require('bcrypt')

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
        idProf = req.params.idProf
        const Prof = await ModelProfessorPerfil.findOne({
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
        ProfPerfil.img_fotoPerfil = capaImg
        
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

module.exports = {
    CriarProfessor,
    LogarProfessor,
    CriarPostagem,
    PuxarPerfilProfessor,
    PuxarNumPosts,
    EditarProfessor
}