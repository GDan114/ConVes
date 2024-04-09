const { Sequelize } = require('sequelize')
const { ModelAlunoPerfil } = require('../models/modelAlunoPerfil')
const { ModelAlunoRegistro } = require('../models/modelAlunoRegistro')

async function CriarAluno(req, resp) {
    console.log('Tá rodando')
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
        console.log(AlunoCriado)

        const idCriado = AlunoCriado.id_aluno // pega o id do perfil
        console.log(idCriado)

        const RegistroAlunoCriado = await ModelAlunoRegistro.create({
            fk_aluno: idCriado,
            ds_emailAluno: alunoEmail,
            id_senhaAluno: alunoSenha
        }) // cria o registro
        console.log(RegistroAlunoCriado)

        return {AlunoCriado, RegistroAlunoCriado}

    } catch(erro) {
        console.error('Erro na inserção: ', erro)
        return resp.status(400).json({ message: 'Erro na inserção'})
    }
}

module.exports = {
    CriarAluno
}