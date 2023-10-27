import { EmojiHappyIcon, PhotographIcon } from '@heroicons/react/outline'
import React from 'react'

export default function Input() {
  return (
    <div className='flex border-b border-gray-200 p-3 space-x-3'>
        <img 
        src="https://thumb.silhouette-ac.com/t/0a/0abcbe0c4d9ff728f7453070a8937dba_t.jpeg" 
        alt="profile pic" 
        className='h-11 w-11 rounded-full cursor-pointer hover:brightness-95'
        />
        <div className='w-full divide-y color-gray-200'>
            <div className=''>
                <textarea 
                className="w-full border-none focus:ring-0 placeholder-gray-500 tracking-wide min-h-[50px] text-gray-700 " 
                rows="2"
                placeholder='Whats Happening?'/>
            </div>
            <div className='flex items-center justify-between pt-2.5'>
                <div className='flex'>
                    <PhotographIcon className='h-10 w-10 hoverEffect p-2'/>
                    <EmojiHappyIcon className='h-10 w-10 hoverEffect p-2'/>
                </div>
                <button disabled className='bg-black text-white px-4 py-1.5 rounded-full fint-semibold shadow-md hover:brightness-95 disabled:opacity-50'>Post</button>
                
            </div>
        </div>
    </div>
  )
}

