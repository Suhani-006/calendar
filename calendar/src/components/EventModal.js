import React from 'react';

export default function EventModal({ event, onClose }) {
  if (!event) return null;
  return (
    <div className="event-modal" onClick={onClose}>
      <div className="event-modal-content" onClick={e => e.stopPropagation()}>
        <div className="event-modal-header">
          <span className="event-dot" style={{background:'#1976d2'}}></span>
          <span className="event-title">{event.title}</span>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="event-type">{event.type}</div>
        <div className="event-date">{new Date(event.date).toLocaleDateString(undefined, {weekday:'long', year:'numeric', month:'long', day:'numeric'})}</div>
        <div className="event-desc">{event.desc}</div>
        <button className="close-btn2" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
