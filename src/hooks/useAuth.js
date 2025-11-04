// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { authService } from '../services/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Cargar usuario al inicio
    const currentUser = authService.getCurrentUser();
    const currentToken = authService.getToken();
    
    if (currentUser && currentToken) {
      setUser(currentUser);
      setToken(currentToken);
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const data = await authService.login(username, password);
      
      if (data.token) {
        setUser(data.user);
        setToken(data.token);
        setIsLoggedIn(true);
        return { success: true };
      }
      
      return { success: false, message: data.message || 'Error al iniciar sesión' };
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, message: 'Error de conexión con el servidor' };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
  };

  const register = async (username, password) => {
    try {
      const data = await authService.register(username, password);
      
      if (data.message === 'Usuario registrado exitosamente') {
        return { success: true, message: data.message };
      }
      
      return { success: false, message: data.message || 'Error al registrar' };
    } catch (error) {
      console.error('Error en registro:', error);
      return { success: false, message: 'Error de conexión con el servidor' };
    }
  };

  return {
    isLoggedIn,
    currentUser: user?.username,
    user,
    token,
    login,
    logout,
    register
  };
};