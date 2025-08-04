// src/hooks/useRankingSession.ts
import { useState } from "react";
import { rankingStart, rankingSave } from "../api/rankingService";
import { trackQuestion } from "../api/sessionService";
import type { QuestionAnswerCreate } from "../api/sessionService";
import { useRef } from "react";

export function useRankingSession(userId: string | null) {
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [started, setStarted] = useState(false);
  const [starting, setStarting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionRef = useRef<number | null>(null);

  const startSession = async () => {
    if (!userId || starting || started || sessionId !== null) return;
    setStarting(true);
    try {
      const res = await rankingStart(userId);
      setSessionId(res.session_id);
      sessionRef.current = res.session_id; // ✅ Preenche o ref aqui
      setStarted(true);
    } catch (err) {
      console.error("Erro ao iniciar sessão", err);
      setError("Erro ao iniciar sessão no ranking.");
    } finally {
      setStarting(false);
    }
  };

  const track = async (data: Omit<QuestionAnswerCreate, "session_id">) => {
    if (!sessionId) return;
    try {
      await trackQuestion({ ...data, session_id: sessionId });
    } catch (err) {
      console.error("Erro ao registrar questão.");
    }
  };

  const saveSession = async (
    score: number,
    correct_answers: number,
    average_time: number
  ) => {
    if (!sessionRef.current) return;
    setSaving(true);
    try {
      await rankingSave(sessionRef.current, score, correct_answers, average_time);
    } catch (err) {
      setError("Erro ao salvar sessão no ranking.");
    } finally {
      setSaving(false);
    }
  };

  return {
    sessionId,
    started,
    starting,
    startSession,
    track,
    saveSession,
    saving,
    error,
  };
}
