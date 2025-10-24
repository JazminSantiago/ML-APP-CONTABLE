import React from 'react';
import { FileText, Book, Calculator, DollarSign, BarChart3, ClipboardList } from 'lucide-react';

export default function TabNavigation({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'transactions', label: 'Transacciones', icon: FileText },
    { id: 'adjustments', label: 'Ajustes', icon: ClipboardList },
    { id: 'arqueo', label: 'Arqueo de Caja', icon: DollarSign },
    { id: 'journal', label: 'Libro Diario', icon: Book },
    { id: 'ledger', label: 'Mayor General', icon: Calculator },
    { id: 'statements', label: 'Estados Financieros', icon: BarChart3 }
  ];

  return (
    <div className="flex border-b border-gray-300 bg-gray-100">
      {tabs.map(tab => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 font-semibold transition ${
              activeTab === tab.id
                ? 'bg-white text-indigo-600 border-b-4 border-indigo-600'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="hidden md:inline">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}