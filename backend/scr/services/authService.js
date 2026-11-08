const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');
const Usuario = require('../models/Usuario');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const login = async (email, senha) => {
  const usuario = await Usuario.scope('comSenha').findOne({
    where: { email }
  });

  if (!usuario) {
    throw new Error('CREDENCIAIS_INVALIDAS');
  }

  const confere = await bcrypt.compare(senha, usuario.senha);
  
  if (!confere) {
    throw new Error('CREDENCIAIS_INVALIDAS');
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      perfil: usuario.perfil
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );

  return {
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    }
  };
};

const loginComGoogle = async (credential) => {
  // 1) Verifica a assinatura do token com as chaves públicas do Google
  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,  // confere se o token é PARA NÓS
  });

  const payload = ticket.getPayload();
  const { sub, email, name, email_verified, picture } = payload;

  if (!email_verified) {
    throw new Error('EMAIL_NAO_VERIFICADO');
  }

  // 2) Procura o usuário: primeiro pelo google_id, depois pelo email
  let usuario = await Usuario.findOne({ where: { google_id: sub } });
  
  if (!usuario) {
    usuario = await Usuario.findOne({ where: { email } });
    
    if (usuario) {
      usuario.google_id = sub;
      await usuario.save();
    } else {
      usuario = await Usuario.create({
        nome: name, 
        email, 
        google_id: sub, 
        foto: picture, 
        perfil: 'aluno'
      });
    }
  }

  if (!usuario.foto && picture) {
    usuario.foto = picture;
    await usuario.save();
  }

  // 3) Emite o NOSSO token, igual ao login por senha
  const token = jwt.sign(
    { id: usuario.id, perfil: usuario.perfil },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return { token, usuario: { id: usuario.id, nome: usuario.nome, foto: usuario.foto } };
};

module.exports = { login, loginComGoogle };