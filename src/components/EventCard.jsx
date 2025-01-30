import React, { useState } from "react";
import "../styles.css";

function EventAccordion({ event }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="event-accordion">
      <div className="event-summary" onClick={() => setIsOpen(!isOpen)}>
        <p>
          {new Date(event.startDate).toLocaleDateString()} - {event.title}
        </p>
      </div>
      {isOpen && (
        <div className="event-details">
          <p>
            <strong>Data de Início:</strong>{" "}
            {new Date(event.startDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Hora de Início:</strong> {event.startTime}
          </p>
          <p>
            <strong>Data de Término:</strong>{" "}
            {new Date(event.endDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Hora de Término:</strong> {event.endTime}
          </p>
          <p>
            <strong>Descrição:</strong> {event.descricao}
          </p>
          <p>
            <strong>Uniforme:</strong> {event.uniforme}
          </p>
          <p>
            <strong>Instrutor:</strong> {event.instrutor}
          </p>
        </div>
      )}
    </div>
  );
}

export default EventAccordion;
