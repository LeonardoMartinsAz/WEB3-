const climaService = require('../services/climaService');

const obterClima = async (req, res) => {
  try {
    // Se a rota estiver protegida usa o ID do token, senão usa um ID fixo (ex: 1) para testes
    const usuario_id = req.usuario ? req.usuario.id : 1;
    
    const clima = await climaService.buscarESalvarClima(usuario_id);
    
    res.status(200).json(clima);
  } catch (error) {
    console.error('ERRO AO BUSCAR CLIMA:', error);
    res.status(500).json({ error: 'Erro ao processar a previsão do tempo' });
  }
};

module.exports = { obterClima };