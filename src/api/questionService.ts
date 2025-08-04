// src/api/questionService.ts
import api from "./axiosInstance";

export const generateQuestion = async (level: number) => {
  const response = await api.get(`/question/generate?level=${level}`);
  return response.data;
};

export const validateAnswer = async (
  questionStr: string,
  userInput: string,
  timeTaken: number,
  level: number,
  useLatex: boolean = false
) => {
  const response = await api.post("/validate/answer", {
    question_str: questionStr,
    user_input: userInput,
    time_taken: timeTaken,
    use_latex: useLatex,
    level: level,
  });
  return response.data;
};
