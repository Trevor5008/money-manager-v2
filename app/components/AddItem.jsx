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
   currentMonth,
   currentYear,
   transactionType,
   handleHideForm
}) {
   const [itemType, setItemType] = useState(
      transactionType
   ) // Expense, Income...
   const [dateString, setDateString] =
      useState("") // Used for input text
   const [isRecurring, setIsRecurring] =
      useState(false) // Flag for add'l settings
   const [periodicity, setPeriodicity] =
      useState("")
   const [categories, setCategories] = useState(
      []
   )
   const [subCategories, setSubCategories] =
      useState([])
   const [account, setAccount] = useState("")
   const [category, setCategory] = useState("")
   const [subCategory, setSubCategory] = useState("")
   const [itemAmount, setItemAmount] =
      useState("")
   const [dataReady, setDataReady] =
      useState(false)

   useEffect(() => {
      setActiveDate()
      loadCategories()
   }, [activeDate])

   async function loadCategories() {
      await fetch("../../api/get-categories")
         .then((res) => res.json())
         .then((res) => {
            const cats = []
            res.categories.map((cat) => {
               cats.push(cat.name)
            })
            setCategories(cats)
         })
   }

   function setActiveDate() {
      let date = activeDate?.date
      let month = currentMonth + 1

      date =
         date / 10 < 1 ? `0${date}` : `${date}`
      month =
         month / 10 < 1 ? `0${month}` : `${month}`

      setDateString(
         `${currentYear.toString()}-${month}-${date}`
      )
   }

   // Expense/Income/Transfer
   function handleTypeChange(evt) {
      setItemType(evt.target.value)
   }

   function changeDate(evt) {
      setDateString(evt.target.value)
   }

   // TODO: Need to hook up
   function changePeriodicity(evt) {
      console.log(evt.target.value)
   }

   function handleRecurrence(evt) {
      const selection = evt.target.checked
      setIsRecurring(selection)
   }

   function accountSelect(evt) {
      const accountSelected = evt.target.value
      setAccount(accountSelected)
   }

   function categorySelect(evt) {
      const categorySelected = evt.target.value
      setCategory(categorySelected)
      loadSubCategories(categorySelected)
   }

   function subCategorySelect(evt) {
      const subCategorySelected = evt.target.value
      setSubCategory(subCategorySelected)
   }

   async function loadSubCategories(category) {
      await fetch(
         "../../api/get-subcategories/" + category
      )
         .then((res) => res.json())
         .then((res) => {
            console.log(res.subCats)
            setSubCategories(res.subCats)
         })
   }

   function handleAmountChange(evt) {
      const inputValue = parseFloat(
         evt.target.value
      )
      setItemAmount(inputValue)
   }

   function clearItemFlds() {
      setItemType("")
      setIsRecurring(false)
      setAccount("")
      setCategory("")
      setItemAmount("")
      setActiveDate()
   }

   async function postItem(evt) {
      evt.preventDefault()
      // TODO: Add to schema
      //  * acccount name (string)
      //  * account category (checking/savings/credit card/loan)

      /* {
            {amount: decimal,
            accountId,
            category: string,
            (subcategory?),
            isRecurring: boolean,
            dateId
         }

         Locate corresponding account
         Locate corresponding date

      */
      const dateStrArr = dateString.split("-")
      const year = dateStrArr[0]
      const month = dateStrArr[1]
      const date = dateStrArr[2]

      const itemObj = {
         month: parseInt(month),
         year: parseInt(year),
         date: parseInt(date),
         isRecurring,
         itemType,
         amount: itemAmount,
         category
      }

      await fetch(`../api/add-transaction`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ itemObj })
      })
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
               marginX: 2
            }}
            justifyContent="space-between"
         >
            {/* Back button */}
            <Button
               onClick={handleHideForm}
               flex={1}
            >
               Back
            </Button>
            {/* Type Select */}
            <Box
               display="flex"
               flex={1.5}
               justifyContent="center"
               alignItems="center"
            >
               <InputLabel
                  sx={{
                     marginRight: 1
                  }}
               >
                  Type:{" "}
               </InputLabel>
               <FormControl
                  sx={{
                     marginLeft: 1
                  }}
               >
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={itemType}
                     label="Type"
                     onChange={handleTypeChange}
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
                     <MenuItem value="debt-payment">
                        Debt Payment
                     </MenuItem>
                  </Select>
               </FormControl>
            </Box>
            {/* Clear Button */}
            <Button
               onClick={clearItemFlds}
               sx={{ marginLeft: 6 }}
            >
               Clear
            </Button>
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
                        onChange={changeDate}
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
                        onChange={
                           handleRecurrence
                        }
                        checked={isRecurring}
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
               {/* Amount */}
               <Box
                  display="flex"
                  flex={1}
                  paddingX={1}
                  marginY={1}
                  justifyContent="space-between"
               >
                  <InputLabel htmlFor="amount-input-fld">
                     Amount:{" "}
                  </InputLabel>
                  <Input
                     id="amount-input-fld"
                     type="number"
                     value={itemAmount}
                     inputProps={{
                        min: 0.0,
                        step: 0.01
                     }}
                     onChange={handleAmountChange}
                     startAdornment={
                        <InputAdornment position="start">
                           $
                        </InputAdornment>
                     }
                  />
               </Box>
               {/* Account Select */}
               <Box
                  display="flex"
                  flex={1}
                  paddingX={1}
                  marginY={1}
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
               {/* Category Select */}
               <Box
                  display="flex"
                  justifyContent="space-between"
                  paddingX={1}
                  marginY={1}
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
                     sx={{
                        marginLeft: 1,
                        flex: 1
                     }}
                  >
                     <Select
                        id="category-select"
                        value={category}
                        label="Category"
                        onChange={categorySelect}
                        variant="standard"
                        sx={{
                           paddingX: 1
                        }}
                     >
                        {categories.map(
                           (category) => {
                              return (
                                 <MenuItem
                                    value={category.toLowerCase()}
                                 >
                                    {category}
                                 </MenuItem>
                              )
                           }
                        )}
                     </Select>
                  </FormControl>
               </Box>
               {/* SubCategory Select */}
               <Box
                  display="flex"
                  justifyContent="space-between"
                  paddingX={1}
                  marginY={1}
               >
                  <InputLabel
                     sx={{
                        alignSelf: "center",
                        flex: 1
                     }}
                  >
                     Subcategory:{" "}
                  </InputLabel>
                  <FormControl
                     sx={{
                        marginLeft: 1,
                        flex: 1
                     }}
                  >
                     <Select
                        id="subcategory-select"
                        value={subCategory}
                        label="Subcategory"
                        onChange={subCategorySelect}
                        variant="standard"
                        sx={{
                           paddingX: 1
                        }}
                     >
                        {subCategories.map(
                           (category) => {
                              console.log(
                                 category
                              )
                              return (
                                 <MenuItem
                                    value={category.toLowerCase()}
                                 >
                                    {category}
                                 </MenuItem>
                              )
                           }
                        )}
                     </Select>
                  </FormControl>
               </Box>
            </Stack>
            {/* Form Submit */}
            <Stack>
               <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
               >
                  {/* Conditionally render item type */}
                  <Button
                     type="submit"
                     variant="filled"
                  >
                     Add {itemType}
                  </Button>
               </Box>
            </Stack>
         </form>
      </Stack>
   )
}
