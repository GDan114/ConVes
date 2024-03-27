const { Sequelize } = require('sequelize')
const { ModelAluno } = require('../models/modelAluno.js')

async function SelectAllAlunos(req, res) { // Select de todos
    const alunos = await ModelAluno.findAll({raw: true})
    return alunos
}

async function SelectAlunoEspec(req, res) { // Select de específico
    return await ModelAluno.findByPk(req.params.id, { raw: true })
}

async function SelectAlunoAno(req, res) {
    const Resultado = ModelAluno.findAll({
        attributes: [
            ['nm_aluno', 'Nomes'], 
            ['cd_rm_aluno', 'RMs']
        ],
        where: Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('dt_nascimento_aluno')), req.params.ano),
        group: ['nm_aluno', 'cd_rm_aluno'],
        raw: true
    })

    return await Resultado
}

module.exports = {
    SelectAllAlunos,
    SelectAlunoEspec,
    SelectAlunoAno
}