"use client"
import { useEffect, useState } from "react"
import {
   months, // ex. "January"
   generateMonthMatrix, // 2D array rows = weeks
   getNumWeeks
} from "./utils/dateHelpers"
import Calendar from "./components/Calendar"
import Notes from "./components/Notes"
import CustomTabPanel from "./components/CustomTabPanel"
import Accounts from "./components/Accounts"
import AddItem from "./components/AddItem"
import { Box, Paper, Stack } from "@mui/material"

export default function page() {
   const [
      currentMonthDates,
      setCurrentMonthDates
   ] = useState([])
   const [todaysDate, setTodaysDate] =
      useState(null)
   const [currentYear, setCurrentYear] = useState(0)
   const [currentMonth, setCurrentMonth] = useState(0)
   const [numWeeks, setNumWeeks] = useState(0)
   const [dataReady, setDataReady] =
      useState(false)
   // useEffect(() => {
   //    const today = new Date() // Date string
   //    const monthIdx = today.getMonth() // Integer index
   //    const year = today.getFullYear() // Integer year
   //    // const currentMonthDates =
   //    //    generateMonthMatrix(monthIdx, year) // array of custom date objects
   //    // const currentMonthWeeks = getNumWeeks(months[monthIdx], year)
   //    // const dateObj = convertDate(today, currentMonthDates)
   //    //    setCurrentMonth(months[monthIdx]) // Month string
   //    // setCurrentYear(year) // Year integer
   //    // setDates(currentMonthDates) // array of custom date objects
   //    // setDataReady(true)
   //    // setActiveDate(dateObj) // Custom date object
   //    // setToday(dateObj) // Custom date object
   // }, [])

   useEffect(() => {
      // Retrieve current month dates from db
      fetch("/api/get-year")
         .then((res) => res.json())
         .then((res) => {
            const { year } = res.dates
            const { dates, month } =
               res.dates.months[0]
            setCurrentMonthDates(dates)
            const numberWeeks = getNumWeeks(
               month,
               year
            )
            setNumWeeks(numberWeeks)
            setCurrentYear(year)
            setCurrentMonth(month)
            return dates
         })
         .then((res) => {
            const today = new Date().getDate()
            const todayDate = res.find(
               (date) => date.date === today
            )
            setTodaysDate(todayDate)
         })
         .then(() => setDataReady(true))
   }, [])

   function handleDateSelect(date) {
      if (date) {
         setActiveDate(date)
      }
   }

   function resetActive() {
      setActiveDate(today)
   }

   function handleTabSelect(val) {
      if (val === 0) {
         setAcccountsView(false)
         setTransactionsView(true)
         setAddItemsView(false)
      } else if (val === 1) {
         setAcccountsView(true)
         setTransactionsView(false)
         setAddItemsView(false)
      } else {
         setAcccountsView(false)
         setTransactionsView(false)
         setAddItemsView(true)
      }
   }

   function handleDatePick(evt) {
      const dateStrArr =
         evt.target.value.split("-")
      const month = parseInt(dateStrArr[1])
      const year = parseInt(dateStrArr[0])
      const date = parseInt(dateStrArr[2])

      for (const week of dates) {
         for (const dateObj of week) {
            if (
               dateObj?.date === date &&
               dateObj?.month === month &&
               dateObj?.year === year
            ) {
               setActiveDate(dateObj)
            }
         }
      }
   }

   return (
      <main>
         <Box sx={{ display: "flex" }}>
            <Calendar
               dates={currentMonthDates}
               numWeeks={numWeeks}
               currentYear={currentYear}
               currentMonth={currentMonth}
               dataReady={dataReady}
            />
            {/* Side Panel: Transactions, Accounts, Add Item */}
            <Stack>
               {/* <CustomTabPanel
                  handleSelect={handleTabSelect}
               /> */}
               <Paper
                  elevation={3}
                  sx={{
                     marginTop: "2vh",
                     width: "40vw",
                     marginLeft: 3,
                     borderRadius: 3,
                     display: "flex",
                     flex: 1
                  }}
               >
                  {/* {transactionsView ? (
                     <Notes
                        activeDate={activeDate} // date object
                        today={today} // date object
                     />
                  ) : accountsView ? (
                     <Accounts />
                  ) : addItemsView ? (
                     <AddItem
                        activeDate={activeDate}
                        handleDatePick={
                           handleDatePick
                        }
                     />
                  ) : null} */}
                  {currentMonthDates &&
                     currentMonthDates.map(
                        (date, idx) => {
                           return (
                              <h2
                                 key={`date-${idx}`}
                              >
                                 {date.date}
                              </h2>
                           )
                        }
                     )}
               </Paper>
            </Stack>
         </Box>
      </main>
   )
}
