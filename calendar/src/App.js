import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import CalendarGrid from './components/CalendarGrid';
import EventModal from './components/EventModal';
import eventsData from './events.json';

// Only show TopBar on mobile/tablet
function TopBar({ onMenuClick }) {
  return (
    <div className="top-bar mobile-only">
      <button className="menu-btn" onClick={onMenuClick}>&#9776;</button>
      <span className="top-bar-title">Calendar</span>
    </div>
  );
}

function HeaderBar({ year, month, onPrev, onNext, onToday }) {
  const monthNames = [
    'January','February','March','April','May','June','July','August','September','October','November','December'
  ];
  return (
    <div className="main-header">
      {/* Remove menu button from here */}
      <button className="today-btn" onClick={onToday}>Today</button>
      <button className="nav-btn" onClick={onPrev}>&lt;</button>
      <button className="nav-btn" onClick={onNext}>&gt;</button>
      <span className="month-title">{monthNames[month]} {year}</span>
      <button className="view-btn">Month</button>
    </div>
  );
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const today = new Date();
  // Move year/month state here so Sidebar can use it
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(6); // July 2025 (0-indexed)

  useEffect(() => {
    setEvents(eventsData);
  }, []);

  const handlePrev = () => {
    setMonth(m => {
      if (m === 0) {
        setYear(y => y - 1);
        return 11;
      }
      return m - 1;
    });
  };

  const handleNext = () => {
    setMonth(m => {
      if (m === 11) {
        setYear(y => y + 1);
        return 0;
      }
      return m + 1;
    });
  };

  const handleToday = () => {
    setYear(today.getFullYear());
    setMonth(today.getMonth());
  };

  // Add handler for sidebar month change
  const handleSidebarMonthChange = (delta) => {
    setMonth(m => {
      let newMonth = m + delta;
      if (newMonth < 0) {
        setYear(y => y - 1);
        return 11;
      }
      if (newMonth > 11) {
        setYear(y => y + 1);
        return 0;
      }
      return newMonth;
    });
  };

  return (
    <div className="calendar-app">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        month={month}
        year={year}
        onMonthChange={handleSidebarMonthChange}
        events={events}
      />
      <div className="main">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <HeaderBar
          year={year}
          month={month}
          onPrev={handlePrev}
          onNext={handleNext}
          onToday={handleToday}
        />
        <CalendarGrid
          year={year}
          month={month}
          events={events}
          onDayClick={setSelectedEvent}
        />
      </div>
      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
}

export default App;
