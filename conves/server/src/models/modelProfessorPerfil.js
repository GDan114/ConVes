 const { connSequelize } = require('../../config/conexaoBD.js')
 const { padraoTB } = require('../../config/configPadraoTb.js')
 const { DataTypes } = require('sequelize')
 const { ModelProfessorRegistro } = require('./modelProfessorRegistro.js')
 const { ModelPostagem } = require('./modelPostagem.js')

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
         },
         img_fotoPerfil: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        }
     },
         padraoTB('tb_professorPerfil')
 )

 ModelProfessorPerfil.hasOne(ModelProfessorRegistro, { foreignKey: 'fk_professor'})
 ModelProfessorRegistro.belongsTo(ModelProfessorPerfil, { foreignKey: 'fk_professor'})

 ModelProfessorPerfil.hasMany(ModelPostagem, { foreignKey: 'fk_professorAutor'})
 ModelPostagem.belongsTo(ModelProfessorPerfil, { foreignKey: 'fk_professorAutor'})
 
 module.exports = {
     ModelProfessorPerfil
 }