const APP_THEME = {

    // fonts -  intialize these in the _app file using next font, and appended to the tailwind.config under fonts //

    'font-p': ['var(--font-p)'],
    'font-s': ['var(--font-s)'],
    'font-t': ['var(--font-t)'],

    // colors - intialized in /src/client/styles/THEME.sass under root, and appended to the tailwind.config under colors //

    "bg-body": "var(--bg-body)",

    "col-scroll": 'var(--col-scroll)',
    "col-hover-scroll": 'var(--col-hover-scroll)',

    "col-select": 'var(--col-select)',
    "col-select-bg": 'var(--col-select-bg)',
    
    "bg-p": 'var(--bg-p)',
    "bg-s": 'var(--bg-s)',
    "bg-t": 'var(--bg-t)',

    "font-col-p": 'var(--font-col-p)',
    "font-col-s": 'var(--font-col-s)',
    "font-col-t": 'var(--font-col-t)',
    
    "col-p": 'var(--col-p)',
    "acc-p": 'var(--acc-p)',
    
    "col-s": 'var(--col-s)',
    "acc-s": 'var(--acc-s)',
    
    "col-t": 'var(--col-t)',
    "acc-t": 'var(--acc-t)',
    
} as const


export { APP_THEME }