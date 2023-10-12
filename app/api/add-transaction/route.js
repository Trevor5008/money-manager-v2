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
      year,
      month,
      date,
      itemType,
      isRecurring,
      amount
   } = payload.itemObj

   const dateId = await getDateId(year, month, date);

   const data = {
      amount,
      isRecurring,
      dateId
   } 

   switch(itemType) {
      case 'expense':
         data.accountId = 1
         data.category = category
         await prisma.expense.create({ data })
         break
      case 'income':
         data.accountId = 1
         data.category = category
         await prisma.income.create({ data })
         break
      case 'transfer':
         data.accountFromId = 1
         data.accountToId = 2
         await prisma.transfer.create({ data })
         break
      case 'debt-payment':
         data.accountFromId = 1
         data.accountToId = 2
         await prisma.debtPayment.create({ data })
         break
      default:
         console.log('Unrecognized transaction type')
   }
   // TODO: Based on date id... add transaction (correct type)
   
   // return NextResponse.json({dates})
}