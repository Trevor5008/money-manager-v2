"use client"
import { useState } from "react"
import {
   Stack,
   Box,
   Typography,
   Divider,
   FormControl,
   InputLabel,
   Select,
   MenuItem,
   Button
} from "@mui/material"

export default function AddItem() {
   const [itemType, setItemType] = useState("")

   function handleChange(evt) {
      setItemType(evt.target.value)
   }

   return (
      <Stack
         id="add-item"
         paddingY={1}
         marginY={1}
      >
         <Box
            id="add-item-header"
            display="flex"
            sx={{
               marginBottom: 2,
               marginLeft: 2
            }}
         >
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
                  Category:{" "}
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
            <Box flex={1} display="flex" justifyContent="flex-end" paddingRight={1}>
               <Button variant="standard">
                  Cancel
               </Button>
            </Box>
         </Box>
         <Divider />
      </Stack>
   )
}
