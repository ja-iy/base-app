//packages
import { useEffect } from "react"
import Head from "next/head"
import { SessionProvider } from "next-auth/react"
import { api } from "../common/api/trpc"
import { Montserrat, Josefin_Slab, Great_Vibes, } from 'next/font/google'

//lib
import { LibLayout } from "../client/lib"
import set_css_vars from "../client/lib/utils/css/set_css_vars"
import { useSetTheme } from "../client/lib/features/Theme"

//app
import AppLayout from "../client/components/layouts/AppLayout"

//vars
import { SITE_TITLE } from "../common/vars"

//assets

//styles
import "../client/styles/globals.css"
import "../client/styles/globals.sass"
import "../client/styles/theme.sass"

//types
import type { AppType } from "next/app"
import type { Session } from "next-auth"

// THEME INIT //

const font_p = Montserrat({
    subsets: ['latin'],
    variable: '--font-p',
})

const font_s = Josefin_Slab({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    variable: '--font-s',
})

const font_t = Great_Vibes({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-t',
})

set_css_vars([
    ['font-p', font_p.style.fontFamily],
    ['font-s', font_s.style.fontFamily],
    ['font-t', font_t.style.fontFamily],
])

// APP //

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {

    useEffect(() => {
        set_css_vars([
            ['font-p', font_p.style.fontFamily],
            ['font-s', font_s.style.fontFamily],
            ['font-t', font_t.style.fontFamily],
        ])
    }, [])


    return <>

        <Head>
            <title>{SITE_TITLE}</title>
            <meta name="description" content="Base App" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <SessionProvider session={session}>
            <LibLayout>
                <AppLayout>
                    <Component {...pageProps} />
                </AppLayout>                
            </LibLayout>
        </SessionProvider>
    </>
}

export default api.withTRPC(MyApp)
