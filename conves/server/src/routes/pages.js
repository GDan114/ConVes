const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { // Página raiz
    res.render('lading_Page')
});

router.get('/auth/registrar', (req, res) => {
    const erro = req.query.erro
    res.render('cadastro', {erro: erro})
})

router.get('/auth/login', (req, res) => {
    res.render('loginpage')
})

router.get('/auth/home', (req, res) => {
    res.render('home')
})
module.exports = router;