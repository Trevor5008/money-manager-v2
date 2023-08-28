"use client"
import { useEffect, useState } from "react"
import {
   Box,
   Divider,
   Typography
} from "@mui/material"
import {
   generateMonthDates,
   months,
   weekDays
} from "../utils/dateHelpers"
import Week from "../components/Week"

export default function Calendar() {
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
      <Box
         display="flex"
         flexDirection="column"
      >
         {/* Month/Year Heading */}
         <Box>
            <Typography
               variant="h2"
               textAlign="center"
            >
               {dataReady
                  ? `${currentMonth} ${currentYear}`
                  : "Loading..."}
            </Typography>
         </Box>
         {/* Days of Week Header Row */}
         <Box
            display="flex"
            justifyContent="space-between"
            marginBottom={1}
         >
            {weekDays &&
               weekDays.map((day, idx) => {
                  return (
                     <Typography
                        key={idx}
                        variant="h5"
                        flex={1}
                        textAlign="center"
                     >
                        {day}
                     </Typography>
                  )
               })}
         </Box>
         {/* Divides Calendar header from body */}
         <Divider
            sx={{ border: "1px solid grey" }}
         />
         {/* Calendar Grid */}
         <Box display="flex" flexDirection="column">
            {/* dates = matrix of week rows, day columns */}
            {dates &&
               dates.map((week, idx) => {
                  return (
                     <Week
                        week={week}
                        key={idx}
                        id={`week ${idx + 1}`}
                        dates={dates}
                     />
                  )
               })}
         </Box>
      </Box>
   )
}
