import { useState, useRef } from "react";
import { generateQuestion } from "../api/questionService";

export function useQuestion() {
  const [question, setQuestion] = useState<{ latex: string; str: string }>({
    latex: "",
    str: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);

  const TIME_BY_LEVEL: Record<number, number> = {
    1: 20,
    2: 25,
    3: 30,
    4: 35,
    5: 40,
    6: 50,
    7: 60,
    8: 70,
    9: 75,
    10: 90,
  };

  const loadQuestion = async (level: number, onTimeout: () => void) => {
    setLoading(true);
    setError(null);
    const levelTime = TIME_BY_LEVEL[level] ?? 30;
    setTimeLeft(levelTime);
    clearInterval(timerRef.current!);

    try {
      const data = await generateQuestion(level);
      setQuestion({
        latex: data.expression_latex,
        str: data.expression_str,
      });
      setStartTime(Date.now());

      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            onTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setError("Erro ao carregar a questão.");
    } finally {
      setLoading(false);
    }
  };

  const cleanup = () => {
    clearInterval(timerRef.current!);
  };

  return {
    question,
    loading,
    error,
    timeLeft,
    startTime,
    loadQuestion,
    cleanup,
  };
}
