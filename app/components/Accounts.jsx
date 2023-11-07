"use client"
import { useState, useEffect } from "react"
import {
   Stack,
   Divider,
   Typography,
   Box
} from "@mui/material"

export default function Accounts() {
   const [accountsData, setAccountsData] =
      useState([])

   useEffect(() => {
      fetch("api/get-account-data")
         .then((data) => data.json())
         .then((data) =>
            setAccountsData(data.accountData)
         )
   }, [])
   return (
      <Stack
         id="accounts"
         paddingTop={1}
         flex={1}
      >
         {/* Accounts Header */}
         <Box
            id="accounts-header"
            padding={1}
         >
            <Typography
               variant="h4"
               paddingLeft={1}
            >
               Accounts
            </Typography>
         </Box>
         <Divider />
         {/* Accounts Body */}
         <Stack
            id="accounts-section"
            paddingX={2}
         >
            <Stack
               id="payment-accounts"
               marginY={3}
               marginX={2}
            >
               <Typography variant="h6">
                  Payment Accounts
               </Typography>
               <Divider />
               <Stack
                  id="payment-accounts-list"
                  marginTop={2}
                  marginLeft={2}
               >
                  {accountsData &&
                     accountsData.map((acct) => {
                        return (
                           <Box display="flex" justifyContent='space-between'>
                              <Typography variant="p">
                                 {acct.name}
                              </Typography>
                              <Typography variant="p">
                                 {acct.balance}
                              </Typography>
                           </Box>
                        )
                     })}
               </Stack>
            </Stack>
            <Stack
               id="credit-cards"
               marginY={3}
               marginX={2}
            >
               <Typography variant="h6">
                  Credit Cards
               </Typography>
               <Divider />
               <Stack
                  id="credit-cards-list"
                  marginTop={2}
                  marginLeft={2}
               >
                  <Typography variant="p">
                     Chase Amazon
                  </Typography>
               </Stack>
            </Stack>
         </Stack>
      </Stack>
   )
}
