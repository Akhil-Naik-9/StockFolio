import { useEffect, useState, useMemo } from "react";
import { Plus, Search, Pencil, Trash2, Download, ArrowUpDown } from "lucide-react";
import toast from "react-hot-toast";
import DashboardLayout from "../components/DashboardLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import StockFormModal from "../components/StockFormModal";
import ConfirmDialog from "../components/ConfirmDialog";
import portfolioService from "../services/portfolioService";
import { formatCurrency, formatPercent, formatDate, calculateStockMetrics } from "../utils/format";

const PortfolioPage = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("stockName");
  const [sortAsc, setSortAsc] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStock, setEditingStock] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchStocks = async () => {
    try {
      const data = await portfolioService.getPortfolio();
      setStocks(data);
    } catch (error) {
      toast.error("Failed to load portfolio");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const handleAddOrEdit = async (formData) => {
    try {
      if (editingStock) {
        await portfolioService.updateStock(editingStock._id, formData);
        toast.success("Stock updated");
      } else {
        await portfolioService.addStock(formData);
        toast.success("Stock added to portfolio");
      }
      setModalOpen(false);
      setEditingStock(null);
      fetchStocks();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      await portfolioService.deleteStock(deleteId);
      toast.success("Stock removed");
      setDeleteId(null);
      fetchStocks();
    } catch (error) {
      toast.error("Failed to remove stock");
    }
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const filteredSorted = useMemo(() => {
    let result = stocks.filter(
      (s) =>
        s.stockName.toLowerCase().includes(search.toLowerCase()) ||
        s.ticker.toLowerCase().includes(search.toLowerCase())
    );

    result.sort((a, b) => {
      let valA = a[sortKey];
      let valB = b[sortKey];
      if (typeof valA === "string") {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

    return result;
  }, [stocks, search, sortKey, sortAsc]);

  const exportToCSV = () => {
    if (stocks.length === 0) {
      toast.error("No stocks to export");
      return;
    }
    const headers = ["Stock Name", "Ticker", "Quantity", "Buy Price", "Current Price", "Investment", "Current Value", "P/L", "P/L %"];
    const rows = stocks.map((s) => {
      const { investment, currentValue, profitLoss, profitLossPercent } = calculateStockMetrics(s);
      return [s.stockName, s.ticker, s.quantity, s.buyPrice, s.currentPrice, investment, currentValue, profitLoss.toFixed(2), profitLossPercent.toFixed(2)];
    });
    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "portfolio.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const columns = [
    { key: "stockName", label: "Stock" },
    { key: "ticker", label: "Ticker" },
    { key: "quantity", label: "Qty" },
    { key: "buyPrice", label: "Buy Price" },
    { key: "currentPrice", label: "Current Price" },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">My Portfolio</h1>
          <p className="text-slate-400 text-sm">Manage the stocks you currently hold.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary flex items-center gap-2" onClick={exportToCSV}>
            <Download size={16} /> Export CSV
          </button>
          <button
            className="btn-primary flex items-center gap-2"
            onClick={() => {
              setEditingStock(null);
              setModalOpen(true);
            }}
          >
            <Plus size={16} /> Add Stock
          </button>
        </div>
      </div>

      <div className="card p-3 mb-4 flex items-center gap-2">
        <Search size={16} className="text-slate-500" />
        <input
          className="bg-transparent flex-1 text-sm text-slate-200 placeholder-slate-500 focus:outline-none"
          placeholder="Search by stock name or ticker..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : filteredSorted.length === 0 ? (
        <div className="card p-8 text-center text-slate-400">No stocks found.</div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-base-700">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-4 py-3 whitespace-nowrap cursor-pointer select-none"
                    onClick={() => handleSort(col.key)}
                  >
                    <span className="flex items-center gap-1">
                      {col.label} <ArrowUpDown size={12} />
                    </span>
                  </th>
                ))}
                <th className="px-4 py-3">Investment</th>
                <th className="px-4 py-3">Current Value</th>
                <th className="px-4 py-3">P/L</th>
                <th className="px-4 py-3">P/L %</th>
                <th className="px-4 py-3">Purchased</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSorted.map((stock) => {
                const { investment, currentValue, profitLoss, profitLossPercent } = calculateStockMetrics(stock);
                return (
                  <tr key={stock._id} className="border-b border-base-800 last:border-0 hover:bg-base-800/50">
                    <td className="px-4 py-3 text-slate-200 whitespace-nowrap">{stock.stockName}</td>
                    <td className="px-4 py-3 text-slate-400">{stock.ticker}</td>
                    <td className="px-4 py-3">{stock.quantity}</td>
                    <td className="px-4 py-3">{formatCurrency(stock.buyPrice)}</td>
                    <td className="px-4 py-3">{formatCurrency(stock.currentPrice)}</td>
                    <td className="px-4 py-3">{formatCurrency(investment)}</td>
                    <td className="px-4 py-3">{formatCurrency(currentValue)}</td>
                    <td className={`px-4 py-3 ${profitLoss >= 0 ? "text-accent-green" : "text-red-400"}`}>
                      {formatCurrency(profitLoss)}
                    </td>
                    <td className={`px-4 py-3 ${profitLossPercent >= 0 ? "text-accent-green" : "text-red-400"}`}>
                      {formatPercent(profitLossPercent)}
                    </td>
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{formatDate(stock.purchaseDate)}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          className="p-1.5 rounded-lg hover:bg-base-700 text-slate-400 hover:text-accent-blue"
                          onClick={() => {
                            setEditingStock(stock);
                            setModalOpen(true);
                          }}
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          className="p-1.5 rounded-lg hover:bg-base-700 text-slate-400 hover:text-red-400"
                          onClick={() => setDeleteId(stock._id)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <StockFormModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingStock(null);
        }}
        onSubmit={handleAddOrEdit}
        initialData={editingStock}
      />

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Remove Stock"
        message="Are you sure you want to remove this stock from your portfolio? This cannot be undone."
      />
    </DashboardLayout>
  );
};

export default PortfolioPage;
