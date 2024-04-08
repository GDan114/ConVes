const { connSequelize, nomeBD} = require('../config/conexaoBD.js')
const handlebars = require('handlebars')
const express = require('express')

// function showQuery(queryTxt) {
//     console.log('\n\n\n====================================================')
//     console.log('Comando que será usado:')
//     console.log('==========================================================')
//     console.log(queryTxt)
//     console.log('==========================================================')
// }

// AUTENTICAÇÃO

connSequelize.authenticate().then(() => {
    console.log('\n=======================================================================================')
    console.log(` Conexão bem sucedida do Sequelize com o banco mySQL "${nomeBD}" !!!`)
    console.log('=======================================================================================\n')

}).catch(erroConn => {
    console.error(`Incapaz de conectar-se ao banco MySQL de nome ${nomeBD}`, erroConn)
})

const appWeb = express()
connSequelize.sync() // Deixar o BD funcionando
appWeb.use(express.json())



appWeb.get('/',(req, resp) => {
    resp.render('lading_Page')
})

const alunoRoutes = require('./routes/aluno')
appWeb.use('/', alunoRoutes)

const PORTA = 5000

appWeb.listen(PORTA, () => {
    console.log(`Servidor rudando na porta: ${PORTA} - "http://localhost:${PORTA}"`)
})