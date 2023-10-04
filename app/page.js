"use client"
import { useEffect, useState } from "react"
import {
   months, // ex. "January"
   generateFullMonth, // 2D array rows = weeks
   getNumWeeks
} from "./utils/dateHelpers"
import Calendar from "./components/Calendar"
import Notes from "./components/Notes"
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
   const [today, setToday] = useState(null)
   const [currentYear, setCurrentYear] = useState(0)
   const [currentMonth, setCurrentMonth] = useState(0)
   const [dataReady, setDataReady] =
      useState(false)
   const [accountsView, setAccountsView] = useState(false)
   const [transactionsView, setTransactionsView] = useState(false)
   const [addItemsView, setAddItemsView] = useState(false)

   useEffect(() => {
      // Retrieve current month dates from db
      const today = new Date()
      const year = today.getFullYear()
      const month = today.getMonth()
      
      fetch(`/api/get-year/${month}-${year}`)
         .then((res) => res.json())
         .then((res) => {
            const { year } = res.dates
            const { dates, month } =
               res.dates.months[0]
            setCurrentYear(year)
            setCurrentMonth(month)
            const currentDates = generateFullMonth(dates)
            setCurrentMonthDates(currentDates)
            return dates
         })
         .then((res) => {
            const today = new Date().getDate()
            const todayDate = res.find(
               (date) => date.date === today
            )
            setActiveDate(todayDate)
            setToday(todayDate)
         })
         .then(() => setDataReady(true))
   }, [])

   function handleDateSelect(date) {
      if (date?.date) {
         setActiveDate(date)
      }
   }

   // Handles user selection of prev or next month
   function prevMonth() {
      console.log('prev month')
   }

   function nextMonth() {
      console.log('next month')
   }

   function resetActive() {
      setActiveDate(today)
   }

   function handleTabSelect(val) {
      if (val === 0) {
         setAccountsView(false)
         setTransactionsView(true)
         setAddItemsView(false)
      } else if (val === 1) {
         setAccountsView(true)
         setTransactionsView(false)
         setAddItemsView(false)
      } else {
         setAccountsView(false)
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
               today={today}
               activeDate={activeDate}
               dates={currentMonthDates}
               currentYear={currentYear}
               currentMonth={currentMonth}
               dataReady={dataReady}
               handleSelect={handleDateSelect}
               prevMonth={prevMonth}
               nextMonth={nextMonth}
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
