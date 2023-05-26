import Layout from '@/components/Layout'
import type { GetServerSideProps, NextPage } from 'next'
import { getCsrfToken } from 'next-auth/react'
import { useToggle } from '@/utils'
import { Eye, EyeSlash } from 'react-bootstrap-icons'
import styles from '@/styles/login.module.css'
import { useRef } from 'react'
import { authOptions } from './api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'

export interface LoginProps {
  csrfToken?: string
}

const Login: NextPage<LoginProps> = ({ csrfToken }) => {
  const [showPassword, toggleShowPassword] = useToggle(false)
  const userRef = useRef<HTMLInputElement>(null)

  return (
    <Layout title='Login' className={styles.main}>
      <section className={`card ${styles.card}`}>
        <h2>Einloggen</h2>
        <form method='post' action='/api/auth/callback/credentials'>
          <input ref={userRef} name='csrfToken' type='hidden' defaultValue={csrfToken} minLength={3} maxLength={45} required autoComplete='username,email' />
          <label>
            Nutzername oder Mailadresse
            <input type='text' name='user' placeholder='Nutzername oder Mailadresse' />
          </label>
          <label>
            Passwort
            <div className='passwordInputWrapper'>
              <input type={showPassword ? 'text' : 'password'} name='password' placeholder='Passwort' minLength={8} required autoComplete='current-password' data-show-password={showPassword} />
              <button type='button' className='passwordInputToggle' onClick={toggleShowPassword}>{showPassword ? <EyeSlash /> : <Eye />}</button>
            </div>
          </label>
          <button type='button' className={styles.forgotPassword}>Passwort vergessen</button>
          <button type='submit' className={`btn big primary center ${styles.submit}`}>Los geht&apos;s</button>
        </form>
      </section>
    </Layout>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps<LoginProps> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session != null) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  }
}
