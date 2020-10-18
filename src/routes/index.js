const express = require('express');
const router = express.Router();

// Principles routes of my app
router.get('/', (req, res)=> {
    res.render('index');
});

module.exports = router;
