// src/hooks/useLogin.ts
import { useState } from "react";
import { login } from "../api/authService";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginUser = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login(username, password);
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao fazer login.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error };
};
