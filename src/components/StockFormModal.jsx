import { useState, useEffect } from "react";
import Modal from "./Modal";

const emptyForm = {
  stockName: "",
  ticker: "",
  sector: "",
  quantity: "",
  buyPrice: "",
  currentPrice: "",
  purchaseDate: "",
};

const sectors = ["IT", "Banking", "Pharma", "FMCG", "Auto", "Energy", "Others"];

const StockFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        purchaseDate: initialData.purchaseDate
          ? new Date(initialData.purchaseDate).toISOString().split("T")[0]
          : "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      quantity: Number(form.quantity),
      buyPrice: Number(form.buyPrice),
      currentPrice: Number(form.currentPrice || form.buyPrice),
    });
  };

  return (
    <Modal title={initialData ? "Edit Stock" : "Add Stock"} isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="label-text">Stock Name</label>
          <input
            className="input-field"
            name="stockName"
            value={form.stockName}
            onChange={handleChange}
            placeholder="e.g. Tata Consultancy Services"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label-text">Ticker</label>
            <input
              className="input-field"
              name="ticker"
              value={form.ticker}
              onChange={handleChange}
              placeholder="TCS"
              required
            />
          </div>
          <div>
            <label className="label-text">Sector</label>
            <select className="input-field" name="sector" value={form.sector} onChange={handleChange}>
              <option value="">Select</option>
              {sectors.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label-text">Quantity</label>
            <input
              className="input-field"
              type="number"
              min="1"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="label-text">Buy Price (₹)</label>
            <input
              className="input-field"
              type="number"
              min="0"
              step="0.01"
              name="buyPrice"
              value={form.buyPrice}
              onChange={handleChange}
              required
            />
          </div>
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
              placeholder="Defaults to buy price"
            />
          </div>
          <div>
            <label className="label-text">Purchase Date</label>
            <input
              className="input-field"
              type="date"
              name="purchaseDate"
              value={form.purchaseDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            {initialData ? "Save Changes" : "Add Stock"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default StockFormModal;
