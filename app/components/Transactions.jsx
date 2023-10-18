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
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined"
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined"

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
         {/* Header */}
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
         {/* Body */}
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
                     <RemoveRedEyeOutlinedIcon
                        sx={{
                           position: "absolute",
                           right: "20%"
                        }}
                        onClick={() =>
                           handleShowItems(
                              "expenses"
                           )
                        }
                     />
                  ) : (
                     <VisibilityOffOutlinedIcon
                        sx={{
                           position: "absolute",
                           right: "20%"
                        }}
                        onClick={() =>
                           handleHideItems(
                              "expenses"
                           )
                        }
                     />
                  )}
                  <ControlPointIcon
                     onClick={() =>
                        handleShowAddForm(
                           "expenses"
                        )
                     }
                     sx={{
                        position: "absolute",
                        right: "25%"
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
               <Box
                  display="flex"
                  alignItems="center"
               >
                  <Typography variant="h6">
                     Income
                  </Typography>
                  {!showIncomeItems ? (
                     <RemoveRedEyeOutlinedIcon
                        sx={{
                           position: "absolute",
                           right: "20%"
                        }}
                        onClick={() =>
                           handleShowItems(
                              "income"
                           )
                        }
                     />
                  ) : (
                     <VisibilityOffOutlinedIcon
                        sx={{
                           position: "absolute",
                           right: "20%"
                        }}
                        onClick={() =>
                           handleHideItems(
                              "income"
                           )
                        }
                     />
                  )}
                  <ControlPointIcon
                     onClick={() =>
                        handleShowAddForm(
                           "income"
                        )
                     }
                     sx={{
                        position: "absolute",
                        right: "25%"
                     }}
                  />
               </Box>
               <Divider />
               {showIncomeItems ? (
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
               ) : null}
            </Stack>
            {/* Transfers */}
            <Stack
               id="transfers"
               marginY={3}
               marginX={2}
            >
               <Box
                  display="flex"
                  alignItems="center"
               >
                  <Typography variant="h6">
                     Transfers
                  </Typography>
                  {!showTransferItems ? (
                     <RemoveRedEyeOutlinedIcon
                        sx={{
                           position: "absolute",
                           right: "20%"
                        }}
                        onClick={() =>
                           handleShowItems(
                              "transfers"
                           )
                        }
                     />
                  ) : (
                     <RemoveRedEyeOutlinedIcon
                        sx={{
                           position: "absolute",
                           right: "20%"
                        }}
                        onClick={() =>
                           handleHideItems(
                              "transfers"
                           )
                        }
                     />
                  )}
                  <ControlPointIcon
                     onClick={() =>
                        handleShowAddForm(
                           "transfers"
                        )
                     }
                     sx={{
                        position: "absolute",
                        right: "25%"
                     }}
                  />
               </Box>
               <Divider />
               {showTransferItems ? (
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
               ) : null}
            </Stack>
            {/* Debt Payments */}
            <Stack
               id="income"
               marginY={3}
               marginX={2}
            >
               <Box
                  display="flex"
                  alignItems="center"
               >
                  <Typography variant="h6">
                     Debt Payments
                  </Typography>
                  {!showDebtPayments ? (
                     <RemoveRedEyeOutlinedIcon
                        sx={{
                           position: "absolute",
                           right: "20%"
                        }}
                        onClick={() =>
                           handleShowItems(
                              "debt-payments"
                           )
                        }
                     />
                  ) : (
                     <VisibilityOffOutlinedIcon
                        sx={{
                           position: "absolute",
                           right: "20%"
                        }}
                        onClick={() =>
                           handleHideItems(
                              "debt-payments"
                           )
                        }
                     />
                  )}
                  <ControlPointIcon
                     onClick={() =>
                        handleShowAddForm(
                           "debt-payments"
                        )
                     }
                     sx={{
                        position: "absolute",
                        right: "25%"
                     }}
                  />
               </Box>
               <Divider />
               {showDebtPayments ? (
                  <Stack
                     id="debt-pay-items"
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
         </Stack>
      </Stack>
   ) : null
}
