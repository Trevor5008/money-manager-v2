"use client"
import { useEffect, useState } from "react"
import {
   Stack,
   Divider,
   Typography,
   Box
} from "@mui/material"

export default function Accounts() {
   return (
      <Stack
         id="accounts"
         paddingTop={1}
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
                  <Typography variant="p">
                     Wells Fargo Checking
                  </Typography>
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
