const { connSequelize } = require('../../config/conexaoBD.js')
const { padraoTB } = require('../../config/configPadraoTb.js')
const { DataTypes } = require('sequelize')

const ModelAluno = connSequelize.define( // TABELA: tb_aluno
    'tb_aluno', {
        id_aluno: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        cd_rm_aluno: {
            type: DataTypes.CHAR(5),
            allowNull: false
        }, 
        nm_aluno: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        dt_nascimento_aluno: {
            type: DataTypes.DATE,
            allowNull: false
        },
        dt_cadastro: {
            type: DataTypes.DATE,
            allowNull: false
        }, 
        cpf_aluno: {
            type: DataTypes.CHAR(14),
            allowNull: false
        }
    },
        padraoTB('tb_aluno')
)

module.exports = {
    ModelAluno
}