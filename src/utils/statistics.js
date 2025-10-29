// src/utils/statistics.js

// ============================================
// SUBCOMPETENCIA 1 & 2: ESTADÍSTICA DESCRIPTIVA
// ============================================

export const calculateMean = (data) => {
  if (data.length === 0) return 0;
  const sum = data.reduce((acc, val) => acc + val, 0);
  return sum / data.length;
};

export const calculateMedian = (data) => {
  if (data.length === 0) return 0;
  const sorted = [...data].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
};

export const calculateMode = (data) => {
  if (data.length === 0) return null;
  const frequency = {};
  let maxFreq = 0;
  let modes = [];

  data.forEach(val => {
    frequency[val] = (frequency[val] || 0) + 1;
    if (frequency[val] > maxFreq) {
      maxFreq = frequency[val];
      modes = [val];
    } else if (frequency[val] === maxFreq && !modes.includes(val)) {
      modes.push(val);
    }
  });

  return modes.length === data.length ? null : modes;
};

export const calculateVariance = (data) => {
  if (data.length === 0) return 0;
  const mean = calculateMean(data);
  const squaredDiffs = data.map(val => Math.pow(val - mean, 2));
  return calculateMean(squaredDiffs);
};

export const calculateStandardDeviation = (data) => {
  return Math.sqrt(calculateVariance(data));
};

export const calculateRange = (data) => {
  if (data.length === 0) return 0;
  return Math.max(...data) - Math.min(...data);
};

export const calculateQuartiles = (data) => {
  if (data.length === 0) return { q1: 0, q2: 0, q3: 0 };
  const sorted = [...data].sort((a, b) => a - b);
  const q2 = calculateMedian(sorted);
  const mid = Math.floor(sorted.length / 2);
  const lowerHalf = sorted.slice(0, mid);
  const upperHalf = sorted.length % 2 === 0 ? sorted.slice(mid) : sorted.slice(mid + 1);
  
  return {
    q1: calculateMedian(lowerHalf),
    q2: q2,
    q3: calculateMedian(upperHalf)
  };
};

export const calculateIQR = (data) => {
  const { q1, q3 } = calculateQuartiles(data);
  return q3 - q1;
};

// ============================================
// SUBCOMPETENCIA 3: PROBABILIDAD
// ============================================

export const calculateProbability = (favorable, total) => {
  if (total === 0) return 0;
  return favorable / total;
};

export const calculateFrequencyDistribution = (data) => {
  const frequency = {};
  data.forEach(val => {
    const rounded = Math.round(val / 1000) * 1000; // Agrupar por miles
    frequency[rounded] = (frequency[rounded] || 0) + 1;
  });
  
  const total = data.length;
  const distribution = Object.entries(frequency).map(([value, count]) => ({
    value: parseFloat(value),
    frequency: count,
    relativeFrequency: count / total,
    probability: count / total
  }));
  
  return distribution.sort((a, b) => a.value - b.value);
};

// ============================================
// SUBCOMPETENCIA 4: VARIABLES ALEATORIAS Y DISTRIBUCIONES
// ============================================

export const calculateExpectedValue = (data) => {
  return calculateMean(data);
};

// Distribución Normal - Calcular Z-score
export const calculateZScore = (value, mean, stdDev) => {
  if (stdDev === 0) return 0;
  return (value - mean) / stdDev;
};

// Función de densidad de probabilidad normal
export const normalPDF = (x, mean, stdDev) => {
  const coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI));
  const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2));
  return coefficient * Math.exp(exponent);
};

// Distribución Binomial
export const binomialProbability = (n, k, p) => {
  const combination = factorial(n) / (factorial(k) * factorial(n - k));
  return combination * Math.pow(p, k) * Math.pow(1 - p, n - k);
};

