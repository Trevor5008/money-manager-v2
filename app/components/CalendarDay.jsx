import { useState } from "react"
import { Box, Typography } from "@mui/material"

export default function CalendarDay({
   date,
   handleSelect,
   activeDate,
   reset
}) {
   const [isViewed, setIsViewed] = useState(false)
   const isToday = date?.isToday
   const isActive = date?.date === activeDate?.getDate() 
      && date?.month === activeDate?.getMonth()
      && date?.year === activeDate?.getFullYear()

   function handleHover() {
      setIsViewed(true)
   }
   function handleLeave() {
      setIsViewed(false)
   }
   return (
      <Box
         border={(isViewed && date) ? 1 : 0.5}
         flex={1}
         height="100%"
         display="flex"
         flexDirection="column"
         onMouseEnter={handleHover}
         onMouseLeave={handleLeave}
         backgroundColor={isViewed && "lightgrey"}
         onClick={() => handleSelect(date)}
         onDoubleClick={reset}
      >
         <Typography
            variant="p"
            alignSelf="flex-end"
            marginRight={(isToday || isActive) ? 0.25 : 1}
            marginTop={(isToday || isActive) ? 0.25 : 1}
            fontStyle="italic"
            color={
               (isToday || isViewed || isActive)
                  ? "whitesmoke"
                  : "black"
            }
            fontWeight={
               (isToday || isViewed || isActive) ? "bold" : 500
            }
            border={(isToday || isActive) && "0px solid grey"}
            borderRadius={(isToday || isActive) && 5}
            padding={(isToday || isActive) && 1}
            sx={{
               textShadow:
                  (isToday || isViewed || isActive) &&
                  "grey -2px 3px",
               backgroundColor:
                  isToday ? "darksalmon" : isActive ? "lightblue" : ""
            }}
         >
            {date?.date}
         </Typography>
      </Box>
   )
}
