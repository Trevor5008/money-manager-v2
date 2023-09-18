const { PrismaClient } = require('@prisma/client')
const { generateMonthDates } = require('../app/utils/dateHelpers')

const prisma = new PrismaClient()

async function main() {
    // Generate date objects from 2015 - 2040
    const today = new Date();
    const startYear = 2015;
    const endYear = 2040;

    for (let year = startYear; year < endYear; year++) {
        const monthsData = [];

        for (let month = 0; month < 12; month++) {
            monthsData.push({
                month,
                dates: {
                    create: generateMonthDates(month, year, today),
                },
            });
        }

        await prisma.year.create({
            data: {
                year,
                months: {
                    create: monthsData,
                },
            },
        });
    }
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })