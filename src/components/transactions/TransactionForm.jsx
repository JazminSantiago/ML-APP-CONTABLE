import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { accountTypes } from '../../utils/accountTypes';

export default function TransactionForm({ onAddTransaction }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    account: '',
    type: 'debit',
    amount: '',
    description: ''
  });

  const handleSubmit = () => {
    if (formData.account && formData.amount) {
      onAddTransaction(formData);
      setFormData({ 
        date: new Date().toISOString().split('T')[0], 
        account: '', 
        type: 'debit', 
        amount: '', 
        description: '' 
      });
    }
  };

  return (
    <div className="bg-indigo-50 p-6 rounded-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Registrar Transacción</h2>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <input 
          type="date" 
          value={formData.date} 
          onChange={(e) => setFormData({...formData, date: e.target.value})} 
          className="p-2 border rounded" 
        />
        <select 
          value={formData.account} 
          onChange={(e) => setFormData({...formData, account: e.target.value})} 
          className="p-2 border rounded"
        >
          <option value="">Seleccionar cuenta</option>
          {Object.keys(accountTypes).map(acc => (
            <option key={acc} value={acc}>{acc}</option>
          ))}
        </select>
        <select 
          value={formData.type} 
          onChange={(e) => setFormData({...formData, type: e.target.value})} 
          className="p-2 border rounded"
        >
          <option value="debit">Débito</option>
          <option value="credit">Crédito</option>
        </select>
        <input 
          type="number" 
          placeholder="Monto" 
          value={formData.amount} 
          onChange={(e) => setFormData({...formData, amount: e.target.value})} 
          className="p-2 border rounded" 
        />
        <input 
          type="text" 
          placeholder="Descripción" 
          value={formData.description} 
          onChange={(e) => setFormData({...formData, description: e.target.value})} 
          className="p-2 border rounded" 
        />
        <button 
          onClick={handleSubmit} 
          className="bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> Agregar
        </button>
      </div>
    </div>
  );
}