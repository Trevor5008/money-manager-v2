"use client"
import { useEffect, useState } from "react"
import {
   generateMonthDates,
   months
} from "./utils/dateHelpers"
import Calendar from "./components/Calendar"
import Notes from "./components/Notes"
import { Box } from "@mui/material"

export default function page() {
   const [dates, setDates] = useState([]) // array of date objects
   const [today, setToday] = useState(null) // date object
   const [currentMonth, setCurrentMonth] =
      useState(0) // month string name
   const [currentYear, setCurrentYear] =
      useState(0) // year integer value ex. 2023
   const [dataReady, setDataReady] =
      useState(false)
   const [activeDate, setActiveDate] = useState(0) // date integer

   useEffect(() => {
      const today = new Date()
      const monthIdx = today.getMonth()
      const year = today.getFullYear()
      const currentMonthDates =
         generateMonthDates(monthIdx, year, today)
      setCurrentMonth(months[monthIdx])
      setCurrentYear(year)
      setDates(currentMonthDates)
      setDataReady(true)
      setActiveDate(today)
      setToday(today)
   }, [])

   function handleDateSelect(date) {
      if (date) {
         const monthIdx =
            months.indexOf(currentMonth) // convert name to idx
         const currentDate = new Date(
            currentYear,
            monthIdx,
            date.date
         )
         setActiveDate(currentDate) // date object
      }
   }

   function resetActive() {
      setActiveDate(today)
   }

   return (
      <main>
         <Box sx={{ display: "flex" }}>
            <Calendar
               dates={dates} // array of date objects
               currentMonth={currentMonth}
               currentYear={currentYear}
               dataReady={dataReady} // loaded boolen
               handleSelect={handleDateSelect}
               today={today} // date object
               activeDate={activeDate}
               resetActive={resetActive}
            />
            <Notes
               activeDate={activeDate} // date object
               today={today} // date object
            />
         </Box>
      </main>
   )
}
