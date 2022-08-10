import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="theme-color" content="#cacbcd" />
        <link rel="manifest" href="/app.webmanifest" crossOrigin="use-credentials"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"crossOrigin"}/>
        <link href="https://fonts.googleapis.com/css2?family=Caveat&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Italianno&family=League+Script&family=Ms+Madi&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Alex+Brush&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Bentham&family=Gilda+Display&family=Junge&family=Noto+Serif+JP:wght@200;300;400;500;600;700;900&family=Suravaram&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Baloo+Tammudu+2&family=Forum&family=Nixie+One&family=Suravaram&display=swap" rel="stylesheet"></link>
        <link href="https://db.onlinewebfonts.com/c/34dbcc4a950937fdbae2d1702309c5c6?family=Google+Sans+Display" rel="stylesheet" type="text/css"/>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600&display=swap" rel="stylesheet"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}