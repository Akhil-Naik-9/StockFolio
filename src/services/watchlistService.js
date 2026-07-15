import api from "./api";

const getWatchlist = async () => {
  const { data } = await api.get("/watchlist");
  return data;
};

const addToWatchlist = async (item) => {
  const { data } = await api.post("/watchlist", item);
  return data;
};

const removeFromWatchlist = async (id) => {
  const { data } = await api.delete(`/watchlist/${id}`);
  return data;
};

export default { getWatchlist, addToWatchlist, removeFromWatchlist };
