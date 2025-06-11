import axiosInstance from "../utils/axiosInstance";

export const loginUser = async (email,password) => {
  const {data} = await axiosInstance.post("/api/auth/login", { email,password });
  return data;
};
export const registerUser = async (name,email,password) => {
  const {data} = await axiosInstance.post("/api/auth/register", { name,email,password });
  return data;
};
export const logoutUser = async () => {
  const {data} = await axiosInstance.get("/api/auth/logout");
  return data;
}

export const getCurrentUser = async () => {
  const {data} = await axiosInstance.get("/api/auth/me");
  return data;
}

export const getAllShortUrls = async () => {
  const {data} = await axiosInstance.post("/api/user/url");
  return data.urls;
}