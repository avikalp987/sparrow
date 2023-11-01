import React from 'react'
import { useRecoilState } from 'recoil'
import { modalState } from "../atom/modalAtom.js";

export default function CommentModal() {

    const [open,setOpen] = useRecoilState(modalState);
  return (
    <div>
        <h1>
            Comment Modal
        </h1>
        {open && <h1>The Modal is open</h1>}
    </div>
  )
}
