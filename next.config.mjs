import { env } from './src/env.mjs'
import { prod_security_headers ,dev_security_headers } from './src/server/security/headers/index.mjs'

/**
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
*/

function defineNextConfig(config) {
    return config
}

export default env.NODE_ENV === "production" 
    ? defineNextConfig({
        reactStrictMode: true,
        swcMinify: true,
        images: {
            domains: [ 
                "cdn.discordapp.com",
            ],
        },
        i18n: {
            locales: ["en"],
            defaultLocale: "en",
        },
        // experimental: {
        //     nextScriptWorkers: true,
        //  },
        headers:  async () => [
            {
                source:'/:path*',
                headers: [
                    ...prod_security_headers
                ]
            } 
        ]
    })
    : defineNextConfig({
        reactStrictMode: true,
        swcMinify: true,
        images: {
            domains: [ 
                "cdn.discordapp.com",
            ]
        },
        i18n: {
            locales: ["en"],
            defaultLocale: "en",
        },
        // experimental: {
        //     nextScriptWorkers: true,
        // },
        headers:  async () => [
            {
                source:'/:path*',
                headers: [
                    ...dev_security_headers
                ]
            } 
        ]
    })