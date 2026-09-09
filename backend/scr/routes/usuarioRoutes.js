const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

router.get('/', usuarioController.buscarUsuario);

router.get('/:id', usuarioController.buscarUsuarioPorId);

router.put('/:id', usuarioController.editarUsuario);

router.delete('/:id', usuarioController.excluirUsuario);

module.exports = router;