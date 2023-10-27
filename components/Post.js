import { ChartBarIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from '@heroicons/react/outline'
import React from 'react'

export default function Post({post}) {
  return (
    <div className='flex p-3 cursor-pointer border-b border-gray-200'>
        {/**image */}
        <img src={post.userImg} alt="user-image" className='h-11 w-11 rounded-full mr-4'/>
        {/**right side */}
        <div>

            {/**header */}
            <div className='flex items-center justify-between'>
                {/**post user info */}
                <div className='flex space-x-3 whitespace-nowrap items-center'>
                    <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>{post.name}</h4>
                    <span className='text-sm sm:text-[15px]'>{post.username}</span>
                    <span className='text-sm sm:text-[15px]'>{post.timestamp}</span>
                </div>
                {/**dot icon */}
                <DotsHorizontalIcon className='h-10 hoverEffect w-10'/>
            </div>

            {/** post text*/}
            <p className='text-gray-800 text-[15px] sm:text-[16px] mb-2'>{post.text}</p>


            {/** post image */}
            <img className="rounded-2xl mr-2 " src={post.postImg} alt="post image" />

            {/** icons*/}
            <div className='flex items-center justify-between p-2 text-gray-500'>
                <ChatIcon className='h-9 w-9 hoverEffect p-2  '/>
                <TrashIcon className='h-9 w-9 hoverEffect p-2 ' />
                <HeartIcon className='h-9 w-9 hoverEffect p-2 '/>
                <ShareIcon className='h-9 w-9 hoverEffect p-2 '/>
                <ChartBarIcon className='h-9 w-9 hoverEffect p-2 ' />
            </div>
        </div>
    </div>
  )
}
