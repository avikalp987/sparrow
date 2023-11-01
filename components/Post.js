import { ChartBarIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from '@heroicons/react/outline'
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { db, storage } from '../firebase'
import { signIn, useSession } from 'next-auth/react'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import { deleteObject, ref } from 'firebase/storage'
import { useRecoilState } from 'recoil'
import { modalState } from '../atom/modalAtom'

export default function Post({post}) {

    const {data:session} = useSession();
    const [likes,setLikes] = useState([]);
    const [hasLiked,setHasLiked] = useState(false);
    const [open,setOpen] = useRecoilState(modalState);

    useEffect(()=>{
        const unsubscribe = onSnapshot(
            collection(db,"posts",post.id,"likes"),
            (snapshot)=>{
                setLikes(snapshot.docs);
            }
        )
    },[db])

    useEffect(()=>{
        setHasLiked(likes.findIndex((like) => like.id===session?.user.uid) !== -1);
    },[likes])

    const likePost = async ()=>{
        if(session)
        {
        if(hasLiked)
        {
            await deleteDoc(doc(db,"posts",post.id,"likes",session?.user.uid));
        }
        else
        {
            await setDoc(doc(db,"posts",post.id, "likes" ,session?.user.uid), {
                username:session.user.username,
            })
        }
        }else{
            signIn();
        }
        
    }

    const deletePost = async ()=>{
        if(window.confirm("Want to delete this post ?")){
            await deleteDoc(doc(db,"posts",post.id));
            if(post.data().image)
            {
            await deleteObject(ref(storage, `posts/${post.id}/image`));
            }
        }
    }



  return (
    <div className='flex p-3 cursor-pointer border-b border-gray-200'>
        {/**image */}
        <img src={post.data().userImg} alt="user-image" className='h-11 w-11 rounded-full mr-4'/>
        {/**right side */}
        <div>

            {/**header */}
            <div className='flex items-center justify-between'>
                {/**post user info */}
                <div className='flex space-x-3 whitespace-nowrap items-center'>
                    <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>{post.data().name}</h4>
                    <span className='text-sm sm:text-[15px]'>@{post.data().username}</span>
                    <span className='text-sm sm:text-[15px]'>
                        <Moment fromNow>{post?.data().timestamp?.toDate()}</Moment>
                    </span>
                </div>
                {/**dot icon */}
                <DotsHorizontalIcon className='h-10 hoverEffect w-10'/>
            </div>

            {/** post text*/}
            <p className='text-gray-800 text-[15px] sm:text-[16px] mb-2'>{post.data().text}</p>


            {/** post image */}
            
            {post.data().image && (
                <img className="rounded-2xl mr-2 " src={post.data().image} alt="post image" />
            )} 

            {/** icons*/}
            <div className='flex items-center justify-between p-2 text-gray-500'>
                <ChatIcon 
                onClick={() => setOpen(!open)}
                className='h-9 w-9 hoverEffect p-2  '/>
                {(session?.user.uid === post?.data().id) && (
                    <TrashIcon onClick={deletePost}
                    className='h-9 w-9 hoverEffect p-2 ' />
                )}
                <div className='flex items-center'>
                {hasLiked ? (
                    <HeartIconFilled
                    onClick={likePost}
                    className='h-9 w-9 hoverEffect p-2 text-red-600'/>
                ) : 
                (
                    <HeartIcon 
                    onClick={likePost}
                    className='h-9 w-9 hoverEffect p-2 '/>
                )}

                {likes.length>0 && (
                    <span className={`${hasLiked && "text-red-600"} text-sm select-none`}>
                        {likes.length}
                    </span>
                )}
                </div>
                <ShareIcon className='h-9 w-9 hoverEffect p-2 '/>
                <ChartBarIcon className='h-9 w-9 hoverEffect p-2 ' />
            </div>
        </div>
    </div>
  )
}
