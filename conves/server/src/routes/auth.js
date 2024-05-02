const controller_Aluno = require('../controllers/controllerAluno')
const controller_Professor = require('../controllers/controllerProfessor')
const controller_Auth = require('../controllers/controllerAuth')

const express = require('express')
const router = express.Router()

router.post('/registrarAluno', controller_Aluno.CriarAluno) //  /auth/registrarAluno
router.post('/registrarProfessor', controller_Professor.CriarProfessor) // /auth/registrarProfessor

router.post('/logarAluno', controller_Aluno.LogarAluno) //  /auth/logarAluno
router.post('/logarProfessor', controller_Professor.LogarProfessor) //  /auth/logarProfessor

router.post('/criarPostagem', controller_Professor.CriarPostagem)//  /auth/criarPostagem 
router.get('/puxarPostagem', controller_Auth.PuxarPostagem)//  /auth/puxarrPostagem

router.get('/logout', controller_Auth.Logout) //  /auth/logout

module.exports = router