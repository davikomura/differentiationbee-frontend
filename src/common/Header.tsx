import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: t("header.home") },
    { to: "/train", label: t("header.train") },
    { to: "/ranking", label: t("header.ranking") },
  ];

  const isActive = (path: string) =>
    location.pathname === path ? "text-yellow-400 font-semibold" : "";

  return (
    <header className="w-full bg-black border-b border-yellow-700 text-yellow-300 shadow-md z-50 relative">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-yellow-400">
          {t("header.title")}
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`hover:text-yellow-400 transition duration-200 ${isActive(link.to)}`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            to="/login"
            className="ml-4 bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg shadow hover:bg-yellow-300 transition"
          >
            {t("header.login")}
          </Link>
        </nav>

        <button
          className="md:hidden p-2 rounded-md bg-yellow-900/30 border border-yellow-700 hover:bg-yellow-800/50 transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/80 backdrop-blur-sm border-t border-yellow-700 shadow-lg z-40">
          <nav className="flex flex-col gap-2 px-6 py-4 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={`px-3 py-2 rounded-md hover:bg-yellow-900/20 hover:text-yellow-400 transition-colors duration-200 ${isActive(link.to)}`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 px-3 py-2 text-center bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-300 transition"
            >
              {t("header.login")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
