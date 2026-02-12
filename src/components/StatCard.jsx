function StatCard({ icon, title, value }) {
  return (
    <article className="sv-stat-card">
      <div className="sv-stat-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p className="sv-stat-value">
        {value}
      </p>
    </article>
  );
}

export default StatCard;