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

  // Pantalla de Login/Registro
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

  // Pantalla principal del sistema
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
            {/* TRANSACCIONES */}
            {activeTab === 'transactions' && (
              <div className="space-y-6">
                <TransactionForm onAddTransaction={addTransaction} />
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Transacciones Registradas</h3>
                  <TransactionList transactions={transactions} onDelete={deleteTransaction} />
                </div>
              </div>
            )}

            {/* AJUSTES */}
            {activeTab === 'adjustments' && (
              <div className="space-y-6">
                <AdjustmentForm onAddAdjustment={addAdjustment} />
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Ajustes Registrados</h3>
                  <AdjustmentList adjustments={adjustments} onDelete={deleteAdjustment} />
                </div>
              </div>
            )}

            {/* ARQUEO DE CAJA */}
            {activeTab === 'arqueo' && (
              <ArqueoCaja 
                cashCount={cashCount}
                onCashCountChange={updateCashCount}
                arqueoDate={arqueoDate}
                onArqueoDateChange={setArqueoDate}
                cashBalance={cashBalance}
              />
            )}

            {/* LIBRO DIARIO */}
            {activeTab === 'journal' && (
              <LibroDiario entries={journalEntries} endDate={endDate} />
            )}

            {/* MAYOR */}
            {activeTab === 'ledger' && (
              <MayorGeneral ledger={ledger} endDate={endDate} />
            )}

            {/* ESTADOS FINANCIEROS */}
            {activeTab === 'statements' && (
              <div className="space-y-8">
                <div className="bg-blue-50 p-4 rounded-lg flex gap-4 items-center">
                  <label className="font-semibold text-gray-800">Fecha de cierre:</label>
                  <input 
                    type="date" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)} 
                    className="p-2 border rounded" 
                  />
                </div>

                <BalanceGeneral 
                  assets={assets}
                  liabilities={liabilities}
                  equity={equity}
                  totalAssets={totalAssets}
                  totalLiabilities={totalLiabilities}
                  totalEquity={totalEquity}
                  utilidadNeta={utilidadNetaCalculada}
                  endDate={endDate}
                  onEndDateChange={setEndDate}
                />

                <EstadoResultados 
                  balances={balances}
                  totalRevenues={totalRevenues}
                  utilidadAntesImpuestos={utilidadAntesImpuestos}
                  isrCalculado={isrCalculado}
                  ptuCalculado={ptuCalculado}
                  utilidadNeta={utilidadNetaCalculada}
                  endDate={endDate}
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