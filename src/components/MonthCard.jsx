import React from "react";
import "../styles.css";

function MonthCard({ month, monthIndex, events, onClick }) {
  return (
    <div className="month-card" onClick={onClick}>
      <h3>{month}</h3>
      <p>{events.length} eventos</p>
    </div>
  );
}

export default MonthCard;
