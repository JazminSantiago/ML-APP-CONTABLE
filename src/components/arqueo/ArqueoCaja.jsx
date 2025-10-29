import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { cashDenominations } from '../../utils/constants';
import { calculateCashTotal } from '../../utils/calculations';

export default function ArqueoCaja({ 
  cashCount, 
  onCashCountChange, 
  arqueoDate, 
  onArqueoDateChange,
  cashBalance,
  firmaEncargadoCaja,
  onFirmaEncargadoCajaChange,
  firmaEncargadoSucursal,
  onFirmaEncargadoSucursalChange
}) {
  const cashTotal = calculateCashTotal(cashCount);
  const difference = cashTotal - cashBalance;
  
  const inputRefCaja = useRef(null);
  const inputRefSucursal = useRef(null);

  const handleImageUpload = (e, setFirma) => {
    const file = e.target.files[0];
    if (file) {
      // Verificar que sea una imagen
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen válido');
        return;
      }
      
      // Verificar tamaño (máximo 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('La imagen es muy grande. Por favor selecciona una imagen menor a 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFirma(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFirma = (setFirma) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta firma?')) {
      setFirma(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8 border-b-2 border-yellow-600 pb-4">
        <h2 className="text-xl font-bold text-gray-800">Bite Club S.A.</h2>
        <p className="text-lg font-semibold text-yellow-600 mt-2">ARQUEO DE CAJA</p>
        <div className="flex justify-center items-center gap-4 mt-4">
          <label className="font-semibold text-gray-800">Fecha del arqueo:</label>
          <input
            type="date"
            value={arqueoDate}
            onChange={(e) => onArqueoDateChange(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
      </div>

      <div className="bg-yellow-50 border-2 border-yellow-600 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Conteo Físico de Efectivo</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* BILLETES */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-bold text-lg text-gray-800 mb-4 border-b pb-2">💵 BILLETES</h4>
            <div className="space-y-3">
              {cashDenominations.bills.map(bill => (
                <div key={bill.key} className="flex items-center justify-between gap-4">
                  <label className="font-semibold text-gray-700 w-20">{bill.label}</label>
                  <input
                    type="number"
                    min="0"
                    value={cashCount[bill.key]}
                    onChange={(e) => onCashCountChange(bill.key, e.target.value)}
                    className="p-2 border rounded w-24 text-center"
                    placeholder="Cant."
                  />
                  <span className="text-gray-600 w-32 text-right">
                    = ${(cashCount[bill.key] * bill.value).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* MONEDAS */}
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-bold text-lg text-gray-800 mb-4 border-b pb-2">🪙 MONEDAS</h4>
            <div className="space-y-3">
              {cashDenominations.coins.map(coin => (
                <div key={coin.key} className="flex items-center justify-between gap-4">
                  <label className="font-semibold text-gray-700 w-20">{coin.label}</label>
                  <input
                    type="number"
                    min="0"
                    value={cashCount[coin.key]}
                    onChange={(e) => onCashCountChange(coin.key, e.target.value)}
                    className="p-2 border rounded w-24 text-center"
                    placeholder="Cant."
                  />
                  <span className="text-gray-600 w-32 text-right">
                    = ${(cashCount[coin.key] * coin.value).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RESULTADOS DEL ARQUEO */}
      <div className="bg-white border-2 border-gray-400 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 border-b-2 pb-2">📊 Resultados del Arqueo</h3>
        
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="flex justify-between items-center p-4 bg-blue-50 rounded">
            <span className="font-semibold text-gray-800">Saldo Según Libros (Cuenta Caja):</span>
            <span className="text-xl font-bold text-blue-600">${cashBalance.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center p-4 bg-green-50 rounded">
            <span className="font-semibold text-gray-800">Efectivo Contado Físicamente:</span>
            <span className="text-xl font-bold text-green-600">${cashTotal.toFixed(2)}</span>
          </div>

          <div className={`flex justify-between items-center p-4 rounded border-2 ${
            Math.abs(difference) < 0.01 
              ? 'bg-green-100 border-green-500' 
              : cashTotal > cashBalance
              ? 'bg-blue-100 border-blue-500'
              : 'bg-red-100 border-red-500'
          }`}>
            <span className="font-bold text-gray-800">Diferencia:</span>
            <span className={`text-xl font-bold ${
              Math.abs(difference) < 0.01 
                ? 'text-green-700' 
                : cashTotal > cashBalance
                ? 'text-blue-700'
                : 'text-red-700'
            }`}>
              ${difference.toFixed(2)}
            </span>
          </div>

          {/* INTERPRETACIÓN */}
          <div className="mt-6 p-4 bg-gray-50 rounded border">
            <h4 className="font-bold text-gray-800 mb-2">📝 Interpretación:</h4>
            {Math.abs(difference) < 0.01 ? (
              <p className="text-green-700 font-semibold">✅ El arqueo cuadra perfectamente. No hay diferencias.</p>
            ) : cashTotal > cashBalance ? (
              <div>
                <p className="text-blue-700 font-semibold">💰 Sobrante de Caja: Hay más efectivo del que debería.</p>
                <p className="text-sm text-gray-600 mt-2">
                  Posibles causas: Error en registro de ventas, ingresos no registrados, o error en el conteo anterior.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-red-700 font-semibold">⚠️ Faltante de Caja: Hay menos efectivo del que debería.</p>
                <p className="text-sm text-gray-600 mt-2">
                  Posibles causas: Error en registro de gastos, salidas no registradas, robo, o error en el conteo.
                </p>
              </div>
            )}
          </div>

          {/* VALIDACIÓN */}
          <div className="mt-6 p-4 bg-indigo-50 rounded border border-indigo-300">
            <h4 className="font-bold text-gray-800 mb-2">✓ Validación del Proceso:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ Fecha del arqueo registrada: {new Date(arqueoDate).toLocaleDateString('es-MX')}</li>
              <li>✓ Conteo físico realizado: {cashTotal > 0 ? 'Sí' : 'Pendiente'}</li>
              <li>✓ Comparación con libros: {cashBalance > 0 ? 'Sí' : 'Sin saldo en Caja'}</li>
              <li>✓ Estado del arqueo: {Math.abs(difference) < 0.01 ? 'Cuadrado ✅' : 'Con diferencia ⚠️'}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE FIRMAS */}
      <div className="bg-white border-2 border-gray-400 rounded-lg p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-8 text-center border-b-2 pb-2">
          ✍️ FIRMAS DE CONFORMIDAD
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Firma del Encargado de Caja */}
          <div className="text-center space-y-4">
            <div className="h-32 border-2 border-gray-400 rounded-lg flex items-center justify-center bg-gray-50 relative overflow-hidden">
              {firmaEncargadoCaja ? (
                <>
                  <img 
                    src={firmaEncargadoCaja} 
                    alt="Firma Encargado de Caja" 
                    className="max-h-full max-w-full object-contain"
                  />
                  <button
                    onClick={() => handleRemoveFirma(onFirmaEncargadoCajaChange)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    title="Eliminar firma"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Click para subir firma</p>
                </div>
              )}
              <input
                ref={inputRefCaja}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, onFirmaEncargadoCajaChange)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            {!firmaEncargadoCaja && (
              <button
                onClick={() => inputRefCaja.current?.click()}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" /> Cargar Firma
              </button>
            )}
            <div className="space-y-1 mt-4">
              <p className="font-bold text-gray-800">_______________________________</p>
              <p className="font-semibold text-gray-700 text-lg">Encargado de Caja</p>
              <p className="text-sm text-gray-600">Nombre y Firma</p>
            </div>
          </div>

          {/* Firma del Encargado de Sucursal */}
          <div className="text-center space-y-4">
            <div className="h-32 border-2 border-gray-400 rounded-lg flex items-center justify-center bg-gray-50 relative overflow-hidden">
              {firmaEncargadoSucursal ? (
                <>
                  <img 
                    src={firmaEncargadoSucursal} 
                    alt="Firma Encargado de Sucursal" 
                    className="max-h-full max-w-full object-contain"
                  />
                  <button
                    onClick={() => handleRemoveFirma(onFirmaEncargadoSucursalChange)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    title="Eliminar firma"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">Click para subir firma</p>
                </div>
              )}
              <input
                ref={inputRefSucursal}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, onFirmaEncargadoSucursalChange)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            {!firmaEncargadoSucursal && (
              <button
                onClick={() => inputRefSucursal.current?.click()}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" /> Cargar Firma
              </button>
            )}
            <div className="space-y-1 mt-4">
              <p className="font-bold text-gray-800">_______________________________</p>
              <p className="font-semibold text-gray-700 text-lg">Encargado de Sucursal</p>
              <p className="text-sm text-gray-600">Nombre y Firma</p>
            </div>
          </div>
        </div>

        {/* Nota adicional */}
        <div className="mt-8 p-4 bg-gray-50 rounded border text-center">
          <p className="text-xs text-gray-600">
            📌 <strong>Nota:</strong> Este documento certifica que el conteo físico de efectivo fue realizado 
            en presencia de ambas partes y que los montos registrados son correctos. 
            Las firmas validan la conformidad con los resultados del arqueo.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            💡 <strong>Tip:</strong> Puedes cargar una imagen de tu firma escaneada o usar una foto de tu firma manuscrita.
          </p>
        </div>
      </div>
    </div>
  );
}