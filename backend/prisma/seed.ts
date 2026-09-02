import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { generateUserData } from "../generate-data";

const prisma = new PrismaClient()
async function main() {
    const length = faker.number.int({min: 2, max: 4});
    for (let i = 0; i < length; i++)
    {
        await prisma.user.create({
            data: generateUserData()
        })
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch (async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })