const express = require('express');
const router = express.Router();
const designController = require('../controllers/designController');

// POST /api/generate-design
router.post('/generate-design', designController.generateDesign);

module.exports = router;
