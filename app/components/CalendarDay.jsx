import { Box, Typography } from "@mui/material"
import { useState } from "react"

export default function CalendarDay({ date }) {
   const [isViewed, setIsViewed] = useState(false)
   const isToday = date?.isToday

   function handleHover() {
      setIsViewed(true)
   }
   function handleLeave() {
      setIsViewed(false)
   }
   return (
      <Box
         border={isViewed && date ? 1 : 0.5}
         flex={1}
         height="100%"
         display="flex"
         flexDirection="column"
         onMouseEnter={handleHover}
         onMouseLeave={handleLeave}
         backgroundColor={isViewed && "lightgrey"}
      >
         <Typography
            variant="p"
            alignSelf="flex-end"
            marginRight={isToday ? 0.25 : 1}
            marginTop={isToday ? 0.25 : 1}
            fontStyle="italic"
            color={
               isToday || isViewed
                  ? "whitesmoke"
                  : "black"
            }
            fontWeight={
               isToday || isViewed ? "bold" : 500
            }
            border={isToday && "0px solid grey"}
            borderRadius={isToday && 5}
            padding={isToday && 1}
            sx={{
               textShadow:
                  (isToday || isViewed) &&
                  "grey -2px 3px",
               backgroundColor:
                  isToday && "darkgrey"
            }}
         >
            {date?.date}
         </Typography>
      </Box>
   )
}
