const prisma = new PrismaClient()
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
    const { category: name } = params

    const catId = await prisma.category.findFirst({
        where: { name },
        select: { id: true }
    })

    const { id: categoryId } = catId
    const subCategories = await prisma.subCategory.findMany({
        where: { categoryId },
        select: { name: true }
    })
    console.log(subCategories)
}