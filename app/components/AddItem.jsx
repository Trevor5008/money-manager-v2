"use client"
import { useState, useEffect } from "react"
import {
   Stack,
   Box,
   Typography,
   Divider,
   FormControl,
   InputLabel,
   Select,
   MenuItem,
   Button,
   Input,
   Switch,
   FormControlLabel
} from "@mui/material"

export default function AddItem({
   activeDate,
   handleDatePick
}) {
   const [itemType, setItemType] = useState("") // Expense, Income...
   const [dateString, setDateString] =
      useState("") // Used for input text
   const [isRecurring, setIsRecurring] = useState(false) // Flag for add'l settings

   useEffect(() => {
      const year = activeDate?.year
      let month = activeDate?.month
      let date = activeDate?.date

      date =
         date / 10 < 1 ? `0${date}` : `${date}`
      month =
         month / 10 < 1 ? `0${month}` : `${month}`

      setDateString(
         `${year.toString()}-${month}-${date}`
      )
   }, [activeDate])

   function handleChange(evt) {
      setItemType(evt.target.value)
   }

   function postItem(evt) {}

   // TODO: Fix on/off binding
   function handleSwitch(evt) {
      console.log(evt.target.value)
   }

   return (
      <Stack
         id="add-item"
         paddingY={1}
         marginY={1}
      >
         {/* Add Item Header */}
         <Box
            id="add-item-header"
            display="flex"
            sx={{
               marginBottom: 2,
               marginLeft: 2
            }}
         >
            <Box
               display="flex"
               flex={1}
               paddingLeft={1}
            >
               <InputLabel
                  sx={{
                     alignSelf: "center",
                     flex: 1
                  }}
               >
                  Category:{" "}
               </InputLabel>
               <FormControl
                  sx={{ marginLeft: 1, flex: 1 }}
               >
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={itemType}
                     label="Type"
                     onChange={handleChange}
                     variant="standard"
                     sx={{
                        paddingLeft: 1
                     }}
                  >
                     <MenuItem value="expense">
                        Expense
                     </MenuItem>
                     <MenuItem value="income">
                        Income
                     </MenuItem>
                     <MenuItem value="transfer">
                        Transfer
                     </MenuItem>
                  </Select>
               </FormControl>
            </Box>
            <Box
               flex={1}
               display="flex"
               justifyContent="flex-end"
               paddingRight={1}
            >
               <Button variant="standard">
                  Clear
               </Button>
            </Box>
         </Box>
         <Divider />
         {/* Add Item Form */}
         <form onSubmit={postItem}>
            <Stack
               id="add-item-form"
               justifyContent="space-between"
            >
               {/* Form Inputs */}
               {/* Date Settings */}
               <Box
                  id="add-item-date"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-evenly"
                  flex={1}
               >
                  <InputLabel htmlFor="item-date-input">
                     Date:{" "}
                  </InputLabel>
                  <Input
                     id="item-date-input"
                     type="date"
                     value={dateString}
                     onChange={handleDatePick}
                  />
                  <Stack direction="row" alignItems="center">
                     <Typography marginRight={1}>One-time</Typography>
                     <Switch onChange={handleSwitch}/>
                     <Typography marginLeft={1}>Recurring</Typography>
                  </Stack>
               </Box>
               {/* Form Submit */}
               <Box
                  flex={1}
                  display="flex"
                  justifyContent="center"
               >
                  <Button
                     type="submit"
                     variant="filled"
                  >
                     Add
                  </Button>
               </Box>
            </Stack>
         </form>
      </Stack>
   )
}
