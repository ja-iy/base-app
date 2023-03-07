
import { createTRPCRouterLight } from "."

import { baseRouter } from "./routers/base"



export const appRouter = createTRPCRouterLight({
    base: baseRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
