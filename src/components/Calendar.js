"use client"

import { useState } from "react"
import DayCard from "./DayCard"
import EventModal from "./EventModal"

const Calendar = ({ events, selectedCalendars }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const today = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()

  // Filter events based on selected calendars
  const filteredEvents = events.filter((event) => selectedCalendars[event.type])

  // Get first day of the month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const firstDayWeekday = (firstDayOfMonth.getDay() + 6) % 7 // Monday = 0
  const daysInMonth = lastDayOfMonth.getDate()

  // Get previous month's last days to fill the grid
  const prevMonth = new Date(currentYear, currentMonth - 1, 0)
  const daysInPrevMonth = prevMonth.getDate()

  // Create calendar grid
  const calendarDays = []

  // Previous month's days
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      date: new Date(currentYear, currentMonth - 1, daysInPrevMonth - i),
    })
  }

  // Current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: true,
      date: new Date(currentYear, currentMonth, day),
    })
  }

  // Next month's days to complete the grid
  const remainingCells = 42 - calendarDays.length
  for (let day = 1; day <= remainingCells; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: false,
      date: new Date(currentYear, currentMonth + 1, day),
    })
  }

  // Helper functions
  const getEventsForDate = (date) => {
    const dateString = date.toISOString().split("T")[0]
    return filteredEvents.filter((event) => {
      if (event.endDate && event.endDate !== event.date) {
        const startDate = new Date(event.date)
        const endDate = new Date(event.endDate)
        return date >= startDate && date <= endDate
      } else {
        return event.date === dateString
      }
    })
  }

  const getSingleDayEventsForDate = (date) => {
    const dateString = date.toISOString().split("T")[0]
    return filteredEvents.filter(
      (event) => event.date === dateString && (!event.endDate || event.endDate === event.date),
    )
  }

  const getMultiDayEventsForDate = (date) => {
    const dateString = date.toISOString().split("T")[0]
    return filteredEvents
      .filter((event) => {
        if (event.endDate && event.endDate !== event.date) {
          const startDate = new Date(event.date)
          const endDate = new Date(event.endDate)
          return date >= startDate && date <= endDate
        }
        return false
      })
      .map((event) => ({
        ...event,
        isStart: event.date === dateString,
        isEnd: event.endDate === dateString,
        isContinuation: event.date !== dateString && event.endDate !== dateString,
      }))
  }

  const isToday = (date) => {
    return date.toDateString() === today.toDateString()
  }

  const isWeekend = (date) => {
    const day = date.getDay()
    return day === 0 || day === 6 // Sunday or Saturday
  }

  const isSaturday = (date) => {
    return date.getDay() === 6
  }

  const isSunday = (date) => {
    return date.getDay() === 0
  }

  const hasNationalHoliday = (date) => {
    const events = getEventsForDate(date)
    return events.some((event) => event.type === "national_holiday")
  }

  const hasMultiDayEvent = (date) => {
    const multiDayEvents = getMultiDayEventsForDate(date)
    return multiDayEvents.length > 0
  }

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const handleDayClick = (dayEvents) => {
    if (dayEvents.length > 0) {
      setSelectedEvent(dayEvents[0])
      setIsModalOpen(true)
    }
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]

  return (
    <div className="main-calendar">
      {/* Header */}
      <div className="calendar-header">
        <div className="calendar-header-content">
          <div className="calendar-nav">
            <button onClick={goToToday} className="today-btn">
              Today
            </button>
            <div className="nav-controls">
              <button onClick={goToPreviousMonth} className="nav-btn">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button onClick={goToNextMonth} className="nav-btn">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <h2 className="month-title">
              {monthNames[currentMonth]} {currentYear}
            </h2>
          </div>

          <div>
            <button className="month-btn">Month</button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid-container">
        {/* Week day headers */}
        <div className="weekday-headers">
          {weekDays.map((day, index) => (
            <div key={day} className={`weekday-header ${index === 5 ? "saturday" : ""} ${index === 6 ? "sunday" : ""}`}>
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="calendar-grid">
          {calendarDays.map((calendarDay, index) => {
            const singleDayEvents = getSingleDayEventsForDate(calendarDay.date)
            const multiDayEvents = getMultiDayEventsForDate(calendarDay.date)
            const allEvents = getEventsForDate(calendarDay.date)

            return (
              <div key={index} className="day-cell">
                <DayCard
                  day={calendarDay.day}
                  isCurrentMonth={calendarDay.isCurrentMonth}
                  isToday={isToday(calendarDay.date)}
                  isSaturday={isSaturday(calendarDay.date)}
                  isSunday={isSunday(calendarDay.date)}
                  hasNationalHoliday={hasNationalHoliday(calendarDay.date)}
                  hasMultiDayEvent={hasMultiDayEvent(calendarDay.date)}
                  events={singleDayEvents}
                  multiDayEvents={multiDayEvents}
                  onClick={() => handleDayClick(allEvents)}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Event Modal */}
      <EventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} event={selectedEvent} />
    </div>
  )
}

export default Calendar
