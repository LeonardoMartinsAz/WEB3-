const HistoricoClima = require('../models/HistoricoClima');

const buscarESalvarClima = async (usuario_id) => {
  const lat = -25.4284;
  const lon = -49.2733;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  const resposta = await fetch(url);
  const dados = await resposta.json();

  const temperaturaAtual = dados.current_weather.temperature;

  //guardar a informação na nova tabela, associando ao utilizador logado
  const historico = await HistoricoClima.create({
    temperatura: temperaturaAtual,
    cidade: 'Curitiba',
    usuario_id: usuario_id
  });

  return historico;
};

module.exports = { buscarESalvarClima };