import React from 'react'
import {getProviders ,signIn} from "next-auth/react"

export default function signin({providers}) {
  return (
    <div className='flex justify-center mt-20'>
       
       <div>
        {Object.values(providers).map((provider) => (
            <div key={provider.name}
            className='flex flex-col items-center justify-center'>
                <img className='w-36 object-cover rounded-full'
                src='https://thumb.silhouette-ac.com/t/0a/0abcbe0c4d9ff728f7453070a8937dba_t.jpeg' alt="" />
                <p className='text-center text-sm italic my-20'>This app is created for learning and testing purposes</p>
                <button onClick={() => signIn(provider.id,{callbackUrl : "/"})}
                className='bg-black rounded-lg p-3 text-white'>Sign in with {provider.name}</button>
            </div>
        ))}
       </div>
    </div>
  )
}


export async function getServerSideProps()
{
    const providers = await getProviders();
    return {
        props:{
            providers,
        }
    }
}
