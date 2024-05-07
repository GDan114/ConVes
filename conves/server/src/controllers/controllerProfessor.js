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
                fk_plano: 1
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
        return Post


    } catch(erro) {
        console.error(erro)
        console.log(req.body)
        return resp.status(500).json({
            message: 'Erro no servidor ao criar a postagem'
        })
    }
}



module.exports = {
    CriarProfessor,
    LogarProfessor,
    CriarPostagem
}