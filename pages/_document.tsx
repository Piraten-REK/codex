import { NextPage } from 'next'
import { Head, Html, Main, NextScript } from 'next/document'

const Document: NextPage = () => (
  <Html lang='de-DE' prefix='og: http://ogp.me/ns#'>
    <Head />
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default Document
