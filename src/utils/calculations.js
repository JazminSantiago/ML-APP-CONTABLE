import { accountTypes } from './accountTypes';

// Calcula el total del conteo de efectivo
export const calculateCashTotal = (cashCount) => {
  return (
    cashCount.bill1000 * 1000 +
    cashCount.bill500 * 500 +
    cashCount.bill200 * 200 +
    cashCount.bill100 * 100 +
    cashCount.bill50 * 50 +
    cashCount.bill20 * 20 +
    cashCount.coin20 * 20 +
    cashCount.coin10 * 10 +
    cashCount.coin5 * 5 +
    cashCount.coin2 * 2 +
    cashCount.coin1 * 1 +
    cashCount.coin50 * 0.5
  );
};

const applyAdjustment = (adjustmentType, amount, balances) => {
  const adjustmentMap = {
    'depreciation-edificio': [
      { account: 'Gastos de Depreciación', type: 'debit', amount },
      { account: 'Depreciación Acumulada de Edificio', type: 'credit', amount }
    ],
    'depreciation-mobiliario': [
      { account: 'Gastos de Depreciación', type: 'debit', amount },
      { account: 'Depreciación Acumulada de Mobiliario', type: 'credit', amount }
    ],
    'depreciation-computo': [
      { account: 'Gastos de Depreciación', type: 'debit', amount },
      { account: 'Depreciación Acumulada de Equipo de Cómputo', type: 'credit', amount }
    ],
    'depreciation-reparto': [
      { account: 'Gastos de Depreciación', type: 'debit', amount },
      { account: 'Depreciación Acumulada de Equipo de Reparto', type: 'credit', amount }
    ],
    'depreciation-transporte': [
      { account: 'Gastos de Depreciación', type: 'debit', amount },
      { account: 'Depreciación Acumulada de Equipo de Transporte', type: 'credit', amount }
    ],
    'depreciation-instalacion': [
      { account: 'Gastos de Depreciación', type: 'debit', amount },
      { account: 'Depreciación Acumulada de Gastos de Instalación', type: 'credit', amount }
    ],
    'rent-expense': [
      { account: 'Gastos de Administración', type: 'debit', amount },
      { account: 'Rentas Pagadas por Anticipado', type: 'credit', amount }
    ],
    'stationery-expense': [
      { account: 'Gastos de Administración', type: 'debit', amount },
      { account: 'Papelería y Útiles', type: 'credit', amount }
    ]
  };

  const entries = adjustmentMap[adjustmentType] || [];

  entries.forEach(({ account, type, amount }) => {
    if (!balances[account]) balances[account] = 0;

    const accountType = accountTypes[account];

    // 🔹 Simplificada y corregida
    if (type === 'debit') {
      // Débito siempre aumenta activos y gastos, disminuye pasivos e ingresos
      balances[account] += (accountType === 'liability' || accountType === 'equity' || accountType === 'revenue') ? -amount : amount;
    } else {
      // Crédito siempre disminuye activos y gastos, aumenta pasivos e ingresos
      balances[account] += (accountType === 'liability' || accountType === 'equity' || accountType === 'revenue') ? amount : -amount;
    }
  });
};


// Calcula saldos de todas las cuentas - VERSIÓN CORREGIDA
export function getBalance(transactions, adjustments) {
  const balances = {};
  
  transactions.forEach(tx => {
    if (!balances[tx.account]) balances[tx.account] = 0;
    
    const accountType = accountTypes[tx.account];
    
    // ✅ TRATAMIENTO DIFERENCIADO POR TIPO DE CUENTA
    if (accountType === 'asset' || accountType === 'expense') {
      // Activos y Gastos: débitos aumentan (+), créditos disminuyen (-)
      balances[tx.account] += tx.type === 'debit' ? tx.amount : -tx.amount;
    } else {
      // Pasivos, Capital e Ingresos: créditos aumentan (+), débitos disminuyen (-)
      balances[tx.account] += tx.type === 'credit' ? tx.amount : -tx.amount;
    }
  });

  adjustments.forEach(adj => {
    applyAdjustment(adj.adjustmentType, adj.amount, balances);
  });

  return balances;
}

