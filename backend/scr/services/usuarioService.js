const Usuario = require('../models/Usuario');

const obterTodosUsuario = async () => {
    return await Usuario.findAll({
        attributes: ['id', 'nome', 'email',]    
    }
    );
};

const obterUsuarioPorId = async (id) => {
    return await Usuario.findByPk(id, {
        attributes: ['id', 'nome', 'email']
    });
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
const criarUsuario = async (dados) => {
    return await Usuario.create(dados);
};

module.exports = {
    obterTodosUsuario,
    obterUsuarioPorId,
    atualizarUsuario,
    excluirUsuario,
    criarUsuario
}