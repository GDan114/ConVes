const controller_Aluno = require('../controllers/controllerAluno')
const controller_Professor = require('../controllers/controllerProfessor')

const express = require('express')
const router = express.Router()

router.post('/registrarAluno', controller_Aluno.CriarAluno) // /auth/registrar
router.post('/registrarProfessor', controller_Professor.CriarProfessor) // /auth/registrar

module.exports = router