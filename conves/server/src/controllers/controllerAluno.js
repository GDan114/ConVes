const { Sequelize } = require('sequelize')
const { ModelAlunoPerfil } = require('../models/modelAlunoPerfil')
const { ModelAlunoRegistro } = require('../models/modelAlunoRegistro')

function checarEmail(email) {
    if (email == null || email == undefined || email == '') {
        return false
    } else return true
} 

async function CriarAluno(req, resp) {
    try {
        console.log(req.body); // ver o que está no req body
        const {
            alunoNome,
            alunoEmail,
            alunoSenha,
            alunoData
        } = req.body // pega info do body 
        
        const AlunoCriado = await ModelAlunoPerfil.create({
            nm_aluno: alunoNome,
            rm_aluno: "",
            dt_nascimento_aluno: alunoData
        }) // cria o perfil

        const idCriado = AlunoCriado.id_aluno // pega o id do perfil

        const RegistroAlunoCriado = await ModelAlunoRegistro.create({
            fk_aluno: idCriado,
            ds_emailAluno: alunoEmail,
            id_senhaAluno: alunoSenha
        }) // cria o registro
        if (!RegistroAlunoCriado) {
            resp.redirect('/auth/registrar?erro=Erro no registro, verifique se todos os campos estão preenchidos corretamente.')
        } else {
            resp.redirect('/auth/home')
        }
        return {AlunoCriado, RegistroAlunoCriado}

    } catch(erro) {
        console.error('Erro na inserção: ', erro)
        return resp.redirect('/auth/registrar?erro=Erro no registro')
        //return resp.status(400).json({ message: 'Erro na inserção'})
    }
}

module.exports = {
    CriarAluno
}