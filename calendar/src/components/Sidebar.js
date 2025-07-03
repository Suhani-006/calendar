import React from 'react';

const calendarTypes = [
  { name: 'Academic Events', color: '#1976d2' },
  { name: 'Holidays', color: '#43a047' },
  { name: 'Exams', color: '#e53935' },
];

const otherCalendars = [
  { name: 'Global Holidays', color: '#fbc02d' }
];

// Helper to get days in month
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// Helper to get events for a day
function getEventsForDay(events, year, month, day) {
  const monthStr = String(month + 1).padStart(2, '0');
  const dateStr = `${year}-${monthStr}-${String(day).padStart(2, '0')}`;
  return events.filter(e => e.date === dateStr);
}

const monthNames = [
  'January','February','March','April','May','June','July','August','September','October','November','December'
];

export default function Sidebar({ open, onClose, month, year, onMonthChange, events }) {
  const daysInMonth = getDaysInMonth(year, month);

  return (
    <div className={`sidebar${open ? ' open' : ''}`}>
      <div className="sidebar-header">
        <button className="menu-btn" onClick={onClose}>&#9776;</button>
        <span className="logo">📅<span className="logo-text">Calendar</span></span>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      <div className="mini-calendar">
        <div className="mini-header">
          <span style={{cursor:'pointer'}} onClick={() => onMonthChange(-1)}>&lt;</span>
          <span>{monthNames[month]} {year}</span>
          <span style={{cursor:'pointer'}} onClick={() => onMonthChange(1)}>&gt;</span>
        </div>
        <div className="mini-days">
          <div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
          {/* Calculate first day offset */}
          {(() => {
            const firstDay = new Date(year, month, 1).getDay();
            const offset = firstDay === 0 ? 6 : firstDay - 1;
            let blanks = [];
            for (let i = 0; i < offset; i++) {
              blanks.push(<div key={`blank-${i}`}></div>);
            }
            return blanks;
          })()}
          {/* Render days with event dots */}
          {Array.from({length: daysInMonth}, (_, i) => {
            const day = i + 1;
            const dayEvents = getEventsForDay(events, year, month, day);
            return (
              <div key={day} style={{position:'relative', minHeight: '1.8em'}}>
                {day}
                <div style={{
                  display: 'flex',
                  gap: '2px',
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  bottom: '2px'
                }}>
                  {dayEvents.map(ev => (
                    <span
                      key={ev.id}
                      style={{
                        display: 'inline-block',
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: ev.color || '#1976d2'
                      }}
                      title={ev.title}
                    ></span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="calendar-types">
        <div className="section-title">My Calendars</div>
        {calendarTypes.map(type => (
          <label key={type.name}><input type="checkbox" defaultChecked /> <span className="dot" style={{background:type.color}}></span> {type.name}</label>
        ))}
        <div className="section-title">Other Calendars</div>
        {otherCalendars.map(type => (
          <label key={type.name}><input type="checkbox" defaultChecked /> <span className="dot" style={{background:type.color}}></span> {type.name}</label>
        ))}
      </div>
    </div>
  );
}
