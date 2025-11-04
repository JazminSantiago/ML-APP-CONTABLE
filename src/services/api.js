// src/services/api.js
const API_URL = 'http://localhost:5000/api';

// Helper para obtener el token
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Servicio de autenticación
export const authService = {
  async login(username, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  async register(username, password) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    return await response.json();
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken() {
    return localStorage.getItem('token');
  }
};

// Servicio de transacciones
export const transactionService = {
  async getAll() {
    const response = await fetch(`${API_URL}/transactions`, {
      headers: getAuthHeader()
    });
    return await response.json();
  },

  async create(transaction) {
    const response = await fetch(`${API_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(transaction)
    });
    return await response.json();
  },

  async delete(id) {
    const response = await fetch(`${API_URL}/transactions/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return await response.json();
  }
};

// Servicio de ajustes
export const adjustmentService = {
  async getAll() {
    const response = await fetch(`${API_URL}/adjustments`, {
      headers: getAuthHeader()
    });
    return await response.json();
  },

  async create(adjustment) {
    const response = await fetch(`${API_URL}/adjustments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(adjustment)
    });
    return await response.json();
  },

  async delete(id) {
    const response = await fetch(`${API_URL}/adjustments/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return await response.json();
  }
};