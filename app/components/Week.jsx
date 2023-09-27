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
         {week &&
            week.map((date, idx) => {
               return (
                  <CalendarDay
                     key={`${date}-${idx}`}
                     date={date}
                     dates={dates}
                     handleSelect={handleSelect}
                     activeDate={activeDate}
                     reset={reset}
                  />
               )
            })}
      </Box>
   )
}
