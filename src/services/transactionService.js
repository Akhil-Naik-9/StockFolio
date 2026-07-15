import api from "./api";

const getTransactions = async () => {
  const { data } = await api.get("/transactions");
  return data;
};

const addTransaction = async (transaction) => {
  const { data } = await api.post("/transactions", transaction);
  return data;
};

export default { getTransactions, addTransaction };
