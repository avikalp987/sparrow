import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState as modalState2, postIdState } from "../atom/modalAtom"
import Modal from "react-modal"
import { XIcon } from '@heroicons/react/solid';
import { db } from '../firebase';
import { addDoc, collection, doc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import Moment from 'react-moment';
import { useSession } from 'next-auth/react';
import { EmojiHappyIcon, PhotographIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';

export default function CommentModal() {

    const [open,setOpen] = useRecoilState(modalState2);
    const [postId,setPostId] = useRecoilState(postIdState);
    const [post,setPost] = useState({});
    const {data:session} = useSession();
    const [input,setInput] = useState("");
    const router = useRouter();
    

    useEffect(()=>{
        onSnapshot(doc(db,"posts",postId),
        (snapshot) => {
            setPost(snapshot);
        })
    },[postId,db])

    const sendComment  = async ()=>{
        await addDoc(collection(db,"posts",postId,"comments"),{
            comment : input,
            name:session.user.name,
            username:session.user.username,
            userImg:session.user.image,
            timestamp:serverTimestamp(),
            UserId:session.user.uid,
        })

        setOpen(false);
        setInput("");
        router.push(`/posts/${postId}`);
    }
  return (
    <div>  
        {open && (
            <Modal 
            isOpen={open}
            onRequestClose={() => setOpen(false)}
            className="max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-400 rounded-xl shadow-md">
                <div className='p-1'>
                    <div className='border-b border-gray-200 py-2 px-1.5'>
                        <div onClick={() => setOpen(false)}
                        className='hoverEffect w-10 h-10 flex items-center justify-center'>
                            <XIcon className='h-[23px] text-gray-700'/>
                        </div>
                    </div>

                    <div className='p-2 flex items-center space-x-1 relative'>
                        <span className='w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300'/>
                        <img className='h-11 w-11 rounded-full mr-4'
                        src={post?.data()?.userImg} 
                        alt="user-image" 
                        />

                        <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>{post?.data()?.name}</h4>


                        <span className='text-sm sm:text-[15px]'>@{post?.data()?.username}</span>


                        <span className='text-sm sm:text-[15px]'>
                        <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
                        </span>
                    </div>
                    <p className='text-gray-700 text-[15px] sm:text-[16px] ml-16 mb-2'>{post?.data()?.text}</p>
        <div className='flex p-3 space-x-3'>
        <img 
        src={session.user.image} 
        alt="profile pic" 
        className='h-11 w-11 rounded-full cursor-pointer hover:brightness-95'
        />
        <div className='w-full divide-y color-gray-200'>
            <div className=''>
                <textarea 
                value={input}
                onChange={(ev) => setInput(ev.target.value)}
                className="w-full border-none focus:ring-0 placeholder-gray-500 tracking-wide min-h-[50px] text-gray-700 " 
                rows="2"
                placeholder='Post Your Reply'/>
            </div>


            <div className='flex items-center justify-between pt-2.5'>
            <div className='flex'>
                    <div>
                    <PhotographIcon className='h-10 w-10 hoverEffect p-2'/>
                    {/*<input onChange={addImageToPost}
                    type='file' hidden ref={filePickerRef}/>*/}
                    </div>
                    <EmojiHappyIcon className='h-10 w-10 hoverEffect p-2'/>
                </div>
                <button onClick={sendComment}
                disabled={!input.trim()} className='bg-black text-white px-4 py-1.5 rounded-full fint-semibold shadow-md hover:brightness-95 disabled:opacity-50'>
                Reply</button>
                
            </div>
        </div>
    </div>
                </div>
            </Modal>
        )}
    </div>
  )
}
