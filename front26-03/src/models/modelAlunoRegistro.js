const { connSequelize } = require('../../config/conexaoBD')
const { padraoTB } = require('../../config/configPadraoTb')
const { DataTypes } = require('sequelize')

const ModelAlunoRegistro = connSequelize.define( // TABELA: tb_alunoRegistro
    'tb_alunoRegistro', {
        id_alunoRegisro: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        fk_aluno: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tb_alunoPerfil',
                key: 'id_aluno'
            }
        },
        ds_emailAluno: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        id_senhaAluno: {
            type: DataTypes.STRING(16),
            allowNull: false
        }
    },
    
    padraoTB('tb_alunoRegistro')
)

module.exports = {
    ModelAlunoRegistro
}