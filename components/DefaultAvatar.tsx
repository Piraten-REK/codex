import { FC } from 'react'
import { PersonFill } from 'react-bootstrap-icons'
import styles from '@/styles/DefaultAvatar.module.css'

const DefaultAvatar: FC = () => (
  <div role='img' className={styles.wrapper}>
    <PersonFill />
  </div>
)

export default DefaultAvatar
