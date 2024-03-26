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

async function runServer() {

    // SELECT DE TODOS OS ALUNOS
    showQuery(`
        SELECT * FROM tb_aluno
    `)
    let resultadoQuery = await controller_Aluno.SelectAllAlunos()
    console.log(resultadoQuery)

    //SELECT DE UM ALUNO ESPECÍFICO
    showQuery(`
        SELECT FROM tb_aluno WHERE id_aluno = 3
    `)
    resultadoQuery = await controller_Aluno.SelectAlunoEspec({
        params: { id:3 }
    })
    console.log(resultadoQuery)

    // SELECT DE TODOS OS ALUNOS NASCIDOS EM 2007, COM GROUP BY PARA SEPARAR POSSÍVEIS NOMES IGUAIS (POIS POSSUEM RMS DIFERENTES)
    showQuery(`
        SELECT nm_aluno AS 'Nome', cd_rm_aluno AS 'RM' FROM tb_aluno WHERE YEAR(dt_nascimento_aluno) = 2007 GROUP BY nm_aluno, cd_rm_aluno;
    `)
    resultadoQuery = await controller_Aluno.SelectAlunoAno({
        params: { ano: 2007 }
    })
    console.log(resultadoQuery)
}

runServer()