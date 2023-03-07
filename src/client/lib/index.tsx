//packages

//lib
import { BodyScrollProvider } from "./features/BodyScroll"
import { ScrollMonitorProvider } from "./features/ScrollMonitor"
import { MouseMonitorProvider } from "./features/MouseMonitor"
import { DimensionMonitorProvider } from "./features/DimensionMonitor"
import { MobileMonitorProvider } from "./features/MobileMonitor"
import LoadScreen from "./features/LoadScreen"

//app
//vars
//assets
//styles
//types

function LibLayout({ children }: { children: React.ReactNode }) {
    return <>
        <DimensionMonitorProvider>
        <MobileMonitorProvider>
        <BodyScrollProvider>
        <ScrollMonitorProvider>
        <MouseMonitorProvider>
            {/* <LoadScreen /> */}
            {children}
        </MouseMonitorProvider>
        </ScrollMonitorProvider>
        </BodyScrollProvider>
        </MobileMonitorProvider>
        </DimensionMonitorProvider>
    </>
}

export { LibLayout }