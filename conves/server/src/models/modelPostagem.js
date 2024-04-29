const { connSequelize } = require('../../config/conexaoBD.js')
const { padraoTB } = require('../../config/configPadraoTb.js')
const { DataTypes } = require('sequelize')

const ModelPostagem = connSequelize.define(
    'tb_postagem', {
        id_postagem: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nm_tituloPostagem: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        fk_professorAutor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tb_professorPerfil',
                key: 'id_professor'
            }
        },
        ds_conteudoPost: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        img_capaPost: {
            type: DataTypes.BLOB('medium'),
            allowNull: false
        }
    },

    padraoTB('tb_postagem')
)

module.exports = {
    ModelPostagem
}