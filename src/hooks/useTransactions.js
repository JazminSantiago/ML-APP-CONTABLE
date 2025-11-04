// src/hooks/useTransactions.js
import { useState, useEffect } from 'react';
import { transactionService, adjustmentService } from '../services/api';
import { initialCashCount } from '../utils/constants';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [adjustments, setAdjustments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados locales (no van al backend)
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [cashCount, setCashCount] = useState(initialCashCount);
  const [arqueoDate, setArqueoDate] = useState(new Date().toISOString().split('T')[0]);
  const [firmaEncargadoCaja, setFirmaEncargadoCaja] = useState(null);
  const [firmaEncargadoSucursal, setFirmaEncargadoSucursal] = useState(null);
  const [nombreEncargadoCaja, setNombreEncargadoCaja] = useState('');
  const [nombreEncargadoSucursal, setNombreEncargadoSucursal] = useState('');

  // Cargar datos al inicio
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [txData, adjData] = await Promise.all([
        transactionService.getAll(),
        adjustmentService.getAll()
      ]);
      setTransactions(txData);
      setAdjustments(adjData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transactionData) => {
    try {
      const newTx = await transactionService.create({
        ...transactionData,
        amount: parseFloat(transactionData.amount)
      });
      setTransactions([...transactions, newTx]);
      return newTx;
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await transactionService.delete(id);
      setTransactions(transactions.filter(t => t._id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw error;
    }
  };

  const addAdjustment = async (adjustmentData) => {
    try {
      const newAdj = await adjustmentService.create({
        ...adjustmentData,
        amount: parseFloat(adjustmentData.amount)
      });
      setAdjustments([...adjustments, newAdj]);
      return newAdj;
    } catch (error) {
      console.error('Error adding adjustment:', error);
      throw error;
    }
  };

  const deleteAdjustment = async (id) => {
    try {
      await adjustmentService.delete(id);
      setAdjustments(adjustments.filter(a => a._id !== id));
    } catch (error) {
      console.error('Error deleting adjustment:', error);
      throw error;
    }
  };

  const updateCashCount = (denomination, value) => {
    setCashCount({ ...cashCount, [denomination]: parseInt(value) || 0 });
  };

  const clearAllData = async () => {
    if (window.confirm('¿Estás seguro de que quieres borrar TODOS los datos? Esta acción no se puede deshacer.')) {
      try {
        // Eliminar todas las transacciones
        await Promise.all(transactions.map(t => transactionService.delete(t._id)));
        // Eliminar todos los ajustes
        await Promise.all(adjustments.map(a => adjustmentService.delete(a._id)));
        
        // Limpiar estados locales
        setTransactions([]);
        setAdjustments([]);
        setCashCount(initialCashCount);
        setFirmaEncargadoCaja(null);
        setFirmaEncargadoSucursal(null);
        setNombreEncargadoCaja('');
        setNombreEncargadoSucursal('');
        
        alert('Todos los datos han sido eliminados');
        return true;
      } catch (error) {
        console.error('Error clearing data:', error);
        alert('Error al eliminar los datos');
        return false;
      }
    }
    return false;
  };

  return {
    transactions,
    adjustments,
    loading,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    cashCount,
    setCashCount,
    arqueoDate,
    setArqueoDate,
    firmaEncargadoCaja,
    setFirmaEncargadoCaja,
    firmaEncargadoSucursal,
    setFirmaEncargadoSucursal,
    nombreEncargadoCaja,
    setNombreEncargadoCaja,
    nombreEncargadoSucursal,
    setNombreEncargadoSucursal,
    addTransaction,
    deleteTransaction,
    addAdjustment,
    deleteAdjustment,
    updateCashCount,
    clearAllData,
    reload: loadData
  };
};