import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function Wedding({ Component, pageProps }: AppProps) {
  return (
  <div className="font-default bg-bg bg-cover bg-center w-screen h-screen overflow-hidden">
    <Component {...pageProps} />
  </div>
  )
}

export default Wedding
