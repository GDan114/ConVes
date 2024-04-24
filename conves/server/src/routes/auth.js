const controller_Aluno = require('../controllers/controllerAluno')
const controller_Professor = require('../controllers/controllerProfessor')

const express = require('express')
const router = express.Router()

router.post('/registrarAluno', controller_Aluno.CriarAluno) // /auth/registrarAluno
router.post('/registrarProfessor', controller_Professor.CriarProfessor) // /auth/registrarProfessor

router.post('/logarAluno', controller_Aluno.LogarAluno) // /auth/logarAluno
router.post('/logarProfessor', controller_Professor.LogarProfessor) // /auth/logarProfessor

module.exports = router