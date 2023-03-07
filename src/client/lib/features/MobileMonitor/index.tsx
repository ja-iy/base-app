import { useEffect, useState, createContext, useContext, useMemo } from "react"
import { useDims } from "../DimensionMonitor"
import { MOBILE_WIDTH } from "../../../../common/vars"


//types
import { Dispatch, SetStateAction } from "react"

interface IMobileState { isMobileWidth:boolean, isMobileDevice:boolean, isMobileChecked:boolean }
interface IMobileMonitorContext extends IMobileState { 
    setIsMobile:Dispatch<SetStateAction<IMobileState>> 
}

const initialMobileMonitorContext = {} as IMobileMonitorContext
const MobileMonitorContext = createContext(initialMobileMonitorContext)

function MobileMonitorProvider({children}:{children:React.ReactNode}){

    const [isMobile, setIsMobile] = useState({ isMobileWidth:false, isMobileDevice:false, isMobileChecked: false })

    useEffect(() => {

        const handleResize = () => {

            const isMobileWidth = window.innerWidth <= MOBILE_WIDTH

            setIsMobile(v => isMobileWidth !== v.isMobileWidth 
                ? ({ isMobileWidth: isMobileWidth, isMobileDevice: v.isMobileDevice, isMobileChecked: true})
                : v
            )
        }
        
        handleResize()

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)

    }, [])

    useEffect(() => {
        if (typeof window === 'undefined') return
        setIsMobile(v => ({ 
            isMobileWidth: v.isMobileWidth, 
            isMobileDevice: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), 
            isMobileChecked: true 
        }))
    }, [])

    return <MobileMonitorContext.Provider value={{...isMobile, setIsMobile}}>
        {children}
    </MobileMonitorContext.Provider>
}


function useIsMobile(){

    const context = useContext(MobileMonitorContext)
    return context
}

export { MobileMonitorProvider, useIsMobile }