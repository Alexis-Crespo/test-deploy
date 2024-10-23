import { useState } from "react";
import Datepicker from "tailwind-datepicker-react";

export const Calender = ({ defaultDate, onDateChange }) => {
  console.log("Este es el defaultDate que trae: ", defaultDate);
  const options = {
    title: "",
    autoHide: true,
    todayBtn: false,
    clearBtn: false,
    clearBtnText: "",
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
      background: "dark:bg-white ",
      todayBtn: "",
      clearBtn: "",
      icons:
        "dark:bg-white dark:text-black dark:text-[0.75rem] dark:hover:bg-primary-500 dark:hover:text-white",
      text: "dark:hover:bg-primary-500 dark:hover:text-white text-black dark:text-[#454647] ",
      disabledText: "dark:text-black-400",
      input: "dark:bg-white dark:text-black ",
      inputIcon: " dark:text-primary-500 text-primary-500",
      selected:
        "dark:text-[#fff]  dark:bg-primary-500  bg-primary-500 text-white  dark:hover:opacity-90 hover:opacity-90",
    },
    icons: {
      prev: () => (
        <span className="text-primary-500 dark:hover:text-white h-full w-full">
          {"<"}
        </span>
      ),
      next: () => (
        <span className="text-primary-500 dark:hover:text-white">{">"}</span>
      ),
    },
    datepickerClassNames: "top-76 right-4 md:right-8 md:top-58 lg:right-80",
    defaultDate: new Date(` ${defaultDate ? defaultDate : "2024-09-21"}`),
    inputIcon: " text-primary-500 ",
    language: "es",
    disabledDates: [],
    text: "text-black dark:text-black",
    weekDays: ["lu", "ma", "mi", "ju", "vi", "sa", "do"],
    inputNameProp: "date",
    inputIdProp: "date",
    inputPlaceholderProp: "Select Date",
    inputDateFormatProp: {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    },
  };

  const [show, setShow] = useState(false);

  const handleChange = (selectedDate: Date) => {
    console.log(selectedDate);
    onDateChange(selectedDate); // Llama al callback cuando cambia la fecha
  };

  const handleClose = (state: boolean) => {
    setShow(state);
  };

  return (
    <div>
      <Datepicker
        options={options}
        onChange={handleChange}
        show={show}
        setShow={handleClose}
      />
    </div>
  );
};
