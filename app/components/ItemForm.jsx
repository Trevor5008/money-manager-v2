"use client"
import { useState, useEffect } from "react"
import {
   Stack,
   Box,
   Typography,
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

export default function ItemForm({
   postItem,
   dateString,
   changeDate,
   changePeriodicity,
   isRecurring,
   handleRecurrence,
   itemAmount,
   handleAmountChange,
   account,
   accountSelect,
   category,
   categorySelect,
   subCategory,
   subCategorySelect,
   categories,
   subCategories,
   itemType
}) {
   return (
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
                     onChange={handleRecurrence}
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
                        onChange={handleDatePick}
                     />
                  </Stack>
               </Stack>
            )}
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
                     <MenuItem value="wells-fargo">
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
                           console.log(category)
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
   )
}
