import type { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'
import Layout from '../components/Layout'

const Home: NextPage = () => {
  const { data: session } = useSession()

  console.log(session)

  return (
    <Layout>
      <div><p>Hello World</p></div>
      {
        session?.user != null
          ? <button onClick={() => { void signOut() }}>Logout</button>
          : <button onClick={() => { void signIn() }}>Login</button>
      }
    </Layout>
  )
}

export default Home
