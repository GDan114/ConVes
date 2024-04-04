const { Sequelize } = require('sequelize')
const { ModelAlunoPerfil } = require('../models/modelAlunoPerfil')
const { ModelAlunoRegistro } = require('../models/modelAlunoRegistro')

async function CriarAluno(req, resp) {
    try {
        const {
            alunoNome,
            alunoEmail,
            alunoSenha
        } = req.body // pega info do body 

        const AlunoCriado = ModelAlunoPerfil.create({
            nm_aluno: alunoNome
        }) // cria o perfil

        const idCriado = AlunoCriado.id_aluno // pega o id do perfil

        const RegistroAlunoCriado = ModelAlunoRegistro.create({
            fk_aluno: idCriado,
            ds_emailAluno: alunoEmail,
            id_senhaAluno: alunoSenha
        }) // cria o registro

    } catch(erro) {
        console.error('Erro na inserção: ', erro)
        return resp.status(400).json({ message: 'Erro na inserção'})
    }
}

module.exports = {
    CriarAluno
}