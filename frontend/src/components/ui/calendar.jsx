import * as React from "react"
import { DayPicker } from "react-day-picker"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-2", className)}
      classNames={{
        months: "flex flex-col gap-4",
        month: "space-y-3",
        month_caption: "flex justify-center items-center relative h-8",
        caption_label: "text-sm font-semibold text-foreground",
        nav: " relative bottom-0 inset-x-0 flex justify-between items-center px-1",
        button_previous: cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "h-6 w-6 bg-transparent hover:bg-secondary cursor-pointer "
        ),
        button_next: cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "h-6 w-6 bg-transparent hover:bg-secondary cursor-pointer"
        ),
        month_grid: "w-full border-collapse",
        weekdays: "flex justify-between",
        weekday: "text-muted-foreground w-8 font-medium text-xs text-center",
        week: "flex justify-between mt-1",
        day: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
          "[&:has([aria-selected])]:bg-accent/50",
          "[&:has([aria-selected].day-range-end)]:rounded-r-md",
          "[&:has([aria-selected].day-outside)]:bg-accent/30",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal text-foreground hover:bg-secondary aria-selected:opacity-100"
        ),
        range_start: "day-range-start rounded-l-md bg-primary",
        range_end: "day-range-end rounded-r-md bg-primary",
        selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-md",
        today: "bg-violet-500/20 text-violet-400 rounded-md",
        outside: "day-outside text-muted-foreground/40 aria-selected:bg-accent/30 aria-selected:text-muted-foreground",
        disabled: "text-muted-foreground/30 cursor-not-allowed",
        range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight
          return <Icon className="h-3 w-3" />
        },
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
