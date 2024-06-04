const { connSequelize } = require('../../config/conexaoBD.js')
const { padraoTB } = require('../../config/configPadraoTb.js')
const { DataTypes } = require('sequelize')
const { ModelAlunoPerfil } = require('./modelAlunoPerfil.js')
const { ModelPostagem } = require('./modelPostagem.js')

const ModelViewPostagem = connSequelize.define(
    'tb_viewPost', {
        id_viewPost: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        fk_aluno: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tb_alunoPerfil',
                key: 'id_aluno'
            }
        },
        fk_postagem: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tb_postagem',
                key: 'id_postagem'
            }
        },
        en_visto: {
            type: DataTypes.ENUM('S', 'N'),
            allowNull: false,
            defaultValue: 'N'
        }
    },

    padraoTB('tb_viewPost')
)

ModelAlunoPerfil.hasMany(ModelViewPostagem, { foreignKey: 'fk_aluno' })
ModelViewPostagem.belongsTo(ModelAlunoPerfil, { foreignKey: 'fk_aluno' })

ModelPostagem.hasMany(ModelViewPostagem, { foreignKey: 'fk_postagem' })
ModelViewPostagem.belongsTo(ModelPostagem, { foreignKey: 'fk_postagem' })

module.exports = {
    ModelViewPostagem
}