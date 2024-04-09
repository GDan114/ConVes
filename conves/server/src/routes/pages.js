const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { // Página raiz
    res.render('lading_Page')
});

router.get('/auth/registrar', (req, res) => {
    res.render('cadastro')
})
module.exports = router;