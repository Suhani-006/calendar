import React from 'react';

const calendarTypes = [
  { name: 'Academic Events', color: '#1976d2' },
  { name: 'Holidays', color: '#43a047' },
  { name: 'Exams', color: '#e53935' },
];

const otherCalendars = [
  { name: 'Global Holidays', color: '#fbc02d' }
];

export default function Sidebar({ open, onClose }) {
  return (
    <div className={`sidebar${open ? ' open' : ''}`}>
      <div className="sidebar-header">
        <button className="menu-btn" onClick={onClose}>&#9776;</button>
        <span className="logo">📅<span className="logo-text">Calendar</span></span>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      <div className="mini-calendar">
        <div className="mini-header">
          <span>&lt;</span>
          <span>July 2025</span>
          <span>&gt;</span>
        </div>
        <div className="mini-days">
          <div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
          {[...Array(31)].map((_, i) => (
            <div key={i} className={i+1 === 3 ? 'today' : ''}>{i+1}</div>
          ))}
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
