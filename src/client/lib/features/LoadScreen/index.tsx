//packages
import { useState, useEffect } from 'react'
import {createPortal} from 'react-dom'
import FocusTrap from 'focus-trap-react'

//lib
import { useBodyScroll } from '../BodyScroll'
import { useIsMobile } from '../MobileMonitor'
import Fade_Trigger from '../../components/animations/trigger/Fade_Trigger'
import Fade_View from '../../components/animations/view/Fade_View'

//app
//vars
//assets
//styles

//types
import type { Dispatch, SetStateAction } from 'react'
import type { CSSProperties } from 'react'

// interface ILoadScreenProps {

// }

function LoadScreen({}){

    const { isMobileDevice, isMobileWidth, isMobileChecked } = useIsMobile()

    const [animOver, setAnimOver] = useState(false)
    const [removeLoader, setRemoveLoader] = useState(false)

    useEffect(()=>{
        if(isMobileChecked && animOver) setRemoveLoader(true)
    },[animOver, isMobileChecked])

    useEffect(()=>{
        const decleare_anim_over = setTimeout(()=>{
            setAnimOver(true)
        }, 2000)
        return ()=> clearTimeout(decleare_anim_over)
    },[])


    return <>

        <Fade_Trigger trigger={!removeLoader} no_fade_in config={'molasses'}  className={`z-[9999] pointer-events-none fixed bg-black flex flex-col items-center justify-center w-screen h-screen overflow-hidden `}>
            <Fade_View len={50} from={'up'} className={`text-white font-app-p uppercase text-2xl font-[300] animate-pulse`}>
                {` \u2022 \u2022 \u2022 Loading \u2022 \u2022 \u2022 `}
            </Fade_View>
        </Fade_Trigger>
    
    </>
}

export default LoadScreen