// Formats a number as Indian Rupees, e.g. 125000 -> ₹1,25,000.00
export const formatCurrency = (value) => {
  const number = Number(value) || 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(number);
};

// Formats a number as a percentage with a sign, e.g. 4.2 -> +4.20%
export const formatPercent = (value) => {
  const number = Number(value) || 0;
  const sign = number > 0 ? "+" : "";
  return `${sign}${number.toFixed(2)}%`;
};

// Formats a date string to a readable "12 Jul 2026" style
export const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// Given a portfolio stock entry, calculates the derived investment values
export const calculateStockMetrics = (stock) => {
  const investment = stock.quantity * stock.buyPrice;
  const currentValue = stock.quantity * stock.currentPrice;
  const profitLoss = currentValue - investment;
  const profitLossPercent = investment > 0 ? (profitLoss / investment) * 100 : 0;

  return { investment, currentValue, profitLoss, profitLossPercent };
};
