//packages
import Head from "next/head"

//lib
import Fade_View from "../../client/lib/components/animations/view/Fade_View"


//app
//vars
//assets
//styles

//types


export default function Page({  }:PageProps) {

    return <>

        <Fade_View from={'right'} len={20} className={`flex flex-col gap-y-8 w-full pl-40 py-40`}>
            {'Comming Soon'}
        </Fade_View>
        
    </>
}

// BACKEND  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { prisma } from '../../server/db'
import params_to_id from "../../common/lib/urls/params_to_id"
import url_to_id from "../../common/lib/urls/url_to_id"

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

