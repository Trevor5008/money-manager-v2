import { Box } from "@mui/material"
import CalendarDay from "./CalendarDay"

export default function Week({
   dates,
   handleSelect,
   activeDate,
   reset
}) {
   const daysOfWeek = [...Array(7).keys()]
   return (
      <Box
         display="flex"
         width="100%"
         height="100%"
      >
         {dates &&
            daysOfWeek.map((date, idx) => {
               return (
                  <CalendarDay
                     key={idx}
                     date={date}
                     handleSelect={handleSelect}
                     activeDate={activeDate}
                     reset={reset}
                  />
               )
            })}
      </Box>
   )
}
