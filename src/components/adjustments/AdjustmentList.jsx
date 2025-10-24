import React from 'react';
import { Trash2 } from 'lucide-react';

export default function AdjustmentList({ adjustments, onDelete }) {
  const getAdjustmentLabel = (type) => {
    const labels = {
      'depreciation-edificio': 'Depreciación - Edificio',
      'depreciation-mobiliario': 'Depreciación - Mobiliario',
      'depreciation-computo': 'Depreciación - Eq. Cómputo',
      'depreciation-reparto': 'Depreciación - Eq. Reparto',
      'depreciation-transporte': 'Depreciación - Eq. Transporte',
      'depreciation-instalacion': 'Depreciación - Gtos. Instalación',
      'rent-expense': 'Gasto de Renta',
      'stationery-expense': 'Gasto de Papelería'
    };
    return labels[type] || type;
  };

  if (adjustments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay ajustes registrados
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Fecha</th>
            <th className="border border-gray-300 px-4 py-2">Tipo de Ajuste</th>
            <th className="border border-gray-300 px-4 py-2">Monto</th>
            <th className="border border-gray-300 px-4 py-2">Descripción</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {adjustments.map((adj) => (
            <tr key={adj.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{adj.date}</td>
              <td className="border border-gray-300 px-4 py-2 font-semibold">
                {getAdjustmentLabel(adj.adjustmentType)}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
                ${adj.amount.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-sm">{adj.description}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => onDelete(adj.id)}
                  className="text-red-600 hover:text-red-800 inline-flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" /> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}