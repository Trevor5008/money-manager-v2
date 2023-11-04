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

async function getAccountId(account) {
   const { id } = await prisma.account.findFirst({
      where: {
         name: account
      },
      select: {
         id: true
      }
   })

   return id
}

// Transfer out
async function deductAmount(amount, accountId) {
   await prisma.account.update({
      where: { id: accountId },
      data: {
         balance: {
            decrement: amount
         }
      }
   })
}
// Transfer in
async function addAmount(amount, accountId) {
   await prisma.account.update({
      where: { id: accountId },
      data: {
         balance: {
            increment: amount
         }
      }
   })
}

// TODO: Fix mapping of required fields
export async function POST(request) {
   const payload = await request.json()
   const {
      year,
      month,   
      date,
      itemType,
      isRecurring,
      amount,
      accountFrom,
      accountTo
   } = payload.transferObj

   const dateId = await getDateId(year, month, date);

   const accountFromId = await getAccountId(accountFrom)
   const accountToId = await getAccountId(accountTo)

   const data = {
      amount,
      isRecurring,
      dateId
   } 

   switch(itemType) {
      case 'transfer':
         data.accountFromId = accountFromId
         data.accountToId = accountToId
         await deductAmount(amount, accountFromId)
         await addAmount(amount, accountToId)
         await prisma.transfer.create({ data })
         break
      case 'debt-payment':
         data.accountFromId = accountFromId
         data.accountToId = accountToId
         await deductAmount(amount, accountFromId)
         await addAmount(amount, accountToId)
         await prisma.debtPayment.create({ data })
         break
      default:
         console.log('Unrecognized transfer type')
   }
   // TODO: Based on date id... add transaction (correct type)
   
   // return NextResponse.json({dates})
}