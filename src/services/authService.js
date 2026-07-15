import api from "./api";

const register = async (formData) => {
  const { data } = await api.post("/auth/register", formData);
  return data;
};

const login = async (formData) => {
  const { data } = await api.post("/auth/login", formData);
  return data;
};

const getProfile = async () => {
  const { data } = await api.get("/auth/profile");
  return data;
};

const updateProfile = async (formData) => {
  const { data } = await api.put("/auth/profile", formData);
  return data;
};

export default { register, login, getProfile, updateProfile };
