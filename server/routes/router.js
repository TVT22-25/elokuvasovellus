const express = require('express');
const router = express.Router();
const testRoutes = require('./test');

router.get('/', testRoutes);

module.exports = router;
