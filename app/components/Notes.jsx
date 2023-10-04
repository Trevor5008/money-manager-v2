"use client"
import { useEffect, useState } from "react"
import {
   Box,
   Typography,
   Divider,
   Stack
} from "@mui/material"
import {
   parseSuffix,
   getLongName
} from "../utils/dateHelpers"

export default function Notes({
   activeDate,
   activeDateId,
   todayId
}) {
   const [heading, setHeading] = useState("")
   const [isReady, setIsReady] = useState(false)
   console.log(activeDate)
   useEffect(() => {
      if (activeDateId && todayId) {
         if (
            activeDateId ===
            todayId
         ) {
            setHeading("Today")
         } else {
            const date = activeDate
            let title = getLongName(activeDate?.day)
            title +=
               " " + date + parseSuffix(date)
            setHeading(title)
         }
      }
      setIsReady(true)
   }, [activeDate])

   return isReady ? (
      <Stack
         id="notes"
         paddingTop={1}
         flex={1}
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
               {heading}
            </Typography>
         </Box>
         <Divider />
         {/* Notes Body */}
         <Stack
            id="items-section"
            paddingX={2}
         >
            <Stack
               id="expenses"
               marginY={3}
               marginX={2}
            >
               <Typography variant="h6">
                  Expenses
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
                  >
                     No items today
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
                     No items today
                  </Typography>
               </Stack>
            </Stack>
         </Stack>
      </Stack>
   ) : null
}
