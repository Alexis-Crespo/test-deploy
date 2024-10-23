"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { format, addMonths, subMonths, setMonth, setYear } from "date-fns";
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
  onDateChange: (date: Date | null) => void;
}

export default function BeneficiaryCalendar({
  onDateChange,
}: CustomCalendarProps) {
  const [date, setDate] = React.useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [view, setView] = React.useState<View>(View.Day);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDateSelection = (newDate: Date) => {
    setSelectedDate(newDate);
    setDate(newDate);
    if (typeof onDateChange === "function") {
      onDateChange(newDate);
    }
    setIsOpen(false);
  };

  const toggleView = () => {
    setView((prev) => {
      if (prev === View.Day) return View.Month;
      if (prev === View.Month) return View.Year;
      return View.Day;
    });
  };

  const renderCalendarContent = () => {
    switch (view) {
      case View.Year:
        const currentYear = date.getFullYear();
        const years = Array.from({ length: 12 }, (_, i) => currentYear - 5 + i);
        return (
          <ScrollArea className="h-[180px]">
            <div className="grid grid-cols-3 gap-1 p-1">
              {years.map((year) => (
                <Button
                  key={year}
                  variant="outline"
                  className={cn(
                    "h-7 text-[10px]",
                    selectedDate &&
                      year === selectedDate.getFullYear() &&
                      "bg-violet-500 text-white"
                  )}
                  onClick={() => {
                    setDate(setYear(date, year));
                    setView(View.Month);
                  }}
                >
                  {year}
                </Button>
              ))}
            </div>
          </ScrollArea>
        );

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

  const getHeaderText = () => {
    switch (view) {
      case View.Year:
        return `${date.getFullYear() - 5} - ${date.getFullYear() + 6}`;
      case View.Month:
        return format(date, "yyyy");
      default:
        return format(date, "MMMM yyyy", { locale: es });
    }
  };

  const handlePrevious = () => {
    switch (view) {
      case View.Year:
        setDate(setYear(date, date.getFullYear() - 12));
        break;
      case View.Month:
        setDate(setYear(date, date.getFullYear() - 1));
        break;
      default:
        setDate(subMonths(date, 1));
    }
  };

  const handleNext = () => {
    switch (view) {
      case View.Year:
        setDate(setYear(date, date.getFullYear() + 12));
        break;
      case View.Month:
        setDate(setYear(date, date.getFullYear() + 1));
        break;
      default:
        setDate(addMonths(date, 1));
    }
  };

  return (
    <div className="relative w-full max-w-52 h-10">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full h-10 px-3 justify-between text-left opacity-85 text-[0.78rem] font-normal border-gray-300",
              !selectedDate && "text-[#A0AEC0]"
            )}
          >
            <span className="flex-grow truncate">
              {selectedDate ? (
                format(selectedDate, "dd/MM/yyyy")
              ) : (
                <span className="text-xs text-[#A0AEC0]">DD/MM/AAAA</span>
              )}
            </span>
            <CalendarIcon
              className="h-5 w-5 ml-2 flex-shrink-0"
              style={{ color: violetColor }}
            />
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
                onClick={handlePrevious}
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
                {getHeaderText()}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-5 w-5 bg-white hover:bg-gray-100"
                onClick={handleNext}
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
