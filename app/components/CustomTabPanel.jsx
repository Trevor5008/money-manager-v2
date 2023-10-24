"use client"
import { useState, useEffect } from "react"
import { Tabs, Tab, Box } from "@mui/material"

export default function BasicTabs({
   handleSelect
}) {
   const [value, setValue] = useState(0)

   // Value is passed up to page to determine Notes view
   const handleChange = (evt, newValue) => {
      setValue(newValue)
   }

   useEffect(() => {
      handleSelect(value)
   }, [value])

   return (
      <Box sx={{ marginLeft: 3 }}>
         <Box
            sx={{
               borderBottom: 1,
               borderColor: "divider"
            }}
         >
            {/* Tab values are indexed order, 1st = 0 */}
            <Tabs
               value={value}
               onChange={handleChange}
               aria-label="basic tabs example"
            >
               <Tab label="Accounts" />
               <Tab label="Transactions" />
            </Tabs>
         </Box>
      </Box>
   )
}
