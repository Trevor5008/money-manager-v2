const prisma = new PrismaClient()
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(){
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    
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