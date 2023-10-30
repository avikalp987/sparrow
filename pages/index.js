import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import Widjet from '../components/Widjet'

export default function Home({newsResults}) {
  return (
    <div>
      <Head>
        <title>Sparrow</title>
        <meta name="description" content="Sparrow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex min-h-screen mx-auto'>
        {/*  sidebar  */}
        <Sidebar />

        {/** feed */}
        <Feed />

        <Widjet newsResults={newsResults.articles}/>
      </main>
      
    </div>
  )
}

//https://saurav.tech/NewsAPI/top-headlines/category/business/in.json


export async function getServerSideProps()
{
  const newsResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/in.json"
    ).then((res)=>res.json());
    
    return {
      props:{
        newsResults,
      }
    }
}