import { useState } from "react"
import { Box } from "@mui/material"
import CalendarDay from "./CalendarDay"

export default function Week({
   week,
   dates,
   handleSelect,
   activeDate,
   reset
}) {
   return (
      <Box
         display="flex"
         width="100%"
         height="100%"
      >
         {dates &&
            week.map((date, idx) => {
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
