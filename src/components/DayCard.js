"use client"

const DayCard = ({
  day,
  isCurrentMonth,
  isToday,
  isSaturday,
  isSunday,
  hasNationalHoliday,
  hasMultiDayEvent,
  events,
  multiDayEvents,
  onClick,
}) => {
  const hasEvents = events.length > 0 || multiDayEvents.length > 0

  const getCardClasses = () => {
    let classes = "day-card"

    if (!isCurrentMonth) {
      classes += " inactive"
    } else {
      classes += " active"
    }

    if (isToday) {
      classes += " today"
    }

    // Weekend highlighting
    if (isSaturday && isCurrentMonth) {
      classes += " saturday"
    }
    if (isSunday && isCurrentMonth) {
      classes += " sunday"
    }

    // National holiday highlighting (takes precedence)
    if (hasNationalHoliday && isCurrentMonth) {
      classes += " national-holiday"
    }

    // Multi-day event highlighting
    if (hasMultiDayEvent && isCurrentMonth && !hasNationalHoliday) {
      classes += " multi-day-event"
    }

    return classes
  }

  const getDayClasses = () => {
    let classes = "day-number"

    if (isToday) {
      classes += " today"
    } else if (!isCurrentMonth) {
      classes += " inactive"
    } else if (hasNationalHoliday) {
      classes += " national-holiday"
    } else if (isSaturday) {
      classes += " saturday"
    } else if (isSunday) {
      classes += " sunday"
    }

    return classes
  }

  const getEventBadgeClass = (event, isMultiDay = false, position = null) => {
    let classes = `event-badge ${event.type}`

    if (isMultiDay) {
      classes += " multi-day"
      if (position === "start") classes += " start"
      else if (position === "end") classes += " end"
      else if (position === "middle") classes += " middle"
    }

    return classes
  }

  return (
    <div
      className={getCardClasses()}
      onClick={hasEvents ? onClick : undefined}
      // Use relative sizing for responsiveness and fixed aspect ratio
      style={{
        aspectRatio: "1 / 1",
        width: "100%",
        maxWidth: "100%",
        flex: "1 1 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
        ...(
          typeof getCardClasses() === "object" && getCardClasses().style
            ? getCardClasses().style
            : {}
        ),
      }}
    >
      <div className={getDayClasses()}>{day}</div>

      {/* Multi-day events (spanning events) */}
      {multiDayEvents.map((event, index) => {
        let position = "middle"
        if (event.isStart) position = "start"
        else if (event.isEnd) position = "end"

        return (
          <div
            key={`multi-${event.id}-${index}`}
            className={getEventBadgeClass(event, true, position)}
            title={`${event.title} ${event.isStart ? "(starts)" : event.isEnd ? "(ends)" : "(continues)"}`}
            style={{
              zIndex: 10 - index,
            }}
          >
            {event.isStart && event.title}
            {event.isEnd && `${event.title} (ends)`}
            {event.isContinuation && ""}
          </div>
        )
      })}

      {/* Single day events */}
      {isCurrentMonth && (
        <div className="day-events">
          {events.slice(0, 3).map((event, index) => (
            <div key={event.id} className={getEventBadgeClass(event)} title={event.title}>
              {event.title}
            </div>
          ))}
          {events.length > 3 && <div className="more-events">+{events.length - 3} more</div>}
        </div>
      )}
    </div>
  )
}

export default DayCard
