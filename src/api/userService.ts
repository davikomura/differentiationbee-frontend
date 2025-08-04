// src/api/userService.ts
import api from "./axiosInstance";

export const registerUser = async (username: string, email: string, password: string) => {
  const payload = { username, email, password };
  try {
    const response = await api.post(`/auth/register`, payload);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

export const getCurrentUser = async () => {
  try {
    const response = await api.get(`/auth/me`);
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
}