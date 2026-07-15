import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";
import { Wallet, TrendingUp, TrendingDown, IndianRupee } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import StatCard from "../components/StatCard";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import portfolioService from "../services/portfolioService";
import transactionService from "../services/transactionService";
import watchlistService from "../services/watchlistService";
import { formatCurrency, formatPercent, calculateStockMetrics, formatDate } from "../utils/format";

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler);

const Dashboard = () => {
  const { user } = useAuth();
  const [stocks, setStocks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stocksData, txnData, watchlistData] = await Promise.all([
          portfolioService.getPortfolio(),
          transactionService.getTransactions(),
          watchlistService.getWatchlist(),
        ]);
        setStocks(stocksData);
        setTransactions(txnData);
        setWatchlist(watchlistData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner />
      </DashboardLayout>
    );
  }

  const totals = stocks.reduce(
    (acc, stock) => {
      const { investment, currentValue } = calculateStockMetrics(stock);
      acc.investment += investment;
      acc.currentValue += currentValue;
      return acc;
    },
    { investment: 0, currentValue: 0 }
  );

  const overallProfitLoss = totals.currentValue - totals.investment;
  const overallProfitLossPercent = totals.investment > 0 ? (overallProfitLoss / totals.investment) * 100 : 0;

  // "Today's" P/L is approximated using a small simulated daily movement for demo purposes
  const todaysProfitLoss = overallProfitLoss * 0.12;

  // Group holdings by stock for the allocation pie chart
  const allocationMap = {};
  stocks.forEach((stock) => {
    const { currentValue } = calculateStockMetrics(stock);
    allocationMap[stock.ticker] = (allocationMap[stock.ticker] || 0) + currentValue;
  });

  const pieData = {
    labels: Object.keys(allocationMap),
    datasets: [
      {
        data: Object.values(allocationMap),
        backgroundColor: ["#3b82f6", "#22c55e", "#f59e0b", "#a855f7", "#ef4444", "#06b6d4", "#eab308"],
        borderColor: "#0f1720",
        borderWidth: 2,
      },
    ],
  };

  // Simple simulated portfolio value trend for the line chart (based on current total)
  const trendLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Today"];
  const trendFactors = [0.9, 0.93, 0.89, 0.96, 0.98, 0.95, 1];
  const trendData = {
    labels: trendLabels,
    datasets: [
      {
        label: "Portfolio Value",
        data: trendFactors.map((f) => Math.round(totals.currentValue * f)),
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.15)",
        fill: true,
        tension: 0.35,
        pointRadius: 3,
      },
    ],
  };

  const chartOptions = {
    plugins: { legend: { labels: { color: "#94a3b8" } } },
    scales: {
      x: { ticks: { color: "#64748b" }, grid: { color: "#1c2836" } },
      y: { ticks: { color: "#64748b" }, grid: { color: "#1c2836" } },
    },
  };

  return (
    <DashboardLayout>
      <h1 className="text-xl font-bold text-white mb-1">Welcome, {user?.name?.split(" ")[0]} 👋</h1>
      <p className="text-slate-400 text-sm mb-6">Here's a summary of your portfolio.</p>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Investment" value={formatCurrency(totals.investment)} icon={Wallet} accent="blue" />
        <StatCard label="Current Value" value={formatCurrency(totals.currentValue)} icon={IndianRupee} accent="green" />
        <StatCard
          label="Today's Profit/Loss"
          value={formatCurrency(todaysProfitLoss)}
          icon={todaysProfitLoss >= 0 ? TrendingUp : TrendingDown}
          accent={todaysProfitLoss >= 0 ? "green" : "red"}
        />
        <StatCard
          label="Overall Profit/Loss"
          value={formatCurrency(overallProfitLoss)}
          sub={formatPercent(overallProfitLossPercent)}
          icon={overallProfitLoss >= 0 ? TrendingUp : TrendingDown}
          accent={overallProfitLoss >= 0 ? "green" : "red"}
        />
      </div>

      {stocks.length === 0 ? (
        <div className="card p-8 text-center mb-6">
          <p className="text-slate-400 mb-3">You haven't added any stocks yet.</p>
          <Link to="/portfolio" className="btn-primary inline-block">
            Add your first stock
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-4 mb-6">
          <div className="card p-4">
            <h2 className="font-semibold text-white mb-3">Portfolio Allocation</h2>
            <div className="h-64 flex items-center justify-center">
              <Pie data={pieData} options={{ plugins: { legend: { labels: { color: "#94a3b8" } } } }} />
            </div>
          </div>
          <div className="card p-4">
            <h2 className="font-semibold text-white mb-3">Portfolio Value Trend</h2>
            <div className="h-64">
              <Line data={trendData} options={chartOptions} />
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Recent Transactions */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-white">Recent Transactions</h2>
            <Link to="/transactions" className="text-xs text-accent-blue hover:underline">
              View all
            </Link>
          </div>
          {transactions.length === 0 ? (
            <p className="text-sm text-slate-500">No transactions logged yet.</p>
          ) : (
            <div className="space-y-2">
              {transactions.slice(0, 5).map((t) => (
                <div key={t._id} className="flex items-center justify-between text-sm py-1.5 border-b border-base-800 last:border-0">
                  <div>
                    <p className="text-slate-200">{t.stockName}</p>
                    <p className="text-xs text-slate-500">{formatDate(t.date)}</p>
                  </div>
                  <div className="text-right">
                    <p className={t.type === "Buy" ? "text-accent-green" : "text-red-400"}>{t.type}</p>
                    <p className="text-xs text-slate-500">
                      {t.quantity} @ {formatCurrency(t.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Watchlist Preview */}
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-white">Watchlist Preview</h2>
            <Link to="/watchlist" className="text-xs text-accent-blue hover:underline">
              View all
            </Link>
          </div>
          {watchlist.length === 0 ? (
            <p className="text-sm text-slate-500">Your watchlist is empty.</p>
          ) : (
            <div className="space-y-2">
              {watchlist.slice(0, 5).map((w) => (
                <div key={w._id} className="flex items-center justify-between text-sm py-1.5 border-b border-base-800 last:border-0">
                  <div>
                    <p className="text-slate-200">{w.companyName}</p>
                    <p className="text-xs text-slate-500">{w.ticker}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-200">{formatCurrency(w.currentPrice)}</p>
                    <p className={w.dailyChangePercent >= 0 ? "text-xs text-accent-green" : "text-xs text-red-400"}>
                      {formatPercent(w.dailyChangePercent)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
