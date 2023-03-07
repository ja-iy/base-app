//packages
import Head from "next/head"

//lib
import Fade_View from "../client/lib/components/animations/view/Fade_View"

//app

//vars
import { SITE_TITLE } from "../common/vars"

//assets
//styles

//types


export default function Page({  }:PageProps) {

    return <>

        <Head>
            <title>{`${SITE_TITLE} - Server Error`}</title>
            <meta name="description" content="The server encountered an error." />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Fade_View  className={`flex flex-col items-center justify-center  w-[40vw] h-[40vh] max-w-20 max-h-20`}>
            {'Internal Server Error'}
        </Fade_View>
        
    </>
}

// BACKEND  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { prisma } from '../server/db'

//types
import type { InferGetStaticPropsType, GetStaticPropsContext, GetStaticPaths } from 'next'
type PageProps = InferGetStaticPropsType<typeof getStaticProps>

export async function getStaticProps({ params }:GetStaticPropsContext){


    // if (some_condition) return { notFound:true }

    return {
        props:{

        }
    }
}

