const { connSequelize } = require('../../config/conexaoBD.js')
const { padraoTB } = require('../../config/configPadraoTb.js')
const { DataTypes } = require('sequelize')
const { ModelProfessor } = require('./modelProfessor.js')

const ModelPagProfessor = connSequelize.define(
    'pagamento_professor', {
        id_pagamento: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        ds_bonus: {
            type: DataTypes.ENUM('sim', 'nao'),
            allowNull: false
        },
        vl_pagamento: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false
        },
        Qt_materias: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fk_prof: {
            type: DataTypes.CHAR,
            allowNull: false,
            references: {
                model: 'tb_professor',
                key: 'rm_prof'
            }
        }
    },
    padraoTB('pagamento_professor')
)

ModelPagProfessor.belongsTo(ModelProfessor, { foreignKey: fk_prof })

module.exports = {
    ModelPagProfessor
}