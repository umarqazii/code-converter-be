// routes/codeConverterRoutes.js
const express = require('express');
const { convertCode } = require('../controllers/codeConverterController');
const { createSuggestion } = require('../controllers/suggestionController');
const { createIssueReport } = require('../controllers/issueController');
const { createMessage } = require('../controllers/contactUsController');

const router = express.Router();

// POST request to convert code
router.post('/convert', convertCode);
router.post('/suggest', createSuggestion);
router.post('/report-issue', createIssueReport);
router.post('/send-message', createMessage);

module.exports = router;
