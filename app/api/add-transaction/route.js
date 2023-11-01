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

// Helper method to retrieve account id
async function getAccountId(name) {
   const { id } = await prisma.account.findFirst({
      where: { name },
      select: { id: true }
   })
   return id
}

// Helper method to retrieve subcategory id
async function getSubCategoryId(subCat) {
   const { id } = await prisma.subCategory.findFirst({
      where: { name: subCat },
      select: { id: true }
   })
   return id
}
// Income adjustment
async function addAmount(amount, accountId) {
   await prisma.account.update({
      where: { id: accountId },
      data: {
         increment: {
            amount: amount
         }
      }
   })
}
// Expense adjustment
async function deductAmount(amount, accountId) {
   await prisma.account.update({
      where: { id: accountId },
      data: {
         decrement: {
            amount: amount
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
      account,
      subCategory
   } = payload.itemObj

   const dateId = await getDateId(year, month, date);
   const accountId = await getAccountId(account);
   const subCategoryId = await getSubCategoryId(subCategory)

   const data = {
      amount,
      isRecurring,
      dateId, 
      subCategoryId,
      accountId
   } 


   switch(itemType) {
      case 'expense':
         await deductAmount(amount, accountId)
         await prisma.expense.create({ data })
         break
      case 'income':
         await addAmount(amount, accountId)
         await prisma.income.create({ data })
         break
      default:
         console.log('Unrecognized transaction type')
   }
   
   // return NextResponse.json({dates})
}