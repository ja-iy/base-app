/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
    important: true,
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {

            fontWeight: {
                '100': '100', '200': '200', '300': '300', '400': '400', '500': '500', '600': '600', '700': '700', '800': '800', '900': '900',
            },

            fontFamily: {

                // theme //

                'app-p': ['var(--font-p)'],
                'app-s': ['var(--font-s)'],
                'app-t': ['var(--font-t)'],
                
            },

            colors: {

                "clear": 'transparent',

                // theme //

                "bg-body": "var(--bg-body)",

                "col-scroll": 'var(--col-scroll)',
                "col-scroll-hover": 'var(--col-scroll-hover)',

                "col-select": 'var(--col-select)',
                "col-select-bg": 'var(--col-select-bg)',
                
                "bg-p": 'var(--bg-p)',
                "bg-s": 'var(--bg-s)',
                "bg-t": 'var(--bg-t)',

                "font-p": 'var(--font-col-p)',
                "font-s": 'var(--font-col-s)',
                "font-t": 'var(--font-col-t)',
                
                "col-p": 'var(--col-p)',
                "acc-p": 'var(--acc-p)',
                
                "col-s": 'var(--col-s)',
                "acc-s": 'var(--acc-s)',
                
                "col-t": 'var(--col-t)',
                "acc-t": 'var(--acc-t)',

            },

            fontSize: {
                "dynamic-s": "clamp(0.9rem, 1vw, 1.25rem)",
                "dynamic-xl": "clamp(1rem, 3vw, 3.75rem)"
            },

            spacing:{
                '128': '32rem', '144': '36rem', '160': '40rem', '192': '48rem', '256': '64rem', '384': '96rem', 

                '1px': '1px', '2px': '2px', '3px': '3px', '4px': '4px', '5px': '5px', '6px': '6px', '7px': '7px', '8px': '8px', '9px': '9px', '10px': '10px',
                
                '10%': '10%', '20%': '20%', '30%': '30%', '40%': '40%', '50%': '50%', '60%': '60%', '70%': '70%', '80%': '80%', '90%': '90%', '100%': '100%',
                
                '1vw': '1vw', '2vw': '2vw', '3vw': '3vw', '4vw': '4vw', '5vw': '5vw', '6vw': '6vw', '7vw': '7vw', '8vw': '8vw', '9vw': '9vw', '10vw': '10vw',
                '20vw': '20vw', '30vw': '30vw', '40vw': '40vw', '50vw': '50vw', '60vw': '60vw', '70vw': '70vw', '80vw': '80vw', '90vw': '90vw', '100vw': '100vw',
                '1vh': '1vh', '2vh': '2vh', '3vh': '3vh', '4vh': '4vh', '5vh': '5vh', '6vh': '6vh', '7vh': '7vh', '8vh': '8vh', '9vh': '9vh', '10vh': '10vh',
                '20vh': '20vh', '30vh': '30vh', '40vh': '40vh', '50vh': '50vh', '60vh': '60vh', '70vh': '70vh', '80vh': '80vh', '90vh': '90vh', '100vh': '100vh',
            }

        }
    },

    plugins: [
        plugin(function({ addUtilities }) {
            addUtilities({
                '.horizontal-tb': { writingMode: 'horizontal-tb' },
                '.vertical-rl': { writingMode: 'vertical-rl' },
                '.vertical-lr': { writingMode: 'vertical-lr' },
                '.text-shadow-black': { textShadow: '#000 1px 0 10px;' },
                '.text-outline':{
                    "-webkit-text-fill-color": 'transparent',
                    "-webkit-text-stroke": '1px',
                },

                // flex shorcuts //
                '.flex-col-ch': { "display": 'flex', "flex-direction": 'column', 'align-items': 'center' },
                '.flex-col-cv': { "display": 'flex', "flex-direction": 'column', 'justify-content': 'center' },
                '.flex-col-c': { "display": 'flex', "flex-direction": 'column', 'align-items': 'center', 'justify-content': 'center' },
                '.flex-row-ch': { "display": 'flex', "flex-direction": 'row', 'justify-content': 'center' },
                '.flex-row-cv':{ "display": 'flex', "flex-direction": 'row', 'align-items': 'center' },
                '.flex-row-c': { "display": 'flex', "flex-direction": 'row', 'align-items': 'center', 'justify-content': 'center' },

            })
        })
    ]
}
