/*
    Toggles body scroll on and off, when provided contition or on component unmount that has useBodyScroll hook
*/
import {useState, useEffect, useContext, createContext, useRef, useCallback, useReducer} from 'react'
import useUnmount from '../../utils/hooks/useUnmount'

//types
import type { Dispatch, SetStateAction } from "react"


interface IBodyScrollStore {
    disableScroll: boolean,
    disableCount: number
}

const initialBodyScroll = ():IBodyScrollStore => ({
    disableScroll: false,
    disableCount: 0
})

type BodyScrollReducerAction = 
{type:'mount', disableScroll:boolean} |
{type:'unmount', disableScroll:boolean} |
{type:'increment'} |
{type:'decrement'} 

function BodyScrollReducer(state:IBodyScrollStore, action:BodyScrollReducerAction):IBodyScrollStore{
    switch(action.type){

        case 'mount': {
            const { disableScroll } = action
            if(!disableScroll) return {...state}
            return {...state, disableScroll: true, disableCount: state.disableCount + 1}
        }

        case 'unmount': {
            const { disableScroll } = action
            if(!disableScroll) return {...state}
            return {disableScroll: state.disableCount-1!==0 ? true:false, disableCount: state.disableCount - 1}   
        }

        case 'increment': {
            return {disableScroll: true, disableCount: state.disableCount + 1}
        }

        case 'decrement': {
            return {disableScroll: state.disableCount-1!==0 ? true:false, disableCount: state.disableCount - 1}        
        }

        default: return initialBodyScroll()
    }
}


interface IBodyScrollContext extends IBodyScrollStore { 
    update: Dispatch<BodyScrollReducerAction>,    
}

const initialBodyScrollContext = {} as IBodyScrollContext
const BodyScrollContext = createContext(initialBodyScrollContext)


function BodyScrollProvider({children}:{ children:React.ReactNode }){
    const [initials, setInitials] = useState<{x?:string, y?:string, xy?:string}>({})

    const reset = useCallback(() =>{      
        document.body.style['overflowX'] = initials.x!
        document.body.style['overflowY'] = initials.y!
        document.body.style['overflow'] = initials.xy!
    }, [initials])

    const disable = useCallback(() =>{       
        document.body.style['overflowX'] = 'hidden'
        document.body.style['overflowY'] = 'hidden'
        document.body.style['overflow'] = 'hidden'
    }, [])

    useEffect(() => {
        setInitials({
            x:getComputedStyle(document.body)['overflowX'],
            y:getComputedStyle(document.body)['overflowY'],
            xy:getComputedStyle(document.body)['overflow'],
        })
    }, [])

    const [store, update] = useReducer(BodyScrollReducer, initialBodyScroll())

    const prev_disableScroll = useRef(store.disableScroll)

    useEffect(() =>{
        if(store.disableCount) disable()
        else reset()
    },[store.disableScroll, reset, disable])

    const willUnmount = useUnmount((reset)=>{reset?.reset()},{reset})

    return <BodyScrollContext.Provider value={{...store, update}}>
        {children}
    </BodyScrollContext.Provider>
}

function useBodyScrollContext(){
    return useContext(BodyScrollContext)
}

const useBodyScroll = ( disableScroll:boolean ) => {
    const { update } = useBodyScrollContext()
    const prev_disableScroll = useRef(disableScroll)

    useEffect(() => { update({type:'mount', disableScroll}) }, [])
    const willUnmount = useUnmount(({disableScroll, update})=>{update({type:'unmount', disableScroll})},{disableScroll,update})


    useEffect(() =>{ 

        if(disableScroll != prev_disableScroll.current){
            if(disableScroll) update({ type:'increment' })
            else update({ type:'decrement' })
        }

        prev_disableScroll.current = disableScroll

    }, [disableScroll])
}

export { useBodyScroll, BodyScrollProvider, useBodyScrollContext }