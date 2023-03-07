//packages

//lib

//app
import CommingSoon from "../../client/components/filler/CommingSoon"

//vars
//assets
//styles
//types

// PAGE //

export default function Page({  }:PageProps) {

    return <>

        <CommingSoon />
        
    </>
}

// BACKEND  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { prisma } from '../../server/db'

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

