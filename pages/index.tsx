import type { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'

const Home: NextPage = () => {
  const { data: session } = useSession()

  console.log(session)

  return (
    <>
      <div><p>Hello World</p></div>
      {
        session?.user != null
          ? <button onClick={() => { void signOut() }}>Logout</button>
          : <button onClick={() => { void signIn() }}>Login</button>
      }
    </>
  )
}

export default Home
