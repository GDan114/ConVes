const { Sequelize } = require('sequelize')

// Informação do banco
const usuario = 'root'
const senha = 'root'
const nomeBD = 'bd_Conves'

// Conexão
const connSequelize = new Sequelize(
    `mysql://${usuario}:${senha}@localhost:3307/${nomeBD}`
)

module.exports = {
    connSequelize,
    nomeBD
}