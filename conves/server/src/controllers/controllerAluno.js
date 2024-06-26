const { Sequelize } = require('sequelize')
const { ModelAlunoPerfil } = require('../models/modelAlunoPerfil')
const { ModelAlunoRegistro } = require('../models/modelAlunoRegistro')
const bcrypt = require('bcrypt');
const { ModelViewPostagem } = require('../models/modelViewPost');

async function CriarAluno(req, resp) {
    try {
        console.log(req.body); // ver o que está no req body
        const {
            alunoNome,
            alunoEmail,
            alunoSenha,
            alunoData
        } = req.body // pega info do body 
        
        const AlunoProposto = await ModelAlunoRegistro.findOne({
            where: {ds_emailAluno: alunoEmail}
        })
        
        if(AlunoProposto) {
            return resp.redirect('/registrar?erro=Erro no registro, email já registrado no sistema!')
        } else {
            const AlunoCriado = await ModelAlunoPerfil.create({
                nm_aluno: alunoNome,
                dt_nascimento_aluno: alunoData,
                img_fotoPerfil: '/Imagens/perfil.png'
            }) // cria o perfil
    
            const idCriado = AlunoCriado.id_aluno // pega o id do perfil
    
            const hashedPassword = await bcrypt.hash(alunoSenha, 10)
    
            const RegistroAlunoCriado = await ModelAlunoRegistro.create({
                fk_aluno: idCriado,
                ds_emailAluno: alunoEmail,
                id_senhaAluno: hashedPassword
            }) // cria o registro
            if (!RegistroAlunoCriado) {
                resp.redirect('/registrar?erro=Erro no registro, verifique se todos os campos estão preenchidos corretamente.')
            } else {
                resp.redirect('/login')
            }
            return {AlunoCriado, RegistroAlunoCriado}
        }

    } catch(erro) {
        console.error('Erro na inserção: ', erro)
        return resp.redirect('/registrar?erro=Erro no registro')
        //return resp.status(400).json({ message: 'Erro na inserção'})
    }
}

async function LogarAluno(req, resp) {
    const {
        alunoEmail,
        alunoSenha
    } = req.body

    try {
        const dadosAlunoAuth = await ModelAlunoPerfil.findOne({
            include: {
                model: ModelAlunoRegistro,
                required: true,
                where: {
                    ds_emailAluno: alunoEmail
                }
            }
        })

        if (!dadosAlunoAuth) {
            return resp.status(404).json({
                message: 'Usuário com esse email não encontrado'
            })
        }

        console.log(dadosAlunoAuth)
        
        const hashSenha = dadosAlunoAuth.tb_alunoRegistro.id_senhaAluno

        const comparandoSenhas = await bcrypt.compare(
            alunoSenha, hashSenha
        )

        if(!comparandoSenhas) {
            return resp.redirect('/login?erro=Senha ou email Inválido.')
        }

        const hora = 3600000 // milissegundos que equivale a uma hora
        const dtQuandoIraExpirar = new Date(Date.now() + hora)

        resp.cookie(
            'cookie_usuario',
                dadosAlunoAuth.id_aluno, {
                    httpOnly: true,
                    expires: dtQuandoIraExpirar
                }
        )

        resp.cookie(
            'cookie_tipoUsuario', 'Aluno', {
                httpOnly: true,
                expires: dtQuandoIraExpirar
        })

        return resp.redirect('/home')
    } catch(erro) {
        console.error(erro)
        console.log(req.body)
        return resp.status(500).json({
            message: 'Erro no servidor ao logar'
        })
    }
}

async function PuxarPerfilAluno(req, resp) {
    try {
        const idAluno = req.params.idAluno
        const Aluno = await ModelAlunoPerfil.findOne({
            include: {
                model: ModelAlunoRegistro,
                required: true,
                where: {
                    id_alunoRegistro: idAluno
                }
            },
            where: {
                id_aluno: idAluno
            }
        })
        console.log(Aluno)
        return resp.status(200).json(Aluno)
    } catch (error) {
        console.error(error)
        return resp.status(500).json({ message: 'Erro ao buscar perfil' })
    }
}

async function EditarAluno(req, resp) {
    try{
        const {
            alunoNome,
            alunoEmail,
            alunoSenha,
            alunoData,
            capaImg
        } = req.body 

        const idAluno = req.cookies.cookie_usuario

        const AlunoPerfil = await ModelAlunoPerfil.findOne({
            where: {
                id_aluno: idAluno
            }
        })
        
        // AQUI QUE TEM O EDIT
        AlunoPerfil.nm_aluno = alunoNome
        AlunoPerfil.dt_nascimento_aluno = alunoData
        //AlunoPerfil.img_fotoPerfil = capaImg
        
        const AlunoRegistro = await ModelAlunoRegistro.findOne({
            where: {
                id_alunoRegistro: idAluno
            }
        })
        const hashedPassword = await bcrypt.hash(alunoSenha, 10)

        AlunoRegistro.ds_emailAluno = alunoEmail
        AlunoRegistro.id_senhaAluno = hashedPassword

        await AlunoPerfil.save()
        await AlunoRegistro.save()

    } catch (error) {
        console.error(error)
        return resp.status(500).json({ message: 'Erro ao editar perfil' })
    }
}

async function EditarAlunoImg(req, resp) {
    try{
        const {
            capaImg
        } = req.body 

        const idAluno = req.cookies.cookie_usuario

        const AlunoPerfil = await ModelAlunoPerfil.findOne({
            where: {
                id_aluno: idAluno
            }
        })
        
        // AQUI QUE TEM O EDIT
        AlunoPerfil.img_fotoPerfil = capaImg

        await AlunoPerfil.save()

        return resp.status(200).json({ message: 'Foto trocada com sucesso' })
    } catch (error) {
        console.error(error)
        return resp.status(500).json({ message: 'Erro ao editar perfil' })
    }
}

async function ViewPostAluno(req, resp) {
    try {
        const idPostagem = req.params.idPost;
        const idAluno = req.cookies.cookie_usuario;

        await ModelViewPostagem.create({
            fk_aluno: idAluno,
            fk_postagem: idPostagem,
            en_visto: 'S'
        })

        return resp.status(200).json({ message: 'Postagem marcada como vista com sucesso' });
    } catch (error) {
        console.error(error);
        return resp.status(500).json({ message: 'Erro ao marcar a view' });
    }
}

async function DeletarAluno (req, resp) {
    try {
        const idAluno = req.cookies.cookie_usuario

        await ModelAlunoRegistro.destroy({
            where: {
                id_alunoRegistro: idAluno
            }
        })

        await ModelAlunoPerfil.destroy({
            where: {
                id_aluno: idAluno
            }
        })
    } catch (error) {
        console.error(error)
        return resp.status(500).json({ message: 'Erro ao deletar conta'})
    }
}


module.exports = {
    CriarAluno,
    LogarAluno,
    PuxarPerfilAluno,
    EditarAluno,
    EditarAlunoImg,
    ViewPostAluno,
    DeletarAluno
}