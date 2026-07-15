import api from "./api";

const getPortfolio = async () => {
  const { data } = await api.get("/portfolio");
  return data;
};

const addStock = async (stock) => {
  const { data } = await api.post("/portfolio", stock);
  return data;
};

const updateStock = async (id, stock) => {
  const { data } = await api.put(`/portfolio/${id}`, stock);
  return data;
};

const deleteStock = async (id) => {
  const { data } = await api.delete(`/portfolio/${id}`);
  return data;
};

export default { getPortfolio, addStock, updateStock, deleteStock };
