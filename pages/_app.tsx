import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'
function Wedding({ Component, pageProps }: AppProps) {
  return (
  <div className="font-default text-white bg-bg bg-cover bg-center w-screen h-screen overflow-hidden" style={{backgroundColor:"#cacbcd"}}>
    <Component {...pageProps} />
  </div>
  )
}

export default Wedding
