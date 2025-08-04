// src/hooks/useRegister.ts
import { useState } from "react";
import { registerUser } from "../api/userService";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (username: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await registerUser(username, email, password);
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao registrar.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, setError };
};
