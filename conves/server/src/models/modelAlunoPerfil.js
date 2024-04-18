const { connSequelize } = require('../../config/conexaoBD.js')
const { padraoTB } = require('../../config/configPadraoTb.js')
const { DataTypes } = require('sequelize')
const { ModelAlunoRegistro } = require('./modelAlunoRegistro.js')

const ModelAlunoPerfil = connSequelize.define( // TABELA: tb_alunoPerfil
    'tb_alunoPerfil', {
        id_aluno: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        rm_aluno: {
            type: DataTypes.CHAR(5),
            allowNull: true
        },
        nm_aluno: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        dt_nascimento_aluno: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
        padraoTB('tb_alunoPerfil')
)

ModelAlunoPerfil.hasOne(ModelAlunoRegistro, { foreignKey: 'fk_aluno' })
ModelAlunoRegistro.belongsTo(ModelAlunoPerfil, { foreignKey: 'fk_aluno' })

module.exports = {
    ModelAlunoPerfil
}