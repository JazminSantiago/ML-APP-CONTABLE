export const accountTypes = {
  // ACTIVOS CIRCULANTES
  'Caja': 'asset',
  'Banco': 'asset',
  'Clientes': 'asset',
  'Inventario': 'asset',
  'IVA Acreditado': 'asset',
  'Papelería y Útiles': 'asset',
  'Rentas Pagadas por Anticipado': 'asset',
  
  // ACTIVOS FIJOS
  'Terreno': 'asset',
  'Edificio': 'asset',
  'Mobiliario': 'asset',
  'Equipo de Cómputo': 'asset',
  'Equipo de Reparto': 'asset',
  'Equipo de Transporte': 'asset',
  
  // ACTIVOS DIFERIDOS
  'Gastos de Instalación': 'asset',
  
  // DEPRECIACIONES ACUMULADAS (CONTRA-ACTIVOS - se restan del activo)
  'Depreciación Acumulada de Edificio': 'contra-asset',
  'Depreciación Acumulada de Mobiliario': 'contra-asset',
  'Depreciación Acumulada de Equipo de Cómputo': 'contra-asset',
  'Depreciación Acumulada de Equipo de Reparto': 'contra-asset',
  'Depreciación Acumulada de Equipo de Transporte': 'contra-asset',
  'Depreciación Acumulada de Gastos de Instalación': 'contra-asset',
  
  // PASIVOS
  'Documentos por Pagar': 'liability',
  'IVA Trasladado': 'liability',
  'IVA por Trasladar': 'liability',
  'Anticipo de Clientes': 'liability',
  'ISR por Pagar': 'liability',
  'PTU por Pagar': 'liability',
  
  // CAPITAL
  'Capital Social': 'equity',
  'Resultado del Ejercicio': 'equity',
  
  // INGRESOS
  'Ventas': 'revenue',
  
  // EGRESOS
  'Costo de Ventas': 'expense',
  'Gastos de Venta': 'expense',
  'Gastos de Administración': 'expense',
  'Gastos de Depreciación': 'expense',
  'ISR 30%': 'expense',
  'PTU 10%': 'expense'
};