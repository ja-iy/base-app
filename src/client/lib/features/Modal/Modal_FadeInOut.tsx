//packages
import { useState, useEffect, useMemo } from 'react'
import {createPortal} from 'react-dom'
import FocusTrap from 'focus-trap-react'
import { useSpring, animated, config as preset_configs, easings, useTransition } from '@react-spring/web'

//lib
import { useBodyScroll } from '../BodyScroll'

//app
//vars
//assets
//styles

//types
import type { Dispatch, SetStateAction } from 'react'
import type { CSSProperties } from 'react'
import type { SpringConfig } from '@react-spring/web'

interface IModalProps {

    open:boolean, 
    setOpen: Dispatch<SetStateAction<boolean>>,

    className?:string, style?:CSSProperties,

    no_fade_in?:boolean, no_fade_out?:boolean,
    from?:'up'|'down'|'left'|'right', from_len:number,
    to?:'up'|'down'|'left'|'right', to_len:number,
    len:number,
    config: keyof typeof preset_configs | SpringConfig,
    t?:number, easing?: keyof typeof easings,

    bind:()=>object,

    children:React.ReactNode,
}

function Modal_FadeInOut({open, className, style, no_fade_in, no_fade_out, from, from_len, to, to_len, len, config, t, easing, bind, children}:IModalProps){
    const [mounted, setMounted] = useState(false)
    const modal_id = 'modal'

    useEffect(() => {
       setMounted(true)
       return () => setMounted(false)
    }, [])

    useBodyScroll(open)

    const anims = useMemo(()=>{
        const len_to = to_len || len
        const len_from = from_len || len
        return {
            from_x: from === 'right' ? len_from : ( from === 'left' ? -len_from :0 ),
            from_y: from === 'down' ? len_from : ( from === 'up' ? -len_from : 0 ),
            to_x: to === 'right' ? len_to : ( to === 'left' ? -len_to :0 ),
            to_y: to === 'down' ? len_to : ( to === 'up' ? -len_to : 0 ),
            config: typeof config === 'string' ? preset_configs[config] : config,
            fade_in: no_fade_in ? 1 : 0,
            fade_out: no_fade_out ? 1 : 0,
            duration: t ? {duration:t, easing: easing ? easings[easing] as (t:number)=>number : easings.easeInOutCubic} : undefined,
        }
    },[len, from, config])

    const transition = useTransition(open, {
        from: { x:anims.from_x, y:anims.from_y , opacity:anims.fade_in },
        enter: { opacity:1, x:0, y:0 },
        leave: {  x:anims.to_x, y:anims.to_y, opacity:anims.fade_out },
        config: t ? anims.duration : anims.config,
    })

    if (mounted){

        const elem = transition((springs, item) => item ? <animated.div  style={{...springs}} >
            <>
                <FocusTrap >
                    <div className={`fixed font-mont`}>
                        <div tabIndex={0} />
                        <div className={`w-screen h-screen fixed top-0 left-0 ${open ? 'pointer-events-auto':'pointer-events-auto'} ${className}`} style={style} {...bind()}>
                            {children}
                        </div>
                    </div>
                </FocusTrap>
            </>
        </animated.div>:null)

        const modal_cont = document.getElementById(modal_id)

        return modal_cont ? createPortal(elem, modal_cont) : null
    }

    return null
}

Modal_FadeInOut.defaultProps = {
    len: 200,
    from_len: 200,
    to_len: 200,
    config: 'default',
    bind: () => ({}),
}

export default Modal_FadeInOut
