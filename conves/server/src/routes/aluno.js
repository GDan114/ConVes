const controller_Aluno = require('../controllers/controllerAluno')
const express = require('express')
const router = express.Router()

router.post('/cadastro.html', controller_Aluno.CriarAluno)

module.exports = router