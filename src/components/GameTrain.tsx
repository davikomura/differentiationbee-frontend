// src/components/GameTrain.tsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BlockMath } from "react-katex";
import { Loader2 } from "lucide-react";
import { useQuestion } from "../hooks/useQuestion";
import { useAnswerValidator } from "../hooks/useAnswerValidator";
import { motion, AnimatePresence } from "framer-motion";
import LatexKeyboard from "../components/LatexKeyboard";
import { useRankingSession } from "../hooks/useRankingSession";
import { useCurrentUser } from "../hooks/useCurrentUser";

const MAX_LEVEL = 10;

export default function GameTrain() {
  const { t } = useTranslation();
  const { user, loading: userLoading } = useCurrentUser();

  const [level, setLevel] = useState(1);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverReason, setGameOverReason] = useState("");

  const {
    question,
    loading: questionLoading,
    error: questionError,
    timeLeft,
    startTime,
    loadQuestion,
    cleanup,
  } = useQuestion();

  const {
    validate,
    feedback,
    error: answerError,
    loading: answerLoading,
    setFeedback,
    setError,
  } = useAnswerValidator();

  const { track, saveSession, startSession, sessionId } = useRankingSession(user?.id ?? null);

  const clearInput = () => setInput("");

  const resetGame = () => {
    setLevel(1);
    clearInput();
    setScore(0);
    setCorrectAnswers(0);
    setTotalTime(0);
    setGameOver(false);
    setGameOverReason("");
    setFeedback(null);
    setError(null);
  };

  const endGame = (reason: string, finalScore = score, finalCorrect = correctAnswers, finalTime = totalTime) => {
    setGameOverReason(reason);
    setGameOver(true);
    saveSession(finalScore, finalCorrect, finalCorrect > 0 ? finalTime / finalCorrect : 0);
  };

  const handleTimeout = () => {
    setFeedback("wrong");
    setError(t("train.timeout"));
    endGame(t("train.timeUpMessage"));
  };

  const handleValidate = async () => {
    if (!question.str || !input.trim()) return;

    const timeTaken = startTime ? (Date.now() - startTime) / 1000 : 0;

    const result = await validate(question.latex, input, timeTaken, level, true);

    await track({
      question_str: question.str,
      correct_answer_str: result.correct_derivative_latex,
      user_answer: input,
      is_correct: result.is_correct,
      time_taken: timeTaken,
    });

    if (result.is_correct) {
      const nextScore = score + result.score;
      const nextCorrect = correctAnswers + 1;
      const nextTotalTime = totalTime + timeTaken;

      setScore(nextScore);
      setCorrectAnswers(nextCorrect);
      setTotalTime(nextTotalTime);
      clearInput();

      if (level < MAX_LEVEL) {
        setTimeout(() => setLevel((prev) => prev + 1), 800);
      } else {
        endGame(t("train.completedMessage"), nextScore, nextCorrect, nextTotalTime);
      }
      setFeedback("correct");
    } else {
      setFeedback("wrong");
    }
  };

  useEffect(() => {
    setFeedback(null);
    clearInput();
  }, [level]);

  useEffect(() => {
    if (sessionId && !gameOver) {
      loadQuestion(level, handleTimeout);
      return () => cleanup();
    }
  }, [level, sessionId]);

  if (userLoading || !user) {
    return (
      <main className="min-h-screen bg-black text-white flex justify-center items-center">
        <Loader2 className="animate-spin w-10 h-10" />
      </main>
    );
  }

  if (!sessionId) {
    return (
      <main className="min-h-screen w-full bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-yellow-100 flex items-center justify-center text-center px-4">
        <div className="space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            {t("train.welcomeTitle")}
          </h1>
          <p className="text-lg md:text-xl text-yellow-300 max-w-xl mx-auto">
            {t("train.welcomeMessage")}
          </p>
          <button
            onClick={startSession}
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg md:text-xl py-3 px-8 rounded-xl shadow-md transition-all duration-200 ease-in-out"
          >
            {t("train.start")}
          </button>
        </div>
      </main>
    );
  }

  if (gameOver) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-800 text-yellow-100 flex items-center justify-center px-4">
        <div className="bg-yellow-900/10 border border-yellow-600 rounded-2xl p-10 shadow-2xl max-w-lg w-full text-center animate-fade-in">
          <h1 className="text-5xl font-extrabold mb-4">{t("train.completedTitle")}</h1>
          <p className="text-xl mb-4 font-medium opacity-90">{gameOverReason}</p>
          <p className="text-yellow-400 text-xl font-semibold mb-2">
            {t("train.level")}: {level}
          </p>
          <p className="text-yellow-400 text-3xl font-bold">
            {t("train.score")}: {score}
          </p>
          <button
            onClick={resetGame}
            className="mt-6 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg py-2 px-6 rounded-xl shadow-md transition-all duration-200 ease-in-out"
          >
            {t("train.restart")}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-yellow-100 px-4 py-10 flex flex-col items-center">
      <div className="w-full max-w-4xl grid grid-cols-3 gap-4 items-center text-center mb-12">
        <div className="text-yellow-400 text-base md:text-lg font-medium">
          {t("train.level")} {level}
        </div>
        <div className="text-yellow-300 text-xl font-mono">⏱ {timeLeft}s</div>
        <div className="text-green-400 text-base md:text-lg font-medium">
          {t("train.score")}: {score}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={level}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-2xl space-y-6 text-center"
        >
          {questionLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin w-12 h-12 text-yellow-300" />
            </div>
          ) : (
            <>
              <h2 className="text-2xl md:text-3xl font-bold">{t("train.question")}</h2>

              <div className="py-6 px-4 bg-yellow-950/20 border border-yellow-700 rounded-xl text-lg">
                <BlockMath math={question.latex} />
              </div>

              <LatexKeyboard value={input} onChange={setInput} />

              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                onClick={handleValidate}
                disabled={questionLoading || answerLoading}
                className={`w-full py-3 rounded-xl text-lg font-bold transition ${
                  questionLoading || answerLoading
                    ? "bg-yellow-300/40 text-black opacity-60 cursor-not-allowed"
                    : "bg-yellow-400 text-black hover:bg-yellow-300"
                }`}
              >
                {t("train.check")}
              </motion.button>

              {feedback && (
                <AnimatePresence>
                  <motion.div
                    key={feedback}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className={`text-xl font-bold ${
                      feedback === "correct" ? "text-green-400" : "text-red-500"
                    }`}
                  >
                    {feedback === "correct" ? t("train.correct") : t("train.incorrect")}
                  </motion.div>
                </AnimatePresence>
              )}

              {(questionError || answerError) && (
                <div className="text-red-400 font-medium">
                  {questionError || answerError}
                </div>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}