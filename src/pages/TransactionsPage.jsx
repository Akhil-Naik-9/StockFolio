import { useEffect, useState } from "react";
import { Plus, Receipt } from "lucide-react";
import toast from "react-hot-toast";
import DashboardLayout from "../components/DashboardLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import TransactionFormModal from "../components/TransactionFormModal";
import transactionService from "../services/transactionService";
import { formatCurrency, formatDate } from "../utils/format";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchTransactions = async () => {
    try {
      const data = await transactionService.getTransactions();
      setTransactions(data);
    } catch (error) {
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAdd = async (formData) => {
    try {
      await transactionService.addTransaction(formData);
      toast.success("Transaction logged");
      setModalOpen(false);
      fetchTransactions();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Transactions</h1>
          <p className="text-slate-400 text-sm">A history of your buy and sell activity.</p>
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={() => setModalOpen(true)}>
          <Plus size={16} /> Add Transaction
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : transactions.length === 0 ? (
        <div className="card p-10 text-center">
          <Receipt className="mx-auto mb-3 text-slate-600" size={32} />
          <p className="text-slate-400 mb-3">No transactions logged yet.</p>
          <button className="btn-primary" onClick={() => setModalOpen(true)}>
            Log your first transaction
          </button>
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-base-700">
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Ticker</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t._id} className="border-b border-base-800 last:border-0 hover:bg-base-800/50">
                  <td className="px-4 py-3 text-slate-200 whitespace-nowrap">{t.stockName}</td>
                  <td className="px-4 py-3 text-slate-400">{t.ticker}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        t.type === "Buy" ? "bg-accent-green/15 text-accent-green" : "bg-red-500/15 text-red-400"
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">{t.quantity}</td>
                  <td className="px-4 py-3">{formatCurrency(t.price)}</td>
                  <td className="px-4 py-3">{formatCurrency(t.quantity * t.price)}</td>
                  <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{formatDate(t.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <TransactionFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleAdd} />
    </DashboardLayout>
  );
};

export default TransactionsPage;
