import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


import { seed_user } from './data/users'
// import { seed_examples_a } from './data/example_a'
// import { seed_examples_b } from './data/example_b'


async function main() {

    // //users
    const user = await seed_user()
   
    // //example a
    // await (await seed_examples_a()).map(async (data) => await prisma.exampleA.create({data: data}))
    // console.log('SEEDED EXAMPLE A')

    // //example a
    // await (await seed_examples_b()).map(async (data) => await prisma.exampleB.create({data: data}))
    // console.log('SEEDED EXAMPLE B')

    console.log('FINISHED SEEDING DB')

}

main()
    .catch((e) => { console.error(e); process.exit(1) })
    .finally(async () => { await prisma.$disconnect() })
