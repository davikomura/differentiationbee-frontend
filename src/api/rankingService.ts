// src/api/rankingService.ts
import api from "./axiosInstance";

export const rankingStart = async (userId: string) => {
    try {
        const response = await api.post("/ranking/start", { userId });
        return {
            message: "Sessão iniciada",
            session_id: response.data.session_id,
        };
    } catch (error) {
        console.error("Error starting ranking:", error);
        throw error;
    }
}

export const rankingTop = async (limit: number = 10) => {
    try {
        const response = await api.get(`/ranking/top?limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching top rankings:", error);
        throw error;
    }
}

export const rankingSave = async (
  session_id: number,
  score: number,
  correct_answers: number,
  average_time: number
) => {
  try {
    const response = await api.post("/ranking/save", {
      session_id,
      score,
      correct_answers,
      average_time,
    });
    return {
      message: "Session updated!",
      session_id: response.data.session_id,
    };
  } catch (error) {
    console.error("Error saving ranking:", error);
    throw error;
  }
};

export const rankingGetMySessions = async () => {
    try {
        const response = await api.get("/ranking/my");
        return response.data.map((session: any) => ({
            username: session.username,
            score: session.score,
            correct_answers: session.correct_answers,
            average_time: parseFloat(session.average_time.toFixed(2)),
            created_at: new Date(session.created_at).toISOString(),
        }));
    } catch (error) {
        console.error("Error fetching my sessions:", error);
        throw error;
    }
}
