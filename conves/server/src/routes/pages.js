const express = require('express');
const router = express.Router();

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

router.get('/home', (req, res) => {
    res.render('home')
})

router.get('/home/prof/criarPost', (req, res) => {
    res.render('teste')
})
module.exports = router;