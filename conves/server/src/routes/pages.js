const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('lading_Page')
});

module.exports = router;