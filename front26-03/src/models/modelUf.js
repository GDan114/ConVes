const { connSequelize } = require('../../config/conexaoBD.js')
const { padraoTB } = require('../../config/configPadraoTb.js')
const { DataTypes } = require('sequelize')
const { ModelProfessor } = require('./modelProfessor.js')

const ModelUf = connSequelize.define( // TABELA: tb_uf
    'tb_uf', {
        id_uf: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        nm_uf: {
            type: DataTypes.CHAR(2)
        }
    },
        padraoTB('tb_uf')
)

ModelUf.belongsTo(ModelProfessor, {foreignKey: 'id_uf'})

module.exports = {
    ModelUf
}