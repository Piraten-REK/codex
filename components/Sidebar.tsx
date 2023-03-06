import type { FC } from 'react'
import type { Icon } from 'react-bootstrap-icons'
import { Book, House } from 'react-bootstrap-icons'
import Link from '../components/Link'
import styles from '../styles/Sidebar.module.css'

export const links: Array<{ href: string, Icon: Icon }> = [
  {
    href: '/',
    Icon: House
  }
]

const Sidebar: FC = () => {
  return (
    <aside className={styles.sidebar}>
      <Link href='/' className={styles.siteIcon}>
        <Book />
      </Link>
      <nav className={styles.nav}>
        <ul>
          {
            links.map(({ href, Icon }) => (
              <li key={href}>
                <Link href={href}>
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
