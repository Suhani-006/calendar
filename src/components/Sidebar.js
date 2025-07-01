"use client"

import { useState } from "react"

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

function getMondayBasedIndex(jsDay) {
  return jsDay === 0 ? 6 : jsDay - 1
}

const Sidebar = ({ currentDate, onDateChange }) => {
  const [miniCurrentDate, setMiniCurrentDate] = useState(new Date(currentDate))
  const [open, setOpen] = useState(false)

  const today = new Date()
  const year = miniCurrentDate.getFullYear()
  const month = miniCurrentDate.getMonth()

  // Mini calendar logic
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const firstDayWeekday = getMondayBasedIndex(firstDayOfMonth.getDay())
  const daysInMonth = lastDayOfMonth.getDate()
  const prevMonth = new Date(year, month - 1, 0)
  const daysInPrevMonth = prevMonth.getDate()

  const miniCalendarDays = []
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    miniCalendarDays.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      date: new Date(year, month - 1, daysInPrevMonth - i),
    })
  }
  for (let day = 1; day <= daysInMonth; day++) {
    miniCalendarDays.push({
      day,
      isCurrentMonth: true,
      date: new Date(year, month, day),
    })
  }
  const remainingCells = 42 - miniCalendarDays.length
  for (let day = 1; day <= remainingCells; day++) {
    miniCalendarDays.push({
      day,
      isCurrentMonth: false,
      date: new Date(year, month + 1, day),
    })
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const goToPrevMonth = () => setMiniCurrentDate(new Date(year, month - 1, 1))
  const goToNextMonth = () => setMiniCurrentDate(new Date(year, month + 1, 1))

  const isToday = (date) =>
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()

  const isSelected = (date) =>
    date.getFullYear() === currentDate.getFullYear() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getDate() === currentDate.getDate()

  // Dummy calendar lists
  const myCalendars = [
    { id: "academic", name: "Academic Events", color: "bg-blue-500" },
    { id: "holidays", name: "Holidays", color: "bg-green-500" },
    { id: "exams", name: "Exams", color: "bg-red-500" },
  ]
  const otherCalendars = [
    { id: "global", name: "Global Holidays", color: "bg-yellow-500" },
  ]

  // Responsive sidebar classes
  const sidebarBase =
    "sidebar fixed lg:sticky top-0 left-0 z-30 bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300"
  const sidebarOpen = open ? "translate-x-0" : "-translate-x-full"
  const sidebarResponsive =
    "w-72 max-w-full lg:w-72 lg:translate-x-0 lg:static"
  const sidebarClasses = `${sidebarBase} ${sidebarResponsive} ${sidebarOpen} lg:block`

  return (
    <>
      {/* Mobile sidebar toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-40 bg-white border border-gray-200 rounded-full p-2 shadow"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside className={sidebarClasses} style={{ minWidth: "18rem" }}>
        {/* Close button for mobile */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 lg:hidden">
          <span className="font-semibold text-lg text-blue-700">Calendar</span>
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {/* Header: Month/Year */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={goToPrevMonth}
                className="p-1 rounded hover:bg-gray-100"
                aria-label="Previous month"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="font-semibold text-gray-800">
                {monthNames[month]} {year}
              </span>
              <button
                onClick={goToNextMonth}
                className="p-1 rounded hover:bg-gray-100"
                aria-label="Next month"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            {/* Mini calendar */}
            <div className="grid grid-cols-7 gap-1 text-xs mb-2">
              {weekDays.map((d, i) => (
                <div
                  key={d}
                  className={`text-center font-medium py-1 ${i === 5 ? "text-green-600" : ""} ${i === 6 ? "text-red-600" : ""}`}
                >
                  {d}
                </div>
              ))}
              {miniCalendarDays.map((calendarDay, idx) => {
                const isWeekend = idx % 7 === 5 || idx % 7 === 6
                return (
                  <button
                    key={idx}
                    onClick={() => onDateChange(calendarDay.date)}
                    className={
                      `w-8 h-8 rounded-full flex items-center justify-center mx-auto ` +
                      (calendarDay.isCurrentMonth
                        ? isToday(calendarDay.date)
                          ? "bg-blue-100 text-blue-700 font-bold"
                          : isSelected(calendarDay.date)
                          ? "bg-blue-600 text-white font-bold"
                          : isWeekend
                          ? idx % 7 === 5
                            ? "text-green-600"
                            : "text-red-600"
                          : "text-gray-800"
                        : "text-gray-300")
                    }
                    aria-label={`Select ${calendarDay.date.toDateString()}`}
                  >
                    {calendarDay.day}
                  </button>
                )
              })}
            </div>
          </div>
          {/* My Calendars */}
          <div className="mb-6">
            <div className="text-xs font-semibold text-gray-500 mb-2">My Calendars</div>
            <ul className="space-y-2">
              {myCalendars.map((cal) => (
                <li key={cal.id} className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly className="accent-blue-600" />
                  <span className={`inline-block w-3 h-3 rounded-full ${cal.color}`}></span>
                  <span className="text-sm text-gray-800">{cal.name}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Other Calendars */}
          <div>
            <div className="text-xs font-semibold text-gray-500 mb-2">Other Calendars</div>
            <ul className="space-y-2">
              {otherCalendars.map((cal) => (
                <li key={cal.id} className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly className="accent-yellow-500" />
                  <span className={`inline-block w-3 h-3 rounded-full ${cal.color}`}></span>
                  <span className="text-sm text-gray-800">{cal.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
