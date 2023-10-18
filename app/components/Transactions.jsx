"use client"
import { useEffect, useState } from "react"
import {
   Box,
   Typography,
   Divider,
   Stack
} from "@mui/material"
import {
   parseSuffix,
   getLongName
} from "../utils/dateHelpers"
import AddItem from "./AddItem"
import ControlPointIcon from "@mui/icons-material/ControlPoint"
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

// TODO: Create Add Item button to render transaction form conditionally
export default function Transactions({
   activeDate,
   activeDateId,
   todayId,
   currentMonth,
   currentYear
}) {
   const [heading, setHeading] = useState("")
   const [isReady, setIsReady] = useState(false)
   // AddItem form display
   const [showAddForm, setShowAddForm] =
      useState(false)
   const [showExpenseItems, setShowExpenseItems] =
      useState(false)
   const [showIncomeItems, setShowIncomeItems] =
      useState(false)
   const [
      showTransferItems,
      setShowTransferItems
   ] = useState(false)
   const [showDebtPayments, setShowDebtPayments] =
      useState(false)
   // Expense, Income, Transfer, Debt Payment
   const [transactionType, setTransactionType] =
      useState("")

   useEffect(() => {
      if (activeDateId && todayId) {
         if (activeDateId === todayId) {
            setHeading("Today")
         } else {
            let title = getLongName(
               activeDate?.day
            )
            title +=
               " " +
               activeDate.date +
               parseSuffix(activeDate)
            setHeading(title)
         }
      }
      setIsReady(true)
   }, [activeDate])

   function handleShowItems(type) {
      switch (type) {
         case "expenses":
            setShowExpenseItems(true)
            break
         case "income":
            setShowIncomeItems(true)
            break
         case "transfers":
            setShowTransferItems(true)
            break
         case "debt-payments":
            setShowDebtPayments(true)
            break
      }
   }
   function handleHideItems(type) {
      switch (type) {
         case "expenses":
            setShowExpenseItems(false)
            break
         case "income":
            setShowIncomeItems(false)
            break
         case "transfers":
            setShowTransferItems(false)
            break
         case "debt-payments":
            setShowDebtPayments(false)
            break
      }
   }

   function handleShowAddForm(type) {
      setTransactionType(type)
      setShowAddForm(true)
   }

   function handleHideAddForm() {
      setTransactionType("")
      setShowAddForm(false)
   }

   return isReady && showAddForm ? (
      <AddItem
         activeDate={activeDate}
         currentMonth={currentMonth}
         currentYear={currentYear}
         transactionType={transactionType}
         handleHideForm={handleHideAddForm}
      />
   ) : isReady ? (
      <Stack
         id="notes"
         paddingTop={1}
         flex={1}
      >
         {/* Notes Header */}
         <Box
            id="date-header"
            padding={1}
         >
            <Typography
               variant="h4"
               paddingLeft={1}
            >
               {heading}
            </Typography>
         </Box>
         <Divider />
         {/* Notes Body */}
         <Stack
            id="items-section"
            paddingX={2}
         >
            {/* Expenses */}
            <Stack
               id="expenses"
               marginY={3}
               marginX={2}
            >
               <Box
                  display="flex"
                  alignItems="center"
               >
                  <Typography variant="h6">
                     Expenses
                  </Typography>
                  {!showExpenseItems ? (
                     <VisibilityOffOutlinedIcon
                        sx={{
                           marginLeft: 10
                        }}
                        onClick={() =>
                           handleShowItems(
                              "expenses"
                           )
                        }
                     />
                  ) : (
                     <RemoveRedEyeOutlinedIcon
                        sx={{
                           marginLeft: 10
                        }}
                        onClick={() =>
                           handleHideItems(
                              "expenses"
                           )
                        }
                     />
                  )}
                     <ControlPointIcon
                        onClick={() => handleShowAddForm("expenses")}
                        sx={{
                           marginLeft: 5
                        }}
                     />
               </Box>
               <Divider />
               {showExpenseItems ? (
                  <Stack
                     id="expense-items"
                     marginTop={2}
                     marginLeft={2}
                  >
                     <Typography
                        variant="body1"
                        fontStyle="italic"
                        color="grey"
                     >
                        No items today
                     </Typography>
                  </Stack>
               ) : null}
            </Stack>
            {/* Income */}
            <Stack
               id="income"
               marginY={3}
               marginX={2}
            >
               <Typography variant="h6">
                  Income
               </Typography>
               <Divider />
               <Stack
                  id="income-items"
                  marginTop={2}
                  marginLeft={2}
               >
                  <Typography
                     variant="body1"
                     fontStyle="italic"
                     color="grey"
                  >
                     No items today
                  </Typography>
               </Stack>
            </Stack>
            {/* Transfers */}
            <Stack
               id="expenses"
               marginY={3}
               marginX={2}
            >
               <Typography variant="h6">
                  Transfers
               </Typography>
               <Divider />
               <Stack
                  id="transfer-items"
                  marginTop={2}
                  marginLeft={2}
               >
                  <Typography
                     variant="body1"
                     fontStyle="italic"
                     color="grey"
                  >
                     No items today
                  </Typography>
               </Stack>
            </Stack>
            {/* Debt Payments */}
            <Stack
               id="debt-payments"
               marginY={3}
               marginX={2}
            >
               <Typography variant="h6">
                  Debt Payments
               </Typography>
               <Divider />
               <Stack
                  id="debt-payment-items"
                  marginTop={2}
                  marginLeft={2}
               >
                  <Typography
                     variant="body1"
                     fontStyle="italic"
                     color="grey"
                  >
                     No items today
                  </Typography>
               </Stack>
            </Stack>
         </Stack>
      </Stack>
   ) : null
}
