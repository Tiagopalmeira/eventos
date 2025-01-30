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
      .get('${apiUrl}eventos')
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

  return (
    <div className="App">
      <div className="months-grid">
        {months.map((month, index) => (
          <MonthCard
            key={index}
            month={month}
            monthIndex={index}
            events={events.filter(
              (event) => new Date(event.startDate).getMonth() === index
            )}
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
            .filter(
              (event) => new Date(event.startDate).getMonth() === selectedMonth
            )
            .map((event) => (
              <EventAccordion key={event.id} event={event} />
            ))}
        </div>
      )}
    </div>
  );
}

export default App;
