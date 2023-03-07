import { httpBatchLink, loggerLink } from "@trpc/client"
import { createTRPCNext } from "@trpc/next"
import superjson from "superjson"

//types
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "../../../server/api/trpc/root"

const getBaseUrl = () => {
    if (typeof window !== "undefined") return "" // browser should use relative url
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // ssr should use vercel url
    return `http://localhost:${process.env.PORT ?? 3000}` // dev ssr should use localhost
}

// trpc client
export const api = createTRPCNext<AppRouter>({
    config() {
        return {

            transformer: superjson,

            // links used to determine request flow from client to server.
            links: [
                loggerLink({ enabled: (opts) => process.env.NODE_ENV === "development" || (opts.direction === "down" && opts.result instanceof Error) }),
                httpBatchLink({ url: `${getBaseUrl()}/api/trpc` }),
            ],
        }
    },
    ssr: false, // await queries when ssr'ing pages
})

// helper types
export type TrpcRouterInputs = inferRouterInputs<AppRouter>
export type TrpcRouterOutputs = inferRouterOutputs<AppRouter>
