// src/api/sessionService.ts
import api from "./axiosInstance";

export interface QuestionAnswerCreate {
    session_id: number;
    question_str: string;
    correct_answer_str: string;
    user_answer: string;
    is_correct: boolean;
    time_taken: number;
}

export const trackQuestion = async (payload: QuestionAnswerCreate): Promise<{ message: string; question_id?: number; error?: string }> => {
    try {
        const response = await api.post("/session-question/track", payload);
        return response.data;
    } catch (error) {
        console.error("Error tracking question:", error);
        return { message: "An error occurred", error: "Failed to track question" };
    }
};