import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCandidates from "./useCandidates";
import api from "../api";

const positions = ["President", "Vice President", "Secretary", "Treasurer", "Auditor"];

function useVote() {
  const navigate                    = useNavigate();
  const { candidates, loading }     = useCandidates();
  const [step, setStep]             = useState(0);
  const [selections, setSelections] = useState([]); 
  const [reviewing, setReviewing]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [voteError, setVoteError]   = useState("");

  const currentPosition   = positions[step];
  const currentCandidates = candidates.filter((c) => c.position === currentPosition);
  const currentSelection  = selections.find((s) => s.position === currentPosition);

  const handleSelect = (candidateId) => {
    const chosen = candidates.find((c) => c.id === candidateId);
    if (!chosen) return;
    setVoteError("");

    const updated = [
      ...selections.filter((s) => s.position !== chosen.position),
      { position: chosen.position, candidateId: chosen.id, candidateName: chosen.name },
    ];
    setSelections(updated);

    const nextStep = step + 1;
    if (nextStep >= positions.length) {
      setReviewing(true);
    } else {
      setStep(nextStep);
    }
  };

  const handleBack = () => {
    if (reviewing) {
      setReviewing(false);
      setStep(positions.length - 1);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleConfirm = async () => {
  setSubmitting(true);
  setVoteError("");
  try {
    const results = [];
    for (const sel of selections) {
      try {
        const res = await api.post("/vote/", { candidate: sel.candidateId });
        results.push(res.data);
      } catch (err) {
        const errMsg = err.response?.data?.non_field_errors?.[0] || "";
       
        if (errMsg.includes("already voted")) {
          continue;
        }
        throw err;
      }
    }
    navigate("/VoteAnalysis", { state: { votes: selections, fromVote: true } });
  } catch (err) {
    setVoteError(
      err.response?.data?.non_field_errors?.[0] ||
      err.response?.data?.detail ||
      "Failed to submit votes. Please try again."
    );
    setSubmitting(false);
  }
};

  return {
    step, positions, currentPosition,
    currentCandidates, currentSelection, selections,
    loading, voteError, reviewing, submitting,
    handleSelect, handleBack, handleConfirm,
  };
}

export default useVote;
