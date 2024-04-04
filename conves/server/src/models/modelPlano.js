const { connSequelize } = require('../../config/conexaoBD')
const { padraoTB } = require('../../config/configPadraoTb')
const { DataTypes } = require('sequelize')
const { ModelProfessorPerfil } = require('./modelProfessorPerfil')

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

ModelPlano.hasMany(ModelProfessorPerfil, { foreignKey: 'fk_plano' })
ModelProfessorPerfil.belongsTo(ModelPlano, { foreignKey: 'fk_plano' })
module.exports = {
    ModelPlano
}