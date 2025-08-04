// src/api/authService.ts
import api from "./axiosInstance";

export const login = async (username: string, password: string) => {
  const payload = { username, password };
  console.log("Payload:", payload);
  try {
    const response = await api.post(`/auth/login`, payload);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
