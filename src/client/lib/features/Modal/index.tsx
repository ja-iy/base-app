//packages
import { useState, useEffect } from 'react'
import {createPortal} from 'react-dom'
import FocusTrap from 'focus-trap-react'

//lib
import { useBodyScroll } from '../BodyScroll'

//app
//vars
//assets
//styles

//types
import type { Dispatch, SetStateAction } from 'react'
import type { CSSProperties } from 'react'


interface IModalProps {

    open:boolean, 
    setOpen: Dispatch<SetStateAction<boolean>>,

    className?:string, style?:CSSProperties,

    bind:()=>object,

    children:React.ReactNode,
}

function Modal({open, className, style, bind, children}:IModalProps){
    const [mounted, setMounted] = useState(false)
    const modal_id = 'modal'

    useEffect(() => {
       setMounted(true)
       return () => setMounted(false)
    }, [])

    useBodyScroll(open)

    if (mounted && open){

        const elem = <>
            <FocusTrap >
                <div className={`fixed font-mont `}>
                    <div tabIndex={0} className={''}/>
                    <div className={`w-screen h-screen fixed top-0 left-0 pointer-events-auto ${className}`} style={style} {...bind()}>
                        {children}
                    </div>
                </div>
            </FocusTrap>
        </>

        const modal_cont = document.getElementById(modal_id)

        return modal_cont ? createPortal(elem, modal_cont) : null
    }

    return null
}

Modal.defaultProps = {
    bind: () => ({}),
}

export default Modal