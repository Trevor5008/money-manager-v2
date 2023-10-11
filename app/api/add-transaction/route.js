const prisma = new PrismaClient()
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

// Helper method to retrieve date id
async function getDateId(year, month, date) {
   // Retrieve year id
   const { id: yearId } = await prisma.year.findFirst({
      where: {
         year
      },
      select: {
         id: true
      }
   })
   // Retrieve month id
   const { id: monthId } = await prisma.month.findFirst(
      {
         where: {
            month,
            yearId
         },
         select: {
            id: true
         }
      }
   )
   // Retrieve date id  
   const { id } = await prisma.date.findFirst({
      where: {
         date,
         monthId
      },
      select: {
         id: true
      }
   })

   return id
}

export async function POST(request) {
   const payload = await request.json()
   const {
      category,
      year,
      month,
      date,
      account,
      itemType,
      amount
   } = payload.itemObj

   const dateId = await getDateId(year, month, date);

   // TODO: Based on date id... add transaction (correct type)
   await prisma.expense.create({
      data: {
         amount,
         accountId: 1,
         category,
         isRecurring: false,
         dateId
      }
   })
   // return NextResponse.json({dates})
}
