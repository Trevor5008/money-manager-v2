const prisma = new PrismaClient()
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(request){
    const payload = await request.json()
    const { category, year, month, date, account, itemType, amount } = payload.itemObj
    

    // Gather correct year id
    const yearData = await prisma.year.findFirst({
        where: {
            year
        },
        select: {
            id: true
        }
    })

    // Gather correct month id
    const monthData = await prisma.month.findFirst({
        where: {
            yearId: yearData.id,
            month
        },
        select: {
            id: true
        }
    })
    
    // Gather correct date id
    const dateData = await prisma.date.findFirst({
        where: {
            monthId: monthData.id,
            date
        },
        select: { id: true }
    })
    
    // TODO: Based on date id... add transaction (correct type)
    await prisma.expense.create({
        data: {
            amount,
            accountId: 1,
            category,
            isRecurring: false,
            dateId: dateData.id
        }
    })   
    // return NextResponse.json({dates})
}