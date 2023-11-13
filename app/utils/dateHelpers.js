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
   const nextMonth = month < 11 ? month + 1 : 0
   const currentYear =
      nextMonth > 0 ? year : year + 1
   const daysInMonth = new Date(
      currentYear,
      nextMonth,
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

// Translates short week day into long name
function getLongName(day) {
   return weekDaysFull.find(
      (weekDay) =>
         weekDay.slice(0, 2) === day.slice(0, 2)
   )
}

// Converts standard date string to custom date object
function convertDate(dateStr, dates) {
   const date = dateStr.getDate()
   let dateObj
   // loop over rows in dates matrix
   dates.forEach((obj) => {
      if (obj?.date === date) {
         dateObj = obj
         return
      }
   })
   return dateObj
}

// Generates seed data for database, used in index.js
function generateMonthDates(month, year) {
   const firstIdx = findFirstDay(month, year) // 0 = "Sunday"
   const numWeeks = getNumWeeks(month, year)
   const numDays = getNumDays(month, year)
   let dayCounter = 1
   const dates = []

   for (let i = 0; i < numWeeks; i++) {
      // Aligns date w/ correct weekday
      for (let j = 0; j < 7; j++) {
         if (
            dayCounter <= numDays ||
            (i === 0 && j >= firstIdx)
         ) {
            // Creates date string
            const date = new Date(
               year,
               month,
               dayCounter
            )
            const dateObj = {
               date: date.getDate(),
               day: weekDays[date.getDay()],
               income: {
                  create: []
               },
               expenses: {
                  create: []
               },
               transfers: {
                  create: []
               },
               debtpayment: {
                  create: []
               }
            }
            dayCounter++
            dates.push(dateObj)
         }
      }
   }
   return dates
}

// Helper for generate month matrix method
function splitArrIntoWeeks(dates) {
   const weeksArr = [];
   for (let i = 0; i < dates.length; i += 7) {
     const week = dates.slice(i, i + 7);
     weeksArr.push(week);
   }
   return weeksArr;
 }

function generateFullMonth(dates) {
   const firstDayIdx = weekDays.indexOf(dates[0].day)
   const lastDayIdx = weekDays.indexOf(dates[dates.length - 1].day)
   const paddingStart = Array(firstDayIdx).fill({})
   const paddingEnd = Array(6 - lastDayIdx).fill({})
   const monthDatesArr = [...paddingStart, ...dates, ...paddingEnd]
   const monthsMatrix = splitArrIntoWeeks(monthDatesArr)
   return monthsMatrix

}

module.exports = {
   generateMonthDates,
   generateFullMonth,
   getNumWeeks,
   months,
   weekDays,
   weekDaysFull,
   parseSuffix,
   convertDate,
   getLongName
}
