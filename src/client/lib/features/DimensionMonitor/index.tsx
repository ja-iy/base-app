import { useEffect, useState, createContext, useContext } from "react"

//types
import { Dispatch, SetStateAction } from "react"

interface ISizeState { vw:number, vh:number, iw:number, ih:number, ow:number, oh:number }
interface IDimensionMonitorContext extends ISizeState { 
    setSize:Dispatch<SetStateAction<ISizeState>> 
}

const initialDimensionMonitorContext = {} as IDimensionMonitorContext
const DimensionMonitorContext = createContext(initialDimensionMonitorContext)

function DimensionMonitorProvider({children}:{children:React.ReactNode}){

    const [size, setSize] = useState({ vw:0, vh:0, iw:0, ih:0, ow:0, oh:0 })

    useEffect(() => {
        
        const handleResize = () => {
            setSize({
                vw: window.innerWidth/100, 
                vh: window.innerHeight/100, 
                iw: window.innerWidth, 
                ih: window.innerHeight,  
                ow: window.outerWidth,  
                oh: window.outerHeight, 
            })
        }
        handleResize()

        window.addEventListener("resize", handleResize)
        return () => { window.removeEventListener("resize", handleResize) }
        
    }, [])

    return <DimensionMonitorContext.Provider value={{...size, setSize}}>
        {children}
    </DimensionMonitorContext.Provider>
}


function useDims(){

    const context = useContext(DimensionMonitorContext)
    return context
}

export { DimensionMonitorProvider, useDims }