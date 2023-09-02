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
   Switch
} from "@mui/material"

export default function AddItem({
   activeDate,
   handleDatePick
}) {
   const [itemType, setItemType] = useState("") // Expense, Income...
   const [dateString, setDateString] =
      useState("") // Used for input text
   const [isRecurring, setIsRecurring] =
      useState(false) // Flag for add'l settings
   const [periodicity, setPeriodicity] =
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

   function changePeriodicity(evt) {
      console.log(evt.target.value)
   }

   function postItem(evt) {
      evt.preventDefault()
      console.log("form submitted...")
   }

   // TODO: Fix on/off binding
   function handleSwitch(evt) {
      const selection = evt.target.checked
      setIsRecurring(selection)
   }

   return (
      <Stack
         id="add-item"
         paddingY={1}
         marginY={1}
         flex={1}
      >
         {/* Add Item Header */}
         <Box
            id="add-item-header"
            display="flex"
            sx={{
               marginBottom: 2,
               marginLeft: 2
            }}
            justifyContent="space-evenly"
         >
            {/* Category Select */}
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
            {/* Clear Button */}
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
         <form
            onSubmit={postItem}
            style={{
               display: "flex",
               flexDirection: "column",
               justifyContent: "space-between",
               flex: 1
            }}
         >
            {/* Date Settings */}
            <Box
               id="add-item-date"
               display="flex"
               alignItems="flex-start"
               justifyContent="space-between"
               maxHeight="10%"
               marginTop={1}
               border={1}
            >
               {/* Date Input Section */}
               <Stack
                  direction="row"
                  justifyContent="space-evenly"
                  flex={1}
                  alignItems="center"
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
               </Stack>
               {/* Recurrence Toggle */}
               <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-evenly"
                  flex={1}
               >
                  <Typography marginRight={1}>
                     {isRecurring
                        ? "Recurring"
                        : "One-time"}
                  </Typography>
                  <Switch
                     onChange={handleSwitch}
                  />
               </Stack>
            </Box>
            {/* Conditional Recurrence Details */}
            {/* TODO: Figure out how to disable non-relative re-occurrence dates */}
            {isRecurring && (
               <Stack border={1} maxHeight="20%">
                  {/* Periodicity Select */}
                  <Stack direction="row" justifyContent="space-evenly">
                     <InputLabel
                        sx={{
                           flex: 1,
                           marginLeft: 2
                        }}
                        htmlFor="periodicity-select"
                     >
                        Occurs:{" "}
                     </InputLabel>
                     <Select
                        id="periodicity-select"
                        value={""}
                        label="Occurs: "
                        onChange={
                           changePeriodicity
                        }
                        variant="standard"
                        sx={{
                           paddingLeft: 1,
                           flex: 1
                        }}
                     >
                        <MenuItem value="daily">
                           Daily
                        </MenuItem>
                        <MenuItem value="weekly">
                           Weekly
                        </MenuItem>
                        <MenuItem value="monthly">
                           Monthly
                        </MenuItem>
                        <MenuItem value="yearly">
                           Yearly
                        </MenuItem>
                        <MenuItem value="custom">
                           Custom
                        </MenuItem>
                     </Select>
                  </Stack>
                  {/* End Date Select */}
                  <Stack
                     direction="row"
                     flex={1}
                     alignItems="center"
                     justifyContent="space-evenly"
                  >
                     <InputLabel htmlFor="item-end-date-input">
                        End Date:{" "}
                     </InputLabel>
                     <Input
                        id="item-end-date-input"
                        type="date"
                        value={dateString}
                        onChange={handleDatePick}
                     />
                  </Stack>
               </Stack>
            )}
            {/* Form Submit */}
            <Box
               display="flex"
               justifyContent="center"
               alignItems="center"
               maxHeight="10%"
               border={1}
            >
               <Button
                  type="submit"
                  variant="filled"
               >
                  Add
               </Button>
            </Box>
         </form>
      </Stack>
   )
}
