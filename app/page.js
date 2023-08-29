"use client"
import { useEffect, useState } from "react"
import {
   generateMonthDates,
   months,
   weekDays
} from "./utils/dateHelpers"
import Calendar from "./components/Calendar"

export default function page() {
   const [dates, setDates] = useState([])
   const [currentMonth, setCurrentMonth] =
      useState(0)
   const [currentYear, setCurrentYear] =
      useState(0)
   const [dataReady, setDataReady] =
      useState(false)

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
   }, [])
   
   return (
      <main>
         <Calendar
            dates={dates}
            currentMonth={currentMonth}
            currentYear={currentYear}
            dataReady={dataReady}
         />
      </main>
   )
}
