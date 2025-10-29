import { useLocalStorage } from './useLocalStorage';
import { initialCashCount } from '../utils/constants';

export const useTransactions = () => {
  const [transactions, setTransactions] = useLocalStorage('transactions', []);
  const [adjustments, setAdjustments] = useLocalStorage('adjustments', []);
  const [endDate, setEndDate] = useLocalStorage('endDate', new Date().toISOString().split('T')[0]);
  const [startDate, setStartDate] = useLocalStorage('startDate', new Date().toISOString().split('T')[0]);
  const [cashCount, setCashCount] = useLocalStorage('cashCount', initialCashCount);
  const [arqueoDate, setArqueoDate] = useLocalStorage('arqueoDate', new Date().toISOString().split('T')[0]);
  const [firmaEncargadoCaja, setFirmaEncargadoCaja] = useLocalStorage('firmaEncargadoCaja', null);
  const [firmaEncargadoSucursal, setFirmaEncargadoSucursal] = useLocalStorage('firmaEncargadoSucursal', null);
  
  const addTransaction = (transactionData) => {
    const newTx = {
      id: Date.now(),
      ...transactionData,
      amount: parseFloat(transactionData.amount)
    };
    setTransactions([...transactions, newTx]);
    return newTx;
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const addAdjustment = (adjustmentData) => {
    const newAdj = {
      id: Date.now(),
      ...adjustmentData,
      amount: parseFloat(adjustmentData.amount)
    };
    setAdjustments([...adjustments, newAdj]);
    return newAdj;
  };

  const deleteAdjustment = (id) => {
    setAdjustments(adjustments.filter(a => a.id !== id));
  };

  const updateCashCount = (denomination, value) => {
    setCashCount({...cashCount, [denomination]: parseInt(value) || 0});
  };

  const clearAllData = () => {
    if (window.confirm('¿Estás seguro de que quieres borrar TODOS los datos? Esta acción no se puede deshacer.')) {
      setTransactions([]);
      setAdjustments([]);
      setCashCount(initialCashCount);
      setFirmaEncargadoCaja(null);
      setFirmaEncargadoSucursal(null);
      localStorage.clear();
      alert('Todos los datos han sido eliminados');
      return true;
    }
    return false;
  };

  return {
    transactions,
    adjustments,
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
    addTransaction,
    deleteTransaction,
    addAdjustment,
    deleteAdjustment,
    updateCashCount,
    clearAllData
  };
};