import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import MonthCard from "./components/MonthCard";
import EventAccordion from "./components/EventCard";
import "./styles.css";

function App() {
  const [events, setEvents] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);

  // Ref para o contêiner dos eventos
  const eventsContainerRef = useRef(null);

  useEffect(() => {
    // Fetch events from API
    axios
      .get("https://apidata-kappa.vercel.app/eventos")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Erro ao buscar eventos:", error));
  }, []);

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  // Função para rolar até o contêiner dos eventos
  const scrollToEvents = () => {
    if (eventsContainerRef.current) {
      eventsContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Função para formatar a data sem o efeito de fuso horário
  const formatDate = (dateString) => {
    // Define a hora para 12:00 no horário UTC para evitar deslocamento
    const dataLocal = new Date(`${dateString}T12:00:00Z`);
    // Formata a data no formato local
    return new Date(dataLocal).toLocaleDateString();
  };

  return (
    <div className="App">
      <div className="months-grid">
        {months.map((month, index) => (
          <MonthCard
            key={index}
            month={month}
            monthIndex={index}
            events={events.filter((event) => {
              const eventDate = new Date(event.startDate);
              return eventDate.getMonth() === index;
            })}
            onClick={() => {
              setSelectedMonth(index);
              scrollToEvents(); // Chama a função para rolar até a parte dos eventos
            }}
          />
        ))}
      </div>
      {selectedMonth !== null && (
        <div
          className="events-list"
          ref={eventsContainerRef} // Referência ao contêiner de eventos
        >
          <h2>Eventos de {months[selectedMonth]}</h2>
          {events
            .filter((event) => {
              const eventDate = new Date(event.startDate);
              return eventDate.getMonth() === selectedMonth;
            })
            .sort((a, b) => new Date(a.startDate) - new Date(b.startDate)) // Ordena os eventos em ordem cronológica
            .map((event) => (
              <EventAccordion
                key={event.id}
                event={event}
                formattedStartDate={formatDate(event.startDate)} // Passa a data formatada
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default App;
