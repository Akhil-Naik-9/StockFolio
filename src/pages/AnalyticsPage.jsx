import { useEffect, useState, useMemo } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Filler,
} from "chart.js";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import DashboardLayout from "../components/DashboardLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import portfolioService from "../services/portfolioService";
import transactionService from "../services/transactionService";
import { calculateStockMetrics } from "../utils/format";

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, BarElement, CategoryScale, LinearScale, Filler);

const chartOptions = {
  plugins: { legend: { labels: { color: "#94a3b8" } } },
  scales: {
    x: { ticks: { color: "#64748b" }, grid: { color: "#1c2836" } },
    y: { ticks: { color: "#64748b" }, grid: { color: "#1c2836" } },
  },
};

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const AnalyticsPage = () => {
  const [stocks, setStocks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stocksData, txnData] = await Promise.all([
          portfolioService.getPortfolio(),
          transactionService.getTransactions(),
        ]);
        setStocks(stocksData);
        setTransactions(txnData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sectorData = useMemo(() => {
    const map = {};
    stocks.forEach((s) => {
      const { currentValue } = calculateStockMetrics(s);
      const sector = s.sector || "Others";
      map[sector] = (map[sector] || 0) + currentValue;
    });
    return map;
  }, [stocks]);

  const monthlyInvestmentData = useMemo(() => {
    const map = {};
    stocks.forEach((s) => {
      const date = new Date(s.purchaseDate);
      const key = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
      map[key] = (map[key] || 0) + s.quantity * s.buyPrice;
    });
    return map;
  }, [stocks]);

  const totals = useMemo(() => {
    return stocks.reduce(
      (acc, s) => {
        const { profitLoss } = calculateStockMetrics(s);
        if (profitLoss >= 0) acc.profit += profitLoss;
        else acc.loss += Math.abs(profitLoss);
        return acc;
      },
      { profit: 0, loss: 0 }
    );
  }, [stocks]);

  // Simulated portfolio growth trend built from current total value
  const currentValueTotal = stocks.reduce((sum, s) => sum + calculateStockMetrics(s).currentValue, 0);
  const growthLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Now"];
  const growthFactors = [0.8, 0.85, 0.87, 0.92, 0.9, 0.97, 1];

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner />
      </DashboardLayout>
    );
  }

  if (stocks.length === 0) {
    return (
      <DashboardLayout>
        <h1 className="text-xl font-bold text-white mb-1">Analytics</h1>
        <p className="text-slate-400 text-sm mb-6">Charts based on your current holdings.</p>
        <div className="card p-10 text-center text-slate-400">
          Add stocks to your portfolio to see analytics here.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-xl font-bold text-white mb-1">Analytics</h1>
      <p className="text-slate-400 text-sm mb-6">Charts based on your current holdings and transactions.</p>

      <div className="grid lg:grid-cols-2 gap-4 mb-4">
        <div className="card p-4">
          <h2 className="font-semibold text-white mb-3">Portfolio Growth</h2>
          <div className="h-64">
            <Line
              data={{
                labels: growthLabels,
                datasets: [
                  {
                    label: "Portfolio Value",
                    data: growthFactors.map((f) => Math.round(currentValueTotal * f)),
                    borderColor: "#3b82f6",
                    backgroundColor: "rgba(59,130,246,0.15)",
                    fill: true,
                    tension: 0.35,
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>
        </div>

        <div className="card p-4">
          <h2 className="font-semibold text-white mb-3">Sector Distribution</h2>
          <div className="h-64 flex items-center justify-center">
            <Doughnut
              data={{
                labels: Object.keys(sectorData),
                datasets: [
                  {
                    data: Object.values(sectorData),
                    backgroundColor: ["#3b82f6", "#22c55e", "#f59e0b", "#a855f7", "#ef4444", "#06b6d4", "#eab308"],
                    borderColor: "#0f1720",
                    borderWidth: 2,
                  },
                ],
              }}
              options={{ plugins: { legend: { labels: { color: "#94a3b8" } } } }}
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card p-4">
          <h2 className="font-semibold text-white mb-3">Monthly Investment</h2>
          <div className="h-64">
            <Bar
              data={{
                labels: Object.keys(monthlyInvestmentData),
                datasets: [
                  {
                    label: "Invested (₹)",
                    data: Object.values(monthlyInvestmentData),
                    backgroundColor: "#3b82f6",
                    borderRadius: 4,
                  },
                ],
              }}
              options={chartOptions}
            />
          </div>
        </div>

        <div className="card p-4">
          <h2 className="font-semibold text-white mb-3">Profit vs Loss</h2>
          <div className="h-64">
            <Bar
              data={{
                labels: ["Profit", "Loss"],
                datasets: [
                  {
                    label: "Amount (₹)",
                    data: [totals.profit, totals.loss],
                    backgroundColor: ["#22c55e", "#ef4444"],
                    borderRadius: 4,
                  },
                ],
              }}
              options={{ ...chartOptions, plugins: { legend: { display: false } } }}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
