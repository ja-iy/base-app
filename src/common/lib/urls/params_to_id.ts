import url_to_id from "./url_to_id"

//types
import type { ParsedUrlQuery } from "querystring"

type Params = ParsedUrlQuery | undefined

export default function params_to_id(params:Params, idName?:string){
    const url = idName ? params?.[idName] : params?.id
    if (typeof url === 'string' || !url) return null
    if (url.length !== 1) return null
    const raw_id = url[0]
    if (!raw_id || /\s/g.test(raw_id)) return null
    return url_to_id(raw_id)
}