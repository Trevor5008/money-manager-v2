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
import ItemForm from "./ItemForm"

export default function AddItem({
   activeDate,
   currentMonth,
   currentYear,
   transactionType,
   handleHideForm
}) {
   const [itemType, setItemType] = useState(
      transactionType
   )
   const [isTransfer, setIsTransfer] = useState(
      transactionType === "transfer" ||
         transactionType === "debt-payment"
   )
   // Expense, Income...
   const [dateString, setDateString] =
      useState("") // Used for input text
   const [isRecurring, setIsRecurring] =
      useState(false) // Flag for add'l settings
   const [periodicity, setPeriodicity] =
      useState("")
   // Expense, Income items
   const [account, setAccount] = useState("")
   const [categories, setCategories] = useState(
      []
   )
   const [subCategories, setSubCategories] =
      useState([])
   const [category, setCategory] = useState("")
   const [subCategory, setSubCategory] =
      useState("")
   const [itemAmount, setItemAmount] =
      useState("")
   // Transfer, Debt Payment items
   const [accountFrom, setAccountFrom] =
      useState("")
   const [accountTo, setAccountTo] = useState("")
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

   // Item Handlers
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

   // Transfer Handlers

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
         account,
         subCategory
      }

      /*
       const transferObj = {
         month: parseInt(month),
         year: parseInt(year),
         date: parseInt(date),
         isRecurring,
         accountFrom,
         accountTo,
         amount: itemAmount,
         itemType
       }
      */

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
         {!isTransfer ? (
            <ItemForm
               postItem={postItem}
               dateString={dateString}
               changeDate={changeDate}
               changePeriodicity={
                  changePeriodicity
               }
               isRecurring={isRecurring}
               handleRecurrence={handleRecurrence}
               itemAmount={itemAmount}
               handleAmountChange={handleAmountChange}
               account={account}
               accountSelect={accountSelect}
               category={category}
               categorySelect={categorySelect}
               subCategory={subCategory}
               subCategorySelect={subCategorySelect}
               categories={categories}
               subCategories={subCategories}
               itemType={itemType}
            />
         ) : null}
      </Stack>
   )
}
