import React from 'react';
import { Trash2 } from 'lucide-react';

export default function TransactionList({ transactions, onDelete }) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay transacciones registradas
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Fecha</th>
            <th className="border border-gray-300 px-4 py-2">Cuenta</th>
            <th className="border border-gray-300 px-4 py-2">Tipo</th>
            <th className="border border-gray-300 px-4 py-2">Monto</th>
            <th className="border border-gray-300 px-4 py-2">Descripción</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{tx.date}</td>
              <td className="border border-gray-300 px-4 py-2 font-semibold">{tx.account}</td>
              <td className="border border-gray-300 px-4 py-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  tx.type === 'debit' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                }`}>
                  {tx.type === 'debit' ? 'Débito' : 'Crédito'}
                </span>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
                ${tx.amount.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-sm">{tx.description}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => onDelete(tx.id)}
                  className="text-red-600 hover:text-red-800 inline-flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" /> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}