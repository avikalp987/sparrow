import Image from 'next/image'
import React from 'react'
import SidebarMenuItem from './SidebarMenuItem'
import {HomeIcon} from "@heroicons/react/solid"
import { BellIcon, BookmarkIcon, ClipboardIcon, DotsCircleHorizontalIcon, DotsHorizontalIcon, HashtagIcon, InboxIcon, UserIcon } from '@heroicons/react/outline'

export default function Sidebar() {
  return (
    <div className='hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24'>

        {/** logo */}
        <div className='hover:scale-110 transition-scale duration-300'>
            <Image
            className='rounded-full'
            src="https://thumb.silhouette-ac.com/t/0a/0abcbe0c4d9ff728f7453070a8937dba_t.jpeg"
            height="50"
            width="50"
            alt='Logo'
            ></Image>
        </div>


        {/** menu */}
        <div className='mt-4 mb-2.5 xl:items-start'>
            <SidebarMenuItem
            active 
            text="Home"
            Icon={HomeIcon}/>

            <SidebarMenuItem 
            text="Explore"
            Icon={HashtagIcon}/>

            <SidebarMenuItem 
            text="Notification"
            Icon={BellIcon}/>
  
            <SidebarMenuItem 
            text="Messages"
            Icon={InboxIcon}/>
  
            <SidebarMenuItem 
            text="Bookmark"
            Icon={BookmarkIcon}/>
  
            <SidebarMenuItem 
            text="Lists"
            Icon={ClipboardIcon}/>
   
            <SidebarMenuItem 
            text="Profile"
            Icon={UserIcon}/>
  
            <SidebarMenuItem 
            text="More"
            Icon={DotsCircleHorizontalIcon}/>
        </div>

        
        {/** button */}
        <button 
        className='bg-black text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline'>
          Post
        </button>


        {/** mini profile */}
        <div className='hoverEffect text-gray-700  flex items-center justify-center xl:justify-start mt-auto gap-2'>
          <img 
          className='rounded-full h-10 w-10'
          src='https://thumb.silhouette-ac.com/t/0a/0abcbe0c4d9ff728f7453070a8937dba_t.jpeg' 
          alt='icon of user' />
          <div className='leading-5 hidden xl:inline'>
            <h4 className='font-bold'>Vikalp Arora</h4>
            <p className='text-gray-500'>@shinewithvikalp</p>
          </div>
          <DotsHorizontalIcon className='h-5 xl:ml-8 hidden xl:inline'/>
        </div>
    </div>
  )
}
