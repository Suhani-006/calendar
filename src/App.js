"use client"

import { useState, useEffect } from "react"
import Calendar from "./components/Calendar"
import Sidebar from "./components/Sidebar"
import EventModal from "./components/EventModal"
import "./App.css"

function App() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCalendars, setSelectedCalendars] = useState({
    academic: true,
    vacation: true,
    exam: true,
    national_holiday: true,
    deadline: true,
    conference: true,
  })

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch("/events.json")
        if (!response.ok) {
          throw new Error("Failed to load events")
        }
        const data = await response.json()
        setEvents(data.events || [])
      } catch (err) {
        setError("Failed to load calendar events")
        console.error("Error loading events:", err)
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  const handleCalendarToggle = (calendarId) => {
    setSelectedCalendars((prev) => ({
      ...prev,
      [calendarId]: !prev[calendarId],
    }))
  }

  const handleEventClick = (event) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading calendar...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        events={events}
        onEventClick={handleEventClick}
        selectedCalendars={selectedCalendars}
        onCalendarToggle={handleCalendarToggle}
      />
      <Calendar events={events} selectedCalendars={selectedCalendars} />
      <EventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} event={selectedEvent} />
    </div>
  )
}

export default App
