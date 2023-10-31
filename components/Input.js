import { EmojiHappyIcon, PhotographIcon, XIcon } from '@heroicons/react/outline'
import React, { useRef, useState } from 'react'
import { useSession,signOut } from"next-auth/react";
import { db, storage } from '../firebase';
import { addDoc,collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

export default function Input() {
    const {data:session} = useSession();
    const [input,setInput] = useState("");
    const [loading,setLoading] = useState(false);
    const [selectedFile,setSelectedFile] = useState(null);
    const filePickerRef = useRef(null);

    const sendPost = async () => {
        if(loading)
        {
            return;
        }

        setLoading(true);
        const docRef = await addDoc(collection(db,"posts"),{
            id:session.user.uid,
            text:input,
            userImg:session.user.image,
            timestamp:serverTimestamp(),
            name:session.user.name,
            username:session.user.username,
        });

        const imageRef = ref(storage,`posts/${docRef.id}/image`);

        if(selectedFile)
        {
            await uploadString(imageRef,selectedFile,"data_url")
            .then(async () => {
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(doc(db ,"posts" ,docRef.id),{
                    image:downloadURL,
                })
            });
        }

        setInput("");
        setSelectedFile(null);
        setLoading(false);
    }

    const addImageToPost = async (ev)=>{
        const reader = new FileReader();
        if(ev.target.files[0])
        {
            reader.readAsDataURL(ev.target.files[0]);
        }

        reader.onload = (readerEvent)=>{
            setSelectedFile(readerEvent.target.result);
        }
    }
  return (
    <>
    {session && (
        <div className='flex border-b border-gray-200 p-3 space-x-3'>
        <img 
        onClick={signOut}
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
                placeholder='Whats Happening?'/>
            </div>

            {selectedFile && (
                <div className='relative'>
                    <XIcon onClick={() => setSelectedFile(null)}
                    className='h-5 cursor-pointer text-white absolute shadow-md shadow-white rounded-full'/>
                    <img className={`${loading && "animate-pulse"}`}
                    src={selectedFile} alt="" />
                </div>
            )}
            <div className='flex items-center justify-between pt-2.5'>
                {!loading && (
                    <>
                    <div className='flex'>
                    <div onClick={()=>filePickerRef.current.click()}>
                    <PhotographIcon className='h-10 w-10 hoverEffect p-2'/>
                    <input onChange={addImageToPost}
                    type='file' hidden ref={filePickerRef}/>
                    </div>
                    <EmojiHappyIcon className='h-10 w-10 hoverEffect p-2'/>
                </div>
                <button onClick={sendPost}
                disabled={!input.trim()} className='bg-black text-white px-4 py-1.5 rounded-full fint-semibold shadow-md hover:brightness-95 disabled:opacity-50'>
                Post</button>
                    </>
                )}
                
            </div>
        </div>
    </div>
    )}
    </>
  )
}

