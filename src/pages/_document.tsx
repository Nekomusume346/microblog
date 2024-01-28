import { Html, Head, Main, NextScript, DocumentContext  } from 'next/document'

import { siteMeta } from '@/libs/constants'
const { siteLang } = siteMeta

export default function Document() {
  
  return (
    <Html lang={siteLang}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
