"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DayCard } from "./day-card"
import { EventModal } from "./event-modal"

interface Event {
  date: string
  title: string
  description?: string
}

interface CalendarProps {
  events: Event[]
}

export function Calendar({ events }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const today = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()

  // Get first day of the month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const firstDayWeekday = firstDayOfMonth.getDay()
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

  // Helper function to get events for a specific date
  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return events.filter((event) => event.date === dateString)
  }

  // Helper function to check if date is today
  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString()
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

  // Handle day click
  const handleDayClick = (dayEvents: Event[]) => {
    if (dayEvents.length > 0) {
      setSelectedEvent(dayEvents[0]) // Show first event, could be enhanced to show all
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

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Academic Calendar</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToToday}
              className="text-blue-700 border-white hover:bg-white hover:text-blue-700 bg-transparent"
            >
              Today
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <Button variant="ghost" size="sm" onClick={goToPreviousMonth} className="text-white hover:bg-white/20">
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <h2 className="text-xl sm:text-2xl font-semibold">
            {monthNames[currentMonth]} {currentYear}
          </h2>

          <Button variant="ghost" size="sm" onClick={goToNextMonth} className="text-white hover:bg-white/20">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4 sm:p-6">
        {/* Week day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((calendarDay, index) => {
            const dayEvents = getEventsForDate(calendarDay.date)
            return (
              <DayCard
                key={index}
                day={calendarDay.day}
                isCurrentMonth={calendarDay.isCurrentMonth}
                isToday={isToday(calendarDay.date)}
                events={dayEvents}
                onClick={() => handleDayClick(dayEvents)}
              />
            )
          })}
        </div>
      </div>

      {/* Event Modal */}
      <EventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} event={selectedEvent} />
    </div>
  )
}
