const express = require('express');
const usuarioRoutes = require('./usuarioRoutes.js');
const authRoutes = require('./authRoutes.js');
const climaController = require('../controllers/climaController');
const { autenticar } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use('/usuarios', usuarioRoutes);
router.use('/', authRoutes);

router.get('/clima', autenticar, climaController.obterClima);

module.exports = router;