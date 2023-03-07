export default function non_required(error:string|undefined):string|undefined|false{
    if (typeof error === 'undefined' || typeof error !== 'string'){ return false}
    return error?.toLowerCase() !== 'required' ? error : false
}