import Head from 'next/head'
import Sidebar from '../../components/Sidebar';
import Widjet from '../../components/Widjet';
import Post from '../../components/Post';
import CommentModal from '../../components/CommentModal';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import Comment from '../../components/Comment';
import { AnimatePresence,motion } from 'framer-motion';


export default function PostPage({newsResults,randomUsersResults}) {
    const router = useRouter();
    const {id} = router.query;
    const [post,setPost] = useState(null);
    const [comments,setComments] = useState([]);

    useEffect(
        () => onSnapshot(doc(db, "posts", id), (snapshot) => setPost(snapshot)),
        [db, id]
    );

    useEffect(()=>{
        onSnapshot(
            query(collection(db,"posts",id,"comments"),
            orderBy("timestamp","desc")
            ),(snapshot) => {
                setComments(snapshot.docs);
            }
        )
    },[id,db])


  return (
    <div>
      <Head>
        <title>Post Page</title>
        <meta name="description" content="Sparrow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='flex min-h-screen mx-auto'>
        {/*  sidebar  */}
        <Sidebar />

        {/** feed */}


    <div className='xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl'>
        <div className='flex px-3 py-2 sticky justify-between top-0 z-50 bg-white border-b border-gray-200 items-center'>
            <div onClick={()=>router.push("/")} className='hoverEffect'>
                <ArrowLeftIcon className='h-5'/>
            </div>
            <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Post</h2>
            
        </div>
        <Post id={id} post={post}/>

        
        {comments.length>0 && (
            <div className=''>
                <AnimatePresence>
                {comments.map((comment) => (

                <motion.div key={comment.id}
                initial={{opacity:0}} 
                animate={{opacity:1}} 
                exit={{opacity:0}}
                transition={{duration:1}}
                >
                <Comment 
                key={comment.id} 
                commentId={comment.id}
                originalPostId = {id}
                comment={comment.data()}/>

                </motion.div>

            ))}
            </AnimatePresence>
            </div>
        )}
        
        
    </div>


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