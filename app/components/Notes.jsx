"use client"
import { useEffect, useState } from "react"
import {
   Paper,
   Box,
   Typography,
   Divider,
   Stack
} from "@mui/material"
import { parseSuffix } from "../utils/dateHelpers"
import NotesLoad from "./NotesLoad"

export default function Notes({ activeDate }) {
   const [current, setCurrent] = useState(0)
   const [isToday, setIsToday] = useState(false)
   const [isReady, setIsReady] = useState(false)

   useEffect(() => {
      console.log(activeDate)
      if (
         activeDate ===
         new Date().getDate()
      ) {
         setIsToday(true)
      } else {
         setIsToday(false)
      }
      setCurrent(activeDate)
      setIsReady(true)
   }, [current])
   return (
      <Paper
         elevation={3}
         sx={{
            marginTop: "5vh",
            width: "40vw",
            marginLeft: 5,
            borderRadius: 3
         }}
      >
         {isReady ? (
            <Stack
               id="notes"
               paddingTop={1}
            >
               {/* Notes Header */}
               <Box
                  id="date-header"
                  padding={1}
               >
                  <Typography
                     variant="h4"
                     paddingLeft={1}
                  >
                     {isToday
                        ? "Today"
                        : current +
                          parseSuffix(current)}
                  </Typography>
               </Box>
               <Divider />
               {/* Notes Body */}
               <Stack
                  id="items-section"
                  display="flex"
                  flexDirection="column"
                  paddingX={2}
               >
                  <Stack
                     id="expenses"
                     marginY={3}
                     marginX={2}
                  >
                     <Typography variant="h6">
                        Expense(s)
                     </Typography>
                     <Divider />
                     <Stack
                        id="expense-items"
                        marginTop={2}
                        marginLeft={2}
                     >
                        <Typography
                           variant="body1"
                           fontStyle="italic"
                           color="grey"
                           sx={{
                              fontWeight: 100
                           }}
                        >
                           Zero items today
                        </Typography>
                     </Stack>
                  </Stack>
                  <Stack
                     id="income"
                     marginY={3}
                     marginX={2}
                  >
                     <Typography variant="h6">
                        Income
                     </Typography>
                     <Divider />
                     <Stack
                        id="income-items"
                        marginTop={2}
                        marginLeft={2}
                     >
                        <Typography
                           variant="body1"
                           fontStyle="italic"
                           color="grey"
                        >
                           Zero items today
                        </Typography>
                     </Stack>
                  </Stack>
               </Stack>
            </Stack>
         ) : (
            <NotesLoad />
         )}
      </Paper>
   )
}
