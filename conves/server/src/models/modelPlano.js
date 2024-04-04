const { connSequelize } = require('../../config/conexaoBD')
const { padraoTB } = require('../../config/configPadraoTb')
const { DataTypes } = require('sequelize')

const ModelPlano = connSequelize.define( // TABELA: tb_plano
    'tb_plano', {
        id_plano: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nm_plano: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        vl_plano: {
            type: DataTypes.DECIMAL(5,2),
            allowNull: false
        }
    },

    padraoTB('tb_plano')
)

module.exports = {
    ModelPlano
}