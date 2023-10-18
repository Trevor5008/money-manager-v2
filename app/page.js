"use client"
import { useEffect, useState } from "react"
import {
   generateFullMonth // 2D array rows = weeks
} from "./utils/dateHelpers"
import Calendar from "./components/Calendar"
import Transactions from "./components/Transactions"
import CustomTabPanel from "./components/CustomTabPanel"
import Accounts from "./components/Accounts"
import AddItem from "./components/AddItem"
import { Box, Paper, Stack } from "@mui/material"

// TODO: Fix formatting of date objects,
// along with active vs today date

export default function page() {
   const [
      currentMonthDates,
      setCurrentMonthDates
   ] = useState([])
   const [activeDate, setActiveDate] =
      useState(null)
   const [activeDateId, setActiveDateId] =
      useState(0)
   const [todayId, setTodayId] = useState(0)
   const [currentYear, setCurrentYear] =
      useState(0)
   const [currentMonth, setCurrentMonth] =
      useState(0)
   const [dataReady, setDataReady] =
      useState(false)
   const [accountsView, setAccountsView] =
      useState(false)
   const [transactionsView, setTransactionsView] =
      useState(false)

   useEffect(() => {
      // get today's date on load
      const today = new Date() // Full date string "Sun Jan 1st, ..."
      const year = today.getFullYear() // Number value
      const month = today.getMonth() // Number value

      getCurrentMonthData(month, year, today)
   }, [])

   // Helper method for retrieving calendar for current month
   async function getCurrentMonthData(
      month,
      year,
      today
   ) {
      await fetch(
         `/api/get-year/${month}-${year}`
      )
         .then((res) => res.json())
         .then((res) => {
            const { year } = res.dates
            // year is an array of months
            const { dates, month } =
               res.dates.months[0]
            setCurrentYear(year)
            setCurrentMonth(month)
            const currentDates =
               generateFullMonth(dates)
            setCurrentMonthDates(currentDates)
            return { dates, year, month }
         })
         .then(({ dates, month, year }) => {
            const todaysDate = today.getDate()
            const todayMonth = today.getMonth()
            const todayYear = today.getFullYear()

            if (
               todayMonth === month &&
               todayYear === year
            ) {
               const todayDate = dates.find(
                  (date) =>
                     date.date === todaysDate
               )
               setActiveDate(todayDate)
               setActiveDateId(todayDate.id)
               setTodayId(todayDate.id)
            }
         })
         .then(() => setDataReady(true))
   }

   // Date selection from main calendar
   function handleDateSelect(date) {
      if (date?.date) {
         setActiveDateId(date.id)
         setActiveDate(date)
      }
   }

   // Handles user selection of prev or next month
   function prevMonth() {
      let month =
         currentMonth > 0 ? currentMonth - 1 : 11
      let year =
         month === 11
            ? currentYear - 1
            : currentYear
      getCurrentMonthData(month, year, new Date())
      setCurrentMonth(month)
      setCurrentYear(year)
   }

   function nextMonth() {
      let month =
         currentMonth < 11 ? currentMonth + 1 : 0
      let year =
         month === 0
            ? currentYear + 1
            : currentYear
      getCurrentMonthData(month, year, new Date())
      setCurrentMonth(month)
      setCurrentYear(year)
   }

   function resetActive() {
      setActiveDate(today)
   }

   // Reset calendar to present month
   function goToCurrent() {
      const today = new Date()
      const month = today.getMonth()
      const year = today.getFullYear()
      getCurrentMonthData(month, year, today)
   }

   function handleTabSelect(val) {
      setAccountsView(val === 0)
      setTransactionsView(val === 1)
   }

   return (
      <main>
         <Box sx={{ display: "flex" }}>
            <Calendar
               todayId={todayId}
               activeDateId={activeDateId}
               dates={currentMonthDates}
               currentYear={currentYear}
               currentMonth={currentMonth}
               dataReady={dataReady}
               handleSelect={handleDateSelect}
               prevMonth={prevMonth}
               nextMonth={nextMonth}
               goToCurrent={goToCurrent}
            />
            {/* Side Panel: Transactions, Accounts, Add Item */}
            <Stack>
               <CustomTabPanel
                  handleSelect={handleTabSelect}
               />
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
                  {transactionsView ? (
                     <Transactions
                        activeDateId={
                           activeDateId
                        } // date object
                        todayId={todayId} // date object
                        activeDate={activeDate}
                        currentMonth={currentMonth}
                        currentYear={currentYear}
                     />
                  ) : accountsView ? (
                     <Accounts />
                  ) : null}
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
