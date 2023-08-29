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
   const [dates, setDates] = useState([])
   const [currentMonth, setCurrentMonth] =
      useState(0)
   const [currentYear, setCurrentYear] =
      useState(0)
   const [dataReady, setDataReady] =
      useState(false)
   const [activeDate, setActiveDate] = useState(null)

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
   }, [])

   return (
      <main>
         <Box sx={{ display: "flex" }}>
            <Calendar
               dates={dates}
               currentMonth={currentMonth}
               currentYear={currentYear}
               dataReady={dataReady}
            />
            <Notes activeDate={activeDate}/>
         </Box>
      </main>
   )
}
