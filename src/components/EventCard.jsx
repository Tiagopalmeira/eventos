import React, { useState } from "react";
import "../styles.css";

// Função para formatar a data corretamente
const formatDate = (dateString) => {
  // Ajustando a data para UTC com o horário de meio-dia, para evitar problemas de fuso horário
  const date = new Date(dateString);
  const utcDate = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    12,
    0,
    0
  ); // Forçando hora para 12:00:00 UTC
  return utcDate.toLocaleDateString("pt-BR"); // Formatando no formato brasileiro
};

function EventAccordion({ event }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="event-accordion">
      <div className="event-summary" onClick={() => setIsOpen(!isOpen)}>
        <p>
          {formatDate(event.startDate)} - {event.title}
        </p>
      </div>
      {isOpen && (
        <div className="event-details">
          <p>
            <strong>Data de Início:</strong> {formatDate(event.startDate)}
          </p>
          <p>
            <strong>Hora de Início:</strong> {event.startTime}
          </p>
          <p>
            <strong>Data de Término:</strong> {formatDate(event.endDate)}
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
