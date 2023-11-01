import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import Widjet from '../components/Widjet'
import CommentModal from '../components/CommentModal'

export default function Home({newsResults,randomUsersResults}) {
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

        {/** Widgets */}
        <Widjet newsResults={newsResults.articles} randomUsersResults={randomUsersResults.results}/>
      
        {/** Modal */}
        <CommentModal />
      </main>
      
    </div>
  )
}

//https://saurav.tech/NewsAPI/top-headlines/category/business/in.json

//https://randomuser.me/api/?results=50


export async function getServerSideProps()
{
  const newsResults = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/in.json"
    ).then((res)=>res.json());

    const randomUsersResults = await fetch(
      "https://randomuser.me/api/?results=100&inc=name,login,picture"
    ).then((res)=>res.json());
    
    return {
      props:{
        newsResults,
        randomUsersResults,
      }
    }
}