import { Box, Typography } from "@mui/material"

export default function CalendarDay({ date }) {
   return (
      <Box
         border={1}
         flex={1}
         height={100}
         display="flex"
         flexDirection="column"
      >
         <Typography
            variant="p"
            alignSelf="flex-end"
            marginRight={1}
            marginTop={.5}
            fontStyle="italic"
         >
            {date > 0 && date}
         </Typography>
      </Box>
   )
}
