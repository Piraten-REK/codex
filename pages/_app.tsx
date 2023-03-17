import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Assistant } from 'next/font/google'
import '../styles/globals.css'

const assistant = Assistant({ subsets: ['latin', 'latin-ext'] })

const Codex = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps): JSX.Element => {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font: ${assistant.style.fontFamily};
            font-family: var(--font);
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
