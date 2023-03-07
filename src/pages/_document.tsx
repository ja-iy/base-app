import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return <>
        <Html>

            <Head >
 
            </Head>

            <body>
                <Main />
                <div id="modal" className={`fixed z-[9000]`}/>
                <NextScript />
            </body>

        </Html>
    </>

}