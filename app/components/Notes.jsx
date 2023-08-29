"use client"
import { useEffect, useState } from "react"
import {
   Paper,
   Box,
   Typography
} from "@mui/material"
import { parseSuffix } from "../utils/dateHelpers"

export default function Notes({ activeDate }) {
   const [current, setCurrent] = useState(0)
   const [isToday, setIsToday] = useState(false)
   useEffect(() => {
    console.log(activeDate?.getDate())
      if (activeDate?.getDate() === new Date().getDate()) {
         setIsToday(true)
      } else {
         setIsToday(false)
      }
      setCurrent(activeDate?.getDate())
   }, [current])
   return (
      <Paper
         elevation={2}
         sx={{
            marginTop: "5vh",
            width: "40vw",
            marginLeft: 5,
            borderRadius: 5
         }}
      >
         <Box
            id="date-header"
            padding={2}
         >
            <Typography variant="h4">
               {isToday ? "Today" : current + parseSuffix(current)}
            </Typography>
         </Box>
      </Paper>
   )
}
