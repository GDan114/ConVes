const { connSequelize } = require('../../config/conexaoBD')
const { padraoTB } = require('../../config/configPadraoTb')
const {  DataTypes } = require('sequelize')
const { ModelCursos } = require('./modelCursos')
const { ModelVideoAula } = require('./modelVideoAula')

const ModelMateria = connSequelize.define (
    'tb_materia', {
        id_materia: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        fk_curso: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'tb_curso',
                key: 'id_curso'
            }
        },
        nm_materia: {
            type: DataTypes.STRING(40),
            allowNull: false
        }
    },

    padraoTB('tb_materia')
)

ModelMateria.belongsTo(ModelCursos, { foreignKey: 'fk_curso' })

ModelMateria.hasMany(ModelVideoAula, {foreignKey: 'fk_materia'})


module.exports = {
    ModelMateria
}