//packages
import { useState, useEffect, useContext, createContext } from "react"
import Head from "next/head"

//lib

//app

//vars
import { SITE_TITLE } from "../../common/vars"

//assets
//styles
//types

export default function Page({  }:PageProps) {

    return <>

        <Head>
            <title>{`${SITE_TITLE} - Testing`}</title>
            <meta name="description" content="Testing" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={``}>
            
        </div>

    </>
}


// BACKEND  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//types
import type { InferGetStaticPropsType, GetStaticPropsContext } from 'next'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

export async function getStaticProps({ params }:GetStaticPropsContext){

    // if ( some_condition ) return { notFound:true }

    return {
        props: {

        },
    }
}