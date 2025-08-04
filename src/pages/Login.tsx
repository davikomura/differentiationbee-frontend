// src/pages/Login.tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useAuth } from "../context/authContext";

const Login = () => {
    const { t } = useTranslation();
    const { loginUser, loading, error } = useLogin();
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await loginUser(username, password);
            authLogin(response.access_token);
            navigate("/");
        } catch (err) {
        }
    };

    return (
        <main className="relative min-h-screen bg-black text-yellow-300 px-6 py-16 flex flex-col items-center">
            <div className="w-full max-w-md bg-yellow-900/10 border border-yellow-700 rounded-xl p-8 shadow-lg">
                <h1 className="text-3xl font-bold mb-4 text-yellow-400 text-center">
                    {t("login.title")}
                </h1>
                <p className="text-yellow-200 text-sm mb-8 text-center">
                    {t("login.subtitle")}
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="username" className="block mb-1 text-sm">
                            {t("login.username")}
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
                        <label htmlFor="password" className="block mb-1 text-sm">
                            {t("login.password")}
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
                        <div className="text-red-400 text-sm text-center mt-2">
                            {error}
                        </div>
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
                        {loading ? t("login.loading") : t("login.submit")}
                    </button>
                </form>

                <div className="text-sm text-center mt-6 text-yellow-500">
                    {t("login.noAccount")}{" "}
                    <Link to="/register" className="text-yellow-400 hover:underline font-medium">
                        {t("login.signup")}
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Login;