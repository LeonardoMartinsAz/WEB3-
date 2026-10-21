import { createContext, useContext, useState } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('usuario')) || null;
    } catch {
      return null;
    }
  });

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const entrar = async (email, senha) => {
    setCarregando(true);
    setErro('');
    try {
      const dados = await authService.login(email, senha);
      authService.salvarSessao(dados.token, dados.usuario);
      setUsuario(dados.usuario);
      return true;
    } catch (e) {
      setErro('Email ou senha inválidos');
      return false;
    } finally {
      setCarregando(false);
    }
  };

  const sair = () => {
    authService.limparSessao();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{ usuario, entrar, sair, carregando, erro }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);