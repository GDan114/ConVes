const express = require('express');
const router = express.Router();
const axios = require('axios');

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

router.get('/home', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/auth/puxarPostagem');
        const postagens = response.data;
        res.render('home', { postagens }); // Renderiza sua página HBS com os dados das postagens como contexto
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar postagens');
    }
});

router.get('/home/postagens', (req, res) => {
    res.render('postagens')
})

/*router.get('/home/prof', (req, res) => {
    res.render('homeProfessor')
})*/

router.get('/home/postagens/criar', (req, res) => {
    res.render('teste')
})
module.exports = router;