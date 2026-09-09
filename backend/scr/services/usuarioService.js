const Usuario = require('../models/Usuario');

const obterTodosUsuario = async () => {
    return await Usuario.findAll();
};

const obterUsuarioPorId = async (id) => {
    return await Usuario.findByPk(id);
};

const atualizarUsuario = async (id, dados) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        return null;
    }
    await usuario.update(dados);
    return usuario;
};

const excluirUsuario = async (id) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        return null;
    }
    await usuario.destroy();
    return usuario;
};

module.exports = {
    obterTodosUsuario,
    obterUsuarioPorId,
    atualizarUsuario,
    excluirUsuario
    };