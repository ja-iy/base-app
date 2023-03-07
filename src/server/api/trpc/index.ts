import { initTRPC, TRPCError } from "@trpc/server"
import superjson from "superjson"

import { getServerAuthSession } from "../../auth"
import { prisma } from "../../db"

//types
import type { CreateNextContextOptions } from "@trpc/server/adapters/next"
import type { Session } from "next-auth"


///////////////////////////////////////// BASE ROUTER /////////////////////////////////////////////////////////////////
// CONTEXT && INIT /////////////

type CreateContextOptions = {
    session: Session | null
}


//auth (jwt)
const createInnerTRPCContext = (opts: CreateContextOptions) => {
    return { 
        session: opts.session, 
        prisma 
    }
}

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
    const { req, res } = opts
    const session = await getServerAuthSession({ req, res });
    return createInnerTRPCContext({ session })
}

const t = initTRPC.context<typeof createTRPCContext>().create({
    transformer: superjson,
    errorFormatter: ({ shape }) => { return shape },
})

// MIDDLWARES /////////////

//auth (jwt)
const enforceUserSigned = t.middleware(({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) { throw new TRPCError({ code: "UNAUTHORIZED" }) }
    return next({
        ctx: {
            session: { ...ctx.session, user: ctx.session.user },
            prisma: prisma,
        },
    })
})


// ROUTER & PROCEDURES /////////////

//auth (jwt)
export const createTRPCRouter = t.router
export const publicProcedure = t.procedure
export const userProcedure = t.procedure.use(enforceUserSigned)


///////////////////////////////////////// LIGHT ROUTER /////////////////////////////////////////////////////////////////
// CONTEXT && INIT /////////////

type CreateContextOptionsLight = {
    session: Session | null
}


//auth (jwt)
const createInnerTRPCContextLight = (opts: CreateContextOptionsLight) => {
    return { 
        session: opts.session, 
    }
}

export const createTRPCContextLight = async (opts: CreateNextContextOptions) => {
    const { req, res } = opts
    const session = await getServerAuthSession({ req, res });
    return createInnerTRPCContextLight({ session })
}

const tl = initTRPC.context<typeof createTRPCContextLight>().create({
    transformer: superjson,
    errorFormatter: ({ shape }) => { return shape },
})

// MIDDLWARES /////////////

//auth (jwt)
const enforceUserSignedLight = tl.middleware(({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) { throw new TRPCError({ code: "UNAUTHORIZED" }) }
    return next({
        ctx: {
            session: { ...ctx.session, user: ctx.session.user },
        },
    })
})


// ROUTER & PROCEDURES /////////////

//auth (jwt)
export const createTRPCRouterLight = tl.router
export const publicProcedureLight = tl.procedure
export const userProcedureLight = tl.procedure.use(enforceUserSignedLight)

