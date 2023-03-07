import type { GetServerSidePropsContext } from "next"
import { getServerSession } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { env } from "../../env.mjs"
import { prisma } from "../db"

//types
import type { User, Account, Profile, DefaultSession, DefaultUser, NextAuthOptions } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"
import type { UserRole } from '@prisma/client'

// extend next auth types //

interface IUser extends DefaultUser { 
    role: UserRole 
}

declare module "next-auth" {

    interface User extends IUser { }

    interface Session extends DefaultSession {
        user:   DefaultSession["user"] & { id:string, role:UserRole }
    }

}

declare module "next-auth/jwt" {

    interface JWT extends DefaultJWT { role: UserRole }

}

// adapters, providers, callbacks //

export const prisma_auth = PrismaAdapter(prisma)

export const authOptions: NextAuthOptions = {

    adapter: prisma_auth,
    secret: env.NEXTAUTH_SECRET,

    session:{
        strategy: 'jwt',
        maxAge: 1 * 1 * 60 * 60,
    },


    callbacks: {

        jwt: ({ token, user }) => {
            if (user?.role) { token.role = user.role }
            return token
        },

        session: ({ session, token }) => {
            if ( token?.role && session?.user ) { 
                session.user.role = token.role 
            }
            if ( token.sub  && session?.user ) {
                session.user.id = token.sub
            }
            return session
        },

    },

    providers: [

        DiscordProvider({
            clientId: env.DISCORD_CLIENT_ID,
            clientSecret: env.DISCORD_CLIENT_SECRET,
        }),

    ],

}

// get session on server
export const getServerAuthSession = (ctx: {req: GetServerSidePropsContext["req"], res: GetServerSidePropsContext["res"]}) => {
    return getServerSession(ctx.req, ctx.res, authOptions)
}

