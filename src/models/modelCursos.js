const { connSequelize } = require('../../config/conexaoBD')
const { padraoTB } = require('../../config/configPadraoTb')
const {  DataTypes } = require('sequelize')
const { ModelVideoAula } = require('./modelVideoAula')
const { ModelMateria } = require('./modelMateria')

const ModelCursos = connSequelize.define(
    'tb_curso', {
        id_curso: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nm_curso: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        ds_tempo: {
            type: DataTypes.TIME,
            allowNull: false
        }
    },
    padraoTB('tb_curso')
)

ModelCursos.hasMany(ModelVideoAula, {foreignKey: 'fk_curso'})
ModelCursos.hasMany(ModelMateria, { foreignKey: 'fk_curso' })


module.exports = {
    ModelCursos
}