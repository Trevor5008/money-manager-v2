"use client"
import Week from "./components/Week"
import { useState, useEffect } from "react"
import {
   parseWeekDay,
   parseDateSuffix,
   parseMonth,
   daysOfWeek,
   populateDates
} from "./utils/dateHelpers"
import { Box, Typography } from "@mui/material"

export default function Home() {
   const [numDaysInMonth, setNumDaysInMonth] =
      useState(0)
   const [numWeeks, setNumWeeks] = useState(0)
   const [datesInMonth, setDatesInMonth] =
      useState([])
   const [currentMonth, setCurrentMonth] =
      useState(0)
   const [currentYear, setCurrentYear] =
      useState(0)

   const [currentDay, setCurrentDay] = useState(0)
   const [currentDate, setCurrentDate] =
      useState(0)

   function getDaysInMonth() {
      const today = new Date()
      const year = today.getFullYear()
      const month = today.getMonth()
      const day = today.getDay()
      const date = today.getDate()
      const numDaysInMonth = new Date(
         year,
         month + 1,
         0
      ).getDate()
      const numWeeks = Math.ceil(
         numDaysInMonth / 7
      )
      setCurrentMonth(month)
      setCurrentYear(year)
      setCurrentDay(day)
      setCurrentDate(date)
      setNumDaysInMonth(numDaysInMonth)
      setNumWeeks(numWeeks)
   }

   useEffect(() => {
      getDaysInMonth()
      if (numDaysInMonth) {
         const dates = populateDates(
            numDaysInMonth
         )
         setDatesInMonth(dates)
      }
   }, [])

   return (
      <main>
         <Box
            display="flex"
            flexDirection="column"
         >
            <Box
               id="calendar-heading"
               display="flex"
               justifyContent="center"
               marginBottom={1}
               flex={1}
               border={1}
            >
               <Typography variant="h2">
                  {parseMonth(currentMonth)}{" "}
                  {currentYear}
               </Typography>
            </Box>
            <Box
               id="calendar-weekdays"
               display="flex"
               justifyContent="center"
               border={1}
            >
               {daysOfWeek.map((el, idx) => {
                  return (
                     <Box key={idx} display="flex" flex={1}>
                        <Typography
                           variant="h5"
                           flex={1}
                           // paddingX={7}
                           // borderBottom={1}
                           // paddingBottom={1}
                           border={1}
                           textAlign="center"
                        >
                           {el}
                        </Typography>
                     </Box>
                  )
               })}
            </Box>
            <Box
               display="flex"
               id="calendar-body"
               border={2}
               flexDirection="column"
            >
               {Array.from({ length: numWeeks }).map(
                  (el, idx) => {
                     return (
                        <Week
                           key={idx}
                           week={el}
                        />
                     )
                  }
               )}
            </Box>
         </Box>
      </main>
   )
}
