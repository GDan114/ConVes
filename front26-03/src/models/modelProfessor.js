 const { connSequelize } = require('../../config/conexaoBD.js')
 const { padraoTB } = require('../../config/configPadraoTb.js')
 const { ModelUf } = require('./modelUf.js')
 const { DataTypes } = require('sequelize')
 const { ModelPagProfessor } = require('./modelPagProfessor.js')
const { ModelMatriculaProf } = require('./modelMatriculaProf.js')

 const ModelProfessor = connSequelize.define( /* TABELA: tb_professor*/
     'tb_professor', {
         rm_prof: {
             type: DataTypes.CHAR(5),
             primaryKey: true,
             allowNull: false
         },
         qt_time_work: {
             type: DataTypes.INTEGER.UNSIGNED,
             allowNull: false
         },
         nm_prof: {
             type: DataTypes.STRING(30), /* 30 DÍGITOS NO NOME?*/
             allowNull: false
         },
         dt_nascimento_prof: {
             type: DataTypes.DATE,
             allowNull: false
         },
         cpf_prof: {
             type: DataTypes.CHAR(14),
             allowNull: false
         },
         cep: {
             type: DataTypes.INTEGER.UNSIGNED, /* SE ATENTAR, PQ CEP É INT MIGUEL SEU ANIMAL????????*/
             allowNull: false
         },
         nm_cidade: {
             type: DataTypes.STRING(40),
             allowNull: false
         },
         logradouro: {
             type: DataTypes.STRING(70),
             allowNull: false
         },
         num_numero: {
             type: DataTypes.STRING(90), /* NÚMERO DE 90 MIGUEL????????????*/
         },
         complemento: {
             type: DataTypes.STRING(10)
         },
         bairro: {
             type: DataTypes.STRING(700),
             allowNull: false
         },
         fk_uf: {
             type: DataTypes.INTEGER.UNSIGNED,
             allowNull: false,
             references: {
                model: 'tb_uf',
                key: 'id_uf'
             }
         }
     },
         padraoTB('tb_professor')
 )
 
 ModelProfessor.hasOne(ModelUf, {foreignKey: 'fk_uf'})
 ModelProfessor.hasOne(ModelPagProfessor, { foreignKey: 'fk_prof' })
 ModelProfessor.hasOne(ModelMatriculaProf, {foreignKey: 'fk_'})

/* A relação é 1:N. Um professor só pode ter um UF, que por sua vez pode ter mais de um professor */

 module.exports = {
     ModelProfessor
 }