
const set_css_var = (name:string, val:string) => {
    ( global?.document?.querySelector(':root') as HTMLElement )?.style?.setProperty(`--${name}`, val)
}

export default set_css_var