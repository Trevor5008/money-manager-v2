const prisma = new PrismaClient()
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET() {
    const accountData = await prisma.account.findMany({})

    return NextResponse.json({ accountData })
}