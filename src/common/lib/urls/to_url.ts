export default function to_url(str:string){
    return str.trim().replace(/\s+/g, '-')
}