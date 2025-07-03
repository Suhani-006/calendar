import React from 'react';

function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let days = [];
  let week = [];
  let dayCount = 1 - (firstDay === 0 ? 6 : firstDay - 1);
  for (let i = 0; i < 6; i++) {
    week = [];
    for (let j = 0; j < 7; j++) {
      if (dayCount > 0 && dayCount <= daysInMonth) {
        week.push(dayCount);
      } else {
        week.push('');
      }
      dayCount++;
    }
    days.push(week);
  }
  return days;
}

export default function CalendarGrid({ year, month, events, onDayClick }) {
  const days = getMonthDays(year, month);

  function getEventForDay(day) {
    const monthStr = String(month + 1).padStart(2, '0');
    const dateStr = `${year}-${monthStr}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  }

  return (
    <div className="calendar-grid">
      <div className="calendar-row calendar-days">
        <div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div><div>SUN</div>
      </div>
      {days.map((week, i) => (
        <div className="calendar-row" key={i}>
          {week.map((day, j) => (
            <div
              className={`calendar-cell${day === 3 ? ' selected' : ''}${j === 5 ? ' sat' : ''}${j === 6 ? ' sun' : ''}`}
              key={j}
              onClick={() => day && onDayClick(getEventForDay(day)[0] || null)}
              style={{display: 'flex', flexDirection: 'column', minHeight: 80, height: '100%'}}
            >
              {day ? <span className="cell-day">{day}</span> : ''}
              <div className="cell-events">
                {getEventForDay(day).map(ev => (
                  <div className="event-dot" key={ev.title} style={{background:'#1976d2'}} title={ev.title}></div>
                ))}
              </div>
              {/* Show event title(s) for this day */}
              <div
                className="cell-event-titles"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  marginTop: '2px',
                  maxHeight: '38px',
                  overflowY: 'auto'
                }}
              >
                {getEventForDay(day).map(ev => (
                  <div
                    key={ev.title}
                    style={{
                      fontSize: '0.8em',
                      color: '#1976d2',
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      background: '#e3f2fd',
                      borderRadius: '4px',
                      padding: '0 2px'
                    }}
                    title={ev.title}
                  >
                    {ev.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
      
    </div>
  );
}
