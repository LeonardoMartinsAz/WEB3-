const express = require('express');

const usuarioRoutes = require('./usuarioRoutes.js');
const authRoutes = require('./authRoutes.js');

const router = express.Router();

router.use('/usuarios', usuarioRoutes);
router.use('/', authRoutes);

module.exports = router;