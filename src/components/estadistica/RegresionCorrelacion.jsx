import React, { useState, useMemo } from 'react';
import { ScatterChart, Scatter, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  calculateCorrelation,
  calculateLinearRegression,
  predictValue,
  calculateMean,
  calculateStandardDeviation
} from '../../utils/statistics';

export default function RegresionCorrelacion({ data }) {
  const { timeSeriesData, ingresos, gastos, allAmounts } = data;
  
  // Estado para predicción
  const [predictX, setPredictX] = useState(0);

  // Preparar datos para análisis de regresión (tiempo vs montos)
  const timeData = useMemo(() => {
    if (!timeSeriesData || timeSeriesData.length === 0) return { x: [], y: [] };
    
    return {
      x: timeSeriesData.map((_, idx) => idx), // Índice como variable temporal
      y: timeSeriesData.map(d => d.ingresos)
    };
  }, [timeSeriesData]);

  // Preparar datos para regresión ingresos vs gastos
  const ingresosGastosData = useMemo(() => {
    const minLength = Math.min(ingresos.length, gastos.length);
    return {
      x: ingresos.slice(0, minLength),
      y: gastos.slice(0, minLength)
    };
  }, [ingresos, gastos]);

  // Calcular regresión lineal para serie temporal
  const regressionTime = useMemo(() => {
    if (timeData.x.length === 0) return null;
    return calculateLinearRegression(timeData.x, timeData.y);
  }, [timeData]);

  // Calcular regresión lineal para ingresos vs gastos
  const regressionIngresosGastos = useMemo(() => {
    if (ingresosGastosData.x.length === 0) return null;
    return calculateLinearRegression(ingresosGastosData.x, ingresosGastosData.y);
  }, [ingresosGastosData]);

  // Calcular correlación
  const correlationTime = useMemo(() => {
    if (timeData.x.length === 0) return 0;
    return calculateCorrelation(timeData.x, timeData.y);
  }, [timeData]);

  const correlationIngresosGastos = useMemo(() => {
    if (ingresosGastosData.x.length === 0) return 0;
    return calculateCorrelation(ingresosGastosData.x, ingresosGastosData.y);
  }, [ingresosGastosData]);

  // Preparar datos para gráfica de dispersión con línea de regresión
  const scatterDataTime = timeData.x.map((x, i) => ({
    x: x,
    y: timeData.y[i],
    predicted: regressionTime ? predictValue(x, regressionTime) : 0
  }));

  const scatterDataIngresosGastos = ingresosGastosData.x.map((x, i) => ({
    x: x,
    y: ingresosGastosData.y[i],
    predicted: regressionIngresosGastos ? predictValue(x, regressionIngresosGastos) : 0
  }));

  // Interpretar correlación
  const interpretCorrelation = (r) => {
    const absR = Math.abs(r);
    if (absR >= 0.9) return { strength: 'Muy fuerte', color: 'text-red-600' };
    if (absR >= 0.7) return { strength: 'Fuerte', color: 'text-orange-600' };
    if (absR >= 0.5) return { strength: 'Moderada', color: 'text-yellow-600' };
    if (absR >= 0.3) return { strength: 'Débil', color: 'text-blue-600' };
    return { strength: 'Muy débil o nula', color: 'text-gray-600' };
  };

  const corrInterpTime = interpretCorrelation(correlationTime);
  const corrInterpIG = interpretCorrelation(correlationIngresosGastos);

  // Predicción
  const prediction = regressionTime ? predictValue(predictX, regressionTime) : 0;

  if (!regressionTime || !regressionIngresosGastos) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600">No hay suficientes datos para realizar análisis de regresión</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Teoría */}
      <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
        <h3 className="font-bold text-red-900 mb-2">📚 SUBCOMPETENCIA 6: Regresión y Correlación</h3>
        <p className="text-sm text-red-800 mb-2">
          La regresión lineal modela la relación entre dos variables mediante una línea recta.
          La correlación mide la fuerza y dirección de esta relación lineal.
        </p>
        <div className="bg-white p-3 rounded text-sm mt-3">
          <p><strong>Ecuación de regresión lineal:</strong></p>
          <p className="font-mono">y = β₀ + β₁x</p>
          <p className="text-xs text-gray-600 mt-2">
            donde β₀ es la ordenada al origen y β₁ es la pendiente
          </p>
          <p className="mt-3"><strong>Coeficiente de correlación (r):</strong></p>
          <p className="text-xs text-gray-600">
            Mide la fuerza de la relación lineal. Varía entre -1 y 1.
          </p>
        </div>
      </div>

      {/* Análisis de Correlación */}
      <div className="bg-white border-2 border-red-300 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
          🔗 Análisis de Correlación
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Correlación Temporal */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-3">📅 Ingresos vs Tiempo</h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Coeficiente de Correlación (r)</p>
                <p className={`text-4xl font-bold ${correlationTime >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {correlationTime.toFixed(4)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Coeficiente de Determinación (R²)</p>
                <p className="text-3xl font-bold text-blue-600">
                  {regressionTime.r2.toFixed(4)}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {(regressionTime.r2 * 100).toFixed(2)}% de la variación es explicada
                </p>
              </div>
              <div className="bg-white p-3 rounded mt-3">
                <p className="text-sm">
                  <strong>Fuerza:</strong> <span className={corrInterpTime.color}>{corrInterpTime.strength}</span>
                </p>
                <p className="text-sm mt-1">
                  <strong>Dirección:</strong> {correlationTime >= 0 ? 'Positiva ↗️' : 'Negativa ↘️'}
                </p>
              </div>
            </div>
          </div>

          {/* Correlación Ingresos vs Gastos */}
          <div className="bg-purple-50 p-6 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-3">💰 Ingresos vs Gastos</h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Coeficiente de Correlación (r)</p>
                <p className={`text-4xl font-bold ${correlationIngresosGastos >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {correlationIngresosGastos.toFixed(4)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Coeficiente de Determinación (R²)</p>
                <p className="text-3xl font-bold text-purple-600">
                  {regressionIngresosGastos.r2.toFixed(4)}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {(regressionIngresosGastos.r2 * 100).toFixed(2)}% de la variación es explicada
                </p>
              </div>
              <div className="bg-white p-3 rounded mt-3">
                <p className="text-sm">
                  <strong>Fuerza:</strong> <span className={corrInterpIG.color}>{corrInterpIG.strength}</span>
                </p>
                <p className="text-sm mt-1">
                  <strong>Dirección:</strong> {correlationIngresosGastos >= 0 ? 'Positiva ↗️' : 'Negativa ↘️'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interpretación de correlación */}
        <div className="mt-6 bg-gray-50 p-4 rounded">
          <h4 className="font-bold text-gray-800 mb-2">📊 Interpretación del Coeficiente de Correlación</h4>
          <div className="grid grid-cols-5 gap-2 text-xs text-center mt-3">
            <div className="bg-red-200 p-2 rounded">
              <p className="font-bold">|r| ≥ 0.9</p>
              <p>Muy fuerte</p>
            </div>
            <div className="bg-orange-200 p-2 rounded">
              <p className="font-bold">0.7 ≤ |r| &lt; 0.9</p>
              <p>Fuerte</p>
            </div>
            <div className="bg-yellow-200 p-2 rounded">
              <p className="font-bold">0.5 ≤ |r| &lt; 0.7</p>
              <p>Moderada</p>
            </div>
            <div className="bg-blue-200 p-2 rounded">
              <p className="font-bold">0.3 ≤ |r| &lt; 0.5</p>
              <p>Débil</p>
            </div>
            <div className="bg-gray-200 p-2 rounded">
              <p className="font-bold">|r| &lt; 0.3</p>
              <p>Muy débil</p>
            </div>
          </div>
        </div>
      </div>

      {/* Regresión Lineal - Serie Temporal */}
      <div className="bg-white border-2 border-blue-300 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
          📈 Regresión Lineal: Ingresos en el Tiempo
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-3">Ecuación de Regresión</h4>
            <p className="text-xl font-mono font-bold text-blue-600 mb-3">
              {regressionTime.equation}
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Pendiente (β₁):</strong> {regressionTime.slope.toFixed(4)}</p>
              <p className="text-xs text-gray-600 ml-4">
                Por cada unidad de tiempo, los ingresos {regressionTime.slope >= 0 ? 'aumentan' : 'disminuyen'} en ${Math.abs(regressionTime.slope).toFixed(2)}
              </p>
              <p><strong>Intercepto (β₀):</strong> {regressionTime.intercept.toFixed(2)}</p>
              <p className="text-xs text-gray-600 ml-4">
                Valor inicial estimado de ingresos
              </p>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-3">Bondad de Ajuste</h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">R² (Coef. de Determinación)</p>
                <p className="text-3xl font-bold text-green-600">
                  {(regressionTime.r2 * 100).toFixed(2)}%
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {regressionTime.r2 >= 0.7 ? 'Buen ajuste ✅' : 
                   regressionTime.r2 >= 0.4 ? 'Ajuste moderado ⚠️' : 
                   'Ajuste pobre ❌'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfica de dispersión con línea de regresión */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3">Diagrama de Dispersión y Línea de Regresión</h4>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="x" 
                type="number" 
                name="Período"
                label={{ value: 'Período', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                type="number" 
                name="Ingresos"
                label={{ value: 'Ingresos ($)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter 
                name="Datos Observados" 
                data={scatterDataTime} 
                fill="#3b82f6" 
              />
              <Scatter 
                name="Línea de Regresión" 
                data={scatterDataTime.map(d => ({ x: d.x, y: d.predicted }))} 
                fill="#ef4444" 
                line 
                shape="circle"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Calculadora de predicción */}
        <div className="bg-indigo-50 p-6 rounded-lg">
          <h4 className="font-bold text-gray-800 mb-4">🔮 Calculadora de Predicción</h4>
          <p className="text-sm text-gray-600 mb-3">
            Usa la ecuación de regresión para predecir ingresos futuros
          </p>
          
          <div className="flex items-center gap-4 mb-4">
            <label className="font-semibold text-gray-700">Período a predecir (x):</label>
            <input
              type="number"
              value={predictX}
              onChange={(e) => setPredictX(Number(e.target.value))}
              className="p-2 border-2 border-indigo-300 rounded w-32"
              min="0"
            />
          </div>

          <div className="bg-white p-4 rounded">
            <p className="text-sm text-gray-600 mb-2">Predicción:</p>
            <p className="text-4xl font-bold text-indigo-600 mb-3">
              ${prediction.toFixed(2)}
            </p>
            <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded">
              <p className="font-mono">
                y = {regressionTime.slope.toFixed(4)} × {predictX} + {regressionTime.intercept.toFixed(2)}
              </p>
              <p className="font-mono mt-1">
                y = {prediction.toFixed(2)}
              </p>
            </div>
            <p className="text-xs text-yellow-700 bg-yellow-50 p-2 rounded mt-3">
              ⚠️ <strong>Nota:</strong> Las predicciones son estimaciones basadas en patrones históricos.
              La precisión disminuye al alejarse del rango de datos observados.
            </p>
          </div>
        </div>
      </div>

      {/* Regresión Lineal - Ingresos vs Gastos */}
      <div className="bg-white border-2 border-purple-300 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-2">
          💰 Regresión Lineal: Ingresos vs Gastos
        </h3>

        <div className="bg-purple-50 p-4 rounded-lg mb-6">
          <h4 className="font-bold text-gray-800 mb-3">Ecuación de Regresión</h4>
          <p className="text-xl font-mono font-bold text-purple-600 mb-3">
            Gastos = {regressionIngresosGastos.slope.toFixed(4)} × Ingresos + {regressionIngresosGastos.intercept.toFixed(2)}
          </p>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Interpretación:</strong> Por cada $1 de incremento en ingresos, 
              los gastos {regressionIngresosGastos.slope >= 0 ? 'aumentan' : 'disminuyen'} en ${Math.abs(regressionIngresosGastos.slope).toFixed(4)}
            </p>
            <p className="text-xs text-gray-600 mt-2">
              R² = {(regressionIngresosGastos.r2 * 100).toFixed(2)}% - 
              {regressionIngresosGastos.r2 >= 0.7 ? ' Buen ajuste ✅' : 
               regressionIngresosGastos.r2 >= 0.4 ? ' Ajuste moderado ⚠️' : 
               ' Ajuste pobre ❌'}
            </p>
          </div>
        </div>

        {/* Gráfica de dispersión */}
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="x" 
              type="number" 
              name="Ingresos"
              label={{ value: 'Ingresos ($)', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              type="number" 
              name="Gastos"
              label={{ value: 'Gastos ($)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter 
              name="Datos Observados" 
              data={scatterDataIngresosGastos} 
              fill="#8b5cf6" 
            />
            <Scatter 
              name="Línea de Regresión" 
              data={scatterDataIngresosGastos.map(d => ({ x: d.x, y: d.predicted }))} 
              fill="#ef4444" 
              line 
              shape="circle"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Conceptos clave */}
      <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
        <h4 className="font-bold text-red-900 mb-2">🔑 Conceptos Clave</h4>
        <ul className="text-sm text-red-800 space-y-2">
          <li>• <strong>Correlación ≠ Causalidad:</strong> Una alta correlación no implica que una variable cause la otra</li>
          <li>• <strong>R² (Coeficiente de Determinación):</strong> Proporción de la varianza de Y explicada por X</li>
          <li>• <strong>Pendiente (β₁):</strong> Cambio esperado en Y por cada unidad de cambio en X</li>
          <li>• <strong>Intercepto (β₀):</strong> Valor esperado de Y cuando X = 0</li>
          <li>• <strong>Regresión lineal simple:</strong> Solo considera una variable independiente</li>
          <li>• <strong>Extrapolación:</strong> Predicciones fuera del rango de datos observados son menos confiables</li>
        </ul>
      </div>

      {/* Ejemplo práctico */}
      <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
        <h4 className="font-bold text-gray-800 mb-3">💡 Aplicación Práctica en Contabilidad</h4>
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <strong>1. Pronóstico de Ventas:</strong> Usar regresión temporal para estimar ventas futuras
            y planificar inventario y recursos.
          </p>
          <p>
            <strong>2. Análisis de Costos:</strong> Estudiar la relación entre volumen de producción
            (X) y costos totales (Y) para identificar costos fijos y variables.
          </p>
          <p>
            <strong>3. Control Presupuestario:</strong> Analizar correlación entre diferentes categorías
            de gastos para detectar patrones y anomalías.
          </p>
          <p>
            <strong>4. Toma de Decisiones:</strong> Usar R² para evaluar qué variables son mejores
            predictores del desempeño financiero.
          </p>
        </div>
      </div>
    </div>
  );
}