const usuarioService = require('../services/usuarioService');
const bcrypt = require('bcrypt');


const buscarUsuario = async (req, res) => {
    try {
        const Usuario = await usuarioService.obterTodosUsuario();
        res.status(200).json({ Usuario });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
};

const buscarUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await usuarioService.obterUsuarioPorId(id);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.status(200).json(usuario);

    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
};

const editarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const dados = req.body;
        const usuario = await usuarioService.atualizarUsuario(id, dados);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.status(200).json(usuario);

    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
};

const excluirUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await usuarioService.excluirUsuario(id);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).json({ message: 'Usuário excluído com sucesso' });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir usuário' });
    }
};

const criarUsuario = async (req, res) => {
    try {
        const { nome, email, senha, foto } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                error: 'Dados inválidos'
            });
        }

        const hash = await bcrypt.hash(senha, 10);

        const usuario = await usuarioService.criarUsuario({
            nome,
            email,
            senha: hash,
            foto
        });

        res.status(201).json(usuario);

    } catch (error) {
        console.error("Erro ao criar usuário: ", error);

        res.status(500).json({
            error: 'Erro ao criar usuário'
        });
    }
};

module.exports = {
    buscarUsuario,
    buscarUsuarioPorId,
    editarUsuario,
    excluirUsuario,
    criarUsuario
};