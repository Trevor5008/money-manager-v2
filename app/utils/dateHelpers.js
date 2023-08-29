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

function parseSuffix(date) {
   switch(date) {
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

   const isToday = currentDate === todayDate 
      && currentMonth === todayMonth && currentYear === todayYear
   return isToday
}

/* TODO: Dates s/b objects w/ a "date" integer value
      ...
*/
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
            const current = new Date(year, month, dayCounter)
            const isToday = 
               isCurrentToday(today, current)
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
               items: []
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
   parseSuffix
}
