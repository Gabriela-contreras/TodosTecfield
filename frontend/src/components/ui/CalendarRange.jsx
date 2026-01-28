import * as React from "react"
import axios from "axios"
import { Calendar } from "@/components/ui/calendar"
import { addDays, isBefore, startOfDay } from "date-fns"

const API_URL = "http://localhost:4000/api/tasks"

export function CalendarRange({ onChange, className }) {
  const [dateRange, setDateRange] = React.useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  const fetchTasksByRange = async (from, to) => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          from: from.toISOString(),
          to: to.toISOString(),
        },
      })
      onChange?.(response.data)
    } catch (error) {
      console.error("Error fetching tasks by date range:", error)
    }
  }

  const handleSelect = (range) => {
    if (!range?.from || !range?.to) return

    const today = startOfDay(new Date())

    const safeRange = {
      from: isBefore(range.from, today) ? today : range.from,
      to: isBefore(range.to, today) ? today : range.to,
    }

    setDateRange(safeRange)
    fetchTasksByRange(safeRange.from, safeRange.to)
  }

  return (
    <div className={className}>
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={handleSelect}
        numberOfMonths={1}
        disabled={(date) => isBefore(date, startOfDay(new Date()))}
        className="w-full mb-6 mt-4"
      />
    </div>
  )
}
