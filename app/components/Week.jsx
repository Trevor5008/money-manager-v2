import { Box } from "@mui/material"
import { weekDays } from "../utils/dateHelpers"
import CalendarDay from "./CalendarDay"

export default function Week({
   dates,
   handleSelect,
   activeDate,
   reset,
   week
}) {
   
   return (
      <Box
         display="flex"
         width="100%"
         height="100%"
      >
         {dates &&
            weekDays.map((day, idx) => {
               return (
                  <CalendarDay
                     key={`${week}-${idx}`}
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
