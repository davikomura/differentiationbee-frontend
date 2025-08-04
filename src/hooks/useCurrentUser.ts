// src/hooks/useCurrentUser.ts
import { useEffect, useState } from "react";
import { getCurrentUser } from "../api/userService";

export interface User {
    id: string;
    username: string;
    email: string;
    createdAt: string;
}

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    try {
      const data = await getCurrentUser();
      setUser(data);
    } catch (err) {
      setError("Erro ao carregar usuário atual");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, error };
}
