import { useEffect } from 'react'
import set_css_vars from '../../utils/css/set_css_vars'

//types
import type { APP_THEME } from '../../../../common/vars'

// initialize theme, called only once on mount
function useInitTheme(data:Array<[name:keyof typeof APP_THEME, val:string]>|Record<keyof typeof APP_THEME, string>){

    useEffect(()=>{
        set_css_vars(data)
    },[])
}

// set theme, called whenever theme data changes
function useSetTheme(data:Array<[name:keyof typeof APP_THEME, val:string]>|Partial<Record<keyof typeof APP_THEME, string>>){

    useEffect(()=>{
        set_css_vars(data)
    },[data])
}

export { useSetTheme, useInitTheme }


