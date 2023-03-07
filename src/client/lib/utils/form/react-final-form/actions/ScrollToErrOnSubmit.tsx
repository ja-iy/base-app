import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-final-form'
import type { Dispatch, SetStateAction } from 'react'

//requirements to use is that all errors have an error message element rendered to the dom with the class 'ERR'
export default function ScrollToFormErrorOnSubmit({submitAttempt}:{submitAttempt:number}){
    
    const form = useForm()
    const meta = form.getState()
    const {submitFailed} = meta

    const actionDelayRef = useRef<NodeJS.Timeout|undefined>()

    useEffect(()=>{
        if (submitFailed){
            if(!actionDelayRef.current ){
                actionDelayRef.current = setInterval(()=>{
                    console.log('CHECKING')
                    let highest = Infinity
                    let goto;
                    const error_elems = document.getElementsByClassName('ERR')
                    if (error_elems.length === 0) {return}
                    for (let i = 0; i < error_elems.length; i++) {
                        const elem = error_elems[i] as Element
                        const height = elem.getBoundingClientRect().top
                        if (height < highest){highest = height; goto = elem}
                    }
                    if(goto){goto.scrollIntoView({block:'center', behavior:'smooth'})}
                    clearInterval(actionDelayRef.current)
                    actionDelayRef.current = undefined  
                }, 50)
            }
        }
        else{
            if(actionDelayRef.current){
                clearInterval(actionDelayRef.current)
                actionDelayRef.current = undefined  
            }
        }
    },[submitAttempt, submitFailed])

    return <>
    
    </>
}