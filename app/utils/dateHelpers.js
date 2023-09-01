const months = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December"
]

const weekDays = [
   "Sun",
   "Mon",
   "Tue",
   "Wed",
   "Thur",
   "Fri",
   "Sat"
]

const weekDaysFull = [
   "Sunday",
   "Monday",
   "Tuesday",
   "Wednesday",
   "Thursday",
   "Friday",
   "Saturday"
]

function parseSuffix(date) {
   switch (date) {
      case 1:
      case 21:
      case 31:
         return "st"
      case 2:
      case 22:
         return "nd"
      case 3:
      case 23:
         return "rd"
      default:
         return "th"
   }
}

function getNumDays(month, year) {
   const daysInMonth = new Date(
      year,
      month + 1,
      0
   ).getDate()
   return daysInMonth
}

function getNumWeeks(month, year) {
   const numDays = getNumDays(month, year)
   const numWeeks = Math.ceil(numDays / 7)
   return numWeeks
}

function findFirstDay(month, year) {
   const firstDayIdx = new Date(
      year,
      month,
      1
   ).getDay()
   return firstDayIdx
}

function isCurrentToday(today, current) {
   const currentDate = current.getDate()
   const currentMonth = current.getMonth()
   const currentYear = current.getFullYear()

   const todayDate = today.getDate()
   const todayMonth = today.getMonth()
   const todayYear = today.getFullYear()

   const isToday =
      currentDate === todayDate &&
      currentMonth === todayMonth &&
      currentYear === todayYear
   return isToday
}

/* TODO: 
      dateObj = {
         date: integer,
         day: string,
         month: integer idx,
         year: integer,
         isToday: boolean,
         items: {
            income: [
               occurrenceObj,
               occurrenceObj
            ],
            expenses: [
               occurrenceObj,
               occurrenceObj
            ],
            transfers: [],
            debtPayments: []
         }
      }

      transferOccurrenceObj = {
         date: obj,
         isRecurring: boolean,
         accountFrom: integer idx,
         accountTo: integer idx,
         amount: decimal
      }

      occurrenceObj = {
         date: date obj,
         isRecurring: boolean,
         account: integer idx,
         amount: decimal,
         category: string
      }
*/

// Translates short week day into long name
function getLongName(day) {
   return weekDaysFull.find(
      (weekDay) =>
         weekDay.slice(0, 2) === day.slice(0, 2)
   )
}

// Converts standard date string to custom date object
function convertDate(dateStr, dates) {
   const year = dateStr.getFullYear()
   const month = dateStr.getMonth()
   const date = dateStr.getDate()
   let dateObj
   // loop over rows in dates matrix
   for (const week of dates) {
      // date object is w/in a week row
      week.forEach((obj) => {
         if (
            obj?.year === year &&
            obj?.month === month &&
            obj?.date === date
         ) {
            dateObj = obj
            return
         }
      })
   }
   return dateObj
}

function generateMonthDates(month, year, today) {
   const firstIdx = findFirstDay(month, year)
   const numWeeks = getNumWeeks(month, year)
   const numDays = getNumDays(month, year)
   let dayCounter = 1
   const dates = []

   for (let i = 0; i < numWeeks; i++) {
      const week = []
      for (let j = 0; j < 7; j++) {
         if (i === 0 && j < firstIdx) {
            week.push(null) // Days before the first day
         } else if (dayCounter <= numDays) {
            const current = new Date(
               year,
               month,
               dayCounter
            )
            const isToday = isCurrentToday(
               today,
               current
            )
            const date = new Date(
               year,
               month,
               dayCounter
            )
            const dateObj = {
               date: date.getDate(),
               day: weekDays[date.getDay()],
               month,
               year,
               isToday,
               items: {
                  income: [],
                  expenses: [],
                  transfers: [],
                  debtPayments: []
               }
            }
            week.push(dateObj)
            dayCounter++
         } else {
            week.push(null) // Days after the last day
         }
      }
      dates.push(week)
   }
   return dates
}

module.exports = {
   generateMonthDates,
   months,
   weekDays,
   weekDaysFull,
   parseSuffix,
   convertDate,
   getLongName
}
