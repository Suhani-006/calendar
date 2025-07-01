"use client"

import { cn } from "@/lib/utils"

interface Event {
  date: string
  title: string
  description?: string
}

interface DayCardProps {
  day: number
  isCurrentMonth: boolean
  isToday: boolean
  events: Event[]
  onClick: () => void
}

export function DayCard({ day, isCurrentMonth, isToday, events, onClick }: DayCardProps) {
  const hasEvents = events.length > 0

  return (
    <div
      className={cn(
        "aspect-square flex flex-col min-h-0 p-2 border border-gray-200 cursor-pointer transition-all duration-200 hover:bg-gray-50",
        !isCurrentMonth && "bg-gray-50 text-gray-400",
        isToday && "bg-blue-50 border-blue-300",
        hasEvents &&
          isCurrentMonth &&
          "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:from-blue-100 hover:to-indigo-100",
      )}
      onClick={hasEvents ? onClick : undefined}
    >
      <div className="flex flex-col flex-1 h-0">
        <div
          className={cn(
            "text-sm font-medium mb-1",
            isToday && "text-blue-700 font-bold",
            !isCurrentMonth && "text-gray-400",
            hasEvents && isCurrentMonth && "text-blue-800",
          )}
        >
          {day}
        </div>

        {hasEvents && isCurrentMonth && (
          <div className="flex-1 space-y-1 overflow-hidden">
            {events.slice(0, 2).map((event, index) => (
              <div
                key={index}
                className="aspect-square w-full max-w-[2.5rem] bg-blue-600 text-white flex items-center justify-center text-xs px-1 py-1 rounded-md truncate font-medium shadow-sm overflow-hidden"
                title={event.title}
              >
                <span className="truncate block w-full">{event.title}</span>
              </div>
            ))}
            {events.length > 2 && (
              <div className="text-xs text-blue-600 font-medium">+{events.length - 2} more</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
