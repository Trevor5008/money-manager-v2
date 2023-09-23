import {
   Box,
   Divider,
   Typography,
   Paper
} from "@mui/material"
import { weekDays } from "../utils/dateHelpers"
import Week from "../components/Week"

export default function Calendar({
   dates,
   currentMonth,
   currentYear,
   dataReady,
   numWeeks,
   handleSelect,
   activeDate,
   resetActive
}) {
   // Creates an array of ints representing # weeks in month
   const weeks = [
      ...Array(numWeeks).keys()
   ]
   return (
      <Paper
         elevation={3}
         sx={{
            width: "50vw",
            height: "80vh",
            paddingTop: 3,
            paddingX: 3,
            borderRadius: 5,
            marginTop: "5vh",
            marginLeft: 2
         }}
      >
         {/* Whole Calendar */}
         <Box
            display="flex"
            flexDirection="column"
            height="100%"
            width="100%"
         >
            {/* Month/Year Heading */}
            <Box
               display="flex"
               justifyContent="center"
            >
               <Typography
                  variant="h3"
                  marginBottom={2}
               >
                  {dataReady
                     ? `${currentMonth} ${currentYear}`
                     : "Loading..."}
               </Typography>
            </Box>
            {/* Days of Week Header Row */}
            <Box
               display="flex"
               justifyContent="space-between"
               marginBottom={1}
               width="100%"
            >
            {/* Array of string days of the week */}
               {weekDays &&
                  weekDays.map((day, idx) => {
                     return (
                        <Typography
                           key={idx}
                           variant="h5"
                           flex={1}
                           textAlign="center"
                        >
                           {day}
                        </Typography>
                     )
                  })}
            </Box>
            {/* Divides Calendar header from body */}
            <Divider
               sx={{ border: "1px solid grey" }}
            />
            {/* Calendar Grid */}
            <Box
               display="flex"
               flexDirection="column"
               border={1}
               width="100%"
               height="100%"
               marginBottom="3%"
            >
            {/* Array of date objs starting w/ first day of month */}
               {dates &&
                  // Maps over array of week # ints (ex. 5 rows of data)
                  weeks.map((week, idx) => {
                     // TODO: Need to pass range of dates for each week somehow...
                        return (
                           <Week
                              week={week}
                              key={idx}
                              id={`week ${
                                 idx + 1
                              }`}
                              dates={dates}
                              handleSelect={
                                 handleSelect
                              }
                              activeDate={
                                 activeDate
                              }
                              reset={resetActive}
                           />
                        )
                     })}
            </Box>
         </Box>
      </Paper>
   )
}
