import React from 'react';
import { DollarSign } from 'lucide-react';

export default function Header({ currentUser, onLogout, onClearData }) {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-between">
        <div className="flex-1"></div>
        <div className="flex-1 flex items-center justify-center gap-2">
          <DollarSign className="w-10 h-10 text-indigo-600" />
          <h1 className="text-4xl font-bold text-gray-800">Sistema Contable</h1>
        </div>
        <div className="flex-1 flex justify-end items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Usuario:</p>
            <p className="font-bold text-gray-800">{currentUser}</p>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm font-semibold"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
      <p className="text-gray-600 mt-2">Gestiona transacciones y ajustes contables</p>
      <button 
        onClick={onClearData}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
      >
        🗑️ Limpiar Todos los Datos
      </button>
    </div>
  );
}