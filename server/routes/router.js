const express = require('express');
const router = express.Router();
const testRoutes = require('./test');

router.get('/test', testRoutes);

module.exports = router;
