import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function AdjustmentForm({ onAddAdjustment }) {
  const [adjustForm, setAdjustForm] = useState({
    date: new Date().toISOString().split('T')[0],
    adjustmentType: 'depreciation-edificio',
    amount: '',
    description: ''
  });

  const handleSubmit = () => {
    if (adjustForm.amount) {
      onAddAdjustment(adjustForm);
      setAdjustForm({ 
        date: new Date().toISOString().split('T')[0], 
        adjustmentType: 'depreciation-edificio', 
        amount: '', 
        description: '' 
      });
    }
  };

  return (
    <div className="bg-green-50 p-6 rounded-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Registrar Ajuste</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <input 
          type="date" 
          value={adjustForm.date} 
          onChange={(e) => setAdjustForm({...adjustForm, date: e.target.value})} 
          className="p-2 border rounded" 
        />
        <select 
          value={adjustForm.adjustmentType} 
          onChange={(e) => setAdjustForm({...adjustForm, adjustmentType: e.target.value})} 
          className="p-2 border rounded"
        >
          <option value="depreciation-edificio">Depreciación - Edificio</option>
          <option value="depreciation-mobiliario">Depreciación - Mobiliario</option>
          <option value="depreciation-computo">Depreciación - Eq. Cómputo</option>
          <option value="depreciation-reparto">Depreciación - Eq. Reparto</option>
          <option value="depreciation-transporte">Depreciación - Eq. Transporte</option>
          <option value="depreciation-instalacion">Depreciación - Gtos. Instalación</option>
          <option value="rent-expense">Gasto de Renta</option>
          <option value="stationery-expense">Gasto de Papelería</option>
        </select>
        <input 
          type="number" 
          placeholder="Monto" 
          value={adjustForm.amount} 
          onChange={(e) => setAdjustForm({...adjustForm, amount: e.target.value})} 
          className="p-2 border rounded" 
        />
        <input 
          type="text" 
          placeholder="Descripción" 
          value={adjustForm.description} 
          onChange={(e) => setAdjustForm({...adjustForm, description: e.target.value})} 
          className="p-2 border rounded" 
        />
        <button 
          onClick={handleSubmit} 
          className="bg-green-600 text-white rounded hover:bg-green-700 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> Agregar
        </button>
      </div>
    </div>
  );
}