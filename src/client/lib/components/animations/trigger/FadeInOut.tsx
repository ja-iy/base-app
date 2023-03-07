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


interface FadeInOutProps {

    trigger?: boolean,

    once?:boolean,

    className?:string, style?:CSSProperties,

    no_fade?:boolean, no_fade_in?:boolean, no_fade_out?:boolean, 
    from?:'up'|'down'|'left'|'right', from_len:number,
    to?:'up'|'down'|'left'|'right', to_len:number,
    len:number,
    config: keyof typeof preset_configs | SpringConfig,
    t?:number, easing?: keyof typeof easings,
    
    changeOn:any[],

    bind:()=>object,

    children:React.ReactNode,
}

export default function FadeInOut({trigger, once, className, style, no_fade, no_fade_in, no_fade_out, from, from_len, to, to_len, len, config, t, easing, changeOn, bind, children}:FadeInOutProps){

    const anims = useMemo(()=>{
        const len_to = to_len || len
        const len_from = from_len || len
        const temp =  {
            from_x: from === 'right' ? len_from : ( from === 'left' ? -len_from :0 ),
            from_y: from === 'down' ? len_from : ( from === 'up' ? -len_from : 0 ),
            to_x: to === 'right' ? len_to : ( to === 'left' ? -len_to :0 ),
            to_y: to === 'down' ? len_to : ( to === 'up' ? -len_to : 0 ),
            config: typeof config === 'string' ? preset_configs[config] : config,
            fade_in: no_fade ? 1: (no_fade_in ? 1 : 0),
            fade_out: no_fade ? 1: (no_fade_out ? 1 : 0),
            duration: t ? {duration:t, easing: easing ? easings[easing] as (t:number)=>number : easings.easeInOutCubic} : undefined,
        }
        temp.to_x = (temp.to_x || temp.to_y) ? temp.to_x : temp.from_x
        temp.to_y = (temp.to_y || temp.to_x) ? temp.to_y : temp.from_y
        return temp
    },[no_fade, no_fade_in, no_fade_out, from, from_len, to, to_len, len, config, t, easing,])

    const [springs, api] = useSpring(() => ({ 
        from: { opacity:anims.fade_in, x:anims.from_x, y:anims.from_y },
        config: t ? anims.duration : anims.config,
    }))

    const [ref, inView] = useInView({once:once})

    const [used, setUsed] = useState(false)

    useEffect(()=>{
        if(used !== (inView) ) setUsed(true)
    },[inView])

    const trigRef = useRef(trigger)
    trigRef.current = trigger
    
    useEffect(()=>{
        if(inView && !trigger) return
        if (inView) {
            api.start({
                from: { opacity:anims.fade_in, x:anims.from_x, y:anims.from_y } ,
                to: {opacity:1, x:0, y:0}
            })
        }
        else if(used){
            api.start({
                from: {opacity:1, x:0, y:0},
                to: { opacity:anims.fade_out, x:anims.to_x, y:anims.to_y } ,
            })
        }       
    },[trigger, inView, used, anims, api, ...changeOn])

    // useEffect(()=>{
    //     if(!inView) return
    //     if ((typeof trigger_in !== 'undefined') && trigger_in) {
    //         api.start({
    //             from: { opacity:anims.fade_in, x:anims.from_x, y:anims.from_y } ,
    //             to: {opacity:1, x:0, y:0}
    //         })
    //     } 
    //     else if(typeof trigger_out !== 'undefined' && trigger_out){
    //         api.start({
    //             from: {opacity:1, x:0, y:0},
    //             to: { opacity:anims.fade_out, x:anims.to_x, y:anims.to_y } ,
    //         })
    //     }
    // },[trigger_in, trigger_out, inView, anims, api, used])


    return <>
        <animated.div ref={ref} className={className} style={{...springs, ...style}} {...bind()}>
            {children}
        </animated.div>
    </>
}

FadeInOut.defaultProps = {
    trigger: true,
    len: 200,
    from_len: 0,
    to_len: 0,
    config: 'default',
    bind: () => ({}),
    changeOn:[],
}

