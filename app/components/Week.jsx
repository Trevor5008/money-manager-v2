import { Box } from "@mui/material"
import React from "react"
import { daysOfWeek } from "../utils/dateHelpers"
import CalendarDay from "./CalendarDay"

export default function Week({ week }) {
   return (
      <Box
         display="flex"
         id={`week ${week}`}
         width="100%"
         flexDirection="row"
      >
         {daysOfWeek &&
            daysOfWeek.map((el, idx) => {
               return <CalendarDay key={idx} />
            })}
      </Box>
   )
}
