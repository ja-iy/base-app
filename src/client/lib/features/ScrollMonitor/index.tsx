import { useEffect, useState, createContext, useContext } from "react"

//types
import { Dispatch, SetStateAction } from "react"

interface IMouseState { x:number, y:number }
interface IScrollMonitorContext extends IMouseState { 
    setScrollPos:Dispatch<SetStateAction<IMouseState>> 
}

const initialScrollMonitorContext = {} as IScrollMonitorContext
const ScrollMonitorContext = createContext(initialScrollMonitorContext)

function ScrollMonitorProvider({children}:{children:React.ReactNode}){

    const [scrollPos, setScrollPos] = useState({x:0, y:0})

    useEffect(() => {
        
        const handleScroll = () => {
            setScrollPos({x: window.scrollX, y: window.scrollY})
        }
        handleScroll()

        window.addEventListener("scroll", handleScroll)
        return () => { window.removeEventListener("scroll", handleScroll) }

    }, [])

    return <ScrollMonitorContext.Provider value={{...scrollPos, setScrollPos}}>
        {children}
    </ScrollMonitorContext.Provider>
}


function useScrollPos(){

    const scrollPos = useContext(ScrollMonitorContext)

    return scrollPos
}

export { ScrollMonitorProvider, useScrollPos }