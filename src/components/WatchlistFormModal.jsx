import { useState } from "react";
import Modal from "./Modal";

const emptyForm = { companyName: "", ticker: "", currentPrice: "", dailyChangePercent: "" };

const WatchlistFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState(emptyForm);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      currentPrice: Number(form.currentPrice),
      dailyChangePercent: Number(form.dailyChangePercent || 0),
    });
    setForm(emptyForm);
  };

  return (
    <Modal title="Add to Watchlist" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="label-text">Company Name</label>
          <input
            className="input-field"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            placeholder="e.g. Infosys Ltd"
            required
          />
        </div>
        <div>
          <label className="label-text">Ticker</label>
          <input
            className="input-field"
            name="ticker"
            value={form.ticker}
            onChange={handleChange}
            placeholder="INFY"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label-text">Current Price (₹)</label>
            <input
              className="input-field"
              type="number"
              min="0"
              step="0.01"
              name="currentPrice"
              value={form.currentPrice}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="label-text">Daily Change (%)</label>
            <input
              className="input-field"
              type="number"
              step="0.01"
              name="dailyChangePercent"
              value={form.dailyChangePercent}
              onChange={handleChange}
              placeholder="e.g. -1.25"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Add to Watchlist
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default WatchlistFormModal;
