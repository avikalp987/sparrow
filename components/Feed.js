import { SparklesIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import Input from './Input'
import Post from './Post'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

export default function Feed() {
  

  const [posts,setPosts] = useState([]);

  useEffect(()=>{
    return onSnapshot(
      query(collection(db,"posts"),orderBy("timestamp","desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  },[]);


  return (
    <div className='xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl'>
        <div className='flex px-3 py-2 sticky justify-between top-0 z-50 bg-white border-b border-gray-200 items-center'>
            <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Home</h2>
            <div className='flex items-center p-3 hoverEffect justify-center'>
                <SparklesIcon className='h-5'/>
            </div>
        </div>
        <Input />
        {posts.map((post) => (
          <Post post={post} key={post.id}/>
        ))}
    </div>
  )
}
