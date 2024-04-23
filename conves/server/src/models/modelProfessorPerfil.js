 const { connSequelize } = require('../../config/conexaoBD.js')
 const { padraoTB } = require('../../config/configPadraoTb.js')
 const { DataTypes } = require('sequelize')
 const { ModelProfessorRegistro } = require('./modelProfessorRegistro.js')

 const ModelProfessorPerfil = connSequelize.define( // TABELA: tb_professoPerfilr
     'tb_professorPerfil', {
         id_professor: {
             type: DataTypes.INTEGER.UNSIGNED,
             primaryKey: true,
             allowNull: false,
             autoIncrement: true
         },
        rm_professor: {
            type: DataTypes.CHAR(5),
            allowNull: true
        },
         nm_professor: {
             type: DataTypes.STRING(40),
             allowNull: false
         },
         cpf_prof: {
             type: DataTypes.CHAR(14),
             allowNull: false
         },
         fk_plano: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tb_plano',
                key: 'id_plano'
            }
         }
     },
         padraoTB('tb_professorPerfil')
 )

 ModelProfessorPerfil.hasOne(ModelProfessorRegistro, { foreignKey: 'fk_professor'})
 ModelProfessorRegistro.belongsTo(ModelProfessorPerfil, { foreignKey: 'fk_professor'})
 
 module.exports = {
     ModelProfessorPerfil
 }