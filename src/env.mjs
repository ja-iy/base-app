/* eslint-disable @typescript-eslint/ban-ts-comment */
import { z } from "zod"

const required_env = z.string().min(1)
const optional_env = z.string().min(1).optional()

// server env schema (should throw error if exposed to client)
const server = z.object({

    // mode
    NODE_ENV: z.enum(["development", "test", "production"]),

    // db
    DATABASE_URL: z.string().url(),

    // next auth
    NEXTAUTH_SECRET:process.env.NODE_ENV === "production" ? required_env : optional_env,
    NEXTAUTH_URL: z.preprocess( (str) => process.env.VERCEL_URL ?? str, process.env.VERCEL ? required_env : z.string().url() ),
    // NEXTAUTH_GOOGLE_ID: required_env,
    // NEXTAUTH_GOOGLE_SECRET: required_env,
    DISCORD_CLIENT_ID: required_env,
    DISCORD_CLIENT_SECRET: required_env,

    // image cdn


})

// client env schema
const client = z.object({

    //domain
    NEXT_PUBLIC_DOMAIN: required_env,

    // image cdn

    // analytics
    // NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: required_env,

})

/** @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>} */
const processEnv = { // must be deconstructed manually for edge runtimes

    // mode
    NODE_ENV: process.env.NODE_ENV,

    // domain
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,

    // db
    DATABASE_URL: process.env.DATABASE_URL,

    // next auth
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    // NEXTAUTH_GOOGLE_ID: process.env.NEXTAUTH_GOOGLE_ID,
    // NEXTAUTH_GOOGLE_SECRET: process.env.NEXTAUTH_GOOGLE_SECRET,
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,

    // image cdn

    // analytics
    // NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,

}

// CHECKS & DEFINITION

const merged = server.merge(client);
/** @type z.infer<merged>
 *  @ts-ignore - can't type this properly in jsdoc */
let env = process.env

if (!!process.env.SKIP_ENV_VALIDATION == false) {

    const isServer = typeof window === "undefined"
    const parsed = isServer ? merged.safeParse(processEnv) : client.safeParse(processEnv) //parse relevant env vars

    if (parsed.success === false) {
        console.error( "❌ Invalid environment variables:", parsed.error.flatten().fieldErrors)
        throw new Error("Invalid environment variables")
    }

    /* @type z.infer<merged>
       @ts-ignore - can't type this properly in jsdoc */
    env = new Proxy(parsed.data, {
        get(target, prop) {
            if (typeof prop !== "string") return undefined
            // throw a descriptive error if a server-side env var is accessed on the client
            if (!isServer && !prop.startsWith("NEXT_PUBLIC_"))
                throw new Error(
                    process.env.NODE_ENV === "production"
                        ? "❌ Attempted to access a server-side environment variable on the client"
                        : `❌ Attempted to access server-side environment variable '${prop}' on the client`,
                )
            /*  @ts-ignore - can't type this properly in jsdoc */
            return target[prop]
        },
    })
}

export { env }
