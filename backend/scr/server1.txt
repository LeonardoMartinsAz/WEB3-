const express = require('express'); // para rotas e requisições HTTP
const cors = require('cors'); // segurança dos dados
const e = require('express');
const app = express();

app.use(cors());
app.use(express.json()); 

// rota raiz
app.get('/api/mensagem', (req, res) => {
    res.json({texto: "Olá do Servidor!"});
});

// rota para buscar o CEP usando a API viaCEP com resposta em JSON

app.get('/cep/:cep', async (req, res) => {
    const { cep } = req.params;
    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await resposta.json();
        if (dados.erro) {
            return res.status(404).json({
                erro: "CEP não encontrado"
            });
        }
        return res.status(200).json(dados);
    } catch (erro) {
        return res.status(500).json({
            erro: "Erro ao buscar o CEP usando a API ViaCEP"
        });
    }
});

// rota para buscar o CEP usando a API viaCEP com resposta em XML
app.get('/cep/xml/:cep', async (req, res) => {
    const { cep } = req.params;
    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/xml/`);
        const dados = await resposta.text();
        res.set('Content-Type', 'application/xml');
        res.send(dados);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao buscar o CEP usando a API viaCEP" });
    }   
});

// rota para buscar o CEP usando a API viaCEP com envio de parametros na URL
app.get('/endereco/:uf/:cidade/:logradouro/:formato', async (req, res) => {
    const { uf, cidade, logradouro, formato } = req.params;

    // formato válido
    if (formato !== 'json' && formato !== 'xml') {
        return res.status(400).json({
            erro: "O formato deve ser json ou xml"
        });
    }

    if (cidade.length < 3 || logradouro.length < 3) {
        return res.status(400).json({
            erro: "Cidade e logradouro devem possuir no mínimo 3 caracteres"
        });
    }

    try {
        // Codifica os parâmetros para que espaços e acentos funcionem corretamente
        const cidadeCodificada = encodeURIComponent(cidade);
        const logradouroCodificado = encodeURIComponent(logradouro);

        const url = `https://viacep.com.br/ws/${uf}/${cidadeCodificada}/${logradouroCodificado}/${formato}`;
        const resposta = await fetch(url);

        if (!resposta.ok) {
            return res.status(resposta.status).json({
                erro: "Erro ao realizar a pesquisa de endereço"
            });
        }

        // Retorno em JSON
        if (formato === 'json') {
            const dados = await resposta.json();
            return res.json(dados);
        }

        // Retorno em XML
        const dados = await resposta.text();

        res.set('Content-Type', 'application/xml');
        return res.send(dados);

    } catch (erro) {
        console.error(erro);

        return res.status(500).json({
            erro: "Erro ao buscar o endereço usando a API ViaCEP"
        });
    }
});

app.listen(3001);