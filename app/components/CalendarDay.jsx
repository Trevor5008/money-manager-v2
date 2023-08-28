import { Box, Typography } from "@mui/material"
import shadows from "@mui/material/styles/shadows"

export default function CalendarDay({ date }) {
    const isToday = date?.isToday
   return (
      <Box
         border={date ? 1 : .5}
         flex={1}
         height={100}
         display="flex"
         flexDirection="column"
      >
         <Typography
            variant="p"
            alignSelf="flex-end"
            marginRight={isToday ? .25 : 1}
            marginTop={.5}
            fontStyle="italic"
            color={isToday ? "whitesmoke" : "black"}
            fontWeight={isToday && "bold"}
            border={isToday && "1px solid grey"}
            borderRadius={isToday && 4}
            padding={isToday && .9}
            sx={{
                textShadow: isToday && "grey -2px 3px",
                backgroundColor: isToday && "darkgrey"
            }}
         >
            {date?.date}
         </Typography>
      </Box>
   )
}
