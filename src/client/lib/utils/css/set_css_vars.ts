
const set_css_vars = (data:Array<[name:string, val:string]>|Record<string,string>) => {

    const style = ( global?.document?.querySelector(':root') as HTMLElement )?.style

    if (!style) { return }

    const items = Array.isArray(data) ? data : Object.entries(data)

    for (const [name, val] of items){
        style.setProperty(`--${name}`, val)
    }
}

export default set_css_vars