import type { FC, PropsWithChildren } from 'react'
import Sidebar from './Sidebar'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Sidebar />
      <main>
        {children}
      </main>
    </>
  )
}

export default Layout
