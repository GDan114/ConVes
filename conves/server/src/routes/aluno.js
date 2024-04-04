const controller_Aluno = require('../controllers/controllerAluno')
const express = require('express')
const router = express.Router()

router.post('/cadastrar', controller_Aluno.CriarAluno)

module.exports = router