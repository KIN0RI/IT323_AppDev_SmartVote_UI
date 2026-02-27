import { useState } from "react";

function VoteForm({ candidates, onVote }) {

  const [selected, setSelected] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const positions = [...new Set(candidates.map((c) => c.position))];

  const handleChange = (position, candidateId) => {
    setSelected((prev) => ({
      ...prev,
      [position]: candidateId,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    if (positions.every((pos) => selected[pos])) {
      Object.values(selected).forEach((id) => onVote(id));
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <section className="sv-vote-success">
        <span className="sv-vote-success-icon">✅</span>
        <h2>Vote Submitted!</h2>
        <p>Thank you for participating in the USTP Student Election.</p>
      </section>
    );
  }

  return (
    <form className="sv-form" onSubmit={handleSubmit}>
      {positions.map((position) => (
        <fieldset key={position} className="sv-fieldset">
          <legend>{position}</legend>
          <div className="sv-radio-group">
            {candidates
              .filter((c) => c.position === position)
              .map((candidate) => (
                <label key={candidate.id} className="sv-radio-label">
                  <input
                    type="radio"
                    name={position}
                    value={candidate.id}
                    checked={selected[position] === candidate.id}
                    onChange={() =>
                      handleChange(position, candidate.id)
                    }
                  />
                  <span className="sv-radio-text">
                    {candidate.name}
                  </span>
                </label>
              ))}
          </div>
        </fieldset>
      ))}

      <button
        type="submit"
        className="sv-btn sv-btn-primary"
        disabled={!positions.every((pos) => selected[pos])}
      >
        Cast Vote
      </button>
    </form>
  );
}

export default VoteForm;