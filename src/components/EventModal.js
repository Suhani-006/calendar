"use client"

const EventModal = ({ isOpen, onClose, event }) => {
  if (!isOpen || !event) return null

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatDateRange = (startDate, endDate) => {
    if (!endDate || endDate === startDate) {
      return formatDate(startDate)
    }

    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1

    return `${formatDate(startDate)} - ${formatDate(endDate)} (${diffDays} days)`
  }

  const getEventTypeLabel = (type) => {
    const labels = {
      academic: "Academic Event",
      vacation: "Vacation",
      exam: "Examination",
      national_holiday: "National Holiday",
      deadline: "Deadline",
      conference: "Conference",
    }
    return labels[type] || "Event"
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="modal-title-content">
              <div className={`color-dot ${event.color}`}></div>
              <h2 className="modal-title">{event.title}</h2>
            </div>
            <button onClick={onClose} className="close-btn">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div>
            <span className={`event-type-badge ${event.type}`}>{getEventTypeLabel(event.type)}</span>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-info">
            <div className="modal-date">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>{formatDateRange(event.date, event.endDate)}</div>
            </div>

            {event.description && <div className="modal-description">{event.description}</div>}
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="modal-btn secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventModal
