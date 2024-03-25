const { connSequelize } = require('../../config/conexaoBD')
const { padraoTB } = require('../../config/configPadraoTb')
const { DataTypes, INTEGER } = require('sequelize')
const { ModelCursos } = require('./modelCursos')
const { ModelMateria } = require('./modelMateria')

const ModelVideoAula = connSequelize.define(
    'tb_video_aula', {
        id_video_aula: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        fk_materia: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'tb_materia',
                key:'id_materia'
            }
        },
        fk_curso: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'tb_curso',
                key: 'id_curso'
            }
        },
        nm_video_aula: {
            type: DataTypes.STRING(40),
        },
        ds_caminho_video: {
            type: DataTypes.STRING(225)
        }
    },

    padraoTB('tb_video_aula')
)

ModelVideoAula.belongsTo(ModelCursos, {foreignKey: 'fk_curso'})

ModelVideoAula.belongsTo(ModelMateria, {foreignKey: fk_materia})

module.exports = {
    ModelVideoAula
}