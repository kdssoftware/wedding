import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="theme-color" content="#cacbcd" />
        <link rel="manifest" href="/app.webmanifest" crossOrigin="use-credentials"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"crossOrigin"}/>
        <link href="https://fonts.googleapis.com/css2?family=Caveat&family=Cormorant+Garamond:ital,wght@1,300&family=Italianno&family=League+Script&family=Ms+Madi&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}