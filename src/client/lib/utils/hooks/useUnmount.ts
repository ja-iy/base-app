import {useRef, useEffect} from 'react'

//types
import { MutableRefObject } from 'react'

type UseUnmoutCallback<T> = (arg:T) => void

export default function useUnmount<T>(func:UseUnmoutCallback<T>, deps:T){
    const unmountRef = useRef<null|T>(null)
    unmountRef.current = deps
    useEffect(()=>{
        return ()=>{func(unmountRef.current!)}
    },[])
    return unmountRef
}