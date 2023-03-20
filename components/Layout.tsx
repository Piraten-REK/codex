import type { FC, PropsWithChildren } from 'react'
import Head from 'next/head'
import Sidebar from './Sidebar'
import Header from './Header'

export interface LayoutProps {
  title?: string
  description?: string
  className?: string
}

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ title, description, className, children }) => {
  return (
    <>
      <Head>
        <title>{title != null ? `Codex | ${title}` : 'Codex'}</title>
        {description != null ? <meta name='description' content={description} /> : null}
        <meta property='og:site_name' content='Codex' />
        {title != null ? <meta property='og:title' content={title} /> : null}
        {description != null ? <meta property='og:description' content={description} /> : null}
      </Head>
      <Header title={title} />
      <Sidebar />
      <main className={className}>
        {children}
      </main>
    </>
  )
}

export default Layout
