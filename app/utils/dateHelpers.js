const daysOfWeek = [
   "Sun",
   "Mon",
   "Tue",
   "Wed",
   "Thur",
   "Fri",
   "Sat"
]

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

function parseWeekDay(day) {
   switch (day) {
      case 0:
         return "Sunday"
      case 1:
         return "Monday"
      case 2:
         return "Tuesday"
      case 3:
         return "Wednesday"
      case 4:
         return "Thursday"
      case 5:
         return "Friday"
      case 6:
         return "Saturday"
      default:
         return null
   }
}

function parseDateSuffix(date) {
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

function populateDates(daysInMonth) {
   const dates = []
   for (let i = 1; i <= daysInMonth; i++) {
      const date = {
         date: i
      }
      dates.push(date)
   }
   return dates
}

const parseMonth = (month) => months[month]

module.exports = {
   parseWeekDay,
   parseDateSuffix,
   parseMonth,
   daysOfWeek,
   populateDates
}
