//packages

//lib
import Fade_View from "../client/lib/components/animations/view/Fade_View"

//app
//vars
//assets
//styles

//types

export default function Page({  }:PageProps) {

    return <>

        <div className="flex-col-c w-screen h-screen">
            
                <Fade_View config={'gentle'} className="text-6xl font-app-s font-200 text-font-s">
                    . Base App .
                </Fade_View>

        </div>

    </>
}



// BACKEND  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { prisma } from '../server/db'

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

