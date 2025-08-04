import { useTranslation } from "react-i18next";
import { Lightbulb, Clock, Trophy, Sigma } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Sigma size={32} />,
      text: t("home.features.solo"),
    },
    {
      icon: <Trophy size={32} />,
      text: t("home.features.ranking"),
    },
    {
      icon: <Lightbulb size={32} />,
      text: t("home.features.latex"),
    },
    {
      icon: <Clock size={32} />,
      text: t("home.features.desafio"),
    },
  ];

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-yellow-300 px-6 py-12 flex flex-col justify-center items-center text-center overflow-hidden">
      <div className="absolute inset-0 -z-10 animate-pulse bg-yellow-900/5 rounded-full blur-3xl" />

      <div className="w-full max-w-6xl">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          {t("home.title")}
        </h1>
        <h2 className="text-2xl font-semibold text-yellow-400 mb-8">
          {t("home.subtitle")}
        </h2>
        <p className="max-w-3xl mx-auto text-yellow-200 text-lg mb-12">
          {t("home.description")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 bg-yellow-900/10 border border-yellow-700 rounded-xl p-4 shadow transition"
            >
              <div className="text-yellow-400 p-2 rounded-full bg-yellow-800/20">
                {feature.icon}
              </div>
              <p className="text-left">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
