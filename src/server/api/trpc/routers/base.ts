import { z } from "zod"

import { createTRPCRouter, publicProcedure, userProcedure } from "../"

export const baseRouter = createTRPCRouter({

    echo: publicProcedure
        .input(z.object({ message: z.string() }))
        .query(({ input, ctx }) => {
            return {
                echoed_message: `hi I'm your trpc api here is the message you sent me: ${input.message}`,
            }
        }),

    auth_message: userProcedure
        .query(({ ctx: { session } }) => {
            return "OwO - you're authenticated!"
        }),
})
