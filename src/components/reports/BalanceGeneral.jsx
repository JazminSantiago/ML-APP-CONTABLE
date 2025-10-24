import React from 'react';

export default function BalanceGeneral({ 
  assets, 
  liabilities, 
  equity, 
  totalAssets, 
  totalLiabilities, 
  totalEquity, 
  utilidadNeta,
  startDate, // Nuevo prop para fecha inicial
  endDate,
  onStartDateChange, // Nuevo prop para manejar cambio de fecha inicial
  onEndDateChange 
}) {
  const totalCapitalConUtilidad = totalEquity + utilidadNeta;
  const totalPasivoCapital = totalLiabilities + totalCapitalConUtilidad;
  const isBalanced = Math.abs(totalAssets - totalPasivoCapital) < 0.01;

  return (
    <div className="border-2 border-indigo-600 rounded-lg p-6 bg-indigo-50">
      <div className="text-center mb-8 border-b-2 border-indigo-600 pb-4">
        <h2 className="text-xl font-bold text-gray-800">Bite Club S.A.</h2>
        <p className="text-lg font-semibold text-indigo-600 mt-2">BALANCE GENERAL</p>
        <div className="flex justify-center items-center gap-4 mt-4">
          <label className="font-semibold text-gray-800">Del:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="p-2 border rounded"
          />
          <label className="font-semibold text-gray-800">al:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="p-2 border rounded"
          />
          <span className="text-sm text-gray-700">
            ({new Date(endDate).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })})
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* ACTIVOS */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">ACTIVOS</h3>
          <div className="space-y-2 mb-4">
            {Object.entries(assets).map(([account, balance]) => (
              <div key={account} className="flex justify-between px-4 py-2">
                <span className="text-gray-700">{account}</span>
                <span className="font-semibold text-gray-900">${balance.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between px-4 py-3 bg-indigo-200 font-bold text-lg rounded">
            <span>Total Activos</span>
            <span>${totalAssets.toFixed(2)}</span>
          </div>
        </div>

        {/* PASIVOS Y CAPITAL */}
        <div className="space-y-6">
          {/* PASIVOS */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">PASIVOS</h3>
            <div className="space-y-2 mb-4">
              {Object.entries(liabilities).map(([account, balance]) => (
                <div key={account} className="flex justify-between px-4 py-2">
                  <span className="text-gray-700">{account}</span>
                  <span className="font-semibold text-gray-900">${balance.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between px-4 py-2 bg-orange-100 font-semibold rounded">
              <span>Total Pasivos</span>
              <span>${totalLiabilities.toFixed(2)}</span>
            </div>
          </div>

          {/* CAPITAL SOCIAL */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">CAPITAL SOCIAL</h3>
            <div className="space-y-2 mb-4">
              {Object.entries(equity).map(([account, balance]) => (
                <div key={account} className="flex justify-between px-4 py-2">
                  <span className="text-gray-700">{account}</span>
                  <span className="font-semibold text-gray-900">${balance.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between px-4 py-2 bg-green-50 border-t-2 border-gray-300 pt-3">
                <span className="text-gray-700 font-semibold">Utilidad Neta del Ejercicio</span>
                <span className="font-semibold text-green-700">${utilidadNeta.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between px-4 py-2 bg-green-100 font-semibold rounded">
              <span>Total Capital Social</span>
              <span>${totalCapitalConUtilidad.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* VERIFICACIÓN */}
      <div className="mt-4 p-3 bg-blue-100 rounded text-sm text-gray-700">
        <p className="font-semibold">Verificación: Activos = Pasivos + Capital Social</p>
        <p>${totalAssets.toFixed(2)} = ${totalPasivoCapital.toFixed(2)}</p>
        {isBalanced ? (
          <p className="text-green-700 font-bold mt-2">✅ La ecuación contable está balanceada</p>
        ) : (
          <p className="text-red-700 font-bold mt-2">
            ⚠️ Diferencia: ${(totalAssets - totalPasivoCapital).toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
}