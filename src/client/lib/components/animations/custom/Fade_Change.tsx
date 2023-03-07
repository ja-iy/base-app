//packages
import { useState, useEffect, useMemo, useRef } from 'react'
import {createPortal} from 'react-dom'
import FocusTrap from 'focus-trap-react'
import { useSpring, useInView, animated, config as preset_configs, easings, useTransition } from '@react-spring/web'

//lib
//app
//vars
//assets
//styles

//types
import type { Dispatch, SetStateAction } from 'react'
import type { CSSProperties } from 'react'
import type { SpringConfig } from '@react-spring/web'


interface Fade_ChangeProps {

    once?:boolean,

    className?:string, style?:CSSProperties,

    no_fade?:boolean, no_fade_in?:boolean,
    from?:'up'|'down'|'left'|'right', from_len:number,
    len:number,
    config: keyof typeof preset_configs | SpringConfig,
    t?:number, easing?: keyof typeof easings,
    
    bind:()=>object,

    changeOn: Array<any>

    children:React.ReactNode,
}

export default function Fade_Change({once, className, style, no_fade, no_fade_in, from, from_len, len, config, t, easing, bind, changeOn, children}:Fade_ChangeProps){

    const anims = useMemo(()=>{
        const len_from = from_len || len
        return {
            from_x: from === 'right' ? len_from : ( from === 'left' ? -len_from :0 ),
            from_y: from === 'down' ? len_from : ( from === 'up' ? -len_from : 0 ),
            config: typeof config === 'string' ? preset_configs[config] : config,
            fade_in: no_fade ? 1: (no_fade_in ? 1 : 0),
            duration: t ? {duration:t, easing: easing ? easings[easing] as (t:number)=>number : easings.easeInOutCubic} : undefined,
        }
    },[no_fade, no_fade_in,  from, from_len,  len, config, t, easing,])

    const [ref, inView] = useInView({once:once})

    const [springs, api] = useSpring(() => ({ 
        from: { opacity:anims.fade_in, x:anims.from_x, y:anims.from_y } ,
        to: {opacity:1, x:0, y:0},
        config: t ? anims.duration : anims.config,
    }))

    
    useEffect(()=>{
        if (!inView) {
            api.start({
                to: {opacity:0, x:0, y:0},
            })
        } 
        else { 
            api.start({
                from: !once ? { opacity:anims.fade_in, x:anims.from_x, y:anims.from_y }:undefined,
                to: {opacity:1, x:0, y:0}
            })
        }
    },[inView, anims, api, ...changeOn])

    return <>
        <animated.div ref={ref} className={className} style={{...springs, ...style}} {...bind()}>
            {children}
        </animated.div>
    </>
}

Fade_Change.defaultProps = {
    len: 200,
    from_len: 0,
    config: 'default',
    bind: () => ({}),
    changeOn: [],
}

