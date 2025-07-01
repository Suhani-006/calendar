import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Clock } from "lucide-react"

interface Event {
  date: string
  title: string
  description?: string
}

interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  event: Event | null
}

export function EventModal({ isOpen, onClose, event }: EventModalProps) {
  if (!event) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-blue-900">
            <Calendar className="h-5 w-5" />
            {event.title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            {formatDate(event.date)}
          </div>
          {event.description && <div className="text-sm text-gray-700 leading-relaxed">{event.description}</div>}
        </div>
      </DialogContent>
    </Dialog>
  )
}
