// src/components/LoginPromptModal.tsx
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function LoginPromptModal() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-zinc-900 text-yellow-100 rounded-xl p-8 max-w-sm w-full text-center space-y-4">
        <h2 className="text-2xl font-bold">{t("loginPrompt.title")}</h2>
        <p className="text-yellow-300">{t("loginPrompt.message")}</p>
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 rounded"
        >
          {t("loginPrompt.button")}
        </button>
      </div>
    </div>
  );
}