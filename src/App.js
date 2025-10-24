// src/App.js
import React, { useState } from 'react';
import { AccountingProvider, useAccounting } from './context/AccountingContext';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Header from './components/layout/Header';
import TabNavigation from './components/layout/TabNavigation';
import TransactionForm from './components/transactions/TransactionForm';
import TransactionList from './components/transactions/TransactionList';
import AdjustmentForm from './components/adjustments/AdjustmentForm';
import AdjustmentList from './components/adjustments/AdjustmentList';
import ArqueoCaja from './components/arqueo/ArqueoCaja';
import LibroDiario from './components/reports/LibroDiario';
import MayorGeneral from './components/reports/MayorGeneral';
import BalanceGeneral from './components/reports/BalanceGeneral';
import EstadoResultados from './components/reports/EstadoResultados';

function AccountingApp() {
  const {
    isLoggedIn,
    currentUser,
    login,
    logout,
    register,
    transactions,
    adjustments,
    addTransaction,
    deleteTransaction,
    addAdjustment,
    deleteAdjustment,
    cashCount,
    updateCashCount,
    arqueoDate,
    setArqueoDate,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    clearAllData,
    journalEntries,
    ledger,
    balances,
    assets,
    liabilities,
    equity,
    totalAssets,
    totalLiabilities,
    totalEquity,
    totalRevenues,
    utilidadAntesImpuestos,
    isrCalculado,
    ptuCalculado,
    utilidadNetaCalculada,
    cashBalance
  } = useAccounting();

  const [showRegister, setShowRegister] = useState(false);
  const [activeTab, setActiveTab] = useState('transactions');

  if (!isLoggedIn) {
    return showRegister ? (
      <RegisterForm 
        onRegister={register}
        onBackToLogin={() => setShowRegister(false)}
      />
    ) : (
      <LoginForm 
        onLogin={login}
        onShowRegister={() => setShowRegister(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <Header 
          currentUser={currentUser}
          onLogout={logout}
          onClearData={clearAllData}
        />

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <TabNavigation 
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="p-8">
            {activeTab === 'transactions' && (
              <div className="space-y-6">
                <TransactionForm onAddTransaction={addTransaction} />
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Transacciones Registradas</h3>
                  <TransactionList transactions={transactions} onDelete={deleteTransaction} />
                </div>
              </div>
            )}

            {activeTab === 'adjustments' && (
              <div className="space-y-6">
                <AdjustmentForm onAddAdjustment={addAdjustment} />
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Ajustes Registrados</h3>
                  <AdjustmentList adjustments={adjustments} onDelete={deleteAdjustment} />
                </div>
              </div>
            )}

            {activeTab === 'arqueo' && (
              <ArqueoCaja 
                cashCount={cashCount}
                onCashCountChange={updateCashCount}
                arqueoDate={arqueoDate}
                onArqueoDateChange={setArqueoDate}
                cashBalance={cashBalance}
              />
            )}

            {activeTab === 'journal' && (
              <LibroDiario 
                entries={journalEntries}
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
              />
            )}

            {activeTab === 'ledger' && (
              <MayorGeneral 
                ledger={ledger}
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
              />
            )}

            {activeTab === 'statements' && (
              <div className="space-y-8">
                <BalanceGeneral 
                  assets={assets}
                  liabilities={liabilities}
                  equity={equity}
                  totalAssets={totalAssets}
                  totalLiabilities={totalLiabilities}
                  totalEquity={totalEquity}
                  utilidadNeta={utilidadNetaCalculada}
                  startDate={startDate}
                  endDate={endDate}
                  onStartDateChange={setStartDate}
                  onEndDateChange={setEndDate}
                  isrCalculado={isrCalculado}
                  ptuCalculado={ptuCalculado}
                />

                <EstadoResultados 
                  balances={balances}
                  totalRevenues={totalRevenues}
                  utilidadAntesImpuestos={utilidadAntesImpuestos}
                  isrCalculado={isrCalculado}
                  ptuCalculado={ptuCalculado}
                  utilidadNeta={utilidadNetaCalculada}
                  startDate={startDate}
                  endDate={endDate}
                  onStartDateChange={setStartDate}
                  onEndDateChange={setEndDate}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AccountingProvider>
      <AccountingApp />
    </AccountingProvider>
  );
}