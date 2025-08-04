import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom"; // <== Importado aqui

const Register = () => {
  const { t } = useTranslation();
  const { register, loading, error, setError } = useRegister();
  const navigate = useNavigate(); // <== Hook para navegação

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isPasswordStrong = (password: string) => {
    return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordStrong(password)) {
      setError(t("register.errors.weakPassword"));
      return;
    }

    try {
      const response = await register(username, email, password);
      console.log("Usuário registrado com sucesso:", response);
      navigate("/login"); // <== Redireciona para login
    } catch (err) {
      // erro já tratado no hook
    }
  };

  return (
    <main className="relative min-h-screen bg-black text-yellow-300 px-6 py-16 flex flex-col items-center">
      <div className="w-full max-w-md bg-yellow-900/10 border border-yellow-700 rounded-xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-yellow-400 text-center">
          {t("register.title")}
        </h1>
        <p className="text-yellow-200 text-sm mb-8 text-center">
          {t("register.subtitle")}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="username" className="block mb-1 text-sm">
              {t("register.username")}
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="usuario123"
              className="w-full px-4 py-2 rounded-md bg-black border border-yellow-700 text-yellow-200 placeholder-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-sm">
              {t("register.email")}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@email.com"
              className="w-full px-4 py-2 rounded-md bg-black border border-yellow-700 text-yellow-200 placeholder-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm">
              {t("register.password")}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-md bg-black border border-yellow-700 text-yellow-200 placeholder-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center mt-2">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 font-bold py-2 rounded-lg transition ${
              loading
                ? "bg-yellow-200 text-gray-700 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-300 text-black"
            }`}
          >
            {loading ? t("register.loading") : t("register.submit")}
          </button>
        </form>

        <div className="text-sm text-center mt-6 text-yellow-500">
          {t("register.haveAccount")}{" "}
          <a href="/login" className="text-yellow-400 hover:underline font-medium">
            {t("register.login")}
          </a>
        </div>
      </div>
    </main>
  );
};

export default Register;