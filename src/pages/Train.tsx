// src/pages/Train.tsx
import { useAuth } from "../hooks/useAuth";
import GameTrain from "../components/GameTrain";
import LoginPromptModal from "../components/LoginPromptModal";

export default function Train() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPromptModal />;
  }

  return <GameTrain />;
}
