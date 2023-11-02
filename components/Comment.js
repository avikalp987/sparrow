import { ChartBarIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from '@heroicons/react/outline'
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { db, storage } from '../firebase'
import { signIn, useSession } from 'next-auth/react'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import { deleteObject, ref } from 'firebase/storage'
import { useRecoilState } from 'recoil'
import { modalState, postIdState } from '../atom/modalAtom'
import { useRouter } from 'next/router'

export default function Comment({comment,commentId,originalPostId}) {

    const {data:session} = useSession();
    const [likes,setLikes] = useState([]);
    const [hasLiked,setHasLiked] = useState(false);
    const [open,setOpen] = useRecoilState(modalState);
    const [postId,setPostId] = useRecoilState(postIdState);
    const router = useRouter();

    useEffect(()=>{
        onSnapshot(
            collection(db,"posts",originalPostId,"comments",commentId,"likes"),
            (snapshot)=>{
                setLikes(snapshot.docs);
            }
        )
    },[db,originalPostId,commentId])

    useEffect(()=>{
        setHasLiked(likes.findIndex((like) => like.id===session?.user.uid) !== -1);
    },[likes])

    const likeComment = async ()=>{
        if(session)
        {
        if(hasLiked)
        {
            await deleteDoc(doc(db,"posts",originalPostId,"comments",commentId,"likes",session?.user.uid));
        }
        else
        {
            await setDoc(doc(db,"posts",originalPostId,"comments",commentId,"likes",session?.user.uid), {
                username:session.user.username,
            })
        }
        }else{
            signIn();
        }
        
    }

    const deleteComment = async ()=>{
        if(window.confirm("Want to delete this Comment ?")){
            await deleteDoc(doc(db,"posts",originalPostId,"comments",commentId));
        }
    }



  return (
    <div className='flex p-3 cursor-pointer border-b border-gray-200 pl-20'>
        {/**image */}
        <img src={comment?.userImg} alt="user-image" className='h-11 w-11 rounded-full mr-4'/>
        {/**right side */}
        <div className='flex-1'>

            {/**header */}
            <div className='flex items-center justify-between'>
                {/**post user info */}
                <div className='flex space-x-3 whitespace-nowrap items-center'>
                    <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>{comment?.name}</h4>
                    <span className='text-sm sm:text-[15px]'>@{comment?.username}</span>
                    <span className='text-sm sm:text-[15px]'>
                        <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
                    </span>
                </div>
                {/**dot icon */}
                <DotsHorizontalIcon className='h-10 hoverEffect w-10'/>
            </div>

            {/** post text*/}
            <p className='text-gray-800 text-[15px] sm:text-[16px] mb-2'>{comment?.comment}</p>

            {/** icons*/}
            <div className='flex items-center justify-between p-2 text-gray-500'>
                <div className='flex items-center select-none'>
                <ChatIcon 
                onClick={() => {
                    if(!session)
                    {
                        signIn();
                    }else{
                        setPostId(originalPostId);
                        setOpen(!open);
                    }
                }}
                className='h-9 w-9 hoverEffect p-2'
                />

                </div>
                {(session?.user.uid === comment?.UserId) && (
                    <TrashIcon onClick={deleteComment}
                    className='h-9 w-9 hoverEffect p-2 ' />
                )}
                <div className='flex items-center'>
                {hasLiked ? (
                    <HeartIconFilled
                    onClick={likeComment}
                    className='h-9 w-9 hoverEffect p-2 text-red-600'/>
                ) : 
                (
                    <HeartIcon 
                    onClick={likeComment}
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
