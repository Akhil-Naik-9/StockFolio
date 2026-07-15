import { useState } from "react";
import Modal from "./Modal";

const emptyForm = {
  stockName: "",
  ticker: "",
  type: "Buy",
  quantity: "",
  price: "",
  date: "",
};

const TransactionFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState(emptyForm);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      quantity: Number(form.quantity),
      price: Number(form.price),
      date: form.date || new Date().toISOString(),
    });
    setForm(emptyForm);
  };

  return (
    <Modal title="Add Transaction" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="label-text">Stock Name</label>
          <input
            className="input-field"
            name="stockName"
            value={form.stockName}
            onChange={handleChange}
            placeholder="e.g. Reliance Industries"
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
              placeholder="RELIANCE"
              required
            />
          </div>
          <div>
            <label className="label-text">Type</label>
            <select className="input-field" name="type" value={form.type} onChange={handleChange}>
              <option value="Buy">Buy</option>
              <option value="Sell">Sell</option>
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
            <label className="label-text">Price (₹)</label>
            <input
              className="input-field"
              type="number"
              min="0"
              step="0.01"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label className="label-text">Date</label>
          <input className="input-field" type="date" name="date" value={form.date} onChange={handleChange} />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Add Transaction
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TransactionFormModal;
