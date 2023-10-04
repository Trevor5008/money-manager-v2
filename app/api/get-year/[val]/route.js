const prisma = new PrismaClient()
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(request, { params }){
    const monthVal = params.val.split('-')
    const month = parseInt(monthVal[0])
    const year = parseInt(monthVal[1])

    const dates = await prisma.year.findFirst({
        where: {
            year
        },
        select: {
            id: true,
            year: true,
            months: {
                where: { month },
                select: {
                    id: true,
                    month: true,
                    dates: true
                }
            }
        }
    })
    return NextResponse.json({dates})
}