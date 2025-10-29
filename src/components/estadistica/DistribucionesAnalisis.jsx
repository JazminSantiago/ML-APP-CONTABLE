import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  calculateMean,
  calculateStandardDeviation,
  normalPDF,
  calculateZScore,
  binomialProbability,
  createHistogramData
} from '../../utils/statistics';

export default function DistribucionesAnalisis({ data }) {
  const { allAmounts, ingresos, gastos } = data;
  
  // Estados para distribuciones interactivas
  const [zValue, setZValue] = useState(1.96);
  const [binomialN, setBinomialN] = useState(10);
  const [binomialK, setBinomialK] = useState(5);
  const [binomialP, setBinomialP] = useState(0.5);

  // Estadísticas básicas
  const mean = calculateMean(allAmounts);
  const stdDev = calculateStandardDeviation(allAmounts);

  // Crear datos para la curva normal
  const normalDistData = [];
  for (let i = -4; i <= 4; i += 0.1) {
    const x = mean + i * stdDev;
    const y = normalPDF(x, mean, stdDev);
    normalDistData.push({ x: x.toFixed(2), y: y * 1000 }); // Multiplicamos para mejor visualización
  }

  // Calcular Z-score
  const zScore = calculateZScore(zValue, 0, 1);
  
  // Probabilidad binomial
  const binomProb = binomialProbability(binomialN, binomialK, binomialP);

  // Histograma de los datos
  const histogram = createHistogramData(allAmounts, 10);

  return (
    <div className="space-y-8">
      {/* Teoría */}
      <div className="bg-purple-50 border-l-4 border-purple-600 p-4 rounded">
        <h3 className="font-bold text-purple-900 mb-2">📚 SUBCOMPETENCIA 4: Variables Aleatorias y Distribuciones de Probabilidad</h3>
        <p className="text-sm text-purple-800 mb-2">
          Las distribuciones de probabilidad describen cómo se distribuyen los valores de una variable aleatoria.
          Las más comunes son la distribución normal (continua) y la binomial (discreta).
        </p>
      </div>

      {/* Distribución Normal */}
      <div className="bg-white border-2 border-purple-300 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
          📈 Distribución Normal (Gaussiana)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-3">Parámetros de la Distribución</h4>
            <div className="space-y-2 text-sm">
              <p><strong>Media (μ):</strong> ${mean.toFixed(2)}</p>
              <p><strong>Desviación Estándar (σ):</strong> ${stdDev.toFixed(2)}</p>
              <p className="text-xs text-gray-600 mt-3">
                La distribución normal se describe completamente con estos dos parámetros.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-3">Regla 68-95-99.7</h4>
            <div className="space-y-2 text-sm">
              <p>• 68% de los datos: μ ± 1σ</p>
              <p className="text-xs text-gray-600 ml-4">
                [${(mean - stdDev).toFixed(2)}, ${(mean + stdDev).toFixed(2)}]
              </p>
              <p>• 95% de los datos: μ ± 2σ</p>
              <p className="text-xs text-gray-600 ml-4">
                [${(mean - 2*stdDev).toFixed(2)}, ${(mean + 2*stdDev).toFixed(2)}]
              </p>
              <p>• 99.7% de los datos: μ ± 3σ</p>
              <p className="text-xs text-gray-600 ml-4">
                [${(mean - 3*stdDev).toFixed(2)}, ${(mean + 3*stdDev).toFixed(2)}]
              </p>
            </div>
          </div>
        </div>

        {/* Gráfica de la curva normal */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3">Curva Normal de los Datos</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={normalDistData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" label={{ value: 'Monto ($)', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Densidad', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Line type="monotone" dataKey="y" stroke="#8b5cf6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Calculadora de Z-score */}
        <div className="bg-indigo-50 p-6 rounded-lg">
          <h4 className="font-bold text-gray-800 mb-4">🔢 Calculadora de Z-Score</h4>
          <p className="text-sm text-gray-600 mb-3">
            El Z-score indica cuántas desviaciones estándar está un valor de la media.
          </p>
          
          <div className="flex items-center gap-4 mb-4">
            <label className="font-semibold text-gray-700">Valor a evaluar: $</label>
            <input
              type="number"
              value={zValue}
              onChange={(e) => setZValue(Number(e.target.value))}
              className="p-2 border-2 border-indigo-300 rounded w-32"
              step="100"
            />
          </div>

          <div className="bg-white p-4 rounded">
            <p className="text-2xl font-bold text-indigo-600 mb-2">
              Z = {calculateZScore(zValue, mean, stdDev).toFixed(4)}
            </p>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-mono bg-gray-100 p-2 rounded">
                Z = (X - μ) / σ = ({zValue} - {mean.toFixed(2)}) / {stdDev.toFixed(2)}
              </p>
              <p className="mt-3">
                <strong>Interpretación:</strong> El valor ${zValue} está{' '}
                {Math.abs(calculateZScore(zValue, mean, stdDev)).toFixed(2)} desviaciones estándar{' '}
                {calculateZScore(zValue, mean, stdDev) > 0 ? 'por encima' : 'por debajo'} de la media.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparación con histograma real */}
      <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
          📊 Ajuste a la Distribución Normal
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={histogram}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3b82f6" name="Frecuencia Observada" />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-600 mt-4 text-center">
          Distribución de frecuencias de los montos vs. curva normal teórica
        </p>
      </div>

      {/* Distribución Binomial */}
      <div className="bg-white border-2 border-green-300 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
          🎲 Distribución Binomial
        </h3>
        
        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-700 mb-2">
            La distribución binomial modela el número de éxitos en n ensayos independientes,
            cada uno con probabilidad p de éxito.
          </p>
          <p className="text-xs text-gray-600 font-mono bg-white p-2 rounded">
            P(X = k) = C(n,k) × p^k × (1-p)^(n-k)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Número de ensayos (n):
            </label>
            <input
              type="number"
              value={binomialN}
              onChange={(e) => setBinomialN(Number(e.target.value))}
              className="w-full p-2 border-2 border-green-300 rounded"
              min="1"
              max="50"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Éxitos deseados (k):
            </label>
            <input
              type="number"
              value={binomialK}
              onChange={(e) => setBinomialK(Number(e.target.value))}
              className="w-full p-2 border-2 border-green-300 rounded"
              min="0"
              max={binomialN}
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Probabilidad de éxito (p):
            </label>
            <input
              type="number"
              value={binomialP}
              onChange={(e) => setBinomialP(Number(e.target.value))}
              className="w-full p-2 border-2 border-green-300 rounded"
              min="0"
              max="1"
              step="0.1"
            />
          </div>
        </div>

        <div className="bg-white border-2 border-green-400 p-6 rounded-lg">
          <h4 className="font-bold text-gray-800 mb-3">Resultado</h4>
          <p className="text-4xl font-bold text-green-600 mb-3">
            P(X = {binomialK}) = {(binomProb * 100).toFixed(4)}%
          </p>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <strong>Interpretación:</strong> La probabilidad de obtener exactamente {binomialK} éxitos
              en {binomialN} ensayos, donde cada ensayo tiene una probabilidad de éxito de {binomialP},
              es de {(binomProb * 100).toFixed(4)}%.
            </p>
            <p className="bg-gray-50 p-3 rounded mt-3">
              <strong>Ejemplo aplicado a transacciones:</strong> Si consideramos que una transacción es "exitosa"
              (ingreso alto) con probabilidad {binomialP}, entonces en {binomialN} transacciones,
              la probabilidad de tener exactamente {binomialK} transacciones exitosas es {(binomProb * 100).toFixed(2)}%.
            </p>
          </div>
        </div>

        {/* Gráfica de distribución binomial */}
        <div className="mt-6">
          <h4 className="font-semibold text-gray-800 mb-3">Distribución de Probabilidades</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={
              Array.from({ length: binomialN + 1 }, (_, k) => ({
                k: k,
                probability: binomialProbability(binomialN, k, binomialP) * 100
              }))
            }>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="k" label={{ value: 'Número de éxitos (k)', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Probabilidad (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="probability" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comparación de Distribuciones */}
      <div className="bg-white border-2 border-orange-300 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
          🔍 Análisis Comparativo: Ingresos vs Gastos
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-bold text-green-800 mb-3">📥 Distribución de Ingresos</h4>
            <div className="space-y-2 text-sm">
              <p><strong>Media:</strong> ${calculateMean(ingresos).toFixed(2)}</p>
              <p><strong>Desv. Estándar:</strong> ${calculateStandardDeviation(ingresos).toFixed(2)}</p>
              <p><strong>Total:</strong> {ingresos.length} transacciones</p>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-bold text-red-800 mb-3">📤 Distribución de Gastos</h4>
            <div className="space-y-2 text-sm">
              <p><strong>Media:</strong> ${calculateMean(gastos).toFixed(2)}</p>
              <p><strong>Desv. Estándar:</strong> ${calculateStandardDeviation(gastos).toFixed(2)}</p>
              <p><strong>Total:</strong> {gastos.length} transacciones</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interpretación */}
      <div className="bg-purple-50 border-l-4 border-purple-600 p-4 rounded">
        <h4 className="font-bold text-purple-900 mb-2">🔍 Interpretación de Distribuciones</h4>
        <ul className="text-sm text-purple-800 space-y-1">
          <li>• <strong>Distribución Normal:</strong> Útil para modelar variables continuas como montos de transacciones</li>
          <li>• <strong>Teorema del Límite Central:</strong> A medida que aumenta el tamaño de la muestra, la distribución de las medias muestrales se aproxima a una distribución normal</li>
          <li>• <strong>Distribución Binomial:</strong> Modela eventos discretos (éxito/fracaso) como transacciones exitosas</li>
          <li>• <strong>Z-score:</strong> Valores con |Z| &gt; 2 son considerados atípicos (outliers)</li>
        </ul>
      </div>
    </div>
  );
}