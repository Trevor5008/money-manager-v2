const prisma = new PrismaClient()
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
    const { type } = params
    const categories = await prisma.category.findMany({
        where: { type }
    })

    return NextResponse.json({ categories })
}