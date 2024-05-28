const controller_Aluno = require('../controllers/controllerAluno')
const controller_Professor = require('../controllers/controllerProfessor')
const controller_Auth = require('../controllers/controllerAuth')

const express = require('express')
const router = express.Router()

router.post('/registrarAluno', controller_Aluno.CriarAluno) //  /auth/registrarAluno
router.post('/registrarProfessor', controller_Professor.CriarProfessor) // /auth/registrarProfessor

router.post('/logarAluno', controller_Aluno.LogarAluno) //  /auth/logarAluno
router.post('/logarProfessor', controller_Professor.LogarProfessor) //  /auth/logarProfessor

router.get('/puxarPerfilAluno/:idAluno', controller_Aluno.PuxarPerfilAluno) //   /auth/puxarPerfilAluno
router.get('/puxarPerfilProfessor/:idProf', controller_Professor.PuxarPerfilProfessor) //   /auth/puxarPerfilProfessor

router.post('/criarPostagem', controller_Professor.CriarPostagem)//  /auth/criarPostagem 
router.get('/puxarPostagem', controller_Auth.PuxarPostagem)//  /auth/puxarPostagem
router.get('/puxarPostagemUnica/:id', controller_Auth.PuxarPostagemUnica) //   /auth/puxarPostagemUnica
router.get('/puxarNumPosts/:idProf', controller_Professor.PuxarNumPosts) //    /auth/puxarNumPosts

router.post('/editarAluno', controller_Aluno.EditarAluno) //    /auth/editarAluno
router.post('/editarProfessor', controller_Professor.EditarProfessor) //   /auth/editarProfessor

router.post('/viewPostAluno/:idPost', controller_Aluno.ViewPostAluno) //   /auth/viewPostAluno 

router.get('/logout', controller_Auth.Logout) //  /auth/logout

module.exports = router
