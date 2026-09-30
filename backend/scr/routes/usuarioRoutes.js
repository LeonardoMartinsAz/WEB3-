const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();
const { autenticar, autorizar } = require('../middlewares/authMiddleware');

router.get('/', autenticar, usuarioController.buscarUsuario);

router.get('/:id', autenticar, usuarioController.buscarUsuarioPorId);

router.post('/', usuarioController.criarUsuario);

router.put('/:id', autenticar, usuarioController.editarUsuario);

router.delete('/:id', autenticar, autorizar('admin'), usuarioController.excluirUsuario);

module.exports = router;