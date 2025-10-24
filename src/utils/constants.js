export const cashDenominations = {
  bills: [
    { key: 'bill1000', label: '$1000', value: 1000 },
    { key: 'bill500', label: '$500', value: 500 },
    { key: 'bill200', label: '$200', value: 200 },
    { key: 'bill100', label: '$100', value: 100 },
    { key: 'bill50', label: '$50', value: 50 },
    { key: 'bill20', label: '$20', value: 20 }
  ],
  coins: [
    { key: 'coin20', label: '$20', value: 20 },
    { key: 'coin10', label: '$10', value: 10 },
    { key: 'coin5', label: '$5', value: 5 },
    { key: 'coin2', label: '$2', value: 2 },
    { key: 'coin1', label: '$1', value: 1 },
    { key: 'coin050', label: '$0.50', value: 0.50 }
  ]
};

export const initialCashCount = {
  bill1000: 0,
  bill500: 0,
  bill200: 0,
  bill100: 0,
  bill50: 0,
  bill20: 0,
  coin20: 0,
  coin10: 0,
  coin5: 0,
  coin2: 0,
  coin1: 0,
  coin050: 0
};

export const defaultUsers = [
  { username: 'admin', password: 'admin123' },
  { username: 'contador', password: 'cont123' }
];