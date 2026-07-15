import { useEffect, useState } from "react";
import { Plus, Trash2, Eye } from "lucide-react";
import toast from "react-hot-toast";
import DashboardLayout from "../components/DashboardLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import WatchlistFormModal from "../components/WatchlistFormModal";
import ConfirmDialog from "../components/ConfirmDialog";
import watchlistService from "../services/watchlistService";
import { formatCurrency, formatPercent } from "../utils/format";

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchWatchlist = async () => {
    try {
      const data = await watchlistService.getWatchlist();
      setWatchlist(data);
    } catch (error) {
      toast.error("Failed to load watchlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const handleAdd = async (formData) => {
    try {
      await watchlistService.addToWatchlist(formData);
      toast.success("Added to watchlist");
      setModalOpen(false);
      fetchWatchlist();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      await watchlistService.removeFromWatchlist(deleteId);
      toast.success("Removed from watchlist");
      setDeleteId(null);
      fetchWatchlist();
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Watchlist</h1>
          <p className="text-slate-400 text-sm">Stocks you're keeping an eye on.</p>
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={() => setModalOpen(true)}>
          <Plus size={16} /> Add Stock
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : watchlist.length === 0 ? (
        <div className="card p-10 text-center">
          <Eye className="mx-auto mb-3 text-slate-600" size={32} />
          <p className="text-slate-400 mb-3">Your watchlist is empty.</p>
          <button className="btn-primary" onClick={() => setModalOpen(true)}>
            Add your first stock
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {watchlist.map((item) => (
            <div key={item._id} className="card p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-white">{item.companyName}</p>
                  <p className="text-xs text-slate-500">{item.ticker}</p>
                </div>
                <button
                  className="text-slate-500 hover:text-red-400 p-1"
                  onClick={() => setDeleteId(item._id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-lg font-bold text-white">{formatCurrency(item.currentPrice)}</p>
                <p className={item.dailyChangePercent >= 0 ? "text-accent-green text-sm" : "text-red-400 text-sm"}>
                  {formatPercent(item.dailyChangePercent)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <WatchlistFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleAdd} />

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Remove from Watchlist"
        message="Are you sure you want to remove this stock from your watchlist?"
      />
    </DashboardLayout>
  );
};

export default WatchlistPage;
