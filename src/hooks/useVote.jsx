import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCandidates from "./useCandidates";
import api from "../api";

const positions = ["President", "Vice President", "Secretary", "Treasurer", "Auditor"];

function useVote() {
  const navigate                    = useNavigate();
  const { candidates, loading }     = useCandidates();
  const [step, setStep]             = useState(0);
  const [votedChoices, setVotedChoices] = useState([]);
  const [voteError, setVoteError]   = useState("");

  const currentPosition    = positions[step];
  const currentCandidates  = candidates.filter((c) => c.position === currentPosition);

  const handleVote = async (candidateId) => {
    const chosen = candidates.find((c) => c.id === candidateId);
    if (!chosen) return;
    setVoteError("");
    try {
      await api.post("/vote/", { candidate: candidateId });
      const newChoices = [
        ...votedChoices,
        { position: chosen.position, candidateName: chosen.name },
      ];
      setVotedChoices(newChoices);
      const nextStep = step + 1;
      setStep(nextStep);
      if (nextStep >= positions.length) {
        navigate("/VoteAnalysis", { state: { votes: newChoices, fromVote: true } });
      }
    } catch (err) {
      setVoteError(err.response?.data?.non_field_errors?.[0] || "Failed to cast vote.");
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setVotedChoices((prev) => prev.slice(0, -1));
      setStep(step - 1);
    }
  };

  return {
    step, positions, currentPosition,
    currentCandidates, loading, voteError,
    handleVote, handleBack,
  };
}

export default useVote;
