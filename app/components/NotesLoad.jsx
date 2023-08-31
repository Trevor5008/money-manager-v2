import { Skeleton, Stack } from "@mui/material"

export default function NotesLoad() {
   return (
      <Stack
         spacing={4}
         padding={4}
      >
         <Skeleton
            variant="rectangular"
            height={50}
         />
         <Skeleton
            variant="rounded"
            height={200}
         />
         <Skeleton
            variant="rounded"
            height={200}
         />
      </Stack>
   )
}
