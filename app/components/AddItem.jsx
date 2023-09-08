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
   ListSubheader,
   InputAdornment
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
   const [account, setAccount] = useState("")

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

   function accountSelect(evt) {
      const accountSelected = evt.target.value
      setAccount(accountSelected)
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
            {/* Type Select */}
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
                  Type:{" "}
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
            {/* Form Sections */}
            <Stack>
               {/* Date Settings */}
               <Box
                  id="add-item-date"
                  display="flex"
                  alignItems="space-between"
                  justifyContent="space-between"
                  paddingX={2}
                  marginTop={2}
               >
                  {/* Date Input Section */}
                  <Stack
                     direction="row"
                     justifyContent="space-between"
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
                  <Stack marginTop={2}>
                     {/* Periodicity Select */}
                     <Stack
                        direction="row"
                        alignItems="flex-start"
                        justifyContent="space-between"
                        paddingX={2}
                     >
                        <InputLabel
                           sx={{
                              flex: 1
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
                        justifyContent="space-between"
                        marginTop={1}
                        paddingX={2}
                     >
                        <InputLabel htmlFor="item-end-date-input">
                           End Date:{" "}
                        </InputLabel>
                        <Input
                           id="item-end-date-input"
                           type="date"
                           value={dateString}
                           onChange={
                              handleDatePick
                           }
                        />
                     </Stack>
                  </Stack>
               )}
               {/* Account */}
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
                     Account:{" "}
                  </InputLabel>
                  <FormControl
                     sx={{
                        marginLeft: 1,
                        flex: 1
                     }}
                  >
                     <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={account}
                        label="Type"
                        onChange={accountSelect}
                        variant="standard"
                        sx={{
                           paddingLeft: 1
                        }}
                     >
                        <ListSubheader>
                           Payment Accounts
                        </ListSubheader>
                        <MenuItem value="wells-fargo-checking">
                           Wells Fargo Checking
                        </MenuItem>
                        <MenuItem value="pnc-wallet">
                           PNC Wallet
                        </MenuItem>
                        <ListSubheader>
                           Credit Cards
                        </ListSubheader>
                        <MenuItem value="chase-amazon">
                           Chase Amazon
                        </MenuItem>
                        <MenuItem value="chase-freedom">
                           Chase Freedom
                        </MenuItem>
                        <MenuItem value="pnc-core">
                           PNC Core
                        </MenuItem>
                     </Select>
                  </FormControl>
               </Box>
               {/* Amount */}
               {/* TODO: Add Structure for Amount Input */}
               <Box
                  display="flex"
                  flex={1}
                  paddingLeft={1}
                  justifyContent="space-between"
               >
                  <InputLabel htmlFor="amount-input-fld">
                     Amount:{" "}
                  </InputLabel>
                  <Input
                     id="amount-input-fld"
                     type="number"
                     inputProps={{ min: 0 }}
                     startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  />
               </Box>
            </Stack>
            {/* Form Submit */}
            <Stack>
               <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
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
