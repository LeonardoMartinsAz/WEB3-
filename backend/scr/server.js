const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const router = require('../scr/routes/routes');

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
// no terminal tem que colocar 
// npm init 
// npm i        
// npm i express
// npm i cors 
// npm i nodemon
// npm run start 
// p acessar no google http://localhost:3000/usuarios