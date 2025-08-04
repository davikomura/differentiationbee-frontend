import { useState } from "react";
import { validateAnswer } from "../api/questionService";

export function useAnswerValidator() {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validate = async (
    expressionStr: string,
    input: string,
    timeTaken: number,
    level: number,
    useLatex: boolean = false
  ) => {
    setLoading(true);
    setFeedback(null);
    setError(null);

    try {
      const result = await validateAnswer(expressionStr, input, timeTaken, level, useLatex);
      setFeedback(result.is_correct ? "correct" : "wrong");

      if (!result.is_correct && result.correct_derivative_latex) {
        setError(`Correta: ${result.correct_derivative_latex}`);
      }

      return result;
    } catch (err) {
      setError("Erro ao validar resposta.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    validate,
    feedback,
    error,
    loading,
    setFeedback,
    setError,
  };
}