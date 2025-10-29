import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  calculateMean,
  calculateMedian,
  calculateMode,
  calculateStandardDeviation,
  calculateVariance,
  calculateRange,
  calculateQuartiles,
  calculateIQR,
  createHistogramData
} from '../../utils/statistics';

export default function EstadisticaDescriptiva({ data }) {
  const { allAmounts, ingresos, gastos } = data;

  // Calcular estadísticas para todos los montos
  const stats = {
    media: calculateMean(allAmounts),
    mediana: calculateMedian(allAmounts),
    moda: calculateMode(allAmounts),
    desviacionEstandar: calculateStandardDeviation(allAmounts),
    varianza: calculateVariance(allAmounts),
    rango: calculateRange(allAmounts),
    quartiles: calculateQuartiles(allAmounts),
    iqr: calculateIQR(allAmounts)
  };

  // Estadísticas comparativas
  const ingresosStats = {
    media: calculateMean(ingresos),
    mediana: calculateMedian(ingresos),
    total: ingresos.reduce((a, b) => a + b, 0)
  };

  const gastosStats = {
    media: calculateMean(gastos),
    mediana: calculateMedian(gastos),
    total: gastos.reduce((a, b) => a + b, 0)
  };

  // Preparar datos para histograma
  const histogramData = createHistogramData(allAmounts, 8);

  // Datos para comparación
  const comparisonData = [
    {
      categoria: 'Ingresos',
      'Media': ingresosStats.media,
      'Mediana': ingresosStats.mediana,
      'Total': ingresosStats.total
    },
    {
      categoria: 'Gastos',
      'Media': gastosStats.media,
      'Mediana': gastosStats.mediana,
      'Total': gastosStats.total
    }
  ];

  return (
    <div className="space-y-8">
      {/* Teoría */}
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
        <h3 className="font-bold text-blue-900 mb-2">📚 SUBCOMPETENCIA 2: Estadística Descriptiva</h3>
        <p className="text-sm text-blue-800">
          La estadística descriptiva resume y organiza datos mediante medidas de tendencia central 
          (media, mediana, moda) y medidas de dispersión (desviación estándar, varianza, rango).
        </p>
      </div>

      {/* Medidas de Tendencia Central */}
      <div className="bg-white border-2 border-blue-300 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
          📊 Medidas de Tendencia Central
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Media (Promedio)</p>
            <p className="text-3xl font-bold text-blue-600">${stats.media.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-2">
              Σx / n = Suma de todos los valores / Cantidad
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Mediana (Valor Central)</p>
            <p className="text-3xl font-bold text-green-600">${stats.mediana.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-2">
              Valor que divide los datos en dos partes iguales
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Moda (Más Frecuente)</p>
            <p className="text-2xl font-bold text-purple-600">
              {stats.moda ? `$${stats.moda[0]?.toFixed(2)}` : 'No hay moda'}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Valor que más se repite en el conjunto
            </p>
          </div>
        </div>
      </div>

      {/* Medidas de Dispersión */}
      <div className="bg-white border-2 border-orange-300 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
          📏 Medidas de Dispersión
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-orange-50 p-4 rounded">
            <p className="text-xs text-gray-600 mb-1">Desviación Estándar (σ)</p>
            <p className="text-2xl font-bold text-orange-600">
              ${stats.desviacionEstandar.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Medida de dispersión promedio
            </p>
          </div>

          <div className="bg-red-50 p-4 rounded">
            <p className="text-xs text-gray-600 mb-1">Varianza (σ²)</p>
            <p className="text-2xl font-bold text-red-600">
              ${stats.varianza.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Cuadrado de la desv. estándar
            </p>
          </div>

          <div className="bg-yellow-50 p-4 rounded">
            <p className="text-xs text-gray-600 mb-1">Rango</p>
            <p className="text-2xl font-bold text-yellow-600">
              ${stats.rango.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Diferencia entre max y min
            </p>
          </div>

          <div className="bg-indigo-50 p-4 rounded">
            <p className="text-xs text-gray-600 mb-1">Rango Intercuartil (IQR)</p>
            <p className="text-2xl font-bold text-indigo-600">
              ${stats.iqr.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Q3 - Q1
            </p>
          </div>
        </div>

        {/* Cuartiles */}
        <div className="mt-6 p-4 bg-gray-50 rounded">
          <h4 className="font-bold text-gray-800 mb-3">Cuartiles (Dividen datos en 4 partes)</h4>
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="text-xs text-gray-600">Q1 (25%)</p>
              <p className="text-lg font-bold text-gray-800">${stats.quartiles.q1.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600">Q2 (50%) - Mediana</p>
              <p className="text-lg font-bold text-gray-800">${stats.quartiles.q2.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600">Q3 (75%)</p>
              <p className="text-lg font-bold text-gray-800">${stats.quartiles.q3.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Histograma */}
      <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
          📊 Histograma de Frecuencias
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={histogramData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3b82f6" name="Frecuencia" />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-600 mt-4 text-center">
          Distribución de frecuencias de los montos de transacciones
        </p>
      </div>

      {/* Comparación Ingresos vs Gastos */}
      <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
          💰 Análisis Comparativo: Ingresos vs Gastos
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="categoria" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Media" fill="#10b981" />
            <Bar dataKey="Mediana" fill="#f59e0b" />
            <Bar dataKey="Total" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Interpretación */}
      <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded">
        <h4 className="font-bold text-indigo-900 mb-2">🔍 Interpretación de Resultados</h4>
        <ul className="text-sm text-indigo-800 space-y-1">
          <li>• <strong>Media vs Mediana:</strong> {stats.media > stats.mediana ? 
            'La media es mayor, indicando valores extremos altos (sesgo positivo)' : 
            'La media es menor o similar, distribución simétrica'}</li>
          <li>• <strong>Desviación Estándar:</strong> Indica que los montos varían en promedio ±${stats.desviacionEstandar.toFixed(2)} respecto a la media</li>
          <li>• <strong>Rango:</strong> Existe una variación de ${stats.rango.toFixed(2)} entre la transacción más pequeña y la más grande</li>
          <li>• <strong>IQR:</strong> El 50% central de los datos varía en ${stats.iqr.toFixed(2)}</li>
        </ul>
      </div>
    </div>
  );
}