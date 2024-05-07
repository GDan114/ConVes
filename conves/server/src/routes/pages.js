const express = require('express');
const router = express.Router();
const axios = require('axios');
const controller_Auth = require('../controllers/controllerAuth')

router.get('/', (req, res) => { // Página raiz
    res.render('lading_Page')
});

router.get('/registrar', (req, res) => {
    const erro = req.query.erro
    res.render('cadastro', {erro: erro})
})

router.get('/login', (req, res) => {
    const erro = req.query.erro
    res.render('loginpage', {erro: erro})
})

router.get('/home', controller_Auth.AuthEstaLogado, async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/auth/puxarPostagem')
        const postagens = response.data

        res.render('home', { postagens }) // Renderiza sua página HBS com os dados das postagens como contexto
    } catch (error) {
        console.error(error)
        res.status(500).send('Erro ao buscar postagens')
    }
});

router.get('/home/postagens', controller_Auth.AuthEstaLogado, async (req, res) => {
    try {
        const tipoUsuario = req.cookies.cookie_tipoUsuario

    const response = await axios.get('http://localhost:5000/auth/puxarPostagem')
    const postagens = response.data

    res.render('postagens', { tipoUsuario, postagens })
    } catch(error) {
        console.error(error)
        res.status(500).send('Erro ao buscar postagens')
    }
    
})

router.get('/home/postagens/criar', controller_Auth.AuthEstaLogado, (req, res) => {
    const msg = req.query.msg
    res.render('adicionarPostagem', {msg: msg})
})
module.exports = router;