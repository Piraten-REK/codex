import type { FC } from 'react'
import type { Icon } from 'react-bootstrap-icons'
import { House } from 'react-bootstrap-icons'
import Link from '@/components/Link'
import styles from '@/styles/Sidebar.module.css'

export const links: Array<{ href: string, Icon: Icon, title: string }> = [
  {
    href: '/',
    Icon: House,
    title: 'Home'
  }
]

const Sidebar: FC = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul>
          {
            links.map(({ href, Icon, title }) => (
              <li key={href}>
                <Link href={href} title={title}>
                  <Icon />
                </Link>
              </li>
            ))
          }
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
