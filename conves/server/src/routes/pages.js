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
    res.render('loginpage')
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

router.get('/home/postagens', controller_Auth.AuthEstaLogado, (req, res) => {
    const tipoUsuario = req.cookies.cookie_tipoUsuario;
    res.render('postagens', { tipoUsuario })
})

/*router.get('/home/prof', (req, res) => {
    res.render('homeProfessor')
})*/

router.get('/home/postagens/criar', controller_Auth.AuthEstaLogado, (req, res) => {
    res.render('adicionarPostagem')
})
module.exports = router;