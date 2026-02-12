function CandidateRow({ candidate, maxVotes }) {
  const percentage = (candidate.votes / maxVotes) * 100;

  return (
    <tr>
      <td className="sv-candidate-name">
        {candidate.name}
      </td>

      <td>
        <span className="sv-candidate-position">
          {candidate.position}
        </span>
      </td>

      <td>
        <div className="sv-vote-bar-bg">
          <div
            className="sv-vote-bar"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </td>

      <td className="sv-vote-count">
        {candidate.votes}
      </td>
    </tr>
  );
}

export default CandidateRow;
