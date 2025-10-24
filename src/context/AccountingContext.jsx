import React, { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTransactions } from '../hooks/useTransactions';
import { getBalance, getJournalEntries, getLedger, categorizeBalances, calculateTotals, calculateUtilidades } from '../utils/calculations';

const AccountingContext = createContext();

export const useAccounting = () => {
  const context = useContext(AccountingContext);
  if (!context) {
    throw new Error('useAccounting must be used within AccountingProvider');
  }
  return context;
};

export const AccountingProvider = ({ children }) => {
  const auth = useAuth();
  const transactionsData = useTransactions();

  // Cálculos derivados
  const balances = getBalance(transactionsData.transactions, transactionsData.adjustments);
  const journalEntries = getJournalEntries(transactionsData.transactions, transactionsData.adjustments);
  const ledger = getLedger(transactionsData.transactions, transactionsData.adjustments);
  const { assets, liabilities, equity, revenues, expenses } = categorizeBalances(balances);
  const { totalAssets, totalLiabilities, totalEquity, totalRevenues, totalExpenses } = calculateTotals(balances);
  const { utilidadAntesImpuestos, isrCalculado, ptuCalculado, utilidadNetaCalculada } = calculateUtilidades(balances);

  const cashBalance = balances['Caja'] || 0;

  const value = {
    // Auth
    ...auth,
    
    // Transactions
    ...transactionsData,
    
    // Calculated data
    balances,
    journalEntries,
    ledger,
    assets,
    liabilities,
    equity,
    revenues,
    expenses,
    totalAssets,
    totalLiabilities,
    totalEquity,
    totalRevenues,
    totalExpenses,
    utilidadAntesImpuestos,
    isrCalculado,
    ptuCalculado,
    utilidadNetaCalculada,
    cashBalance
  };

  return (
    <AccountingContext.Provider value={value}>
      {children}
    </AccountingContext.Provider>
  );
};