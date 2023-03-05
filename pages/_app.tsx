import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

const Codex = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps): JSX.Element => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default Codex
