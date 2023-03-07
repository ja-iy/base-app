export default function url_to_id(url:string){
    return url.replace(/-/g, ' ')
}