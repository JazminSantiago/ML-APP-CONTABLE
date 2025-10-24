import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';

export default function RegisterForm({ onRegister, onBackToLogin }) {
  const [registerForm, setRegisterForm] = useState({ username: '', password: '', confirmPassword: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (registerForm.password !== registerForm.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    if (registerForm.password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    const result = onRegister(registerForm.username, registerForm.password);
    if (result.success) {
      alert(result.message);
      onBackToLogin();
    } else {
      alert(result.message);
    }
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
          <h2 className="text-xl font-bold text-gray-800 text-center">Registrar Nuevo Usuario</h2>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Usuario</label>
            <input
              type="text"
              value={registerForm.username}
              onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Elige un nombre de usuario"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Contraseña</label>
            <input
              type="password"
              value={registerForm.password}
              onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Confirmar Contraseña</label>
            <input
              type="password"
              value={registerForm.confirmPassword}
              onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Repite tu contraseña"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 font-semibold transition"
          >
            Registrar Usuario
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={onBackToLogin}
              className="text-indigo-600 hover:underline text-sm"
            >
              ← Volver al inicio de sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}