const { connSequelize } = require('../../config/conexaoBD.js')
const { padraoTB } = require('../../config/configPadraoTb.js')
const { DataTypes } = require('sequelize')

const ModelProfessorRegistro = connSequelize.define(
    'tb_professorRegistro', {
        id_professorRegistro: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        fk_professor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tb_professorPerfil',
                key: 'id_professor'
            }
        },
        id_senhaProfessor: {
            type: DataTypes.STRING(16),
            allowNull: false
        },
        ds_emailProfessor: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    },

    padraoTB('tb_professorRegistro')
)

module.exports = {
    ModelProfessorRegistro
}