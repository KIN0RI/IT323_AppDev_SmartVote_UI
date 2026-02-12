function MonitoringInsight({ title, status, confidence }) {
  let confidenceClass = "";

  if (confidence >= 80) {
    confidenceClass = "high";
  } else if (confidence >= 50) {
    confidenceClass = "medium";
  } else {
    confidenceClass = "low";
  }

  return (
    <section className="sv-insight-card">
      <h3>{title}</h3>

      <p>Status: {status}</p>

      <p className={confidenceClass}>
        Confidence: {confidence}%
      </p>
    </section>
  );
}

export default MonitoringInsight;
