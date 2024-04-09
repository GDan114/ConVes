// ROTAS E HBS
const path = require('path');
const express = require('express')
const pagesRouter = require('./routes/pages')
const appWeb = express()

const publicDirectory = path.join(__dirname, 'public'); // constante do caminho da pasta public para ser usada de forma estática
appWeb.use(express.static(publicDirectory));

appWeb.set('views', path.join(__dirname, 'views'))

appWeb.use(express.json())
appWeb.set('view engine', 'hbs');
// AUTENTICAÇÃO E START DO BANCO 

const { connSequelize, nomeBD} = require('../config/conexaoBD.js')

connSequelize.authenticate().then(() => {
    console.log('\n=======================================================================================')
    console.log(` Conexão bem sucedida do Sequelize com o banco mySQL "${nomeBD}" !!!`)
    console.log('=======================================================================================\n')

}).catch(erroConn => {
    console.error(`Incapaz de conectar-se ao banco MySQL de nome ${nomeBD}`, erroConn)
})

connSequelize.sync() // Deixar o BD funcionando 

try {
    appWeb.use('/', pagesRouter);
} catch(erro) {
    console.log(erro)
}

const PORTA = 5000
try {
    appWeb.listen(PORTA, async () => {
        console.log(`Servidor rodando na porta: ${PORTA} - "http://localhost:${PORTA}"`)
    })
} catch(erro) {
    console.log(erro)
}
