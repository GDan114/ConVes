const { connSequelize, nomeBD} = require('../config/conexaoBD.js')
const controller_Aluno = require('./controllers/controllerAluno.js')

connSequelize.sync() // Deixar o BD funcionando

function showQuery(queryTxt) {
    console.log('\n\n\n====================================================')
    console.log('Comando que será usado:')
    console.log('==========================================================')
    console.log(queryTxt)
    console.log('==========================================================')
}

// AUTENTICAÇÃO

connSequelize.authenticate().then(() => {
    console.log('\n=======================================================================================')
    console.log(` Conexão bem sucedida do Sequelize com o banco mySQL "${nomeBD}" !!!`)
    console.log('=======================================================================================\n')

}).catch(erroConn => {
    console.error(`Incapaz de conectar-se ao banco MySQL de nome ${nomeBD}`, erroConn)
})

