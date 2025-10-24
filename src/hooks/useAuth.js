import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';

const defaultUsers = [
  { username: 'admin', password: 'admin123' },
  { username: 'contador', password: 'cont123' }
];

export const useAuth = () => {
  const [users, setUsers] = useLocalStorage('users', defaultUsers);
  const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!currentUser);

  const login = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(username);
      setIsLoggedIn(true);
      return { success: true };
    }
    return { success: false, message: 'Usuario o contraseña incorrectos' };
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const register = (username, password) => {
    if (users.find(u => u.username === username)) {
      return { success: false, message: 'El usuario ya existe' };
    }
    setUsers([...users, { username, password }]);
    return { success: true, message: 'Usuario registrado exitosamente' };
  };

  return {
    isLoggedIn,
    currentUser,
    login,
    logout,
    register
  };
};