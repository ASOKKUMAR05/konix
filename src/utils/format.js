export const formatCurrency = (value) => {
  if (value === undefined || value === null) return '₹0.00';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

export const MathUtils = {
  calculateNetGains: (profits, losses) => {
    return (profits || 0) - (losses || 0);
  }
};
