"use client"
import { useState, useEffect } from "react"
import { Tabs, Tab, Box } from "@mui/material"

export default function BasicTabs({
   handleSelect
}) {
   const [value, setValue] = useState(0)

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
            <Tabs
               value={value}
               onChange={handleChange}
               aria-label="basic tabs example"
            >
               <Tab label="Transactions" />
               <Tab label="Accounts" />
               <Tab label="Add Item" />
            </Tabs>
         </Box>
      </Box>
   )
}
