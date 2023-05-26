import type { FC } from 'react'
import type { Icon } from 'react-bootstrap-icons'
import { GearWide, House } from 'react-bootstrap-icons'
import Link from '@/components/Link'
import styles from '@/styles/Sidebar.module.css'

export const links: Array<{ href: string, icon: Icon, title: string }> = [
  {
    href: '/',
    icon: House,
    title: 'Home'
  },
  {
    href: '/preferences',
    icon: GearWide,
    title: 'Einstellungen'
  }
]

const Sidebar: FC = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul>
          {
            links.map(({ href, icon: Icon, title }, idx) => (
              <li key={href}>
                <Link href={href} title={title}>
                  <Icon aria-labelledby={`nav_${idx}`} className={styles.icon} />
                  <span id={`nav_${idx}`} className={styles.title}>{title}</span>
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
