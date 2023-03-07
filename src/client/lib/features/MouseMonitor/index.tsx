import { useEffect, useState, createContext, useContext } from "react"

//types
import { Dispatch, SetStateAction } from "react"

interface IMouseState { x:number, y:number, nx:number, ny:number, cx:number, cy:number }
interface IMouseMonitorContext extends IMouseState { 
    setMousePos:Dispatch<SetStateAction<IMouseState>> 
}

const initialMouseMonitorContext = {} as IMouseMonitorContext
const MouseMonitorContext = createContext(initialMouseMonitorContext)

function MouseMonitorProvider({children}:{children:React.ReactNode}){

    const [mousePos, setMousePos] = useState({ x:0, y:0, nx: 0, ny: 0 , cx:-1, cy:-1})

    useEffect(() => {
        
        const handleMouseMove = (event:MouseEvent) => {
            const nx = event.clientX / window.innerWidth
            const ny = event.clientY / window.innerHeight
            setMousePos({
                x: event.clientX,
                y: event.clientY,
                nx: nx,
                ny: ny,
                cx: nx*2 - 1,
                cy: -ny*2 + 1 ,
            })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => { window.removeEventListener("mousemove", handleMouseMove) }
        
    }, [])

    return <MouseMonitorContext.Provider value={{...mousePos, setMousePos}}>
        {children}
    </MouseMonitorContext.Provider>
}


function useMousePos(){

    const context = useContext(MouseMonitorContext)
    return context
}

export { MouseMonitorProvider, useMousePos }