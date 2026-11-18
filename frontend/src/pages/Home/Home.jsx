import React, { useEffect, useState } from 'react';
import api from '../../services/api'; // Ajuste o caminho do seu axios conforme o projeto

function Home() {
  const [clima, setClima] = useState(null);
  const [carregandoClima, setCarregandoClima] = useState(true);

  useEffect(() => {
    async function carregarClima() {
      try {
        const resposta = await api.get('/clima');
        setClima(resposta.data);
      } catch (error) {
        console.error('Erro ao carregar previsão do tempo', error);
      } finally {
        setCarregandoClima(false);
      }
    }

    carregarClima();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Bem-vindo ao Sistema!</h1>
      
      {/* Card de Previsão do Tempo */}
      <div className="card mt-4 p-3 shadow-sm" style={{ maxWidth: '300px' }}>
        <h3>Previsão do Tempo</h3>
        {carregandoClima ? (
          <p>Carregando clima...</p>
        ) : clima ? (
          <div>
            <p><strong>Cidade:</strong> {clima.cidade}</p>
            <p><strong>Temperatura Atual:</strong> {clima.temperatura}°C</p>
          </div>
        ) : (
          <p className="text-danger">Não foi possível carregar o clima.</p>
        )}
      </div>
    </div>
  );
}

export default Home;