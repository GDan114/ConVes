const { connSequelize } = require('../../config/conexaoBD')
const { padraoTB } = require('../../config/configPadraoTb')
const { DataTypes } = require('sequelize')
const { ModelProfessor } = require('./modelProfessor')
const { ModelCursos } = require('./modelCursos')

const ModelMatriculaProf = connSequelize.define(
    'tb_matricula_professor', {
        id_matricula: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        fk_prof: {
            type: DataTypes.CHAR(5),
            allowNull: false,
            references: {
                model: 'tb_professor',
                key: 'id_professor'
            }
        },
        fk_curso: {
            type: DataTypes.INTEGER.UNSIGNED,
             allowNull: false,
             references: {
                model: 'tb_cursos',
                key: 'id_curso'
             }
        },
        fk_materia: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'tb_materia',
                key: 'id_materia'
            }
        },
        fk_video_aula: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'tb_video_aula',
                key: 'id_videoaula'
            }
        }
    },

    padraoTB('tb_matricula_professor')
)

ModelMatriculaProf.belongsTo(ModelProfessor, {foreignKey: 'fk_prof'})
ModelMatriculaProf.belongsTo(ModelCursos, {foreignKey: 'fk_curso'})

module.exports = {
    ModelMatriculaProf
}