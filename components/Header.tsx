import { FC } from 'react'
import styles from '@/styles/Header.module.css'
import { Book, BoxArrowInRight } from 'react-bootstrap-icons'
import { useSession, signIn, signOut } from 'next-auth/react'
import DefaultAvatar from './DefaultAvatar'
import Dropdown from './Dropdown'

export interface HeaderProps {
  title?: string
}

const Header: FC<HeaderProps> = ({ title }) => {
  const { data: session } = useSession()

  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <Book />
        <h1>Codex<span className='visually-hidden'>:</span><span className={styles.pageTitle}>{title != null ? ` ${title}` : null}</span></h1>
      </div>
      <div className={styles.userSection} data-logged-in={session != null}>
        {
          session == null
            ? <button role='link' title='Einloggen' onClick={() => { void signIn() }}><BoxArrowInRight /></button>
            : (
              <Dropdown>
                <Dropdown.Toggle className={styles.toggle}>
                  <span className={styles.userDisplayName}>{session.user.displayName}</span>
                  <span className={styles.userName}>@{session.user.username}</span>
                  {session.user.avatar == null
                    ? <DefaultAvatar />
                    : <img src={`/api/users/${session.user.username}/avatar`} alt={session.user.displayName} />}
                </Dropdown.Toggle>
                <Dropdown.Menu as='ul' className={styles.userMenu}>
                  <li>Einstellungen</li>
                  <hr />
                  <li>
                    <button role='link' onClick={() => { void signOut() }}>Logout</button>
                  </li>
                </Dropdown.Menu>
              </Dropdown>
              )
        }
      </div>
    </header>
  )
}

export default Header
