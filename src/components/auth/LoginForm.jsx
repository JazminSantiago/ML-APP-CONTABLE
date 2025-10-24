import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';

export default function LoginForm({ onLogin, onShowRegister }) {
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = onLogin(loginForm.username, loginForm.password);
    if (!result.success) {
      alert(result.message);
    }
    setLoginForm({ username: '', password: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <DollarSign className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">Sistema Contable</h1>
          <p className="text-gray-600 mt-2">Bite Club S.A.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800 text-center">Iniciar Sesión</h2>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Usuario</label>
            <input
              type="text"
              value={loginForm.username}
              onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Ingresa tu usuario"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Contraseña</label>
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 font-semibold transition"
          >
            Entrar al Sistema
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={onShowRegister}
              className="text-indigo-600 hover:underline text-sm"
            >
              ¿No tienes cuenta? Regístrate aquí
            </button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded text-xs text-gray-600">
            <p className="font-semibold mb-2">👤 Usuarios de prueba:</p>
            <p>• Usuario: <strong>admin</strong> / Contraseña: <strong>admin123</strong></p>
            <p>• Usuario: <strong>contador</strong> / Contraseña: <strong>cont123</strong></p>
          </div>
        </form>
      </div>
    </div>
  );
}