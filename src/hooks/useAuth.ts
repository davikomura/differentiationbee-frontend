// src/hooks/useAuth.ts
export const useAuth = () => {
  const token = localStorage.getItem("authToken");
  return {
    isAuthenticated: !!token,
    token,
  };
};
