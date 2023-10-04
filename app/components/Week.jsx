import { Box } from "@mui/material"
import CalendarDay from "./CalendarDay"

export default function Week({
   todayId,
   activeDateId,
   handleSelect,
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
                     todayId={todayId}
                     date={date}
                     handleSelect={handleSelect}
                     activeDateId={activeDateId}
                     reset={reset}
                  />
               )
            })}
      </Box>
   )
}
