import { Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from "@next-auth/prisma-adapter"

const prisma = new PrismaClient()
const prisma_auth = PrismaAdapter(prisma)


export const seed_user = async () => {
    
    const admin_user = await prisma_auth.createUser({
        name: 'Admin',
        email: 'an email address',
        emailVerified: null,
        image:'/default-icon.jpg',
        role: 'admin',
    })

    console.log('SEEDED ADMIN USER')

    return admin_user
}
