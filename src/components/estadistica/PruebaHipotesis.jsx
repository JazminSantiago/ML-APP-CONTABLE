import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  calculateMean,
  calculateStandardDeviation,
  tTest
} from '../../utils/statistics';

export default function PruebaHipotesis({ data }) {
  const { allAmounts, ingresos, gastos } = data;
  
  // Estados para pruebas de hipótesis
  const [hypothesisMean, setHypothesisMean] = useState(10000);
  const [significanceLevel, setSignificanceLevel] = useState(0.05);
  const [testType, setTestType] = useState('two-tailed');

  // Calcular estadísticas básicas
  const sampleMean = calculateMean(allAmounts);
  const sampleStdDev = calculateStandardDeviation(allAmounts);
  const n = allAmounts.length;

  // Realizar prueba t
  const tTestResult = tTest(allAmounts, hypothesisMean);

  // Determinar conclusión
  const getConclusion = () => {
    if (testType === 'two-tailed') {
      return tTestResult.pValue < significanceLevel;
    } else if (testType === 'right-tailed') {
      return tTestResult.t > 0 && (tTestResult.pValue / 2) < significanceLevel;
    } else {
      return tTestResult.t < 0 && (tTestResult.pValue / 2) < significanceLevel;
    }
  };

  const rejectNull = getConclusion();

  // Comparación entre ingresos y gastos
  const ingresosStats = {
    mean: calculateMean(ingresos),
    stdDev: calculateStandardDeviation(ingresos),
    n: ingresos.length
  };

  const gastosStats = {
    mean: calculateMean(gastos),
    stdDev: calculateStandardDeviation(gastos),
    n: gastos.length
  };

  // Datos para comparación visual
  const comparisonData = [
    {
      categoria: 'Todos los Montos',
      'Media Muestral': sampleMean,
      'Media Hipotética': hypothesisMean
    },
    {
      categoria: 'Ingresos',
      'Media': ingresosStats.mean,
      'n': ingresosStats.n
    },
    {
      categoria: 'Gastos',
      'Media': gastosStats.mean,
      'n': gastosStats.n
    }
  ];

  return (
    <div className="space-y-8">
      {/* Teoría */}
      <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded">
        <h3 className="font-bold text-orange-900 mb-2">📚 SUBCOMPETENCIA 5: Prueba de Hipótesis</h3>
        <p className="text-sm text-orange-800 mb-2">
          La prueba de hipótesis es un método estadístico para tomar decisiones basadas en datos.
          Se plantea una hipótesis nula (H₀) que se acepta o rechaza según la evidencia.
        </p>
        <div className="bg-white p-3 rounded text-sm mt-3">
          <p><strong>Pasos:</strong></p>
          <ol className="list-decimal ml-5 space-y-1">
            <li>Plantear H₀ (hipótesis nula) y H₁ (hipótesis alternativa)</li>
            <li>Elegir nivel de significancia (α)</li>
            <li>Calcular estadístico de prueba</li>
            <li>Calcular valor p</li>
            <li>Tomar decisión: Si p &lt; α, rechazar H₀</li>
          </ol>
        </div>
      </div>

      {/* Configuración de la prueba */}
      <div className="bg-white border-2 border-orange-300 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
          ⚙️ Configuración de la Prueba de Hipótesis
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-orange-50 p-4 rounded-lg">
            <label className="block font-semibold text-gray-800 mb-2">
              Media Hipotética (μ₀):
            </label>
            <input
              type="number"
              value={hypothesisMean}
              onChange={(e) => setHypothesisMean(Number(e.target.value))}
              className="w-full p-2 border-2 border-orange-300 rounded"
              step="1000"
            />
            <p className="text-xs text-gray-600 mt-2">
              Valor que se quiere probar
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <label className="block font-semibold text-gray-800 mb-2">
              Nivel de Significancia (α):
            </label>
            <select
              value={significanceLevel}
              onChange={(e) => setSignificanceLevel(Number(e.target.value))}
              className="w-full p-2 border-2 border-blue-300 rounded"
            >
              <option value={0.01}>0.01 (99% confianza)</option>
              <option value={0.05}>0.05 (95% confianza)</option>
              <option value={0.10}>0.10 (90% confianza)</option>
            </select>
            <p className="text-xs text-gray-600 mt-2">
              Probabilidad de error tipo I
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <label className="block font-semibold text-gray-800 mb-2">
              Tipo de Prueba:
            </label>
            <select
              value={testType}
              onChange={(e) => setTestType(e.target.value)}
              className="w-full p-2 border-2 border-purple-300 rounded"
            >
              <option value="two-tailed">Dos colas (≠)</option>
              <option value="right-tailed">Cola derecha (&gt;)</option>
              <option value="left-tailed">Cola izquierda (&lt;)</option>
            </select>
            <p className="text-xs text-gray-600 mt-2">
              Dirección de la hipótesis alternativa
            </p>
          </div>
        </div>

        {/* Hipótesis formuladas */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-bold text-gray-800 mb-3">📝 Hipótesis Planteadas:</h4>
          <div className="space-y-2 text-sm">
            <p className="font-semibold">
              H₀ (Hipótesis Nula): μ {testType === 'two-tailed' ? '=' : testType === 'right-tailed' ? '≤' : '≥'} ${hypothesisMean.toLocaleString()}
            </p>
            <p className="font-semibold">
              H₁ (Hipótesis Alternativa): μ {testType === 'two-tailed' ? '≠' : testType === 'right-tailed' ? '>' : '<'} ${hypothesisMean.toLocaleString()}
            </p>
            <p className="text-xs text-gray-600 mt-3">
              <strong>Interpretación:</strong> Estamos probando si la media poblacional de los montos de transacciones 
              {testType === 'two-tailed' ? ' es diferente de ' : testType === 'right-tailed' ? ' es mayor que ' : ' es menor que '}
              ${hypothesisMean.toLocaleString()}.
            </p>
          </div>
        </div>
      </div>

      {/* Resultados de la prueba */}
      <div className="bg-white border-2 border-red-300 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
          📊 Resultados de la Prueba t de Student
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-4">Estadísticas Muestrales</h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Media Muestral (x̄)</p>
                <p className="text-3xl font-bold text-blue-600">${sampleMean.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Desviación Estándar (s)</p>
                <p className="text-2xl font-bold text-blue-600">${sampleStdDev.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tamaño de Muestra (n)</p>
                <p className="text-2xl font-bold text-blue-600">{n}</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-4">Estadístico de Prueba</h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Estadístico t</p>
                <p className="text-3xl font-bold text-orange-600">{tTestResult.t.toFixed(4)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Grados de Libertad</p>
                <p className="text-2xl font-bold text-orange-600">{tTestResult.df}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Valor p</p>
                <p className="text-2xl font-bold text-orange-600">{tTestResult.pValue.toFixed(6)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fórmula del estadístico */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="font-bold text-gray-800 mb-2">📐 Cálculo del Estadístico t:</h4>
          <div className="font-mono text-sm bg-white p-3 rounded overflow-x-auto">
            <p>t = (x̄ - μ₀) / (s / √n)</p>
            <p className="mt-2">
              t = ({sampleMean.toFixed(2)} - {hypothesisMean}) / ({sampleStdDev.toFixed(2)} / √{n})
            </p>
            <p className="mt-2">
              t = {((sampleMean - hypothesisMean) / (sampleStdDev / Math.sqrt(n))).toFixed(4)}
            </p>
          </div>
        </div>

        {/* Decisión */}
        <div className={`p-6 rounded-lg border-4 ${
          rejectNull 
            ? 'bg-red-50 border-red-500' 
            : 'bg-green-50 border-green-500'
        }`}>
          <h4 className="font-bold text-gray-800 mb-3 text-xl">🎯 Decisión y Conclusión:</h4>
          
          <div className="space-y-3">
            <p className="text-lg font-semibold">
              Valor p ({tTestResult.pValue.toFixed(6)}) {rejectNull ? '<' : '≥'} α ({significanceLevel})
            </p>
            
            <p className={`text-2xl font-bold ${rejectNull ? 'text-red-700' : 'text-green-700'}`}>
              {rejectNull ? '❌ RECHAZAMOS H₀' : '✅ NO RECHAZAMOS H₀'}
            </p>

            <div className="bg-white p-4 rounded mt-4">
              <p className="font-semibold mb-2">Interpretación:</p>
              {rejectNull ? (
                <p className="text-sm text-gray-700">
                  Con un nivel de significancia de {significanceLevel * 100}%, hay evidencia estadística 
                  suficiente para rechazar la hipótesis nula. Esto significa que la media poblacional 
                  {testType === 'two-tailed' ? ' es diferente de ' : testType === 'right-tailed' ? ' es mayor que ' : ' es menor que '}
                  ${hypothesisMean.toLocaleString()} (p = {tTestResult.pValue.toFixed(6)}).
                </p>
              ) : (
                <p className="text-sm text-gray-700">
                  Con un nivel de significancia de {significanceLevel * 100}%, NO hay evidencia estadística 
                  suficiente para rechazar la hipótesis nula. Los datos son consistentes con la hipótesis 
                  de que la media poblacional 
                  {testType === 'two-tailed' ? ' es igual a ' : testType === 'right-tailed' ? ' es menor o igual a ' : ' es mayor o igual a '}
                  ${hypothesisMean.toLocaleString()} (p = {tTestResult.pValue.toFixed(6)}).
                </p>
              )}
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 mt-4">
              <p className="text-xs text-gray-700">
                <strong>⚠️ Nota importante:</strong> "No rechazar H₀" no significa que H₀ sea verdadera, 
                solo que no hay suficiente evidencia para descartarla. La ausencia de evidencia no es evidencia de ausencia.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Visualización comparativa */}
      <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
          📈 Visualización de Medias
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="categoria" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Media Muestral" fill="#3b82f6" />
            <Bar dataKey="Media Hipotética" fill="#ef4444" />
            <Bar dataKey="Media" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Prueba adicional: Comparación Ingresos vs Gastos */}
      <div className="bg-white border-2 border-indigo-300 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
          🔬 Análisis Adicional: ¿Son diferentes los ingresos y gastos?
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-bold text-green-800 mb-3">💰 Ingresos</h4>
            <div className="space-y-2 text-sm">
              <p><strong>Media:</strong> ${ingresosStats.mean.toFixed(2)}</p>
              <p><strong>Desv. Est.:</strong> ${ingresosStats.stdDev.toFixed(2)}</p>
              <p><strong>n:</strong> {ingresosStats.n}</p>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-bold text-red-800 mb-3">💸 Gastos</h4>
            <div className="space-y-2 text-sm">
              <p><strong>Media:</strong> ${gastosStats.mean.toFixed(2)}</p>
              <p><strong>Desv. Est.:</strong> ${gastosStats.stdDev.toFixed(2)}</p>
              <p><strong>n:</strong> {gastosStats.n}</p>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 p-4 rounded-lg">
          <h4 className="font-bold text-gray-800 mb-2">🔍 Observación:</h4>
          <p className="text-sm text-gray-700">
            La diferencia entre las medias de ingresos y gastos es de $
            {Math.abs(ingresosStats.mean - gastosStats.mean).toFixed(2)}.
            {ingresosStats.mean > gastosStats.mean ? (
              <span className="text-green-700 font-semibold"> Los ingresos promedio son mayores que los gastos promedio.</span>
            ) : (
              <span className="text-red-700 font-semibold"> Los gastos promedio son mayores que los ingresos promedio.</span>
            )}
          </p>
          <p className="text-xs text-gray-600 mt-3">
            💡 Para determinar si esta diferencia es estadísticamente significativa, 
            se requeriría una prueba t de dos muestras independientes.
          </p>
        </div>
      </div>

      {/* Conceptos clave */}
      <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded">
        <h4 className="font-bold text-orange-900 mb-2">🔑 Conceptos Clave en Prueba de Hipótesis</h4>
        <ul className="text-sm text-orange-800 space-y-2">
          <li>• <strong>Error Tipo I (α):</strong> Rechazar H₀ cuando es verdadera (falso positivo)</li>
          <li>• <strong>Error Tipo II (β):</strong> No rechazar H₀ cuando es falsa (falso negativo)</li>
          <li>• <strong>Nivel de Significancia (α):</strong> Probabilidad máxima aceptable de Error Tipo I</li>
          <li>• <strong>Valor p:</strong> Probabilidad de obtener un resultado tan extremo como el observado, asumiendo que H₀ es verdadera</li>
          <li>• <strong>Poder de la prueba (1-β):</strong> Probabilidad de rechazar H₀ cuando es falsa</li>
          <li>• <strong>Grados de libertad:</strong> n - 1 para prueba t de una muestra</li>
        </ul>
      </div>
    </div>
  );
}