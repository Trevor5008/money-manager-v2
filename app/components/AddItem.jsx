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
   Input
} from "@mui/material"

export default function AddItem({ activeDate, handleDatePick }) {
   const [itemType, setItemType] = useState("")
   const [dateString, setDateString] =
      useState("")

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
               {/* Form Input rows */}
               <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-evenly"
                  flex={1}
               >
                  <InputLabel htmlFor="date">
                     Date:{" "}
                  </InputLabel>
                  <Input
                     id="date"
                     type="date"
                     value={dateString}
                     onChange={handleDatePick}
                  />
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
