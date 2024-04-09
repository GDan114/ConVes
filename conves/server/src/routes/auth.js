const controller_Aluno = require('../controllers/controllerAluno')
const express = require('express')
const router = express.Router()

router.post('/registrar', controller_Aluno.CriarAluno) // /auth/registrar

module.exports = router