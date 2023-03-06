import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin', 'latin-ext'] })

const Codex = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps): JSX.Element => {
  return (
    <>
      <style jsx global>
        {`
          :root {
            font-family: ${inter.style.fontFamily};
          }
        `}
      </style>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}

export default Codex
