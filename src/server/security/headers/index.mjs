import { env } from "../../../env.mjs"

/**
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
*/

//needs manual updating as features change
const permissions_policy_features = [
    `accelerometer=()`,
    `ambient-light-sensor=()`,
    `attribution-reporting=()`,
    `autoplay=()`,
    `battery=()`,
    `camera=()`,
    `clipboard-read=()`,
    `clipboard-write=()`,
    `conversion-measurement=()`,
    `cross-origin-isolated=()`,
    `direct-sockets=()`,
    `display-capture=()`,
    `document-domain=()`,
    `encrypted-media=()`,
    `execution-while-not-rendered=()`,
    `execution-while-out-of-viewport=()`,
    `focus-without-user-activation=()`,
    `fullscreen=( self )`, 
    `gamepad=( self )`, 
    `geolocation=( self )`,
    `gyroscope=( self )`,
    `hid=()`,
    `idle-detection=( self )`,
    `interest-cohort=()`,
    `magnetometer=()`,
    `microphone=()`,
    `midi=()`,
    `navigation-override=()`,
    `otp-credentials=()`,
    `payment=()`,
    `picture-in-picture=( self )`, 
    `publickey-credentials-get=()`,
    `screen-wake-lock=( self )`,
    `serial=()`,
    `shared-autofill=()`,
    `speaker-selection=()`,
    `storage-access-api=()`,
    `sync-script=()`,
    `sync-xhr=()`,
    `trust-token-redemption=()`,
    `usb=()`,
    `vertical-scroll=( self )`,
    `wake-lock=( self )`,
    `web-share=()`,
    `window-placement=()`,
    `xr-spatial-tracking=()`, 
].join(', ')

const image_urls = [
    '',
]

const connect_urls = [
    '',
]

const csp = [
    `default-src 'self';`,
    `img-src 'self' blob: data: ${image_urls.join(' ')}  https://*.google-analytics.com https://*.googletagmanager.com ;`,
    `script-src 'self' ;`,
    `font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com/ ;`,
    `style-src 'unsafe-inline' 'self' ;`,
    `connect-src 'self'   ${image_urls.join(' ')} ${connect_urls.join(' ')} https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com  ;`,
].join(' ')

const csp_unsafe = [
    `default-src 'self';`,
    `img-src 'self' blob: data: ${image_urls.join(' ')}  https://*.google-analytics.com https://*.googletagmanager.com ;`,
    `script-src 'unsafe-eval' 'self' ;`,
    `font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com/ ;`,
    `style-src 'unsafe-inline' 'self' ;`,
    `connect-src 'self' ${image_urls.join(' ')} ${connect_urls.join(' ')} https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com  ;`,
].join(' ')


// headers for next config
// interface IHeader { key: string, value: string }

export const dev_security_headers = [
    // { key: 'X-Frame-Options', value: 'DENY' },
    // { key: 'Content-Security-Policy', value: csp_unsafe },
    // { key: 'X-Content-Type-Options', value: 'nosniff' },
    // { key: 'Permissions-Policy', value: permissions_policy_features },
    // { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
    // { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
    { key: 'X-XSS-Protection', value: '1; mode=block' },
]

export const prod_security_headers = [
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Content-Security-Policy', value: csp },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    // { key: 'Permissions-Policy', value: permissions_policy_features },
    { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
    { key: 'X-XSS-Protection', value: '1; mode=block' },
]
