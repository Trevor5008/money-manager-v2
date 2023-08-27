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

function getCurrentDate() {
   return new Date()
}

function getNumDays(month, year) {
   const daysInMonth = new Date(year, month + 1, 0).getDate()
   return daysInMonth
}

function getNumWeeks(month, year) {
   const numDays = getNumDays(month, year)
   const numWeeks = Math.ceil(numDays / 7)
   return numWeeks
}

function findFirstDay(month, year) {
   const firstDayIdx = new Date(year, month, 1).getDay()
   return firstDayIdx
}

function generateMonthDates(month, year) {
   const firstIdx = findFirstDay(month, year);
   const numWeeks = getNumWeeks(month, year);
   const numDays = getNumDays(month, year);
   let dayCounter = 1;
   const dates = [];

   for (let i = 0; i < numWeeks; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
         if (i === 0 && j < firstIdx) {
            week.push(0); // Days before the first day
         } else if (dayCounter <= numDays) {
            week.push(dayCounter);
            dayCounter++;
         } else {
            week.push(0); // Days after the last day
         }
      }
      dates.push(week);
   }
   return dates;
}



module.exports = {
   getCurrentDate,
   generateMonthDates,
   months,
   weekDays
}
