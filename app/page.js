"use client"
import { useEffect, useState } from "react"
import {
   generateMonthDates,
   months,
   convertDate
} from "./utils/dateHelpers"
import Calendar from "./components/Calendar"
import Notes from "./components/Notes"
import CustomTabPanel from "./components/CustomTabPanel"
import Accounts from "./components/Accounts"
import AddItem from "./components/AddItem"
import { Box, Paper, Stack } from "@mui/material"

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
   const [transactionsView, setTransactionsView] =
      useState(true)
   const [accountsView, setAcccountsView] =
      useState(false)
   const [addItemsView, setAddItemsView] =
      useState(false)

   useEffect(() => {
      const today = new Date() // Date string
      const monthIdx = today.getMonth() // Integer index
      const year = today.getFullYear() // Integer year 
      const currentMonthDates =
         generateMonthDates(monthIdx, year, today) // array of custom date objects
      const dateObj = convertDate(today, currentMonthDates)
         setCurrentMonth(months[monthIdx]) // Month string
      setCurrentYear(year) // Year integer
      setDates(currentMonthDates) // array of custom date objects
      setDataReady(true)
      setActiveDate(dateObj) // Custom date object
      setToday(dateObj) // Custom date object
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
               dates={dates} // array of date objects
               currentMonth={currentMonth}
               currentYear={currentYear}
               dataReady={dataReady} // loaded boolen
               handleSelect={handleDateSelect}
               today={today} // date object
               activeDate={activeDate}
               resetActive={resetActive}
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
               </Paper>
            </Stack>
         </Box>
      </main>
   )
}
