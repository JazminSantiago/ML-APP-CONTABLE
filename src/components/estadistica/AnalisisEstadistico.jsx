import React, { useState, useMemo } from 'react';
import { BarChart3, TrendingUp, Calculator, TestTube, LineChart } from 'lucide-react';
import EstadisticaDescriptiva from './EstadisticaDescriptiva';
import ProbabilidadAnalisis from './ProbabilidadAnalisis';
import DistribucionesAnalisis from './DistribucionesAnalisis';
import PruebaHipotesis from './PruebaHipotesis';
import RegresionCorrelacion from './RegresionCorrelacion';

export default function AnalisisEstadistico({ transactions }) {
  const [activeSection, setActiveSection] = useState('descriptiva');

  console.log('Transacciones recibidas:', transactions); // Debug

  // Preparar datos para análisis
  const analyticsData = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return {
        allAmounts: [],
        ingresos: [],
        gastos: [],
        timeSeriesData: [],
        totalTransactions: 0
      };
    }

    // Extraer montos de transacciones
    const allAmounts = transactions.map(tx => Number(tx.amount) || 0).filter(amount => amount > 0);
    
    console.log('Todos los montos:', allAmounts); // Debug
    
    // Separar ingresos y gastos basándonos en el tipo de transacción
    const ingresos = transactions
      .filter(tx => {
        // Créditos en cuentas de ingreso o activo que representan entradas
        return tx.type === 'credit' && 
               (tx.account === 'Ventas' || 
                tx.account === 'Banco' || 
                tx.account === 'Caja');
      })
      .map(tx => Number(tx.amount) || 0)
      .filter(amount => amount > 0);
    
    const gastos = transactions
      .filter(tx => {
        // Débitos en cuentas de gasto
        return tx.type === 'debit' && 
               (tx.account.includes('Gasto') || 
                tx.account === 'Costo de Ventas' ||
                tx.account.includes('Gastos'));
      })
      .map(tx => Number(tx.amount) || 0)
      .filter(amount => amount > 0);
    
    console.log('Ingresos:', ingresos); // Debug
    console.log('Gastos:', gastos); // Debug
    
    // Datos temporales (por fecha)
    const transactionsByDate = transactions.reduce((acc, tx) => {
      const date = tx.date || 'Sin fecha';
      if (!acc[date]) acc[date] = { ingresos: 0, gastos: 0 };
      
      const amount = Number(tx.amount) || 0;
      
      if (tx.type === 'credit' && 
          (tx.account === 'Ventas' || tx.account === 'Banco' || tx.account === 'Caja')) {
        acc[date].ingresos += amount;
      } else if (tx.type === 'debit' && 
                 (tx.account.includes('Gasto') || tx.account === 'Costo de Ventas')) {
        acc[date].gastos += amount;
      }
      
      return acc;
    }, {});
    
    const timeSeriesData = Object.entries(transactionsByDate)
      .map(([date, data]) => ({
        date,
        ingresos: data.ingresos,
        gastos: data.gastos,
        neto: data.ingresos - data.gastos
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    console.log('Serie temporal:', timeSeriesData); // Debug
    
    return {
      allAmounts,
      ingresos,
      gastos,
      timeSeriesData,
      totalTransactions: transactions.length
    };
  }, [transactions]);

  const sections = [
    { 
      id: 'descriptiva', 
      label: 'Estadística Descriptiva', 
      icon: BarChart3,
      color: 'blue'
    },
    { 
      id: 'probabilidad', 
      label: 'Probabilidad', 
      icon: Calculator,
      color: 'green'
    },
    { 
      id: 'distribuciones', 
      label: 'Distribuciones', 
      icon: LineChart,
      color: 'purple'
    },
    { 
      id: 'hipotesis', 
      label: 'Prueba de Hipótesis', 
      icon: TestTube,
      color: 'orange'
    },
    { 
      id: 'regresion', 
      label: 'Regresión y Correlación', 
      icon: TrendingUp,
      color: 'red'
    }
  ];

  // Verificar si hay datos suficientes
  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-16">
        <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-600 mb-2">
          No hay datos para analizar
        </h3>
        <p className="text-gray-500">
          Registra algunas transacciones para ver los análisis estadísticos
        </p>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg max-w-md mx-auto">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> Ve a la pestaña "Transacciones" y registra algunas operaciones para poder ver los análisis.
          </p>
        </div>
      </div>
    );
  }

  if (analyticsData.allAmounts.length === 0) {
    return (
      <div className="text-center py-16">
        <BarChart3 className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-600 mb-2">
          Datos insuficientes para análisis
        </h3>
        <p className="text-gray-500 mb-4">
          Las transacciones registradas no tienen montos válidos
        </p>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 max-w-2xl mx-auto text-left">
          <p className="text-sm text-yellow-800 mb-2">
            <strong>Debug Info:</strong>
          </p>
          <ul className="text-xs text-yellow-700 space-y-1">
            <li>• Total de transacciones: {transactions.length}</li>
            <li>• Montos válidos: {analyticsData.allAmounts.length}</li>
            <li>• Ingresos detectados: {analyticsData.ingresos.length}</li>
            <li>• Gastos detectados: {analyticsData.gastos.length}</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center border-b-2 border-indigo-600 pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Bite Club S.A.</h2>
        <p className="text-lg font-semibold text-indigo-600 mt-2">
          ANÁLISIS ESTADÍSTICO Y PROBABILIDAD
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Análisis basado en {transactions.length} transacciones registradas
        </p>
        <div className="mt-2 flex justify-center gap-4 text-xs text-gray-500">
          <span>📊 {analyticsData.allAmounts.length} montos válidos</span>
          <span>💰 {analyticsData.ingresos.length} ingresos</span>
          <span>💸 {analyticsData.gastos.length} gastos</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-wrap border-b border-gray-300">
          {sections.map(section => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-3 font-semibold transition flex-1 min-w-fit ${
                  isActive
                    ? `bg-${section.color}-50 text-${section.color}-700 border-b-4 border-${section.color}-600`
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm hidden md:inline">{section.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="p-6">
          {activeSection === 'descriptiva' && (
            <EstadisticaDescriptiva data={analyticsData} />
          )}
          
          {activeSection === 'probabilidad' && (
            <ProbabilidadAnalisis data={analyticsData} />
          )}
          
          {activeSection === 'distribuciones' && (
            <DistribucionesAnalisis data={analyticsData} />
          )}
          
          {activeSection === 'hipotesis' && (
            <PruebaHipotesis data={analyticsData} />
          )}
          
          {activeSection === 'regresion' && (
            <RegresionCorrelacion data={analyticsData} />
          )}
        </div>
      </div>
    </div>
  );
}