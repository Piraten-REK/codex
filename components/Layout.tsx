import type { FC, PropsWithChildren, ReactNode } from 'react'
import Head from 'next/head'
import Sidebar from './Sidebar'
import Header from './Header'
import { Menu, Tab, TabPanel, Tabs } from './Tabs'

export interface LayoutProps {
  title?: string
  description?: string
  className?: string
  tabs?: Array<{
    key: string
    title: string
    content: ReactNode
  }>
}

const Layout: FC<PropsWithChildren<LayoutProps>> = ({ title, description, className, tabs, children }) => {
  const content = tabs != null && tabs.length > 0
    ? (
      <Tabs defaultActiveKey={tabs[0].key}>
        <Menu>
          {tabs.map(({ key, title }) => <Tab key={key} eventKey={key}>{title}</Tab>)}
        </Menu>
        <main className={className}>
          {tabs.map(({ key, content }) => <TabPanel key={key} eventKey={key}>{content}</TabPanel>)}
        </main>
      </Tabs>
      )
    : (
      <main className={className}>
        {children}
      </main>
      )

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
      {content}
    </>
  )
}

export default Layout
