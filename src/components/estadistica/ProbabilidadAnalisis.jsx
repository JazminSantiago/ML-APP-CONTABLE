import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { calculateProbability, calculateFrequencyDistribution } from '../../utils/statistics';

export default function ProbabilidadAnalisis({ data }) {
  const { allAmounts, ingresos, gastos, totalTransactions } = data;
  const [montoMinimo, setMontoMinimo] = useState(5000);

  // Calcular probabilidades básicas
  const numIngresos = ingresos.length;
  const numGastos = gastos.length;
  
  const probIngreso = calculateProbability(numIngresos, totalTransactions);
  const probGasto = calculateProbability(numGastos, totalTransactions);

  // Probabilidad de transacción mayor a cierto monto
  const transaccionesMayores = allAmounts.filter(amount => amount > montoMinimo).length;
  const probMayorMonto = calculateProbability(transaccionesMayores, totalTransactions);

  // Distribución de frecuencias
  const distribucionFrecuencias = calculateFrequencyDistribution(allAmounts);

  // Datos para gráfica de pie
  const pieData = [
    { name: 'Ingresos', value: numIngresos, color: '#10b981' },
    { name: 'Gastos', value: numGastos, color: '#ef4444' }
  ];

  // Probabilidades condicionales
  const ingresosAltos = ingresos.filter(i => i > 10000).length;
  const gastosAltos = gastos.filter(g => g > 10000).length;
  
  const probIngresoAlto = numIngresos > 0 ? calculateProbability(ingresosAltos, numIngresos) : 0;
  const probGastoAlto = numGastos > 0 ? calculateProbability(gastosAltos, numGastos) : 0;

  return (
    <div className="space-y-8">
      {/* Teoría */}
      <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
        <h3 className="font-bold text-green-900 mb-2">📚 SUBCOMPETENCIA 3: Probabilidad</h3>
        <p className="text-sm text-green-800 mb-2">
          La probabilidad mide la posibilidad de que ocurra un evento. Se calcula como:
        </p>
        <div className="bg-white p-3 rounded text-center font-mono text-sm">
          P(A) = Número de casos favorables / Número total de casos
        </div>
        <p className="text-xs text-green-700 mt-2">
          Donde P(A) ∈ [0, 1], siendo 0 = imposible y 1 = seguro
        </p>
      </div>

      {/* Probabilidades Básicas */}
      <div className="bg-white border-2 border-green-300 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
          🎲 Probabilidades Simples
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-green-50 p-6 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Probabilidad de Ingreso</p>
            <p className="text-4xl font-bold text-green-600 mb-2">
              {(probIngreso * 100).toFixed(2)}%
            </p>
            <div className="text-xs text-gray-600 space-y-1">
              <p>P(Ingreso) = {numIngresos} / {totalTransactions}</p>
              <p>= {probIngreso.toFixed(4)}</p>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              De cada 100 transacciones, aproximadamente {Math.round(probIngreso * 100)} son ingresos
            </p>
          </div>

          <div className="bg-red-50 p-6 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Probabilidad de Gasto</p>
            <p className="text-4xl font-bold text-red-600 mb-2">
              {(probGasto * 100).toFixed(2)}%
            </p>
            <div className="text-xs text-gray-600 space-y-1">
              <p>P(Gasto) = {numGastos} / {totalTransactions}</p>
              <p>= {probGasto.toFixed(4)}</p>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              De cada 100 transacciones, aproximadamente {Math.round(probGasto * 100)} son gastos
            </p>
          </div>
        </div>

        {/* Gráfica de distribución */}
        <div className="flex justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Probabilidad Condicional */}
      <div className="bg-white border-2 border-blue-300 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
          🔗 Probabilidades Condicionales
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Probabilidad de que una transacción sea "alta" (mayor a $10,000) dado que es ingreso o gasto
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">P(Alto | Ingreso)</p>
            <p className="text-4xl font-bold text-blue-600 mb-2">
              {(probIngresoAlto * 100).toFixed(2)}%
            </p>
            <div className="text-xs text-gray-600 space-y-1">
              <p>Ingresos mayores a $10,000: {ingresosAltos}</p>
              <p>Total de ingresos: {numIngresos}</p>
              <p>P(Alto|Ingreso) = {ingresosAltos}/{numIngresos} = {probIngresoAlto.toFixed(4)}</p>
            </div>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">P(Alto | Gasto)</p>
            <p className="text-4xl font-bold text-orange-600 mb-2">
              {(probGastoAlto * 100).toFixed(2)}%
            </p>
            <div className="text-xs text-gray-600 space-y-1">
              <p>Gastos mayores a $10,000: {gastosAltos}</p>
              <p>Total de gastos: {numGastos}</p>
              <p>P(Alto|Gasto) = {gastosAltos}/{numGastos} = {probGastoAlto.toFixed(4)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Probabilidad Personalizada */}
      <div className="bg-white border-2 border-purple-300 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
          🎯 Calculadora de Probabilidad Personalizada
        </h3>
        
        <div className="bg-purple-50 p-6 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <label className="font-semibold text-gray-700">
              ¿Cuál es la probabilidad de una transacción mayor a $
            </label>
            <input
              type="number"
              value={montoMinimo}
              onChange={(e) => setMontoMinimo(Number(e.target.value))}
              className="p-2 border-2 border-purple-300 rounded w-32"
              min="0"
              step="1000"
            />
            <label className="font-semibold text-gray-700">?</label>
          </div>

          <div className="bg-white p-6 rounded-lg">
            <p className="text-5xl font-bold text-purple-600 mb-4 text-center">
              {(probMayorMonto * 100).toFixed(2)}%
            </p>
            <div className="text-sm text-gray-600 text-center space-y-2">
              <p>Transacciones mayores a ${montoMinimo.toLocaleString()}: <strong>{transaccionesMayores}</strong></p>
              <p>Total de transacciones: <strong>{totalTransactions}</strong></p>
              <p className="font-mono bg-gray-100 p-2 rounded">
                P(X &gt; ${montoMinimo.toLocaleString()}) = {transaccionesMayores}/{totalTransactions} = {probMayorMonto.toFixed(4)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Distribución de Frecuencias */}
      <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
          📊 Distribución de Frecuencias y Probabilidades
        </h3>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={distribucionFrecuencias}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="value" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="frequency" fill="#3b82f6" name="Frecuencia" />
            <Bar yAxisId="right" dataKey="probability" fill="#10b981" name="Probabilidad" />
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-3 py-2">Rango de Monto</th>
                <th className="border border-gray-300 px-3 py-2">Frecuencia</th>
                <th className="border border-gray-300 px-3 py-2">Frecuencia Relativa</th>
                <th className="border border-gray-300 px-3 py-2">Probabilidad</th>
              </tr>
            </thead>
            <tbody>
              {distribucionFrecuencias.map((item, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : ''}>
                  <td className="border border-gray-300 px-3 py-2">
                    ${item.value.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    {item.frequency}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    {item.relativeFrequency.toFixed(4)}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center font-semibold text-green-600">
                    {(item.probability * 100).toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interpretación */}
      <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
        <h4 className="font-bold text-green-900 mb-2">🔍 Interpretación de Probabilidades</h4>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• <strong>Axioma 1:</strong> 0 ≤ P(A) ≤ 1 para todo evento A</li>
          <li>• <strong>Axioma 2:</strong> P(Ingreso) + P(Gasto) = {(probIngreso + probGasto).toFixed(4)} ≈ 1 (eventos complementarios)</li>
          <li>• <strong>Probabilidad condicional:</strong> P(A|B) = P(A∩B) / P(B), mide la probabilidad de A dado que B ocurrió</li>
          <li>• <strong>Frecuencia relativa:</strong> A medida que aumentan las transacciones, la frecuencia relativa se aproxima a la probabilidad teórica</li>
        </ul>
      </div>
    </div>
  );
}