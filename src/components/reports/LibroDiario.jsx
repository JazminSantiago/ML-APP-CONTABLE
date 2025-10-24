import React from 'react';

export default function LibroDiario({ 
  entries, 
  endDate,
  onEndDateChange 
}) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8 border-b-2 border-purple-600 pb-4">
        <h2 className="text-xl font-bold text-gray-800">Bite Club S.A.</h2>
        <p className="text-lg font-semibold text-purple-600 mt-2">LIBRO DIARIO</p>
        <div className="flex justify-center items-center gap-4 mt-4">
          <label className="font-semibold text-gray-800">Al:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400 text-sm">
          <thead>
            <tr className="bg-gray-300">
              <th className="border border-gray-400 px-3 py-2 text-left">Fecha</th>
              <th className="border border-gray-400 px-3 py-2 text-left">Cuenta</th>
              <th className="border border-gray-400 px-3 py-2 text-right">Débito</th>
              <th className="border border-gray-400 px-3 py-2 text-right">Crédito</th>
              <th className="border border-gray-400 px-3 py-2 text-left">Descripción</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="border border-gray-400 px-3 py-2">{entry.date}</td>
                <td className="border border-gray-400 px-3 py-2 font-semibold">{entry.account}</td>
                <td className="border border-gray-400 px-3 py-2 text-right">
                  {entry.type === 'debit' ? `$${entry.amount.toFixed(2)}` : ''}
                </td>
                <td className="border border-gray-400 px-3 py-2 text-right">
                  {entry.type === 'credit' ? `$${entry.amount.toFixed(2)}` : ''}
                </td>
                <td className="border border-gray-400 px-3 py-2 text-xs">{entry.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}