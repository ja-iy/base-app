//packages
import Link from "next/link"
import { useState, useEffect, useContext, createContext } from "react"
import { useRouter } from "next/router"


//lib
import Fade_View from "../../../lib/components/animations/view/Fade_View"

//app
//vars
//assets
//styles

//types
import type { Dispatch, SetStateAction } from "react"

// App context //

interface IAppState { 
    echo: string,
}

interface IAppContext extends IAppState {

}

const initialAppContext = {  } as IAppContext
const AppContext = createContext(initialAppContext)

export const useAppContext = () => useContext(AppContext)


// Nav Menu Context //

interface INavMenuState { 
    navMenuOpen: boolean, 
    setNavMenuOpen:Dispatch<SetStateAction<boolean>>, 
}

interface INavMenuContext extends INavMenuState {

}

const initialNavMenuContext = { navMenuOpen:false } as INavMenuContext
const NavMenuContext = createContext(initialNavMenuContext)

export const useNavMenuContext = () => useContext(NavMenuContext)


// Layout 
export default function AppLayout({children}: {children:React.ReactNode}) {

    const { events:routerEvents  } = useRouter()

    const [ navMenuOpen, setNavMenuOpen ] = useState(false)

    useEffect(() => {

        const handleRouteChange = () => { setNavMenuOpen(false) }
        routerEvents.on('routeChangeComplete', handleRouteChange)
        return () => { routerEvents.off('routeChangeComplete', handleRouteChange)}

      }, [routerEvents])

    return <>
        <AppContext.Provider value={{echo:'echo'}}>
        <NavMenuContext.Provider value={{navMenuOpen, setNavMenuOpen}}>

            <NavBar open={navMenuOpen} setOpen={setNavMenuOpen} />

            <main className={``}>
                {children}
            </main>

            <NavMenu 
                open={navMenuOpen} setOpen={setNavMenuOpen}
            />

        </NavMenuContext.Provider>
        </AppContext.Provider>
    </>
}

function NavBar({ open, setOpen, }:INavBarProps){ 

    return <>
        
    </>
    
}

interface INavBarProps { 
    open: boolean,
    setOpen:Dispatch<SetStateAction<boolean>>,
}

function NavMenu({ open, setOpen, }:INavBarProps){ 

    return <>
        
    </>
    
}

function AllSiteLinks({}){

    return <>
        <section className={``}>
            <Fade_View  once className={``}>
                <AllSiteLink label={'Help'} href={'/help'} />
                <AllSiteLink label={'About'} href={'/about'} />
                <AllSiteLink label={'Terms'} href={'/terms'} />
                <AllSiteLink label={'Content Policy'} href={'/content-policy'} />
                <AllSiteLink label={'Contact'} href={'/contact'} />
            </Fade_View>
        </section>
    </>
}

function AllSiteLink({label, href}:{label:string, href:string}){

    return <Link 
        className={``}
        href={href}
    >{label}</Link>
}


