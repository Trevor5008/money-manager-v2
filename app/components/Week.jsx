import { useState } from "react"
import {
   Box
} from "@mui/material"
import CalendarDay from "./CalendarDay"

export default function Week({ week, dates }) {
  return (
    <Box display="flex">
      {dates && week.map((date, idx) => {
         return (
            <CalendarDay key={idx} date={date}/>
         )
      })}
    </Box>
  )
}
