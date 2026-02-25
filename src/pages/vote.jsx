import { useState } from "react";
import VoteForm from "../components/forms/VoteForm";
import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";

function Vote() {
  const [candidates, setCandidates] = useState([
    { id: 1, name: "Ronald Yu", position: "President", votes: 320 },
    { id: 2, name: "Vhon Salilo", position: "President", votes: 280 },
    { id: 3, name: "Dan Ivan Labin", position: "Vice President", votes: 260 },
    { id: 4, name: "Christian Paul Bahian", position: "Vice President", votes: 200 },
    { id: 5, name: "Nepthalie Brynt Asinero", position: "Secretary", votes: 180 },
    { id: 6, name: "Dan Ronald Salilo", position: "Secretary", votes: 150 },
    { id: 7, name: "Christian Ivan Yu", position: "Treasurer", votes: 145 },
    { id: 8, name: "Ronald Paul Asinero", position: "Treasurer", votes: 130 },
    { id: 9, name: "Vhon Brynt Labin", position: "Auditor", votes: 120 },
    { id: 10, name: "Dan Angelico Bahian", position: "Auditor", votes: 110 },
  ]);

  const handleVote = (candidateId) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === candidateId ? { ...c, votes: c.votes + 1 } : c
      )
    );
  };

  return (
    <div className="sv-app">
      <Header />
      <Navbar />
      <main className="sv-page">
        <div className="sv-page-container">
          <section className="sv-page-header">
            <h1>Cast Your Vote</h1>
            <p>Select your candidate for each position</p>
          </section>
          <VoteForm candidates={candidates} onVote={handleVote} />
        </div>
      </main>
    </div>
  );
}

export default Vote;