const factorial = (n) => {
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

// ============================================
// SUBCOMPETENCIA 5: PRUEBA DE HIPÓTESIS
// ============================================

export const tTest = (data, populationMean) => {
  const n = data.length;
  const sampleMean = calculateMean(data);
  const sampleStdDev = calculateStandardDeviation(data);
  
  // Calcular estadístico t
  const t = (sampleMean - populationMean) / (sampleStdDev / Math.sqrt(n));
  
  // Grados de libertad
  const df = n - 1;
  
  // Valor p aproximado (simplificado)
  const pValue = 2 * (1 - approximateTCDF(Math.abs(t), df));
  
  return {
    t: t,
    df: df,
    pValue: pValue,
    sampleMean: sampleMean,
    populationMean: populationMean,
    significant: pValue < 0.05
  };
};

// Aproximación de la función CDF de t-student
const approximateTCDF = (t, df) => {
  // Aproximación simple usando distribución normal para df > 30
  if (df > 30) {
    return normalCDF(t);
  }
  // Para df pequeños, usar aproximación más precisa
  return 0.5 + 0.5 * Math.tanh(t / Math.sqrt(df / (df - 2)));
};

// Función de distribución acumulada normal
const normalCDF = (z) => {
  return 0.5 * (1 + erf(z / Math.sqrt(2)));
};

// Función de error (erf)
const erf = (x) => {
  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);
  
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  
  const t = 1 / (1 + p * x);
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  
  return sign * y;
};

// ============================================
// SUBCOMPETENCIA 6: REGRESIÓN Y CORRELACIÓN
// ============================================

export const calculateCorrelation = (x, y) => {
  if (x.length !== y.length || x.length === 0) return 0;
  
  const n = x.length;
  const meanX = calculateMean(x);
  const meanY = calculateMean(y);
  
  let numerator = 0;
  let denomX = 0;
  let denomY = 0;
  
  for (let i = 0; i < n; i++) {
    const diffX = x[i] - meanX;
    const diffY = y[i] - meanY;
    numerator += diffX * diffY;
    denomX += diffX * diffX;
    denomY += diffY * diffY;
  }
  
  if (denomX === 0 || denomY === 0) return 0;
  
  return numerator / Math.sqrt(denomX * denomY);
};

export const calculateLinearRegression = (x, y) => {
  if (x.length !== y.length || x.length === 0) {
    return { slope: 0, intercept: 0, r2: 0 };
  }
  
  const n = x.length;
  const meanX = calculateMean(x);
  const meanY = calculateMean(y);
  
  let numerator = 0;
  let denominator = 0;
  
  for (let i = 0; i < n; i++) {
    numerator += (x[i] - meanX) * (y[i] - meanY);
    denominator += Math.pow(x[i] - meanX, 2);
  }
  
  const slope = denominator === 0 ? 0 : numerator / denominator;
  const intercept = meanY - slope * meanX;
  
  // Calcular R²
  const correlation = calculateCorrelation(x, y);
  const r2 = Math.pow(correlation, 2);
  
  return {
    slope: slope,
    intercept: intercept,
    r2: r2,
    equation: `y = ${slope.toFixed(2)}x + ${intercept.toFixed(2)}`
  };
};

export const predictValue = (x, regression) => {
  return regression.slope * x + regression.intercept;
};

// ============================================
// FUNCIONES AUXILIARES PARA GRÁFICAS
// ============================================

export const createHistogramData = (data, bins = 10) => {
  if (data.length === 0) return [];
  
  const min = Math.min(...data);
  const max = Math.max(...data);
  const binWidth = (max - min) / bins;
  
  const histogram = Array(bins).fill(0).map((_, i) => ({
    range: `${(min + i * binWidth).toFixed(0)} - ${(min + (i + 1) * binWidth).toFixed(0)}`,
    count: 0,
    min: min + i * binWidth,
    max: min + (i + 1) * binWidth
  }));
  
  data.forEach(val => {
    const binIndex = Math.min(Math.floor((val - min) / binWidth), bins - 1);
    if (binIndex >= 0 && binIndex < bins) {
      histogram[binIndex].count++;
    }
  });
  
  return histogram;
};

export const createBoxPlotData = (data) => {
  if (data.length === 0) return null;
  
  const sorted = [...data].sort((a, b) => a - b);
  const { q1, q2, q3 } = calculateQuartiles(data);
  const iqr = q3 - q1;
  
  const lowerWhisker = Math.max(sorted[0], q1 - 1.5 * iqr);
  const upperWhisker = Math.min(sorted[sorted.length - 1], q3 + 1.5 * iqr);
  
  const outliers = sorted.filter(val => val < lowerWhisker || val > upperWhisker);
  
  return {
    min: sorted[0],
    q1: q1,
    median: q2,
    q3: q3,
    max: sorted[sorted.length - 1],
    lowerWhisker: lowerWhisker,
    upperWhisker: upperWhisker,
    outliers: outliers
  };
};