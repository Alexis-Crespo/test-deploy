"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { format, addMonths, subMonths, setYear, setMonth } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

enum View {
  Day,
  Month,
  Year,
}

const violetColor = "#8B5CF6";

interface CustomCalendarProps {
  initialDate?: string | null; // la fecha ahora es un string de la API
  onDateChange: (date: Date | null) => void;
}

export default function CustomCalendar({
  initialDate,
  onDateChange,
}: CustomCalendarProps) {
  const initialParsedDate = initialDate ? new Date(initialDate) : null; // Convertimos el string en un objeto Date
  const [date, setDate] = React.useState<Date>(initialParsedDate || new Date());
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    initialParsedDate || null
  );
  const [view, setView] = React.useState<View>(View.Day);
  const [isOpen, setIsOpen] = React.useState(false);

  const currentYear = new Date().getFullYear();
  const [yearRange, setYearRange] = React.useState([
    currentYear - 5,
    currentYear,
  ]);

  // Sincronizar initialDate con el estado del componente si viene de la API
  React.useEffect(() => {
    if (initialDate) {
      const parsedDate = new Date(initialDate); // Aseguramos que sea un objeto Date
      if (!selectedDate || parsedDate.getTime() !== selectedDate.getTime()) {
        setDate(parsedDate);
        setSelectedDate(parsedDate);
      }
    }
  }, [initialDate]);

  const handleDateSelection = (newDate: Date) => {
    setSelectedDate(newDate);
    setDate(newDate);
    onDateChange(newDate);
    setIsOpen(false);
  };

  const handleYearRangeChange = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setYearRange([yearRange[0] - 11, yearRange[1] - 11]);
    } else if (direction === "next" && yearRange[1] < currentYear) {
      setYearRange([
        yearRange[0] + 11,
        Math.min(yearRange[1] + 11, currentYear),
      ]);
    }
  };

  const toggleView = () => {
    setView((prev) => (prev === View.Day ? View.Month : View.Day));
  };

  const renderCalendarContent = () => {
    switch (view) {
      case View.Month:
        const monthNames = Array.from({ length: 12 }, (_, i) =>
          format(new Date(2021, i, 1), "MMMM", { locale: es })
        );
        return (
          <ScrollArea className="h-[180px]">
            <div className="grid grid-cols-3 gap-1 p-1">
              {monthNames.map((month, index) => (
                <Button
                  key={month}
                  variant="outline"
                  className={cn(
                    "h-7 text-[10px]",
                    selectedDate &&
                      index === selectedDate.getMonth() &&
                      "bg-violet-500 text-white"
                  )}
                  onClick={() => {
                    setDate(setMonth(date, index));
                    setView(View.Day);
                  }}
                >
                  {month}
                </Button>
              ))}
            </div>
          </ScrollArea>
        );

      default:
        const daysInMonth = new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          0
        ).getDate();
        const firstDayOfMonth = new Date(
          date.getFullYear(),
          date.getMonth(),
          1
        ).getDay();
        const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        const fillerDays = Array(firstDayOfMonth).fill(null);

        return (
          <ScrollArea className="h-[180px]">
            <div className="p-1">
              <div className="grid grid-cols-7 gap-1 mb-1">
                {["lu", "ma", "mi", "ju", "vi", "sa", "do"].map((day) => (
                  <div
                    key={day}
                    className="text-center font-medium text-[10px] text-gray-700"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {fillerDays.map((_, index) => (
                  <div key={`filler-${index}`} className="h-5 w-5" />
                ))}
                {daysArray.map((day) => {
                  const currentDate = new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    day
                  );
                  const isSelected =
                    selectedDate &&
                    currentDate.toDateString() === selectedDate.toDateString();
                  const isToday =
                    currentDate.toDateString() === new Date().toDateString();

                  return (
                    <Button
                      key={day}
                      variant="ghost"
                      className={cn(
                        "h-5 w-5 p-0 text-[10px] font-normal text-gray-600",
                        isSelected &&
                          "bg-violet-500 text-white rounded-r-md rounded-l-none",
                        isToday &&
                          !isSelected &&
                          "ring-1 ring-violet-500 text-violet-500"
                      )}
                      onClick={() => handleDateSelection(currentDate)}
                    >
                      {day.toString().padStart(2, "0")}
                    </Button>
                  );
                })}
              </div>
            </div>
          </ScrollArea>
        );
    }
  };

  return (
    <div className="relative w-full max-w-48 h-8 ">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full h-9 justify-between text-left opacity-85 text[0.78rem] font-normal  border-gray-300",
              !selectedDate && "text-[#A0AEC0]"
            )}
          >
            {selectedDate ? (
              format(selectedDate, "dd/MM/yyyy")
            ) : (
              <span className="text-xs text-[#A0AEC0]">DD/MM/AAAA</span>
            )}
            <CalendarIcon className="h-5 w-5" style={{ color: violetColor }} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="start"
          side="bottom"
          sideOffset={5}
        >
          <div className="w-[220px] border rounded-lg p-1 bg-white shadow-sm">
            <div className="flex items-center justify-between space-x-1 mb-1">
              <Button
                variant="outline"
                size="icon"
                className="h-5 w-5 bg-white hover:bg-gray-100"
                onClick={() =>
                  view === View.Day
                    ? setDate(subMonths(date, 1))
                    : handleYearRangeChange("prev")
                }
              >
                <ChevronLeft
                  className="h-3 w-3"
                  style={{ color: violetColor }}
                />
                <span className="sr-only">Anterior</span>
              </Button>
              <Button
                variant="ghost"
                onClick={toggleView}
                className="h-5 px-2 text-[10px] text-black hover:text-gray-700 hover:bg-gray-100"
              >
                {view === View.Day
                  ? format(date, "MMMM", { locale: es })
                  : format(date, "yyyy")}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-5 w-5 bg-white hover:bg-gray-100"
                onClick={() =>
                  view === View.Day
                    ? setDate(addMonths(date, 1))
                    : handleYearRangeChange("next")
                }
              >
                <ChevronRight
                  className="h-3 w-3"
                  style={{ color: violetColor }}
                />
                <span className="sr-only">Siguiente</span>
              </Button>
            </div>
            {renderCalendarContent()}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
