import React from 'react';

export default function MayorGeneral({ ledger, endDate }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8 border-b-2 border-blue-600 pb-4">
        <h2 className="text-xl font-bold text-gray-800">Bite Club S.A.</h2>
        <p className="text-lg font-semibold text-blue-600 mt-2">MAYOR GENERAL</p>
        <p className="text-sm text-gray-700 mt-1">
          Del 1° al {new Date(endDate).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
      <div className="space-y-8">
        {Object.entries(ledger).map(([accountName, entries]) => {
          let balance = 0;
          return (
            <div key={accountName} className="border-2 border-gray-400 rounded-lg p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b-2 border-gray-400">{accountName}</h3>
              <table className="w-full border-collapse border border-gray-400 text-sm">
                <thead>
                  <tr className="bg-gray-300">
                    <th className="border border-gray-400 px-3 py-2 text-left">Fecha</th>
                    <th className="border border-gray-400 px-3 py-2 text-left">Descripción</th>
                    <th className="border border-gray-400 px-3 py-2 text-right">Débito</th>
                    <th className="border border-gray-400 px-3 py-2 text-right">Crédito</th>
                    <th className="border border-gray-400 px-3 py-2 text-right">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, idx) => {
                    const debit = entry.type === 'debit' ? entry.amount : 0;
                    const credit = entry.type === 'credit' ? entry.amount : 0;
                    balance += debit - credit;
                    return (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td className="border border-gray-400 px-3 py-2">{entry.date}</td>
                        <td className="border border-gray-400 px-3 py-2 text-xs">{entry.description}</td>
                        <td className="border border-gray-400 px-3 py-2 text-right">
                          {debit > 0 ? `$${debit.toFixed(2)}` : ''}
                        </td>
                        <td className="border border-gray-400 px-3 py-2 text-right">
                          {credit > 0 ? `$${credit.toFixed(2)}` : ''}
                        </td>
                        <td className="border border-gray-400 px-3 py-2 text-right font-semibold">
                          ${balance.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="bg-indigo-100 font-bold">
                    <td colSpan="2" className="border border-gray-400 px-3 py-2">SALDO FINAL</td>
                    <td className="border border-gray-400 px-3 py-2"></td>
                    <td className="border border-gray-400 px-3 py-2"></td>
                    <td className="border border-gray-400 px-3 py-2 text-right">${balance.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}