// Genera las entradas del libro diario
export function getJournalEntries(transactions, adjustments) {
  const entries = [];
  
  transactions.forEach(tx => {
    entries.push({
      date: tx.date,
      account: tx.account,
      type: tx.type,
      amount: tx.amount,
      description: tx.description
    });
  });

    adjustments.forEach(adj => {
    const adjustmentMap = {
        'depreciation-edificio': [
        { account: 'Gastos de Depreciación', type: 'debit' },
        { account: 'Depreciación Acumulada de Edificio', type: 'credit' }
        ],
        'depreciation-mobiliario': [
        { account: 'Gastos de Depreciación', type: 'debit' },
        { account: 'Depreciación Acumulada de Mobiliario', type: 'credit' }
        ],
        'depreciation-computo': [
        { account: 'Gastos de Depreciación', type: 'debit' },
        { account: 'Depreciación Acumulada de Equipo de Cómputo', type: 'credit' }
        ],
        'depreciation-reparto': [
        { account: 'Gastos de Depreciación', type: 'debit' },
        { account: 'Depreciación Acumulada de Equipo de Reparto', type: 'credit' }
        ],
        'depreciation-transporte': [
        { account: 'Gastos de Depreciación', type: 'debit' },
        { account: 'Depreciación Acumulada de Equipo de Transporte', type: 'credit' }
        ],
        'depreciation-instalacion': [
        { account: 'Gastos de Depreciación', type: 'debit' },
        { account: 'Depreciación Acumulada de Gastos de Instalación', type: 'credit' }
        ],
        'rent-expense': [
        { account: 'Gastos de Administración', type: 'debit' },
        { account: 'Rentas Pagadas por Anticipado', type: 'credit' }
        ],
        'stationery-expense': [
        { account: 'Gastos de Administración', type: 'debit' },
        { account: 'Papelería y Útiles', type: 'credit' }
        ]
    };

    const adjustEntries = adjustmentMap[adj.adjustmentType] || [];
    adjustEntries.forEach(entry => {
      entries.push({
        date: adj.date,
        account: entry.account,
        type: entry.type,
        amount: adj.amount,
        description: adj.description || 'Ajuste contable'
      });
    });
  });

  return entries.sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Genera el libro mayor
export function getLedger(transactions, adjustments) {
  const ledger = {};
  const entries = getJournalEntries(transactions, adjustments);

  entries.forEach(entry => {
    if (!ledger[entry.account]) ledger[entry.account] = [];
    ledger[entry.account].push(entry);
  });

  return ledger;
}

// Categoriza los saldos por tipo
export function categorizeBalances(balances) {
  const assets = {};
  const liabilities = {};
  const equity = {};
  const revenues = {};
  const expenses = {};

  Object.entries(balances).forEach(([account, balance]) => {
    const type = accountTypes[account];
    
    if (type === 'asset') {
    // Los activos nunca deben mostrarse negativos: invertimos si quedó en negativo
    assets[account] = Math.abs(balance);
    } else if (type === 'contra-asset') {
    // Contra-activos (depreciaciones) sí deben restar, así que los dejamos negativos
    assets[account] = -Math.abs(balance);
    } else if (type === 'liability') {
      // Pasivos: los créditos aumentan, débitos disminuyen
      // Si el balance es negativo, el pasivo aumentó (créditos > débitos)
      liabilities[account] = balance;
    } else if (type === 'equity') {
      // Capital: igual que pasivos (créditos aumentan, débitos disminuyen)
      equity[account] = Math.abs(balance);
    } else if (type === 'revenue') {
      // Ingresos: créditos aumentan (negativos en nuestro sistema)
      revenues[account] = Math.abs(balance);
    } else if (type === 'expense') {
      // Gastos: débitos aumentan (positivos)
      expenses[account] = Math.abs(balance);
    }
  });

  return { assets, liabilities, equity, revenues, expenses };
}

// Calcula totales
export function calculateTotals(balances) {
  const { assets, liabilities, equity, revenues, expenses } = categorizeBalances(balances);
  
  // Total activos (sumando positivos y restando depreciaciones)
  const totalAssets = Object.entries(assets).reduce((sum, [account, val]) => {
    const type = accountTypes[account];
    if (type === 'contra-asset') {
      return sum - Math.abs(val); // Las depreciaciones se restan
    }
    return sum + val;
  }, 0);
  
  const totalLiabilities = Object.values(liabilities).reduce((sum, val) => sum + val, 0);
  const totalEquity = Object.values(equity).reduce((sum, val) => sum + val, 0);
  const totalRevenues = Object.values(revenues).reduce((sum, val) => sum + Math.abs(val), 0);
  const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + Math.abs(val), 0);

  return {
    totalAssets,
    totalLiabilities,
    totalEquity,
    totalRevenues,
    totalExpenses
  };
}

// Calcula utilidades e impuestos Y REGISTRA LOS PASIVOS
export function calculateUtilidades(balances) {
  const { totalRevenues, totalExpenses } = calculateTotals(balances);
  
  const utilidadAntesImpuestos = totalRevenues - totalExpenses;
  const isrCalculado = utilidadAntesImpuestos * 0.30;
  const ptuCalculado = utilidadAntesImpuestos * 0.10;
  const utilidadNetaCalculada = utilidadAntesImpuestos - isrCalculado - ptuCalculado;

  return {
    utilidadAntesImpuestos,
    isrCalculado,
    ptuCalculado,
    utilidadNetaCalculada
  };
}