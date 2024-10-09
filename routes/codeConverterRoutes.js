// routes/codeConverterRoutes.js
const express = require('express');
const { convertCode } = require('../controllers/codeConverterController');

const router = express.Router();

// POST request to convert code
router.post('/convert', convertCode);

module.exports = router;
