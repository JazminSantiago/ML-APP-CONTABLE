import React from 'react';

export default function EstadoResultados({ 
  balances,
  totalRevenues,
  utilidadAntesImpuestos,
  isrCalculado,
  ptuCalculado,
  utilidadNeta,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange
}) {
  const costoVentas = Math.abs(balances['Costo de Ventas'] || 0);
  const gastosVenta = Math.abs(balances['Gastos de Venta'] || 0);
  const gastosAdmon = Math.abs(balances['Gastos de Administración'] || 0);
  const gastosDepreciacion = Math.abs(balances['Gastos de Depreciación'] || 0);
  const inventario = Math.abs(balances['Inventario'] || 0);
  
  const utilidadBruta = totalRevenues - costoVentas;
  const gastosOperacion = gastosVenta + gastosAdmon + gastosDepreciacion;

  return (
    <div className="border-2 border-green-600 rounded-lg p-6 bg-green-50">
      <div className="text-center mb-8 border-b-2 border-green-600 pb-4">
        <h2 className="text-xl font-bold text-gray-800">Bite Club S.A.</h2>
        <p className="text-lg font-semibold text-green-600 mt-2">ESTADO DE RESULTADOS</p>
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
        </div>
      </div>

      <div className="max-w-5xl mx-auto overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400 text-sm">
          <thead>
            <tr className="bg-gray-300">
              <th className="border border-gray-400 px-3 py-2 text-left">Cuentas</th>
              <th className="border border-gray-400 px-3 py-2 text-center">1</th>
              <th className="border border-gray-400 px-3 py-2 text-center">2</th>
              <th className="border border-gray-400 px-3 py-2 text-center">3</th>
              <th className="border border-gray-400 px-3 py-2 text-center">4</th>
            </tr>
          </thead>
          <tbody>
            {/* VENTAS TOTALES */}
            <tr>
              <td className="border border-gray-400 px-3 py-2 font-bold">Ventas totales</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2 text-right font-semibold">${totalRevenues.toFixed(2)}</td>
            </tr>

            <tr>
              <td className="border border-gray-400 px-3 py-2">Reb. S/Ventas</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
            </tr>

            <tr>
              <td className="border border-gray-400 px-3 py-2">Destos. S/Ventas</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
            </tr>

            <tr className="bg-blue-50">
              <td className="border border-gray-400 px-3 py-2 font-bold">Ventas netas</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2 text-right font-bold">${totalRevenues.toFixed(2)}</td>
            </tr>

            {/* INVENTARIO Y COMPRAS */}
            <tr>
              <td className="border border-gray-400 px-3 py-2">Inventario inicial</td>
              <td className="border border-gray-400 px-3 py-2 text-right">${inventario > 0 ? '20000.00' : '0.00'}</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
            </tr>

            <tr>
              <td className="border border-gray-400 px-3 py-2">Compras</td>
              <td className="border border-gray-400 px-3 py-2 text-right">$8000.00</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
            </tr>

            <tr>
              <td className="border border-gray-400 px-3 py-2">Gastos de compra</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
            </tr>

            <tr>
              <td className="border border-gray-400 px-3 py-2">Compras totales</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2 text-right">$8000.00</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
            </tr>

            <tr>
              <td className="border border-gray-400 px-3 py-2">Destos. S/Compras</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2 text-right">$0.00</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
            </tr>

            <tr>
              <td className="border border-gray-400 px-3 py-2">Dev. S/Compras</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2 text-right">$0.00</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
            </tr>

            <tr>
              <td className="border border-gray-400 px-3 py-2">Reb. S/Compras</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2 text-right">$0.00</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
            </tr>

            <tr>
              <td className="border border-gray-400 px-3 py-2">Compras netas</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2 text-right">$8000.00</td>
              <td className="border border-gray-400 px-3 py-2"></td>
            </tr>

            <tr>
              <td className="border border-gray-400 px-3 py-2">Total mercancías</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2 text-right">$28000.00</td>
            </tr>

            <tr>
              <td className="border border-gray-400 px-3 py-2">Inventario final</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2 text-right">${inventario.toFixed(2)}</td>
              <td className="border border-gray-400 px-3 py-2"></td>
            </tr>

            <tr className="bg-gray-100">
              <td className="border border-gray-400 px-3 py-2 font-bold">Costo de ventas</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2 text-right font-semibold">${costoVentas.toFixed(2)}</td>
            </tr>

            {/* UTILIDAD BRUTA */}
            <tr className="bg-blue-100">
              <td className="border border-gray-400 px-3 py-2 font-bold">Utilidad bruta</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2 text-right font-bold">${utilidadBruta.toFixed(2)}</td>
            </tr>

            {/* GASTOS DE OPERACIÓN */}
            <tr className="bg-gray-200">
              <td className="border border-gray-400 px-3 py-2 font-bold">Gastos de operación</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2 text-right font-bold">${gastosOperacion.toFixed(2)}</td>
            </tr>

            <tr>
              <td className="border border-gray-400 px-3 py-2 pl-6">Gastos de venta</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2 text-right">${gastosVenta.toFixed(2)}</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
            </tr>

            <tr>
              <td className="border border-gray-400 px-3 py-2 pl-6">Gastos de admon</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2 text-right">${gastosAdmon.toFixed(2)}</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
            </tr>

            <tr>
              <td className="border border-gray-400 px-3 py-2 pl-6">Gastos de Depreciación</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2 text-right">${gastosDepreciacion.toFixed(2)}</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
            </tr>

            {/* UTILIDAD ANTES DE IMPUESTOS */}
            <tr className="bg-yellow-100">
              <td className="border border-gray-400 px-3 py-2 font-bold">Utilidad antes de impuestos</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2 text-right font-bold">${utilidadAntesImpuestos.toFixed(2)}</td>
            </tr>

            {/* IMPUESTOS */}
            <tr>
              <td className="border border-gray-400 px-3 py-2">ISR 30%</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2 text-right">${isrCalculado.toFixed(2)}</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
            </tr>

            <tr>
              <td className="border border-gray-400 px-3 py-2">PTU 10%</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2 text-right">${ptuCalculado.toFixed(2)}</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
            </tr>

            <tr className="bg-red-100">
              <td className="border border-gray-400 px-3 py-2 font-bold">Utilidad después de impuestos</td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2"></td>
              <td className="border border-gray-400 px-3 py-2 text-right font-bold text-green-900">${utilidadNeta.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}