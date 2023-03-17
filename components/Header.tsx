import { FC } from 'react'
import styles from '@/styles/Header.module.css'
import { Book, BoxArrowInRight } from 'react-bootstrap-icons'
import { useSession, signIn } from 'next-auth/react'

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
            : null
        }
      </div>
    </header>
  )
}

export default Header
