import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import Widjet from '../components/Widjet'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Sparrow</title>
        <meta name="description" content="Sparrow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex min-h-screen max-w-7xl mx-auto'>
        {/*  sidebar  */}
        <Sidebar />

        {/** feed */}
        <Feed />

        <Widjet />
      </main>
      
    </div>
  )
}
