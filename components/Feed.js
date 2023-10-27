import { SparklesIcon } from '@heroicons/react/outline'
import React from 'react'
import Input from './Input'
import Post from './Post'

export default function Feed() {
  const posts = [
    {
      id:"1",
      name:"Vikalp Arora",
      username:"shinewithvikalp",
      userImg : "https://thumb.silhouette-ac.com/t/0a/0abcbe0c4d9ff728f7453070a8937dba_t.jpeg",
      postImg:"https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
      text:"this is a sample tweet",
      timestamp:"2 hours ago",
    },
    {
      id:"2",
      name:"Vikalp Arora",
      username:"shine2withvikalp",
      userImg : "https://thumb.silhouette-ac.com/t/0a/0abcbe0c4d9ff728f7453070a8937dba_t.jpeg",
      postImg:"https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
      text:"this is a sample tweet",
      timestamp:"3 hours ago",
    },
    {
      id:"3",
      name:"Vikalp Arora",
      username:"shine3withvikalp",
      userImg : "https://thumb.silhouette-ac.com/t/0a/0abcbe0c4d9ff728f7453070a8937dba_t.jpeg",
      postImg:"https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
      text:"this is a sample tweet",
      timestamp:"4 hours ago",
    }
  ]

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
